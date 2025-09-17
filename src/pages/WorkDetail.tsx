import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { fadeUp, fadeInStagger } from '../lib/motion';
import worksData from '../data/works.json';

interface WorkItem {
  id: string;
  title: string;
  type: 'case-study' | 'writeup' | 'notes' | 'lab' | 'tool';
  topics: string[];
  category: string;
  tags: string[];
  date: string;
  summary: string;
  contentLink: string;
  thumbnail?: string | null;
  readingTime?: string;
}

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const work = useMemo(() => {
    const list = worksData as unknown as WorkItem[];
    return list.find(w => w.id === id) || null;
  }, [id]);

  if (!work) {
    return (
      <Section id="work-not-found">
        <Container>
          <div className="text-center py-24">
            <h1 className="text-2xl font-semibold">Work not found</h1>
            <p className="text-mute mt-2">This item may have been moved or removed.</p>
            <button onClick={() => navigate('/works')} className="mt-6 px-4 py-2 rounded-xl border border-line hover:bg-fg/5">
              Back to Works
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="work-detail">
      <Container>
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.button variants={fadeUp} onClick={() => navigate(-1)} className="mb-6 px-3 py-2 rounded-xl border border-line hover:bg-fg/5">
            ← Back
          </motion.button>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">{work.title}</motion.h1>
          <motion.div variants={fadeUp} className="mt-2 text-sm text-mute flex flex-wrap gap-3">
            <span className="px-2 py-1 rounded-full border border-line">{work.category}</span>
            <span>{new Date(work.date).toLocaleDateString()}</span>
            {work.readingTime && <span>{work.readingTime}</span>}
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-fg/80 max-w-3xl">{work.summary}</motion.p>
          {work.tags?.length ? (
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {work.tags.map(t => (
                <span key={t} className="px-2 py-1 text-xs rounded-full border border-line">#{t}</span>
              ))}
            </motion.div>
          ) : null}
          <motion.div variants={fadeUp} className="mt-8">
            <a href={work.contentLink} target={work.contentLink.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="px-4 py-2 rounded-xl border border-line hover:bg-fg/5">
              View original
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}


