import { Leaf, Send } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden bg-primary p-12 md:p-24 rounded-[3rem] shadow-2xl group animate-fade-in">
          <Leaf className="absolute -top-12 -left-12 w-64 h-64 text-white/5 rotate-[45deg] group-hover:rotate-[60deg] transition-transform duration-1000" />
          <Leaf className="absolute -bottom-12 -right-12 w-96 h-96 text-white/10 -rotate-[15deg] group-hover:rotate-[0deg] transition-transform duration-1000" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
              Get Tips to Nurture Your Greenery & Exclusive Offers!
            </h2>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Join 10,000+ plant parents and get the latest plant care guides and seasonal discounts directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-none text-white placeholder:text-white/60 text-lg py-8 px-8 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-auto flex-1"
                required
              />
              <Button type="submit" size="lg" className="bg-white text-emerald-800 hover:bg-white/90 font-bold rounded-full px-12 py-8 text-xl h-auto shadow-xl group/btn transition-all">
                Subscribe
                <Send className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </form>
            <p className="text-white/50 text-sm italic">No spam, just greens. You can unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
