import { useRouteError, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { fadeUp } from '../lib/motion';

export function ErrorBoundary() {
  const error = useRouteError() as any;
  
  console.error('Route error:', error);

  return (
    <Section id="error" background="default">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center py-24"
        >
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-mute mb-8">
              We encountered an error while loading this page. This might be a temporary issue.
            </p>
            
            {error?.status === 404 && (
              <div className="bg-fg/5 border border-line rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-mute">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
            )}
            
            {error?.message && (
              <div className="bg-fg/5 border border-line rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">Error Details</h2>
                <p className="text-mute font-mono text-sm">{error.message}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                Go Home
              </Link>
              <Link
                to="/notes"
                className="px-6 py-3 rounded-xl border border-line hover:bg-fg/5 transition-colors"
              >
                View Notes
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl border border-line hover:bg-fg/5 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
