import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';

interface SocialNetwork {
  name: string;
  url: string;
  className: string;
}

interface MainData {
  name: string;
  occupation: string;
  description: string;
  image: string;
  bio: string;
  contactmessage: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  resumedownload: string;
  social: SocialNetwork[];
}

interface ResumeData {
  skillmessage: string;
  education: {
    school: string;
    degree: string;
    graduated: string;
    description: string;
  }[];
  work: {
    company: string;
    title: string;
    years: string;
    description: string;
  }[];
  skills: {
    name: string;
    level: string;
    description?: string;
    source?: string;
  }[];
}

interface PortfolioData {
  projects: {
    title: string;
    category: string;
    image: string;
    url: string;
  }[];
}

interface TestimonialData {
  testimonials: {
    text: string;
    user: string;
  }[];
}

interface ResumeDataResponse {
  main: MainData;
  resume: ResumeData;
  portfolio: PortfolioData;
  testimonials: TestimonialData;
}

const App = () => {
  const [resumeData, setResumeData] = useState<ResumeDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getResumeData = async () => {
    try {
      const response = await fetch('https://rgz0cmfy41.execute-api.us-east-1.amazonaws.com/Test');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ResumeDataResponse = await response.json();
      setResumeData(data);
    } catch (err) {
      console.error('Error fetching resume data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResumeData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="p-6 max-w-md bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={getResumeData}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="p-6 max-w-md bg-white rounded-lg shadow-md">
          <p className="text-gray-700">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Header data={resumeData.main} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <About data={resumeData.main} />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Contact data={resumeData.main} />
      </main>
      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;