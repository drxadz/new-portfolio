import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { fadeUp } from '../lib/motion';

export default function TestNotes() {
  const [status, setStatus] = useState('Loading...');
  const [notesCount, setNotesCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/notes-index.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNotesCount(data.length);
          setStatus('✅ Notes loaded successfully!');
        } else {
          throw new Error('Invalid data format - expected array');
        }
      })
      .catch(err => {
        setError(err.message);
        setStatus('❌ Failed to load notes');
      });
  }, []);

  return (
    <Section id="test-notes" background="default">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center py-24"
        >
          <h1 className="text-3xl font-bold mb-8">Notes Integration Test</h1>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-fg/5 border border-line rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Status</h2>
              <p className="text-lg">{status}</p>
              {notesCount > 0 && (
                <p className="text-mute mt-2">Found {notesCount} notes</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-red-500">Error</h2>
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="bg-fg/5 border border-line rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
              <div className="space-y-2 text-left">
                <p>1. If status shows ✅, visit <a href="/notes" className="text-accent hover:underline">/notes</a> to see all notes</p>
                <p>2. If status shows ❌, check the error message above</p>
                <p>3. Make sure the dev server is running on the correct port</p>
                <p>4. Verify notes-index.json exists in the public folder</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href="/notes"
                className="px-6 py-3 rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                Go to Notes
              </a>
              <a
                href="/"
                className="px-6 py-3 rounded-xl border border-line hover:bg-fg/5 transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
