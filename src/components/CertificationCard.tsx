import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';
import { Certification } from '../data/certifications';

interface CertificationCardProps {
  certification: Certification;
  index: number;
  isReducedMotion: boolean;
}

export function CertificationCard({ certification, index, isReducedMotion }: CertificationCardProps) {
  const getInitials = (issuer: string) => {
    return issuer
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Offensive':
        return 'from-red-500 to-red-600';
      case 'Cloud':
        return 'from-blue-500 to-blue-600';
      case 'AppSec':
        return 'from-green-500 to-green-600';
      case 'Network':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-accent to-orange-600';
    }
  };

  return (
    <motion.div
      variants={isReducedMotion ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={isReducedMotion ? {} : { y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group"
    >
      <div className="h-full rounded-xl border border-line bg-bg/95 p-6 hover:border-accent/20 transition-all duration-300">
        {/* Badge/Avatar */}
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(certification.category)} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
            {certification.badgeSrc ? (
              <img 
                src={certification.badgeSrc} 
                alt={`${certification.issuer} badge`}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              getInitials(certification.issuer)
            )}
          </div>
          
          {/* Category Badge */}
          {certification.category && (
            <span className="ml-3 px-2 py-1 bg-fg/5 text-fg/70 text-xs rounded-full font-medium">
              {certification.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-fg group-hover:text-accent transition-colors duration-300 leading-tight">
            {certification.title}
          </h3>
          
          <div className="space-y-1">
            <p className="text-sm text-mute font-medium">
              {certification.issuer}
            </p>
            {certification.issuedOn && (
              <p className="text-xs text-mute">
                Issued {certification.issuedOn}
              </p>
            )}
          </div>

          {/* Action Button */}
          {certification.href && (
            <motion.a
              href={certification.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2 bg-accent text-white rounded-xl px-3 py-2 text-sm font-medium hover:opacity-90 transition-opacity duration-300"
            >
              <span>View Credential</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
