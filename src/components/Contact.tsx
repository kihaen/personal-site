import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Address {
  city: string;
  state: string;
  zip: string;
}

interface ContactData {
  name: string;
  email: string;
  phone: string;
  address: Address;
  contactmessage: string;
}

interface ContactProps {
  data?: ContactData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!data) {
    return <section id="contact" className="py-20 bg-white">Loading contact information...</section>;
  }

  const { contactmessage, address: { city, state, zip }, phone } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmissionState('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmissionState('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionState('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-secondary mb-6">Get In Touch</h1>
            <p className="text-gray-700 mb-8">{contactmessage}</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-secondary">Current Residence</h3>
              <address className="not-italic space-y-2">
                <p className="text-gray-700">{city}, {state} {zip}</p>
                <p className="text-gray-700">
                  <a href={`tel:${phone}`} className="hover:text-accent transition-colors">
                    {phone}
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={submissionState === 'submitting'}
                className="flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition disabled:bg-opacity-50"
              >
                {submissionState === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Send Message
                  </>
                )}
              </button>
              
              {submissionState === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                  Your message has been sent successfully!
                </div>
              )}
              
              {submissionState === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;