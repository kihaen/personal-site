import React from 'react';
import { ArrowUp } from 'lucide-react';

interface SocialNetwork {
  name: string;
  url: string;
  className: string;
}

interface FooterProps {
  data?: {
    social: SocialNetwork[];
  };
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-8 relative">
      <div className="container mx-auto px-4">
        {data?.social && (
          <ul className="flex justify-center space-x-6 mb-6">
            {data.social.map((network) => (
              <li key={network.name}>
                <a 
                  href={network.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-accent transition-colors duration-300"
                  aria-label={network.name}
                >
                  <i className={network.className} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-center text-gray-400 text-sm">
          &copy; {currentYear} Made by Kihaen Baik
        </p>

        <a 
          href="#home"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-accent p-3 rounded-full hover:bg-opacity-90 transition"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;