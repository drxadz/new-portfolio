import { motion } from 'framer-motion';
import { fadeUp, fadeInStagger, chipHover, useReducedMotionGuard } from '../lib/motion';
import { skills } from '../data/skills';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { SectionHeader } from './ui/SectionHeader';

interface SkillChipProps {
  skill: string;
  index: number;
  isReducedMotion: boolean;
}

function SkillChip({ skill, index, isReducedMotion }: SkillChipProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05 }}
      whileHover={isReducedMotion ? {} : chipHover.whileHover}
      whileTap={chipHover.whileTap}
      className="
        inline-block px-3 py-2 md:px-4 rounded-xl border border-line 
        bg-bg/50 hover:bg-accent/10 hover:border-accent/30 
        text-mobile-small md:text-sm font-medium text-fg hover:text-accent
        transition-all duration-300 cursor-default
        will-change-transform mobile-tap-target
      "
    >
      {skill}
    </motion.div>
  );
}

interface SkillGroupProps {
  title: string;
  skills: string[];
  isReducedMotion: boolean;
  delay?: number;
}

function SkillGroup({ title, skills, isReducedMotion, delay = 0 }: SkillGroupProps) {
  return (
    <motion.div
      variants={fadeInStagger(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      className="space-y-4 md:space-y-6"
    >
      <motion.h3 
        variants={fadeUp}
        className="text-mobile-headline md:text-xl font-semibold text-fg mb-3 md:mb-4"
      >
        {title}
      </motion.h3>
      
      <motion.div 
        variants={fadeInStagger(0.03)}
        className="flex flex-wrap gap-2 md:gap-3"
      >
        {skills.map((skill, index) => (
          <SkillChip
            key={skill}
            skill={skill}
            index={index}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const { isReducedMotion } = useReducedMotionGuard();

  return (
    <Section id="skills" background="subtle">
      <Container>
        <SectionHeader
          eyebrow="Technical Expertise"
          title="Skills & Technologies"
          description="Comprehensive security skills across multiple domains, from web application testing to cloud security and red teaming."
          showUnderline
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <SkillGroup
            title="Core Competencies"
            skills={skills.core}
            isReducedMotion={isReducedMotion}
            delay={0}
          />
          
          <SkillGroup
            title="Tools & Technologies"
            skills={skills.tools}
            isReducedMotion={isReducedMotion}
            delay={0.1}
          />
        </div>

        {/* Additional Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Continuously learning and adapting to new security challenges
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
