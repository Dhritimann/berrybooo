import { Eye, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group border-none shadow-none bg-card hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden animate-fade-in h-full flex flex-col relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
          <Button 
            onClick={() => onViewDetails(product)}
            className="flex-1 rounded-full bg-white/90 backdrop-blur-md text-primary hover:bg-white border-none font-bold"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            onClick={() => addToCart(product)}
            className="flex-1 rounded-full shadow-xl font-bold"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-1 font-medium italic">{product.subtitle}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-black text-2xl text-primary">{product.price}</div>
          <div className="text-[10px] uppercase tracking-widest font-black text-primary/40">Premium Selection</div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(product)}
          className="w-full rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground font-black group-hover:border-primary transition-all py-6"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
