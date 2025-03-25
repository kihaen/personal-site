import React from 'react';

interface Skill {
  name: string;
  level: string;
  description?: string;
  source?: string;
}

interface Education {
  school: string;
  degree: string;
  graduated: string;
  description: string;
}

interface WorkExperience {
  company: string;
  title: string;
  years: string;
  description: string;
}

interface ResumeData {
  skillmessage: string;
  skills: Skill[];
  education: Education[];
  work: WorkExperience[];
}

interface ResumeProps {
  data?: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  if (!data) {
    return <section id="resume" className="py-20 bg-gray-50">Loading resume data...</section>;
  }

  const { skillmessage, skills, education, work } = data;

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 space-y-16">
        {/* Education Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <h1 className="text-2xl font-bold text-secondary">
              Education
            </h1>
          </div>
          
          <div className="md:w-3/4 space-y-8">
            {education.map((edu) => (
              <div key={edu.school} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-secondary">{edu.school}</h3>
                <p className="text-gray-600 mb-2">
                  {edu.degree} • <em>{edu.graduated}</em>
                </p>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Work Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <h1 className="text-2xl font-bold text-secondary">
              Work
            </h1>
          </div>
          
          <div className="md:w-3/4 space-y-8">
            {work.map((job) => (
              <div key={`${job.company}-${job.title}`} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-secondary">{job.company}</h3>
                <p className="text-gray-600 mb-2">
                  {job.title} • <em>{job.years}</em>
                </p>
                <p className="text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <h1 className="text-2xl font-bold text-secondary">
              Skills
            </h1>
          </div>
          
          <div className="md:w-3/4">
            <p className="text-gray-700 mb-8">{skillmessage}</p>
            
            {/* Skill Bars */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4 text-secondary">Proficiency</h3>
              <ul className="flex gap-4 flex-row justify-start flex-wrap">
                {skills.map((skill) => {
                  return (
                  <li key={skill.name}>
                    <div className="sm:flex-col ">
                      <span className="font-medium whitespace-nowrap">{skill.name}</span>
                    </div>
                  </li>
                )})}
              </ul>
            </div>
          </div>
        </div>
          {/* Tech Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div >
              {/* Skill Cards */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary">Technicals</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skills.map((tech) => {
                    const techImage = new URL(`../assets/tech/${tech.source}`, import.meta.url).href
                    return (
                    <div key={tech.name} className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center space-x-3">
                      {tech.source && (
                        <img 
                          src={techImage} 
                          alt={tech.name}
                          className="w-20 h-20 object-contain my-10"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <h4 className="font-medium">{tech.name}</h4>
                        {tech.description && (
                          <p className="text-sm text-gray-600">{tech.description}</p>
                        )}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Resume;