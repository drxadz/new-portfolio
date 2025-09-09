import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInStagger, fadeUp } from '../lib/motion';
import profileImage from '../assets/images/profile.jpeg';
import githubLogo from '../assets/images/github-logo.svg';
import htbLogo from '../assets/images/htb-logo.jpeg';
import tryhackmeLogo from '../assets/images/tryhackme-logo.svg';
import credlyLogo from '../assets/images/credly-logo.svg';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      content: 'Working with this security engineer was an absolute pleasure. They delivered our security assessment ahead of schedule and exceeded all our expectations. The attention to detail and technical expertise is unmatched.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateCorp',
      content: 'The security assessment they conducted for us has been a game-changer. Our security posture improved significantly and we now have a clear roadmap for improvements. Highly recommend their services.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'DesignStudio',
      content: 'From concept to implementation, the entire security process was smooth and professional. They understood our security needs perfectly and brought our systems to a new level of protection. Truly exceptional work.',
      rating: 5
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'CTO',
      company: 'DataFlow Systems',
      content: 'The security architecture they designed for our data processing platform is robust and scalable. We\'ve handled security challenges that we never thought possible. Outstanding technical skills.',
      rating: 5
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Marketing Director',
      company: 'GrowthCo',
      content: 'The security improvements they delivered transformed our online security. Our vulnerability count decreased by 90% and our security score improved significantly. The ROI has been incredible.',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonialVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <section id="testimonials" className="section border-t border-line bg-fg/[0.02]">
      <div className="container-page">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold mb-4">
            What Clients Say
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-mute max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about 
            working with me and the results we've achieved together.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-bg rounded-2xl border border-line p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>

                {/* Quote */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl text-fg leading-relaxed mb-8 italic"
                >
                  "{testimonials[currentTestimonial].content}"
                </motion.blockquote>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                    <img
                      src={profileImage}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-fg text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-accent font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-mute text-sm">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg rounded-full border border-line flex items-center justify-center text-mute hover:text-accent transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg rounded-full border border-line flex items-center justify-center text-mute hover:text-accent transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-accent w-8'
                    : 'bg-line hover:bg-mute'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={fadeInStagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Support Available' },
            { number: '3+', label: 'Years Experience' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-4xl md:text-5xl font-bold text-accent mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-mute font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
