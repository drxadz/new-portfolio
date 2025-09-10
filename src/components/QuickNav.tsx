import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type QuickLink = { label: string; href: string; icon?: React.ReactNode; exact?: boolean };
type Props = { links?: QuickLink[]; hideOnSmall?: boolean };

const DEFAULT_LINKS: QuickLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const LS_KEY = "quicknav-pos-v1";

export function QuickNav({ links = DEFAULT_LINKS, hideOnSmall = false }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    // default: right-center; x,y are CSS pixels relative to viewport origin (top-left)
    const v = localStorage.getItem(LS_KEY);
    return v ? JSON.parse(v) : { x: 0, y: 0 }; // we compute real default later
  });
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Initial mount: compute default right-center if no saved pos
  useEffect(() => {
    const hasSaved = !!localStorage.getItem(LS_KEY);
    if (!hasSaved) {
      const vw = window.innerWidth, vh = window.innerHeight;
      // default widget size ~ 40px; offset 12px from right edge
      setPos({ x: vw - 12 - 40, y: vh / 2 - 20 });
    }
    setMounted(true);
  }, []);

  // Persist pos
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(LS_KEY, JSON.stringify(pos));
  }, [pos, mounted]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (
        !panelRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep inside viewport on resize/rotation
  useEffect(() => {
    const clampToViewport = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const x = Math.min(Math.max(pos.x, 8), vw - 48); // 48 ~ button size + margin
      const y = Math.min(Math.max(pos.y, 8), vh - 48);
      if (x !== pos.x || y !== pos.y) setPos({ x, y });
    };
    window.addEventListener("resize", clampToViewport);
    window.addEventListener("orientationchange", clampToViewport);
    return () => {
      window.removeEventListener("resize", clampToViewport);
      window.removeEventListener("orientationchange", clampToViewport);
    };
  }, [pos]);

  // Edge-snap on drag end
  const onDragEnd = (_: any, info: { point: { x: number; y: number } }) => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const btn = wrapRef.current?.getBoundingClientRect();
    const w = btn?.width ?? 40;
    const h = btn?.height ?? 40;
    const rawX = info.point.x - w / 2;
    const rawY = info.point.y - h / 2;
    // clamp
    let x = Math.min(Math.max(rawX, 8), vw - w - 8);
    let y = Math.min(Math.max(rawY, 8), vh - h - 8);
    // snap to nearest horizontal edge
    const snapLeft = 8;
    const snapRight = vw - w - 8;
    x = Math.abs(x - snapLeft) < Math.abs(x - snapRight) ? snapLeft : snapRight;
    setPos({ x, y });
    setOpen(false); // close panel if dragging
  };

  // Keyboard nudge
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 24 : 8;
    let { x, y } = pos;
    if (e.key === "ArrowUp") y -= step;
    if (e.key === "ArrowDown") y += step;
    if (e.key === "ArrowLeft") x -= step;
    if (e.key === "ArrowRight") x += step;
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
      e.preventDefault();
      const vw = window.innerWidth, vh = window.innerHeight;
      x = Math.min(Math.max(x, 8), vw - 48);
      y = Math.min(Math.max(y, 8), vh - 48);
      setPos({ x, y });
    }
  };

  // Long-press to reset (desktop: right-click)
  let pressTimer: number | undefined;
  const startPress = () => {
    pressTimer = window.setTimeout(() => {
      const vw = window.innerWidth, vh = window.innerHeight;
      setPos({ x: vw - 12 - 40, y: vh / 2 - 20 });
    }, 600);
  };
  const cancelPress = () => { if (pressTimer) window.clearTimeout(pressTimer); };

  const panelAnim = prefersReduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 16 } };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  // Nothing until mounted (avoids SSR/measure issues)
  if (!mounted) return null;

  return (
    <motion.div
      ref={wrapRef}
      className={[
        "fixed z-[60] pointer-events-none",
        hideOnSmall ? "hidden sm:block" : "",
      ].join(" ")}
      style={{ left: pos.x, top: pos.y }} // absolute coordinates
      drag
      dragMomentum={!prefersReduced}
      onDragStart={() => setOpen(false)}
      onDragEnd={onDragEnd}
      dragElastic={0.12}
      dragConstraints={{
        left: 8, top: 8,
        right: typeof window !== "undefined" ? window.innerWidth - 48 : 8,
        bottom: typeof window !== "undefined" ? window.innerHeight - 48 : 8,
      }}
      aria-live="polite"
    >
      {/* Toggle button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        onKeyDown={onKeyDown}
        onContextMenu={(e) => { e.preventDefault(); /* reset via right-click */ 
          const vw = window.innerWidth, vh = window.innerHeight;
          setPos({ x: vw - 12 - 40, y: vh / 2 - 20 });
        }}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        onMouseDown={cancelPress}
        aria-expanded={open}
        aria-controls={id}
        aria-label="Open quick links"
        className="pointer-events-auto h-10 w-10 rounded-full border border-line bg-bg/60 backdrop-blur flex items-center justify-center shadow-[0_1px_0_0_rgba(0,0,0,0.02)] hover:shadow-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="sr-only">Quick links</span>
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-fg/70">
          <circle cx="5" cy="12" r="2" fill="currentColor"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <circle cx="19" cy="12" r="2" fill="currentColor"/>
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            id={id}
            role="dialog"
            aria-label="Quick links"
            initial={panelAnim.initial}
            animate={{ ...panelAnim.animate, transition: { duration: prefersReduced ? 0 : 0.25, ease: [0.16,1,0.3,1] } }}
            exit={{ ...panelAnim.exit, transition: { duration: prefersReduced ? 0 : 0.18 } }}
            className="pointer-events-auto mt-2 rounded-2xl border border-line bg-bg/80 backdrop-blur shadow-soft max-w-[220px] overflow-hidden"
          >
            <nav className="py-2">
              { (links ?? []).map((l, i) => (
                <motion.a
                  key={l.href + i}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: prefersReduced ? 0 : 0.04 * i } }}
                  className="group flex items-center gap-3 px-3 py-2.5 text-sm text-fg/90 hover:bg-fg/[0.04] focus-visible:bg-fg/[0.06] outline-none"
                >
                  <span className="w-1 h-6 rounded-full bg-transparent group-hover:bg-accent transition-colors" />
                  {l.icon ?? <span className="inline-block w-4 h-4 rounded-[4px] border border-line bg-fg/5" />}
                  <span className="flex-1">{l.label}</span>
                </motion.a>
              )) }
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
