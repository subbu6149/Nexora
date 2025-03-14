
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nexora-400 to-nexora-600">
              NEXORA
            </h3>
            <p className="text-slate-300 max-w-xs">
              Bridging the gap between students and opportunities through 
              quality internships, courses, and publications.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="#internships">Internships</FooterLink>
              <FooterLink href="#courses">Courses</FooterLink>
              <FooterLink href="#journals">Journals</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-nexora-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">123 Innovation Street, Tech City, TC 10000</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-nexora-400 shrink-0" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-nexora-400 shrink-0" />
                <span className="text-slate-300">contact@nexora.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter for the latest opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-nexora-400 text-slate-300"
              />
              <Button 
                className="bg-nexora-500 hover:bg-nexora-600 text-white"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} NEXORA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <FooterLink href="#terms" small>Terms of Service</FooterLink>
              <FooterLink href="#privacy" small>Privacy Policy</FooterLink>
              <FooterLink href="#cookies" small>Cookie Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components
const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    className="bg-slate-800 hover:bg-nexora-500 p-2 rounded-full transition-colors duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ 
  href, 
  children,
  small = false 
}: { 
  href: string; 
  children: React.ReactNode;
  small?: boolean;
}) => (
  <li className={small ? "inline" : ""}>
    <a
      href={href}
      className={`text-slate-300 hover:text-nexora-400 transition-colors duration-300 ${
        small ? "text-sm" : ""
      }`}
    >
      {children}
    </a>
  </li>
);

export default Footer;
