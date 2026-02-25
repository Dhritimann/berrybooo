import { 
  ArrowLeft, 
  BadgeCheck,
  Building2,
  ChevronRight,
  CreditCard, 
  Loader2, 
  MapPin, 
  Smartphone,
  Tag, 
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContextCheckout';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { generateOrderId, sendOrderConfirmationEmail } from '@/utils/emailService';

interface CheckoutPageProps {
  onClose: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onClose }) => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { phoneNumber } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'card' | 'netbanking'>('razorpay');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: phoneNumber || '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  const coupons = [
    { code: 'FRUIT50', discount: 50, description: 'Flat 50% off on Fruit Saplings' },
    { code: 'BLOOM30', discount: 30, description: 'Get 30% off on Flower Plants' },
    { code: 'GREENLIFE', discount: 25, description: 'Buy 2 Get 1 Free on Indoor Plants' },
    { code: 'FIRST100', discount: 100, description: 'Flat ₹100 off on first order' },
    { code: 'PLANT20', discount: 20, description: '20% off on all plants' },
  ];

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      const discountAmount = coupon.discount <= 100 ? (subtotal * coupon.discount) / 100 : coupon.discount;
      setDiscount(Math.min(discountAmount, subtotal));
      setAppliedCoupon(coupon.code);
      toast.success(`Coupon ${coupon.code} applied! You saved ₹${Math.round(discountAmount)}`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  const handlePlaceOrder = async () => {
    if (!address.name || !address.email || !address.phone || !address.pincode || !address.address || !address.city || !address.state) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!address.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsPlacingOrder(true);

    // Generate order ID
    const orderId = generateOrderId();

    // Prepare order details
    const orderDetails = {
      orderId,
      customerName: address.name,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      discount,
      total: finalTotal,
      address: `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`,
      phoneNumber: address.phone
    };

    // Send order confirmation email
    const emailResult = await sendOrderConfirmationEmail(address.email, orderDetails);

    setIsPlacingOrder(false);

    if (emailResult.success) {
      toast.success('Order placed successfully! 🎉', {
        description: `Order confirmation sent to ${address.email}. Order ID: ${orderId}`
      });
      
      // Clear cart after successful order
      clearCart();
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      toast.success('Order placed successfully! 🎉', {
        description: `Order ID: ${orderId}. ${emailResult.message}`
      });
      
      // Still clear cart even if email fails
      clearCart();
      
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const finalTotal = subtotal - discount;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold text-lg">Back to Shop</span>
            </button>
            <h1 className="text-2xl font-black">Checkout</h1>
            <div className="w-24" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Coupon Section */}
              <div className="bg-card rounded-3xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black">Apply Coupon</h2>
                </div>

                <div className="flex gap-3 mb-4">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 h-12 rounded-xl border-2 uppercase"
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <Button
                      onClick={handleRemoveCoupon}
                      variant="outline"
                      className="h-12 px-6 rounded-xl border-2 font-bold"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      onClick={handleApplyCoupon}
                      className="h-12 px-8 rounded-xl font-bold"
                    >
                      Apply
                    </Button>
                  )}
                </div>

                {appliedCoupon && (
                  <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-4 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-bold text-primary">{appliedCoupon} Applied</p>
                        <p className="text-sm text-muted-foreground">You saved ₹{Math.round(discount)}</p>
                      </div>
                    </div>
                  </div>
                )}

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-primary font-bold hover:underline">
                    <span>{coupons.length} coupons available</span>
                    <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-4 space-y-3">
                    {coupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="border-2 border-dashed border-border rounded-xl p-4 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => {
                          setCouponCode(coupon.code);
                          if (!appliedCoupon) {
                            handleApplyCoupon();
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-black text-lg">{coupon.code}</p>
                            <p className="text-sm text-muted-foreground">{coupon.description}</p>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full font-bold">
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>

              {/* Address Section */}
              <div className="bg-card rounded-3xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black">Delivery Address</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="h-12 rounded-xl border-2"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="h-12 rounded-xl border-2"
                        placeholder="your.email@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="h-12 rounded-xl border-2"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="h-12 rounded-xl border-2"
                        placeholder="400001"
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                      className="rounded-xl border-2 min-h-24"
                      placeholder="House No., Building Name, Street, Area"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="h-12 rounded-xl border-2"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="h-12 rounded-xl border-2"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-card rounded-3xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black">Payment Method</h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="space-y-3">
                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        paymentMethod === 'razorpay' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">Razorpay</p>
                          <p className="text-sm text-muted-foreground">UPI, Cards, Wallets & More</p>
                        </div>
                      </div>
                      <BadgeCheck className="w-5 h-5 text-primary" />
                    </label>

                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        paymentMethod === 'upi' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">UPI</p>
                          <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        paymentMethod === 'card' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">Credit / Debit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Rupay</p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        paymentMethod === 'netbanking' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">Net Banking</p>
                          <p className="text-sm text-muted-foreground">All major banks supported</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-3xl p-8 shadow-lg border space-y-6">
                <h2 className="text-2xl font-black">Order Summary</h2>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-primary">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary font-bold">
                      <span>Discount</span>
                      <span>- ₹{Math.round(discount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-2xl font-black">
                    <span>Total</span>
                    <span>₹{Math.round(finalTotal).toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-primary font-bold text-center">
                      You saved ₹{Math.round(discount)}! 🎉
                    </p>
                  )}
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full h-14 rounded-xl text-lg font-black shadow-xl"
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing order, you agree to our Terms & Conditions. Order confirmation will be sent to your email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
