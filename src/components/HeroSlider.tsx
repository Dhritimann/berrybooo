import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Leaf, Sparkles, Tag } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "Grafted Fruit Saplings",
    highlight: "Up to 50% OFF",
    offer: "Use Code: FRUIT50",
    description: "Grow your own organic orchard with our premium grafted varieties. Faster fruiting guaranteed!",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_7464989f-88b4-4e21-bfab-c15a67f5fdf3.jpg",
    accent: "bg-emerald-600/10 text-emerald-600",
    link: "#fruit"
  },
  {
    id: 2,
    title: "Vibrant Flower Plants",
    highlight: "FLAT 30% OFF",
    offer: "Use Code: BLOOM30",
    description: "Transform your balcony into a paradise with our exotic blooming flower collection.",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_71380184-4d70-4f6b-89fc-19bad5e68921.jpg",
    accent: "bg-rose-600/10 text-rose-600",
    link: "#flower"
  },
  {
    id: 3,
    title: "Air Purifying Indoor Plants",
    highlight: "BUY 2 GET 1 FREE",
    offer: "Use Code: GREENLIFE",
    description: "NASA approved air purifiers for a healthier home. Modern pots included with every purchase!",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4afcbe25-ea7f-451f-aabc-9745d96b1a5f.jpg",
    accent: "bg-indigo-600/10 text-indigo-600",
    link: "#indoor"
  }
];

export const HeroSlider: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const onDotClick = useCallback((index: number) => {
    if (!api) return;
    api.scrollTo(index);
  }, [api]);

  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-background">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="container mx-auto px-4 md:px-8">
                <div className="bg-muted/50 rounded-[3rem] overflow-hidden p-8 md:p-16 lg:p-24 relative group border border-border/50 shadow-2xl">
                  {/* Decorative Elements */}
                  <div className="absolute -top-12 -right-12 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8 text-center lg:text-left animate-fade-in">
                      <div className={cn("inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-sm", slide.accent)}>
                        <Tag className="w-4 h-4" />
                        <span>{slide.highlight}</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1] tracking-tight">
                        {slide.title.split(' ').map((word, i) => (
                          <span key={i} className={i === slide.title.split(' ').length - 1 ? "text-primary italic block md:inline" : ""}>
                            {word}{' '}
                          </span>
                        ))}
                      </h1>

                      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                        <Button size="lg" className="rounded-full px-12 py-8 text-xl group font-black shadow-xl hover:shadow-primary/30 transition-all w-full sm:w-auto" asChild>
                          <a href={slide.link}>
                            Shop Now
                            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <div className="px-8 py-4 bg-white/50 backdrop-blur-md rounded-full border border-primary/20 flex items-center gap-3 shadow-sm">
                          <Sparkles className="w-5 h-5 text-yellow-500" />
                          <span className="font-bold text-lg">{slide.offer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/img animate-fade-in delay-200">
                      <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group-hover/img:scale-[1.02] transition-transform duration-700">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl animate-bounce">
                        <Leaf className="w-16 h-16" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="container mx-auto px-4 md:px-8 mt-12 flex items-center justify-between relative">
          <div className="flex gap-4">
            <CarouselPrevious className="static translate-y-0 h-16 w-16 rounded-2xl bg-white border border-border shadow-md hover:bg-primary hover:text-white transition-all duration-300" />
            <CarouselNext className="static translate-y-0 h-16 w-16 rounded-2xl bg-white border border-border shadow-md hover:bg-primary hover:text-white transition-all duration-300" />
          </div>

          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotClick(index)}
                className={cn(
                  "h-4 rounded-full transition-all duration-300",
                  current === index ? "w-12 bg-primary" : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
};
