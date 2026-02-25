import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import { BerryBoooLogo } from './BerryBoooLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl text-primary">
              <BerryBoooLogo className="w-10 h-10" />
              <span>BerryBooo</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Bringing nature closer to you. Premium quality plants for your home and garden.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors group">
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors group">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors group">
                <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground uppercase tracking-widest">Shop</h3>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li><a href="#fruit" className="hover:text-primary transition-colors">Fruit Saplings</a></li>
              <li><a href="#flower" className="hover:text-primary transition-colors">Flower Plants</a></li>
              <li><a href="#indoor" className="hover:text-primary transition-colors">Indoor Plants</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Garden Essentials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground uppercase tracking-widest">Support</h3>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li><a href="#" className="hover:text-primary transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground uppercase tracking-widest">Contact</h3>
            <ul className="space-y-6 text-muted-foreground text-lg">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span>123 Green Street, <br />Garden City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span>hello@planthaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-16 pt-8 text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 BerryBooo. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
