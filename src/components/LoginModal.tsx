import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, Lock, BadgeCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContextCheckout';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [acceptUpdates, setAcceptUpdates] = useState(true);
  const { login } = useAuth();

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    toast.success('OTP sent to your mobile number!');
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    // Frontend only - accept any 6-digit OTP
    login(`+91${phoneNumber}`);
    toast.success('Login successful!');
    onSuccess();
    onClose();
    // Reset state
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    onClose();
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
                <p className="text-sm text-muted-foreground mt-1">Secure checkout with mobile verification</p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6">
          {step === 'phone' ? (
            <>
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base font-bold">Enter Mobile Number</Label>
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
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="updates"
                  checked={acceptUpdates}
                  onCheckedChange={(checked) => setAcceptUpdates(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="updates" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Send me order updates & offers - (no spam)
                </label>
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full h-14 rounded-xl text-lg font-black"
                disabled={phoneNumber.length !== 10}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <Label htmlFor="otp" className="text-base font-bold">Enter OTP</Label>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit code to +91 {phoneNumber}
                </p>
                <Input
                  id="otp"
                  type="tel"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-14 text-2xl text-center tracking-[0.5em] rounded-xl border-2 focus-visible:ring-primary font-bold"
                  maxLength={6}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('phone')}
                  className="flex-1 h-14 rounded-xl text-lg font-bold border-2"
                >
                  Change Number
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  className="flex-1 h-14 rounded-xl text-lg font-black"
                  disabled={otp.length !== 6}
                >
                  Verify & Continue
                </Button>
              </div>

              <button
                onClick={handleSendOTP}
                className="w-full text-center text-sm text-primary font-bold hover:underline"
              >
                Resend OTP
              </button>
            </>
          )}

          {/* Security Badges */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
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
            By proceeding, I agree to Plant Haven's{' '}
            <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline font-bold">T&C</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
