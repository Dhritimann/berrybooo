import React, { useState } from 'react';
import { Category, Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  category: Category;
  onViewDetails: (product: Product) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 4;
  const displayedProducts = isExpanded ? category.products : category.products.slice(0, initialCount);

  return (
    <section id={category.id} className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 text-center md:text-left md:flex items-end justify-between gap-12 border-b border-muted pb-12">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm justify-center md:justify-start">
              <Sparkles className="w-5 h-5" />
              <span>Premium Selection</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
              {category.name}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              {category.description}
            </p>
          </div>
          {category.products.length > initialCount && (
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full px-10 py-8 text-xl font-black border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all group hidden md:flex"
            >
              {isExpanded ? 'Show Less' : 'View All Collection'}
              {isExpanded ? <ChevronUp className="ml-2 w-6 h-6" /> : <ChevronDown className="ml-2 w-6 h-6 group-hover:translate-y-1 transition-transform" />}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {displayedProducts.map((product) => (
            <div key={product.id} className="animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: `${Math.random() * 0.3}s` }}>
              <ProductCard product={product} onViewDetails={onViewDetails} />
            </div>
          ))}
        </div>

        {category.products.length > initialCount && (
          <div className="mt-16 text-center md:hidden">
            <Button
              variant="default"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full px-12 py-8 text-xl font-black shadow-2xl w-full sm:w-auto"
            >
              {isExpanded ? 'Show Less' : 'View All Collection'}
              {isExpanded ? <ChevronUp className="ml-3 w-6 h-6" /> : <ChevronDown className="ml-3 w-6 h-6" />}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
