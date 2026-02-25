import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { BadgeCheck, Leaf, ShoppingCart, Truck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-background rounded-3xl border-none shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center">
            <DialogHeader>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-2">
                <Leaf className="w-3 h-3" />
                <span>{product.category} Collection</span>
              </div>
              <DialogTitle className="text-3xl md:text-4xl font-black text-foreground">
                {product.name}
              </DialogTitle>
              <p className="text-xl text-muted-foreground">{product.subtitle}</p>
            </DialogHeader>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">{product.price}</span>
              <span className="text-muted-foreground line-through">₹{(parseInt(product.price.replace(/[^\d]/g, '')) * 1.3).toFixed(0)}</span>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span>Guaranteed quality & freshness</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="w-5 h-5 text-primary" />
                <span>Express delivery in 3-5 days</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-full py-8 text-xl font-bold gap-2 group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
