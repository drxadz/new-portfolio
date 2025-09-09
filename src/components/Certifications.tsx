import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeInStagger } from '../lib/motion';
import { certifications, certificationCategories, type Certification } from '../data/certifications';
import { CertificationCard } from './CertificationCard';

interface CertificationsProps {
  title?: string;
  subtitle?: string;
  items?: Certification[];
}

export function Certifications({ 
  title = "Certifications",
  subtitle = "Selected credentials & badges",
  items = certifications
}: CertificationsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const isReducedMotion = useReducedMotion();

  const filteredCertifications = activeFilter === 'all' 
    ? items 
    : items.filter(cert => cert.category?.toLowerCase() === activeFilter);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <section id="certifications" className="section border-t border-line bg-fg/[0.02]">
      <div className="container-page">
        {/* Header */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold mb-4">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-mute max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {certificationCategories.map((category) => (
            <motion.button
              key={category.id}
              variants={fadeUp}
              whileHover={isReducedMotion ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange(category.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${activeFilter === category.id
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-bg border border-line text-mute hover:border-accent hover:text-accent'
                }
              `}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={fadeInStagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCertifications.map((certification, index) => (
            <CertificationCard
              key={`${certification.title}-${index}`}
              certification={certification}
              index={index}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-fg/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">No certifications found</h3>
            <p className="text-mute">Try selecting a different category filter.</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 pt-8 border-t border-line"
        >
          <motion.div variants={fadeUp} className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-fg mb-2">Certification Overview</h3>
            <p className="text-mute">Professional credentials across multiple security domains</p>
          </motion.div>

          <motion.div
            variants={fadeInStagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Total Certifications', value: certifications.length },
              { label: 'Offensive Security', value: certifications.filter(c => c.category === 'Offensive').length },
              { label: 'Cloud Security', value: certifications.filter(c => c.category === 'Cloud').length },
              { label: 'AppSec & Network', value: certifications.filter(c => c.category === 'AppSec' || c.category === 'Network').length }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                className="text-center p-4 bg-bg/50 rounded-xl border border-line"
              >
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-mute">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
