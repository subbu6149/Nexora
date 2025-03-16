
import { ArrowRight, Users, GraduationCap, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left column with stats */}
          <div className="w-full lg:w-2/5">
            <div className="grid grid-cols-2 gap-8">
              <StatCard 
                icon={<Users className="h-8 w-8 text-nexora-500" />}
                number="10,000+"
                label="Students Helped"
              />
              <StatCard 
                icon={<GraduationCap className="h-8 w-8 text-nexora-500" />}
                number="500+"
                label="Internship Placements"
              />
              <StatCard 
                icon={<BookOpen className="h-8 w-8 text-nexora-500" />}
                number="200+"
                label="Courses Available"
              />
              <StatCard 
                icon={<Award className="h-8 w-8 text-nexora-500" />}
                number="50+"
                label="Partner Companies"
              />
            </div>
          </div>

          {/* Right column with about text */}
          <div className="w-full lg:w-3/5">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-nexora-500 to-nexora-700">
                  Bridging the Gap Between Education and Industry
                </span>
              </h2>
              
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                At NEXORA, we believe in the transformative power of practical experience 
                and industry-relevant education. Our mission is to empower students with the 
                skills, opportunities, and resources needed to thrive in today's competitive job market.
              </p>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                Founded in 2024, we've built a vibrant community of learners, educators, and industry partners
                all working together to create meaningful pathways for student success.
                Through our curated internships, expertly designed courses, and peer-reviewed journals,
                we're closing the gap between academic learning and professional application.
              </p>

              <div className="pt-4">
                <Button className="group bg-nexora-500 hover:bg-nexora-600 text-white">
                  Learn more about our story
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 border border-slate-100 dark:border-slate-700">
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{number}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
};

export default About;
