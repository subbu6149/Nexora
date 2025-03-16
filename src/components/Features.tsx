
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, BookText, Globe, Link, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const features = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Curated Internships',
    description: 'Handpicked internship opportunities from top companies across various industries.'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Skill-Building Courses',
    description: 'Industry-relevant courses designed by experts to enhance your employability.'
  },
  {
    icon: <BookText className="h-6 w-6" />,
    title: 'Academic Journals',
    description: 'Access to cutting-edge research publications to stay updated with the latest developments.'
  },
  {
    icon: <Link className="h-6 w-6" />,
    title: 'Networking Opportunities',
    description: 'Connect with professionals, mentors, and peers to build your professional network.'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global Exposure',
    description: 'Opportunities from around the world, broadening your horizons and experiences.'
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Career Guidance',
    description: 'Expert advice and resources to help you make informed career decisions.'
  }
];

const FeatureCard = ({ icon, title, description, index, isVisible }: FeatureProps) => (
  <div
    className={cn(
      'relative group transition-all duration-700 transform',
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    )}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="glass-card p-6 h-full transition-all duration-300 hover:shadow-lg">
      <div className="relative z-10">
        <div className="p-3 bg-nexora-50 dark:bg-nexora-900/30 rounded-lg inline-block text-nexora-600 dark:text-nexora-400 mb-4 transition-all duration-300 group-hover:bg-nexora-100 dark:group-hover:bg-nexora-800/30">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id.split('-')[1]);
            setVisibleItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    features.forEach((_, index) => {
      const element = document.getElementById(`feature-${index}`);
      if (element) observer.observe(element);
    });

    return () => {
      features.forEach((_, index) => {
        const element = document.getElementById(`feature-${index}`);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="section-padding bg-nexora-50/30 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-nexora-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Why Choose NEXORA?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We provide comprehensive resources and opportunities to help you build a successful career in your chosen field.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div id={`feature-${index}`} key={index}>
              <FeatureCard
                {...feature}
                index={index}
                isVisible={visibleItems.includes(index)}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button className="bg-nexora-500 hover:bg-nexora-600 text-white"
          onClick={() => window.open('https://forms.gle/kkKckut2FigwpBWF7', '_blank')}>
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
