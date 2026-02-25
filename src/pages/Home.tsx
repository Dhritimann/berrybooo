import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSlider } from '@/components/HeroSlider';
import { CategorySection } from '@/components/CategorySection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Testimonials } from '@/components/Testimonials';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductModal } from '@/components/ProductModal';
import { plantCategories, Product } from '@/data/products';

const Home: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      <main>
        <HeroSlider />
        
        {plantCategories.map((category) => (
          <CategorySection 
            key={category.id} 
            category={category} 
            onViewDetails={handleOpenProduct}
          />
        ))}
        
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
      </main>
      
      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={handleCloseProduct} 
      />
    </div>
  );
};

export default Home;
