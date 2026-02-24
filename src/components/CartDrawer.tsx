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
import { Minus, Plus, ShoppingBag, Trash2, X, Package } from 'lucide-react';
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

  // Calculate item total
  const getItemTotal = (price: string, quantity: number) => {
    const priceValue = parseInt(price.replace(/[^\d]/g, ''));
    return priceValue * quantity;
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-lg w-full p-0 flex flex-col bg-background border-none shadow-2xl">
          <SheetHeader className="p-6 md:p-8 border-b bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <SheetTitle className="text-2xl font-black text-foreground">Shopping Cart</SheetTitle>
                  <p className="text-sm text-muted-foreground font-medium">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'} • ₹{subtotal.toLocaleString()}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-6 md:p-8">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center space-y-6">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black">Your cart is empty</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Discover our beautiful collection of plants and start your green journey!
                  </p>
                </div>
                <Button 
                  onClick={onClose} 
                  variant="default" 
                  className="rounded-full px-10 py-6 text-lg font-bold shadow-lg"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="bg-card rounded-2xl p-4 border-2 border-border hover:border-primary/30 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-muted shrink-0 shadow-md border-2 border-border">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-base md:text-lg leading-tight text-foreground line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-1">
                              {item.subtitle}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-lg md:text-xl font-black text-primary">
                                {item.price}
                              </span>
                              <span className="text-xs text-muted-foreground">per unit</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 h-fit hover:bg-destructive/10 rounded-lg transition-colors group"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                          </button>
                        </div>
                        
                        {/* Quantity Controls & Total */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2 bg-muted rounded-xl p-1 border border-border">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8 rounded-lg hover:bg-white hover:text-primary"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-black text-foreground">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8 rounded-lg hover:bg-white hover:text-primary"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Item Total</p>
                            <p className="text-lg md:text-xl font-black text-primary">
                              ₹{getItemTotal(item.price, item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {cartItems.length > 0 && (
            <SheetFooter className="p-6 md:p-8 border-t bg-gradient-to-br from-muted/30 to-muted/50">
              <div className="w-full space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-base text-muted-foreground">
                    <span className="font-medium">Subtotal ({cartCount} items)</span>
                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="font-medium text-muted-foreground">Shipping</span>
                    </div>
                    <span className="text-primary font-black text-lg">FREE</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-black text-foreground">Grand Total</span>
                    <span className="text-3xl font-black text-primary">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full rounded-2xl py-7 text-xl font-black shadow-2xl hover:shadow-primary/30 transition-all group"
                >
                  Proceed to Checkout
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout • Free shipping on all orders
                </p>
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

