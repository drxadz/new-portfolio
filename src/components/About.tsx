import { motion } from "framer-motion";
import { fadeUp, fadeInStagger } from "../lib/motion";
import { about } from "../data/about";
import { skills } from "../data/skills";
import { profile } from "../data/profile";
import profileImage from "../assets/images/profile.jpeg";

export function About() {
  return (
    <section id="about" className="section border-t border-line">
      <div className="container-page grid gap-grid md:grid-cols-12 items-start">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-5"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold">
            {about.title}
          </motion.h2>
          
          {/* Profile Image */}
          <motion.div
            variants={fadeUp}
            className="mt-6 mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-32 h-32 rounded-2xl border border-line overflow-hidden shadow-lg"
            >
              <img
                src={profileImage}
                alt={`${profile.name} - ${profile.role}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="space-y-4 text-fg/80">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-7"
        >
          <div className="space-y-6">
            {/* Highlights */}
            <div className="grid gap-3">
              {about.highlights.map((h) => (
                <div
                  key={h}
                  className="rounded-xl border border-line p-4 hover:-translate-y-1 hover:shadow-soft transition"
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Core Skills */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Core Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.core.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex items-center text-fg/80"
                  >
                    <svg className="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, index) => (
                  <span
                    key={tool}
                    className="bg-fg/5 text-fg/70 px-3 py-1 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
