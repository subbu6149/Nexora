
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nexora-500 to-nexora-700">
            NEXORA
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#internships">Internships</NavLink>
          <NavLink href="#courses">Courses</NavLink>
          <NavLink href="#journals">Journals</NavLink>
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-nexora-500 dark:text-gray-300 dark:hover:text-white transition-colors">
              Resources <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <DropdownLink href="#">Blog</DropdownLink>
              <DropdownLink href="#">Research Papers</DropdownLink>
              <DropdownLink href="#">Webinars</DropdownLink>
            </div>
          </div>
          <NavLink href="#about">About</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="font-medium">
            Log in
          </Button>
          <Button className="bg-nexora-500 hover:bg-nexora-600 text-white">
            Sign up
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg glass-card animate-slide-up">
          <div className="py-4 px-6 space-y-4">
            <MobileNavLink href="#internships" onClick={() => setIsMenuOpen(false)}>
              Internships
            </MobileNavLink>
            <MobileNavLink href="#courses" onClick={() => setIsMenuOpen(false)}>
              Courses
            </MobileNavLink>
            <MobileNavLink href="#journals" onClick={() => setIsMenuOpen(false)}>
              Journals
            </MobileNavLink>
            <MobileNavLink href="#resources" onClick={() => setIsMenuOpen(false)}>
              Resources
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full justify-center bg-nexora-500 hover:bg-nexora-600">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Sub-components
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="font-medium text-gray-700 dark:text-gray-300 hover:text-nexora-500 dark:hover:text-nexora-400 link-underline"
  >
    {children}
  </a>
);

const DropdownLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-nexora-500"
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
  onClick: () => void;
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
