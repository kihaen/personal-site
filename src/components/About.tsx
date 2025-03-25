import React from 'react';
import { Download } from 'lucide-react';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AboutData {
  name: string;
  image: string;
  bio: string;
  address: Address;
  phone: string;
  email: string;
  resumedownload: string;
}

interface AboutProps {
  data?: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  if (!data) {
    return <section id="about" className="py-20 bg-gray-50">Loading about data...</section>;
  }

  const { name, image, bio, address: { city, state, zip }, email, resumedownload } = data;
  const profilePic = `images/${image}`;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/4 flex justify-center">
            <img 
              className="rounded-lg shadow-xl w-full max-w-xs" 
              src={profilePic} 
              alt={`${name}'s Profile`}
              loading="lazy"
            />
          </div>
          
          <div className="md:w-3/4">
            <h2 className="text-3xl font-bold mb-6 text-secondary">About Me</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">{bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary">Contact Details</h3>
                <address className="not-italic text-gray-700 space-y-2">
                  <p className="font-medium">{name}</p>
                  <p>{city} {state}, {zip}</p>
                  <p>
                    <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
                      {email}
                    </a>
                  </p>
                </address>
              </div>
              
              <div className="flex items-end">
                <a 
                  href={resumedownload} 
                  className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition"
                  download
                >
                  <Download className="mr-2" size={18} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;