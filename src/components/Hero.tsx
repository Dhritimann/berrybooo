import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-muted">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-widest animate-fade-in">
            <Leaf className="w-4 h-4" />
            <span>Welcome to Plant Haven</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] animate-fade-in delay-100">
            Bringing Nature <br /> 
            <span className="text-primary italic">To Your Doorstep</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in delay-200">
            Premium collection of grafted fruit saplings, exotic flowers, and low-maintenance indoor plants curated for modern homes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
            <Button size="lg" className="rounded-full px-10 py-8 text-xl group font-bold w-full sm:w-auto">
              Explore Collection
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-10 py-8 text-xl border-primary text-primary hover:bg-primary/5 w-full sm:w-auto font-bold">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 animate-fade-in delay-400">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">Safe Delivery</h4>
                <p className="text-sm text-muted-foreground">Pan-India express shipping</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">Premium Quality</h4>
                <p className="text-sm text-muted-foreground">Healthy, disease-free plants</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">Expert Guidance</h4>
                <p className="text-sm text-muted-foreground">Lifelong care assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
