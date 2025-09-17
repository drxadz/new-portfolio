import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Search, 
  Folder, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  X,
  Sun,
  Moon,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { fadeInStagger, fadeUp, useReducedMotionGuard } from '../lib/motion';

interface NoteItem {
  slug: string;
  path: string;
  title: string;
  tags: string[];
  date: string;
  excerpt: string;
  category: string;
  content: string;
  frontmatter: Record<string, any>;
}

interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FolderNode[];
  note?: NoteItem;
  expanded?: boolean;
}

export default function NotesLayout() {
  const { isReducedMotion } = useReducedMotionGuard();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [folderTree, setFolderTree] = useState<FolderNode[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  
  // URL state
  const currentSlug = searchParams.get('note') || '';
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  // Load notes index
  useEffect(() => {
    fetch('/notes-index.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNotes(data);
          setFolderTree(buildFolderTree(data));
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load notes:', err);
        setNotes([]);
        setLoading(false);
      });
  }, []);

  // Build folder tree from notes
  const buildFolderTree = (notes: NoteItem[]): FolderNode[] => {
    const tree: FolderNode[] = [];
    const pathMap = new Map<string, FolderNode>();

    notes.forEach(note => {
      const pathParts = note.slug.split('/');
      let currentPath = '';
      
      pathParts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!pathMap.has(currentPath)) {
          const isFile = index === pathParts.length - 1;
          const node: FolderNode = {
            name: part,
            type: isFile ? 'file' : 'folder',
            path: currentPath,
            children: isFile ? undefined : [],
            note: isFile ? note : undefined,
            expanded: false
          };
          
          pathMap.set(currentPath, node);
          
          if (parentPath) {
            const parent = pathMap.get(parentPath);
            if (parent && parent.children) {
              parent.children.push(node);
            }
          } else {
            tree.push(node);
          }
        }
      });
    });

    return tree;
  };

  // Fuse.js setup
  const fuse = useMemo(() => {
    return new Fuse(notes, {
      includeMatches: true,
      threshold: 0.35,
      ignoreLocation: true,
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'excerpt', weight: 0.25 },
        { name: 'tags', weight: 0.1 },
        { name: 'category', weight: 0.05 },
        { name: 'content', weight: 0.1 }
      ],
    });
  }, [notes]);

  // Search results
  const searchResults = useMemo(() => {
    if (!search) return notes;
    return fuse.search(search).map(r => r.item);
  }, [search, fuse, notes]);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    let base = searchResults;
    if (category) base = base.filter(note => note.category === category);
    if (tags.length) base = base.filter(note => tags.every(tag => note.tags?.includes(tag)));
    return base.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchResults, category, tags]);

  // Current note
  const currentNote = useMemo(() => {
    return notes.find(note => note.slug === currentSlug);
  }, [notes, currentSlug]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setGlobalSearchOpen(false);
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update URL
  const updateURL = useCallback((params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  // Toggle folder
  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  // Render folder tree
  const renderFolderTree = (nodes: FolderNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.path} className="select-none">
        {node.type === 'folder' ? (
          <div>
            <button
              onClick={() => toggleFolder(node.path)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-fg/5 rounded-lg transition-colors ${
                level > 0 ? 'ml-4' : ''
              }`}
            >
              {expandedFolders.has(node.path) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Folder className="w-4 h-4" />
              <span className="truncate">{node.name}</span>
            </button>
            <AnimatePresence>
              {expandedFolders.has(node.path) && node.children && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {renderFolderTree(node.children, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to={`/notes?note=${node.slug}`}
            className={`block w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-fg/5 rounded-lg transition-colors ${
              currentSlug === node.slug ? 'bg-fg/10 text-fg' : 'text-mute'
            } ${level > 0 ? 'ml-4' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FileText className="w-4 h-4" />
            <span className="truncate">{node.name}</span>
          </Link>
        )}
      </div>
    ));
  };

  // Breadcrumbs
  const breadcrumbs = useMemo(() => {
    if (!currentNote) return [];
    const parts = currentNote.slug.split('/');
    const crumbs = [{ name: 'Notes', path: '/notes' }];
    
    let currentPath = '';
    parts.forEach(part => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      crumbs.push({ name: part, path: `/notes?note=${currentPath}` });
    });
    
    return crumbs;
  }, [currentNote]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fg mx-auto"></div>
          <p className="mt-4 text-mute">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu & Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-fg/5 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden lg:flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="w-4 h-4 text-mute" />}
                  <Link
                    to={crumb.path}
                    className="hover:text-fg transition-colors"
                  >
                    {crumb.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Global Search */}
          <div className="flex-1 max-w-md mx-4">
            <button
              onClick={() => setGlobalSearchOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-2 bg-fg/5 border border-line rounded-lg hover:bg-fg/10 transition-colors"
            >
              <Search className="w-4 h-4 text-mute" />
              <span className="text-mute">Search notes...</span>
              <kbd className="ml-auto text-xs bg-fg/10 px-2 py-1 rounded">Ctrl+K</kbd>
            </button>
          </div>

          {/* Right: Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-fg/5 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Mobile Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-fg/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              
              {/* Sidebar Content */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed left-0 top-16 bottom-0 w-80 bg-bg border-r border-line z-50 lg:relative lg:top-0 lg:w-80 lg:translate-x-0"
              >
                <div className="h-full flex flex-col">
                  {/* Sidebar Header */}
                  <div className="p-4 border-b border-line">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">Notes</h2>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 rounded hover:bg-fg/5 lg:hidden"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sidebar Content */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                      {renderFolderTree(folderTree)}
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {currentNote ? (
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto p-8">
                <motion.article
                  variants={fadeInStagger()}
                  initial="hidden"
                  animate="show"
                  className="prose prose-lg max-w-none prose-headings:text-fg prose-p:text-fg/80 prose-a:text-fg prose-strong:text-fg prose-code:text-fg prose-pre:bg-fg/5 prose-pre:border prose-pre:border-line prose-blockquote:border-l-fg prose-blockquote:text-fg/70"
                >
                  <motion.header variants={fadeUp} className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{currentNote.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-mute">
                      <span className="px-3 py-1 rounded-full border border-line">{currentNote.category}</span>
                      <span>{new Date(currentNote.date).toLocaleDateString()}</span>
                      {currentNote.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {currentNote.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs rounded-full border border-line">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.header>

                  <motion.div 
                    variants={fadeUp}
                    className="prose prose-lg max-w-none prose-headings:text-fg prose-p:text-fg/80 prose-a:text-fg prose-strong:text-fg prose-code:text-fg prose-pre:bg-fg/5 prose-pre:border prose-pre:border-line prose-blockquote:border-l-fg prose-blockquote:text-fg/70"
                  >
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Custom styling for code blocks
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <pre className="bg-fg/5 border border-line rounded-lg p-4 overflow-x-auto">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          ) : (
                            <code className="bg-fg/10 px-1 py-0.5 rounded text-sm" {...props}>
                              {children}
                            </code>
                          );
                        },
                        // Custom styling for links
                        a({ href, children, ...props }) {
                          return (
                            <a 
                              href={href} 
                              target={href?.startsWith('http') ? '_blank' : undefined}
                              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-fg underline hover:text-fg/70 transition-colors"
                              {...props}
                            >
                              {children}
                            </a>
                          );
                        },
                        // Custom styling for tables
                        table({ children, ...props }) {
                          return (
                            <div className="overflow-x-auto my-6">
                              <table className="min-w-full border border-line rounded-lg" {...props}>
                                {children}
                              </table>
                            </div>
                          );
                        },
                        th({ children, ...props }) {
                          return (
                            <th className="border border-line px-4 py-2 bg-fg/5 font-semibold text-left" {...props}>
                              {children}
                            </th>
                          );
                        },
                        td({ children, ...props }) {
                          return (
                            <td className="border border-line px-4 py-2" {...props}>
                              {children}
                            </td>
                          );
                        },
                      }}
                    >
                      {currentNote.content}
                    </ReactMarkdown>
                  </motion.div>
                </motion.article>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-mute mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Select a note</h2>
                <p className="text-mute">Choose a note from the sidebar to get started</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {globalSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-fg/20 backdrop-blur-sm z-50"
              onClick={() => setGlobalSearchOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-bg border border-line rounded-xl shadow-2xl z-50"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-5 h-5 text-mute" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => updateURL({ search: e.target.value })}
                    className="flex-1 bg-transparent text-fg placeholder-mute focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setGlobalSearchOpen(false)}
                    className="p-1 rounded hover:bg-fg/5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {filteredNotes.length > 0 ? (
                    <div className="space-y-1">
                      {filteredNotes.slice(0, 10).map(note => (
                        <Link
                          key={note.slug}
                          to={`/notes?note=${note.slug}`}
                          onClick={() => setGlobalSearchOpen(false)}
                          className="block p-3 hover:bg-fg/5 rounded-lg transition-colors"
                        >
                          <div className="font-medium">{note.title}</div>
                          <div className="text-sm text-mute truncate">{note.excerpt}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-mute">
                      No notes found
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
