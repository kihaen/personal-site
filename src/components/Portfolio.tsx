import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  url: string;
}

interface PortfolioData {
  projects: Project[];
}

interface PortfolioProps {
  data?: PortfolioData;
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  if (!data?.projects) {
    return <section id="portfolio" className="py-20 bg-white">Loading portfolio...</section>;
  }

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-secondary mb-4">My Works</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects. Click on any project to learn more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => {
            const projectImage = new URL(`../assets/projects/${project.image}`, import.meta.url).href
            console.log(projectImage, project.image)
            return (
              <div key={project.title} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={projectImage}
                  alt={project.title}
                  className="w-full h-100 object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.category}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent hover:text-white transition-colors"
                    >
                      View Project <ExternalLink className="ml-1" size={16} />
                    </a>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                  <h4 className="font-semibold text-secondary">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;