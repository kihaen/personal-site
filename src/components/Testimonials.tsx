import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  user: string;
}

interface TestimonialsData {
  testimonials: Testimonial[];
}

interface TestimonialsProps {
  data?: TestimonialsData;
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  if (!data?.testimonials) {
    return <section id="testimonials" className="py-20 bg-gray-50">Loading testimonials...</section>;
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-secondary mb-4">Client Testimonials</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's what people I've worked with have to say about me.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial) => (
            <div key={`${testimonial.user}-${testimonial.text.substring(0, 20)}`} 
              className="bg-white p-8 rounded-lg shadow-sm relative"
            >
              <Quote className="text-gray-200 absolute top-4 right-4" size={24} />
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <cite className="not-italic font-semibold text-secondary">
                — {testimonial.user}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;