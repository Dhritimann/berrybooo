import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContextCheckout';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { LoginModal } from './LoginModal';
import { CheckoutPage } from './CheckoutPage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      onClose();
      setShowCheckout(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onClose();
    setShowCheckout(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md w-full p-0 flex flex-col bg-background border-none shadow-2xl">
          <SheetHeader className="p-8 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-primary" />
                <div className="flex flex-col">
                  <SheetTitle className="text-2xl font-black">Your Cart</SheetTitle>
                  <p className="text-sm text-muted-foreground">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-8">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-primary/30">
                  <ShoppingBag className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold">Your bag is empty</h3>
                <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button onClick={onClose} variant="default" className="rounded-full px-10 py-6 text-lg">
                  Shop Our Plants
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 animate-fade-in">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted shrink-0 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-lg leading-tight line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground italic">{item.subtitle}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 rounded-full hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center font-bold">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 rounded-full hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="font-black text-primary text-lg">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {cartItems.length > 0 && (
            <SheetFooter className="p-8 border-t bg-muted/30">
              <div className="w-full space-y-6">
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <Separator className="bg-border my-2" />
                  <div className="flex justify-between font-black text-2xl text-foreground pt-2">
                    <span>Grand Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full rounded-full py-8 text-xl font-bold group shadow-xl hover:shadow-primary/20 transition-all"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      {showCheckout && (
        <CheckoutPage onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
};

