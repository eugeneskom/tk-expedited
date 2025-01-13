import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "George Turner",
    role: "Transport Supervisor",
    comment: "It has been our pleasure to work with Princeton Transport LLC for the last 6 years. They have repeatedly shown their commitment to our broker/carrier partnership with fair and competitive rates and a willingness to adapt to changes that normally take place in the trucking industry.",
    rating: 5
  },
  {
    name: "Daniel Palmer",
    role: "Businessman",
    comment: "Princeton Transport LLC has always been very fair and professional in working with customers and sales agents. The customer service personnel have been diligent in selection of carriers to provide savings and service to our clients.",
    rating: 5
  },
  {
    name: "Lily Milton",
    role: "Freight Manager",
    comment: "Over our longstanding relationship with Princeton Transport LLC, their commitment to excellence and outstanding customer service has helped our business run smooth. Their reliable service and extensive network help us maintain solid relationships with our own client-base.",
    rating: 5
  },
  {
    name: "Kathi C. Laughman",
    role: "Director – Business System & Solutions",
    comment: "We value the partnership we have developed over the past 6 years. We have given them many challenges to meet and without faltering they have risen to the occasion every time. Our customers rank our information delivery as one of our leading strengths.",
    rating: 5
  },
  {
    name: "Ujala Manandhar",
    role: "Regular Customer",
    comment: "I'm impressed with their efficiency. The package arrived on time, and their tracking system kept me well-informed throughout the process. The customer service was responsive and very helpful.",
    rating: 5
  }
];

const TestimonialCard: React.FC<Testimonial> = ({ name, role, comment, rating }) => (
  <div className="bg-[#1B3160] p-8 rounded-xl border border-white/10 h-full flex flex-col">
    <div className="mb-4">
      <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-300 mb-4" />
      <p className="text-gray-300 mb-6">{comment}</p>
      <div className="flex mb-4">
        {[...Array(rating)].map((_, index) => (
          <StarIcon key={index} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
    </div>
    <div className="mt-auto">
      <h4 className="text-white font-semibold">{name}</h4>
      <p className="text-gray-400">{role}</p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#1B3160] to-[#0F1E3C] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-300 font-semibold text-lg mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from some of our satisfied clients 
            about their experiences with our transportation services.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials; 