import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface NavbarProps {
  onCartOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Fruit Saplings', href: '#fruit' },
    { label: 'Flower Plants', href: '#flower' },
    { label: 'Indoor Plants', href: '#indoor' },
    { label: 'Garden Essentials', href: '#about' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center gap-2 font-black text-2xl text-primary tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Leaf className="w-8 h-8" />
          <span>Plant Haven</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors font-bold tracking-tight"
              onClick={(e) => scrollToSection(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          
          <Button 
            onClick={onCartOpen}
            className="rounded-full px-6 flex items-center gap-2 font-bold group relative shadow-lg hover:shadow-primary/20"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>My Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-background animate-fade-in">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onCartOpen}
            className="p-3 bg-primary text-white rounded-full relative shadow-md"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-background">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-0 bg-background z-40 transition-transform duration-500 md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-12">
          <button 
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-10 h-10" />
          </button>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-3xl font-black text-foreground/90 hover:text-primary transition-colors tracking-tight"
              onClick={(e) => scrollToSection(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <Button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onCartOpen();
            }}
            className="rounded-full px-12 py-8 text-2xl font-black mt-8 w-full shadow-2xl"
          >
            Open Cart ({cartCount})
          </Button>
        </div>
      </div>
    </nav>
  );
};
