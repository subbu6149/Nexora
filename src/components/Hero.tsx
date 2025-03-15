
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ThreeDModel from './3DModel';
import { ArrowRight, BookOpen, Users, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExploreClick = () => {
    const internshipSection = document.getElementById('internships');
    if (internshipSection) {
      internshipSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      <div className="absolute top-20 -left-40 w-80 h-80 bg-nexora-100 rounded-full filter blur-3xl opacity-30 animate-pulse-soft"></div>
      <div className="absolute bottom-20 -right-40 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-pulse-soft"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-100 rounded-full filter blur-2xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-teal-100 rounded-full filter blur-2xl opacity-20 animate-pulse-slow"></div>

      <div className="container mx-auto max-w-7xl px-4 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 lg:py-0">
          {/* Left Column - Text Content */}
          <div className={cn(
            'space-y-8 transition-all duration-1000 transform',
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          )}>
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-nexora-50 px-3 py-1 text-sm font-medium text-nexora-800 ring-1 ring-inset ring-nexora-700/10">
                Empowering Future Leaders
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Build Your Career with <span className="bg-clip-text text-transparent bg-gradient-to-r from-nexora-500 via-purple-500 to-nexora-700">NEXORA</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              Connect with internships, courses, and journals that shape your future in technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="text-base btn-hover bg-nexora-500 hover:bg-nexora-600 text-white px-8 py-6 group"
                onClick={handleExploreClick}
              >
                Explore Opportunities 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="text-base btn-hover group">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <StatItem icon={<Briefcase />} value="500+" label="Internships" />
              <StatItem icon={<BookOpen />} value="200+" label="Courses" />
              <StatItem icon={<Users />} value="10K+" label="Students" />
            </div>
          </div>

          {/* Right Column - 3D Model */}
          <div className={cn(
            'relative h-[400px] lg:h-[500px] transition-all duration-1000 delay-300 transform',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]">
              <ThreeDModel />
            </div>
            {/* Decorative floating elements */}
            <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-nexora-200 rounded-full opacity-70 animate-float-slow"></div>
            <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-blue-200 rounded-full opacity-70 animate-float-medium"></div>
            <div className="absolute top-1/2 left-1/5 w-8 h-8 bg-purple-200 rounded-full opacity-70 animate-float-fast"></div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="currentColor"
            fillOpacity="0.1"
            d="M0,64L60,64C120,64,240,64,360,53.3C480,43,600,21,720,21.3C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

// Stat Item Component
const StatItem = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="flex flex-col items-center p-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-nexora-200 dark:hover:border-nexora-800 transition-all duration-300">
    <div className="p-2 bg-nexora-50 dark:bg-nexora-900/30 rounded-full text-nexora-600 dark:text-nexora-400">
      {icon}
    </div>
    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

export default Hero;
