
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Internships from '../components/Internships';
import Courses from '../components/Courses';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <Internships />
      <Courses />
      <Footer />
    </div>
  );
};

export default Index;
