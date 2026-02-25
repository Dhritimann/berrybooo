import { BadgeCheck, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContextCheckout';
import { generateOTP, sendOTPEmail } from '@/utils/emailService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [acceptUpdates, setAcceptUpdates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    // Generate OTP
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    
    // Send OTP to email
    const emailResult = await sendOTPEmail(email, `+91${phoneNumber}`, newOTP);
    
    setIsLoading(false);
    
    if (emailResult.success) {
      toast.success(`OTP sent to ${email}`, {
        description: `Check your email for the 6-digit code. OTP: ${newOTP}`
      });
      setStep('otp');
    } else {
      toast.error('Failed to send OTP', {
        description: emailResult.message + ` Demo OTP: ${newOTP}`
      });
      // Still allow to proceed in demo mode
      setStep('otp');
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    // Verify OTP matches
    if (otp !== generatedOTP) {
      toast.error('Invalid OTP', {
        description: 'Please enter the correct OTP sent to your email'
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API verification delay
    setTimeout(() => {
      setIsLoading(false);
      // Store email in auth context
      login(email);
      toast.success('Login successful! 🎉', {
        description: 'Welcome to BerryBooo'
      });
      onSuccess();
      onClose();
      // Reset state
      setStep('phone');
      setPhoneNumber('');
      setEmail('');
      setOtp('');
      setGeneratedOTP('');
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      login('google_user@gmail.com');
      toast.success('Google login successful! 🎉', {
        description: 'Welcome to BerryBooo'
      });
      onSuccess();
      onClose();
      // Reset state
      setStep('phone');
      setPhoneNumber('');
      setEmail('');
      setOtp('');
    }, 1500);
  };

  const handleClose = () => {
    if (!isLoading) {
      setStep('phone');
      setPhoneNumber('');
      setEmail('');
      setOtp('');
      setGeneratedOTP('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 border-b">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black">Login to continue</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">Secure checkout with verification</p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6">
          {step === 'phone' ? (
            <>
              {/* Google Login Option */}
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full h-14 rounded-xl text-lg font-bold border-2 hover:bg-muted transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5 mr-2" />
                )}
                Continue with Google
              </Button>

              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground font-bold">
                  OR
                </span>
              </div>

              {/* Email Input */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-bold">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg rounded-xl border-2 focus-visible:ring-primary"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && email && phoneNumber.length === 10) {
                      handleSendOTP();
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  OTP will be sent to this email address
                </p>
              </div>

              {/* Mobile Login */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base font-bold">Mobile Number *</Label>
                <div className="flex gap-2">
                  <div className="w-20 h-14 rounded-xl bg-muted flex items-center justify-center font-bold text-lg border-2 border-border">
                    +91
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 h-14 text-lg rounded-xl border-2 focus-visible:ring-primary"
                    maxLength={10}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && email && phoneNumber.length === 10) {
                        handleSendOTP();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="updates"
                  checked={acceptUpdates}
                  onCheckedChange={(checked) => setAcceptUpdates(checked as boolean)}
                  className="mt-1"
                  disabled={isLoading}
                />
                <label htmlFor="updates" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Send me order updates & offers via email
                </label>
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full h-14 rounded-xl text-lg font-black"
                disabled={phoneNumber.length !== 10 || !email || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP to Email'
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <Label htmlFor="otp" className="text-base font-bold">Enter OTP</Label>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit code to {email}
                </p>
                <Input
                  id="otp"
                  type="tel"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-14 text-2xl text-center tracking-[0.5em] rounded-xl border-2 focus-visible:ring-primary font-bold"
                  maxLength={6}
                  disabled={isLoading}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && otp.length === 6) {
                      handleVerifyOTP();
                    }
                  }}
                />
                <p className="text-xs text-primary font-bold text-center">
                  Check your email inbox for the OTP
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                    setGeneratedOTP('');
                  }}
                  className="flex-1 h-14 rounded-xl text-lg font-bold border-2"
                  disabled={isLoading}
                >
                  Change Email
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  className="flex-1 h-14 rounded-xl text-lg font-black"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </Button>
              </div>

              <button
                onClick={handleSendOTP}
                className="w-full text-center text-sm text-primary font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </>
          )}

          {/* Security Badges */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>PCI DSS Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                <span>Secured Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span>Verified Merchant</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By proceeding, I agree to BerryBooo's{' '}
            <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline font-bold">T&C</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
