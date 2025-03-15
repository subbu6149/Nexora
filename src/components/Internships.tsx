
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Full list of internships
const allInternships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'NEXORA',
    location: 'San Francisco, CA',
    duration: '3 months',
    type: 'Remote',
    tags: ['React', 'JavaScript', 'UI/UX'],
    thumbnail: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'NEXORA',
    location: 'New York, NY',
    duration: '6 months',
    type: 'Hybrid',
    tags: ['Python', 'Machine Learning', 'Statistics'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'UX/UI Design Intern',
    company: 'NEXORA',
    location: 'Austin, TX',
    duration: '4 months',
    type: 'On-site',
    tags: ['Figma', 'User Research', 'Prototyping'],
    thumbnail: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Full Stack Development Intern',
    company: 'NEXORA',
    location: 'Chicago, IL',
    duration: '6 months',
    type: 'Remote',
    tags: ['MERN Stack', 'GraphQL', 'Docker'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Frontend Development Intern',
    company: 'NEXORA',
    location: 'Los Angeles, CA',
    duration: '3 months',
    type: 'Hybrid',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Machine Learning Intern',
    company: 'NEXORA',
    location: 'Boston, MA',
    duration: '4 months',
    type: 'On-site',
    tags: ['Python', 'PyTorch', 'TensorFlow'],
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Artificial Intelligence Intern',
    company: 'NEXORA',
    location: 'Seattle, WA',
    duration: '6 months',
    type: 'Remote',
    tags: ['Deep Learning', 'NLP', 'Computer Vision'],
    thumbnail: 'https://images.unsplash.com/photo-1580706483913-b6ea7db483a0?q=80&w=2030&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Generative AI Intern',
    company: 'NEXORA',
    location: 'Denver, CO',
    duration: '3 months',
    type: 'Hybrid',
    tags: ['GANs', 'Diffusion Models', 'LLMs'],
    thumbnail: 'https://images.unsplash.com/photo-1675271591211-196bc873f1db?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 9,
    title: 'DevOps Intern',
    company: 'NEXORA',
    location: 'Portland, OR',
    duration: '4 months',
    type: 'Remote',
    tags: ['AWS', 'CI/CD', 'Kubernetes'],
    thumbnail: 'https://images.unsplash.com/photo-1551419762-4a3d998f6292?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 10,
    title: 'Deep Learning Intern',
    company: 'NEXORA',
    location: 'Miami, FL',
    duration: '6 months',
    type: 'On-site',
    tags: ['CNN', 'RNN', 'Transformers'],
    thumbnail: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 11,
    title: 'Django Development Intern',
    company: 'NEXORA',
    location: 'Atlanta, GA',
    duration: '3 months',
    type: 'Hybrid',
    tags: ['Python', 'Django', 'PostgreSQL'],
    thumbnail: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=2080&auto=format&fit=crop'
  }
];

const Internships = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  
  // Get featured internships (first 3) or all internships
  const internships = showAll ? allInternships : allInternships.slice(0, 3);

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

    // Observe each internship card
    internships.forEach((internship) => {
      const element = document.getElementById(`internship-${internship.id}`);
      if (element) observer.observe(element);
    });

    return () => {
      internships.forEach((internship) => {
        const element = document.getElementById(`internship-${internship.id}`);
        if (element) observer.unobserve(element);
      });
    };
  }, [internships]);

  // Function to handle Apply Now button clicks - redirect to Google Form
  const redirectToGoogleForm = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://forms.gle/kkKckut2FigwpBWF7', '_blank');
  };

  // Function to handle View All Internships button clicks
  const handleViewAllClick = () => {
    setShowAll(true);
    // Reset visibility animation for newly displayed items
    setTimeout(() => {
      allInternships.forEach((internship) => {
        if (!visibleItems.includes(internship.id)) {
          const element = document.getElementById(`internship-${internship.id}`);
          if (element) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setVisibleItems((prev) => (prev.includes(internship.id) ? prev : [...prev, internship.id]));
                  }
                });
              },
              { threshold: 0.1 }
            );
            observer.observe(element);
          }
        }
      });
    }, 100);
  };

  return (
    <section id="internships" className="section-padding bg-gradient-to-b from-white to-nexora-50 dark:from-slate-900 dark:to-slate-900 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {showAll ? "All Available Internships" : "Featured Internships"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Launch your career with hands-on experience through our curated internship programs designed for ambitious students.
          </p>
        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((internship) => (
            <div
              id={`internship-${internship.id}`}
              key={internship.id}
              className={cn(
                'transition-all duration-700 transform',
                visibleItems.includes(internship.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              )}
              style={{ transitionDelay: `${(internship.id % 3) * 100}ms` }}
            >
              <AnimatedCard className="h-full">
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={internship.thumbnail}
                      alt={internship.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-nexora-700 hover:bg-nexora-50">
                      {internship.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {internship.title}
                  </h3>
                  <p className="text-nexora-600 dark:text-nexora-400 font-medium mb-4">
                    {internship.company}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{internship.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{internship.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {internship.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-1 rounded-full bg-nexora-100 dark:bg-nexora-900/30 text-nexora-800 dark:text-nexora-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    onClick={redirectToGoogleForm}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>
        
        {!showAll && (
          <div className="mt-12 text-center">
            <Button 
              className="bg-nexora-500 hover:bg-nexora-600 text-white"
              onClick={handleViewAllClick}
            >
              View All Internships <Briefcase className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Internships;
