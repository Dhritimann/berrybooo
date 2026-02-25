import { BadgeCheck, Leaf, Sparkles, Sprout } from 'lucide-react';
import React from 'react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Premium Grafted Saplings",
      description: "Our fruit plants are meticulously grafted for faster fruiting, higher yield, and disease resistance.",
      icon: <Sprout className="w-8 h-8" />,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "NASA Approved Purifiers",
      description: "Carefully selected indoor plants known for their superior air-purifying qualities to keep your home fresh.",
      icon: <Leaf className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Sustainable Practices",
      description: "We use eco-friendly potting mixes and sustainable nursery practices to ensure environmental responsibility.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Quality Assurance",
      description: "Each plant undergoes a rigorous 3-step quality check before it leaves our nursery.",
      icon: <BadgeCheck className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-700"
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase">
              Our Commitment
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1]">
              Why Choose <br /> 
              <span className="text-primary italic">Plant Haven</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At Plant Haven, we don't just sell plants; we nurture lifelong connections with nature. Our expertise in grafting and nursery management ensures you get the healthiest starts for your garden.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              {features.map((feature, idx) => (
                <div key={idx} className="group p-6 rounded-3xl bg-white hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-primary transition-colors ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{feature.title}</h4>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 group">
              <img 
                src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_5b14b6b7-6576-4cb4-bd76-aaaa5ac1c7ae.jpg" 
                alt="Expert nursery care" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                <p className="text-white text-3xl font-bold italic leading-tight">
                  "Each plant is treated like family before it meets its new home."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">JD</div>
                  <div className="text-white">
                    <p className="font-bold">John Doe</p>
                    <p className="text-sm text-white/70 text-secondary">Nursery Manager</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
