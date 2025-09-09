import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInStagger, fadeUp } from "../lib/motion";
import { projects } from "../data/projects";

export function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section border-t border-line bg-fg/[0.02]">
      <div className="container-page">
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-display font-semibold mb-4">
            My Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-mute max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in automation, 
            security tools, and practical applications.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInStagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-bg rounded-2xl border border-line overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-fg/[0.04] to-fg/[0.02] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-mute text-sm">Project Image</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === index ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-accent bg-opacity-90 flex items-center justify-center"
                >
                  <div className="flex space-x-4">
                    {project.href && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-accent p-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-fg mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-mute mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-fg/5 text-fg/70 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
