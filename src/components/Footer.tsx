import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src="/lovable-uploads/logo.png" alt="Nexora Logo" className="h-10" />
            </div>
            <p className="text-gray-700 max-w-xs">
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
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="#internships">Internships</FooterLink>
              <FooterLink href="#courses">Courses</FooterLink>
              <FooterLink href="#journals">Journals</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-600 shrink-0" />
                <span className="text-gray-700">+91 9032959902</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-600 shrink-0" />
                <span className="text-gray-700">noreply.nexora@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
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
    className="bg-gray-200 hover:bg-gray-400 p-2 rounded-full transition-colors duration-300 text-gray-800"
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
      className={`text-gray-700 hover:text-gray-900 transition-colors duration-300 ${
        small ? "text-sm" : ""
      }`}
    >
      {children}
    </a>
  </li>
);

export default Footer;
