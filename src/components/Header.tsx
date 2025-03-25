import { ArrowDownCircle } from 'lucide-react';
import headerBackground from "../assets/header-background.webp"

interface SocialNetwork {
  name: string;
  url: string;
  className: string;
}

interface Address {
  city: string;
}

interface HeaderData {
  name: string;
  occupation: string;
  description: string;
  address: Address;
  social: SocialNetwork[];
}

interface HeaderProps {
  data?: HeaderData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  if (!data) {
    return <header className="bg-secondary text-white">Loading header...</header>;
  }

  const { name, occupation, description, address: { city }, social } = data;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Works' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      id="home" 
      className="relative bg-secondary text-white min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary bg-opacity-90 py-4">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  className="hover:text-accent transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
          I'm {name}.
        </h1>
        <h3 className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          I'm a {city} based <span className="text-accent">{occupation}</span>. {description}.
        </h3>
        <hr className="w-16 border-t-2 border-accent mx-auto mb-8" />
        <ul className="flex justify-center space-x-6 mb-12">
          {social.map((network) => (
            <li key={network.name}>
              <a 
                href={network.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-accent transition-colors duration-300"
                aria-label={network.name}
              >
                <i className={network.className} aria-hidden="true"></i>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a 
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ArrowDownCircle className="w-10 h-10 text-accent" />
      </a>
    </header>
  );
};

export default Header;