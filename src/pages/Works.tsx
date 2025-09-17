import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { fadeInStagger, fadeUp, useReducedMotionGuard } from '../lib/motion';
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
  popularity?: number;
}

const CATEGORY_PRESETS = [
  'Red Team Assessment',
  'HTB Writes',
  'OSCP Notes',
  'More'
];

const TYPE_OPTIONS: Array<WorkItem['type']> = ['case-study', 'writeup', 'notes', 'lab'];

export default function Works() {
  const { isReducedMotion } = useReducedMotionGuard();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<Array<WorkItem['type']>>([]);
  const [sort, setSort] = useState<'newest' | 'oldest' | 'popular'>('newest');

  const allWorks: WorkItem[] = worksData as unknown as WorkItem[];

  const allTags = useMemo(() => {
    const set = new Set<string>();
    allWorks.forEach(w => w.tags?.forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allWorks]);

  const fuse = useMemo(() => {
    return new Fuse(allWorks, {
      includeMatches: true,
      threshold: 0.35,
      ignoreLocation: true,
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'summary', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
        { name: 'topics', weight: 0.1 },
      ],
    });
  }, [allWorks]);

  const filtered = useMemo(() => {
    let base: WorkItem[] = search ? fuse.search(search).map(r => r.item) : allWorks.slice();

    if (activeCategory) base = base.filter(w => w.category === activeCategory);
    if (activeTags.length) base = base.filter(w => activeTags.every(t => w.tags?.includes(t)));
    if (activeTypes.length) base = base.filter(w => activeTypes.includes(w.type));

    base.sort((a, b) => {
      if (sort === 'popular') return (b.popularity || 0) - (a.popularity || 0);
      if (sort === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return base;
  }, [allWorks, fuse, search, activeCategory, activeTags, activeTypes, sort]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const toggleType = (type: WorkItem['type']) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  return (
    <Section id="works" background="default">
      <Container>
        {/* Hero + Search */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-10 text-center"
        >
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Works
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-mute max-w-2xl mx-auto">
            Case studies, writeups, notes, labs — searchable and filterable.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 max-w-2xl mx-auto">
            <label htmlFor="works-search" className="sr-only">Search works</label>
            <input
              id="works-search"
              type="search"
              placeholder="Search works, tags, tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-line bg-bg text-fg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInStagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8 space-y-6"
          aria-label="Filters"
        >
          {/* Categories */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center">
            {CATEGORY_PRESETS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-2 rounded-xl border text-sm ${activeCategory === cat ? 'bg-fg text-white border-fg' : 'border-line hover:bg-fg/5'}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => { setActiveCategory(null); setActiveTags([]); setActiveTypes([]); setSort('newest'); }}
              className="px-3 py-2 rounded-xl border border-line text-sm hover:bg-fg/5"
            >
              Clear
            </button>
          </motion.div>

          {/* Types */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            {TYPE_OPTIONS.map(t => (
              <label key={t} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeTypes.includes(t)}
                  onChange={() => toggleType(t)}
                />
                <span className="capitalize">{t.replace('-', ' ')}</span>
              </label>
            ))}
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full border text-xs ${activeTags.includes(tag) ? 'bg-fg text-white border-fg' : 'border-line hover:bg-fg/5'}`}
                aria-pressed={activeTags.includes(tag)}
              >
                #{tag}
              </button>
            ))}
          </motion.div>

          {/* Sort */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
            <label htmlFor="sort" className="text-sm">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-line bg-bg text-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
            </select>
          </motion.div>
        </motion.div>

        {/* Results */}
        <motion.div
          variants={fadeInStagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="region"
          aria-live="polite"
        >
          {filtered.map((w) => (
            <motion.a
              key={w.id}
              variants={fadeUp}
              href={w.contentLink.startsWith('http') ? w.contentLink : `/works/${w.id}`}
              target={w.contentLink.startsWith('http') ? '_blank' : undefined}
              rel={w.contentLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group rounded-xl border border-line p-5 bg-bg hover:border-fg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fg"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold group-hover:underline">{w.title}</h3>
                <span className="px-2 py-1 text-xs rounded-full border border-line whitespace-nowrap">{w.category}</span>
              </div>
              <p className="mt-2 text-sm text-mute line-clamp-3">{w.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {w.tags?.slice(0,6).map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-full border border-line">#{tag}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-mute">
                <span>{new Date(w.date).toLocaleDateString()}</span>
                {w.readingTime && <span>{w.readingTime}</span>}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="text-center py-16"
          >
            <h3 className="text-lg font-semibold">No results</h3>
            <p className="text-mute mt-2">Try clearing filters or searching different terms.</p>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
