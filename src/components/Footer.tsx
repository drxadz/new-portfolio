import { motion } from 'framer-motion';
import { fadeInStagger, fadeUp } from '../lib/motion';
import { profile } from '../data/profile';
import githubLogo from '../assets/images/github-logo.svg';
import htbLogo from '../assets/images/htb-logo.jpeg';
import tryhackmeLogo from '../assets/images/tryhackme-logo.svg';
import credlyLogo from '../assets/images/credly-logo.svg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = profile.socials;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-fg text-white border-t border-line">
      <div className="container-page py-16">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold mb-4"
            >
              {profile.name}
            </motion.div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {profile.summary}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.label === 'GitHub' && (
                    <img src={githubLogo} alt="GitHub" className="w-5 h-5" />
                  )}
                  {social.label === 'Hack The Box' && (
                    <img src={htbLogo} alt="Hack The Box" className="w-5 h-5" />
                  )}
                  {social.label === 'TryHackMe' && (
                    <img src={tryhackmeLogo} alt="TryHackMe" className="w-5 h-5" />
                  )}
                  {social.label === 'Credly' && (
                    <img src={credlyLogo} alt="Credly" className="w-5 h-5" />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-accent transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">{profile.location}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-gray-400 hover:text-accent transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-gray-400 hover:text-accent transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
