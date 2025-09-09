import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInStagger, fadeUp } from '../lib/motion';
import { profile } from '../data/profile';
import { contact } from '../data/contact';
import profileImage from '../assets/images/profile.jpeg';
import githubLogo from '../assets/images/github-logo.svg';
import htbLogo from '../assets/images/htb-logo.jpeg';
import tryhackmeLogo from '../assets/images/tryhackme-logo.svg';
import credlyLogo from '../assets/images/credly-logo.svg';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: contact.email,
      link: `mailto:${contact.email}`
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      value: contact.phone,
      link: `tel:${contact.phone.replace(/\s/g, '')}`
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      value: profile.location,
      link: '#'
    }
  ];

  const socialLinks = profile.socials;

  return (
    <section id="contact" className="section border-t border-line">
      <div className="container-page">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold mb-4">
            {contact.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-mute max-w-2xl mx-auto">
            {contact.note}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            variants={fadeInStagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={fadeUp}
              className="bg-fg/[0.02] rounded-2xl border border-line p-8"
            >
              <h3 className="text-2xl font-semibold text-fg mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={fadeUp}>
                  <label htmlFor="name" className="block text-sm font-medium text-fg mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 bg-bg"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label htmlFor="email" className="block text-sm font-medium text-fg mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 bg-bg"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label htmlFor="message" className="block text-sm font-medium text-fg mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-line rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none bg-bg"
                    placeholder="Tell me about your security needs..."
                  />
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(255, 106, 0, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl"
                  >
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={fadeInStagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent">
                  <img
                    src={profileImage}
                    alt={`${profile.name} - ${profile.role}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-fg">Let's connect</h3>
                  <p className="text-accent font-medium">{profile.name}</p>
                </div>
              </div>
              <p className="text-lg text-mute leading-relaxed">
                I'm always excited to work on new security challenges and collaborate with amazing people. 
                Whether you have a specific security assessment in mind or just want to chat about cybersecurity, 
                I'd love to hear from you.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeUp} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-fg/[0.02] rounded-xl hover:bg-accent hover:text-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-white group-hover:text-accent transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-fg group-hover:text-white transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-mute group-hover:text-white transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp}>
              <h4 className="text-lg font-semibold text-fg mb-4">Follow me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-fg/5 rounded-xl flex items-center justify-center text-mute hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    {social.label === 'GitHub' && (
                      <img src={githubLogo} alt="GitHub" className="w-6 h-6" />
                    )}
                    {social.label === 'Hack The Box' && (
                      <img src={htbLogo} alt="Hack The Box" className="w-6 h-6" />
                    )}
                    {social.label === 'TryHackMe' && (
                      <img src={tryhackmeLogo} alt="TryHackMe" className="w-6 h-6" />
                    )}
                    {social.label === 'Credly' && (
                      <img src={credlyLogo} alt="Credly" className="w-6 h-6" />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
