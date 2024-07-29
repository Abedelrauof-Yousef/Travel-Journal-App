import React from 'react';
import './Testimonials.css';
import customer1 from '../../assets/customer1.jpg';
import customer2 from '../../assets/customer2.png';
import customer3 from '../../assets/customer3.png';



const testimonialsData = [
  {
    image: customer1,
    title: 'Beautiful editor',
    content: 'A lovely way to share my travel stories with those who stay at home.',
    author: 'Claudia van Dongen',
  },
  {
    image: customer2,
    title: 'Easy to use',
    content: 'The application is very accessible to anyone.',
    author: 'Dick Zuilekom',
  },
  {
    image: customer3,
    title: 'Just amazing',
    content: 'The combination of text and photos is unique.',
    author: 'Ingrid & family',
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>What our customers say</h2>
      <div className="testimonial-list">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <img src={testimonial.image} alt={testimonial.author} className="testimonial-image" />
            <h3 className="testimonial-title">{testimonial.title}</h3>
            <p className="testimonial-content">{testimonial.content}</p>
            <p className="testimonial-author">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
