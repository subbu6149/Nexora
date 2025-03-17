
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { BookOpen, Clock, BarChart, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Advanced Web Development',
    description: 'Master modern web technologies including React, Node.js, and responsive design patterns.',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 3245,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    description: 'Learn statistical methods, data visualization, and machine learning algorithms.',
    duration: '10 weeks',
    level: 'Beginner',
    rating: 4.7,
    students: 5120,
    thumbnail: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Create intuitive user interfaces and seamless experiences with proven design methodologies.',
    duration: '6 weeks',
    level: 'All levels',
    rating: 4.9,
    students: 2786,
    thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2021&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Artificial Intelligence Ethics',
    description: 'Explore the ethical implications and challenges in AI development and implementation.',
    duration: '4 weeks',
    level: 'Advanced',
    rating: 4.6,
    students: 1895,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2018&auto=format&fit=crop'
  }
];

const Courses = () => {
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

    // Observe each course card
    courses.forEach((course) => {
      const element = document.getElementById(`course-${course.id}`);
      if (element) observer.observe(element);
    });

    return () => {
      courses.forEach((course) => {
        const element = document.getElementById(`course-${course.id}`);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="courses" className="section-padding bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-nexora-50/50 dark:bg-nexora-900/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center rounded-full bg-nexora-50 px-3 py-1 text-sm font-medium text-nexora-800 ring-1 ring-inset ring-nexora-700/10">
              <BookOpen className="mr-1 h-4 w-4" /> Educational Programs
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Expand Your Knowledge with Our Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Industry-relevant courses designed by experts to help you master key skills and stay ahead in your field.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              id={`course-${course.id}`}
              key={course.id}
              className={cn(
                'transition-all duration-700 transform',
                visibleItems.includes(course.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              )}
              style={{ transitionDelay: `${course.id * 100}ms` }}
            >
              <AnimatedCard className="h-full">
                <div className="h-[160px] overflow-hidden relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center text-white">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{course.rating} ({course.students.toLocaleString()})</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-xs">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span className="text-xs">{course.level}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full text-sm group btn-hover">
                    View Course 
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-nexora-500 hover:bg-nexora-600 text-white">
            Browse All Courses <BookOpen className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
