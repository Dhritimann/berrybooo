import { Quote, Star } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Anjali Sharma",
      role: "Home Gardener",
      text: "The Thai Chikoo sapling I bought last year is already fruiting! The quality is amazing, and the support was very helpful.",
      stars: 5,
      avatar: "AS"
    },
    {
      name: "Robert Wilson",
      role: "Urban Plant Parent",
      text: "Love their collection of indoor plants. My Snake Plant and Areca Palm are thriving. Highly recommend Plant Haven!",
      stars: 5,
      avatar: "RW"
    },
    {
      name: "Sneha Kapoor",
      role: "Balcony Gardener",
      text: "Beautiful Roses and Hibiscus! The delivery was very safe, and the plants arrived fresh without any damage.",
      stars: 4,
      avatar: "SK"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase">
            Testimonials
          </div>
          <h2 className="text-4xl font-black text-foreground">Happy Plant Parents</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join thousands of satisfied customers who have transformed their spaces with our premium plants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-muted border-none p-8 rounded-3xl relative overflow-hidden group hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary/10 group-hover:text-white/10 transition-colors" />
              <CardContent className="p-0 space-y-6">
                <div className="flex gap-1 text-primary group-hover:text-yellow-400 transition-colors">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-xl font-medium leading-relaxed group-hover:text-white transition-colors">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-primary/10 group-hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center font-bold text-primary group-hover:text-white transition-all">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-white transition-colors">{t.name}</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
