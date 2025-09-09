import { motion } from "framer-motion";
import { fadeInStagger, fadeUp } from "../lib/motion";
import { services } from "../data/services";

export function Services() {
  const serviceIcons = [
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ];

  return (
    <section id="services" className="section border-t border-line">
      <div className="container-page">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold mb-4">
            Services I Offer
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-mute max-w-2xl mx-auto">
            I provide comprehensive security solutions to help your business stay protected 
            in the digital landscape. From assessment to remediation, I'm here to help.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInStagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-bg rounded-2xl border border-line p-6 group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300"
              >
                {serviceIcons[index]}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-fg mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-mute leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <motion.div
            variants={fadeUp}
            className="bg-gradient-to-r from-accent to-orange-600 rounded-2xl p-8 md:p-12 text-white"
          >
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to Secure Your Systems?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how I can help protect your organization with comprehensive security assessments.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
