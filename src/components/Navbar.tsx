
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInternshipClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const internshipSection = document.getElementById('internships');
    if (internshipSection) {
      internshipSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResourceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon!",
      description: "This feature will be available soon. Please check back later.",
      duration: 3000,
    });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 py-3 shadow-md'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/3ec7ea42-ce87-4c53-9009-cb5367fa5d5d.png" alt="Nexora Logo" className="h-10" />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#internships" onClick={handleInternshipClick}>Internships</NavLink>
          <NavLink href="#contact" onClick={handleContactClick}>Courses</NavLink>
          <NavLink href="#contact" onClick={handleContactClick}>Journals</NavLink>
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-nexora-500 dark:text-gray-300 dark:hover:text-white transition-colors">
              Resources <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <DropdownLink href="#" onClick={handleResourceClick}>Blog</DropdownLink>
              <DropdownLink href="#" onClick={handleResourceClick}>Research Papers</DropdownLink>
              <DropdownLink href="#" onClick={handleResourceClick}>Webinars</DropdownLink>
            </div>
          </div>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact" onClick={handleContactClick}>Contact Us</NavLink>
        </nav>

        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg glass-card animate-slide-up">
          <div className="py-4 px-6 space-y-4">
            <MobileNavLink href="#internships" onClick={(e) => {
              setIsMenuOpen(false);
              handleInternshipClick(e);
            }}>
              Internships
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={(e) => {
              setIsMenuOpen(false);
              handleContactClick(e);
            }}>
              Courses
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={(e) => {
              setIsMenuOpen(false);
              handleContactClick(e);
            }}>
              Journals
            </MobileNavLink>
            <MobileNavLink href="#" onClick={(e) => {
              setIsMenuOpen(false);
              handleResourceClick(e);
            }}>
              Resources
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={(e) => {
              setIsMenuOpen(false);
              handleContactClick(e);
            }}>
              Contact Us
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) => (
  <a
    href={href}
    className="font-medium text-gray-700 dark:text-gray-300 hover:text-nexora-500 dark:hover:text-nexora-400 link-underline"
    onClick={onClick}
  >
    {children}
  </a>
);

const DropdownLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) => (
  <a
    href={href}
    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-nexora-500"
    onClick={onClick}
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-nexora-500 dark:hover:text-nexora-400"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
