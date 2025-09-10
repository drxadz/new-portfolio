import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type QuickLink = { label: string; href: string; icon?: React.ReactNode; exact?: boolean };

// Constants for safe positioning
const SAFE = 12;
const BTN = 40;

function clampPos(x: number, y: number) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const cx = Math.min(Math.max(x, SAFE), vw - BTN - SAFE);
  const cy = Math.min(Math.max(y, SAFE), vh - BTN - SAFE);
  return { x: cx, y: cy };
}

function defaultPos() {
  const vw = window.innerWidth, vh = window.innerHeight;
  return { x: vw - SAFE - BTN, y: vh / 2 - BTN / 2 };
}

type Props = {
  links?: QuickLink[];
  hideOnSmall?: boolean;
  /** "auto" = corner on ≥768px, edge on <768px */
  snapMode?: "auto" | "corner" | "edge";
  perPage?: boolean;
  cornerMargin?: number;
};

const DEFAULT_LINKS: QuickLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function QuickNav({
  links = DEFAULT_LINKS,
  hideOnSmall = false,
  snapMode = "auto",
  perPage = true,
  cornerMargin = 12,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // responsive snap mode
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  const effectiveSnap: "corner" | "edge" =
    snapMode === "auto" ? (isDesktop ? "corner" : "edge") : snapMode;

  // per-page storage key
  const lsKey = useMemo(() => {
    const base = "quicknav-pos-v2";
    const path = typeof window !== "undefined" ? window.location.pathname || "/" : "/";
    return perPage ? `${base}:${path}` : base;
  }, [perPage]);

  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(lsKey) || "null"); } catch {}
    if (
      !saved ||
      typeof saved.x !== "number" ||
      typeof saved.y !== "number" ||
      Number.isNaN(saved.x) ||
      Number.isNaN(saved.y)
    ) {
      setPos(defaultPos());
    } else {
      const c = clampPos(saved.x, saved.y);
      setPos(c);
    }
    setMounted(true);
  }, [lsKey]);

  useEffect(() => { if (mounted) localStorage.setItem(lsKey, JSON.stringify(pos)); }, [pos, mounted, lsKey]);

  // Add a watchdog after first paint to auto-recover if off-screen
  useEffect(() => {
    if (!mounted) return;
    const check = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const off =
        rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw;
      if (off) setPos(defaultPos());
    };
    // run once and on tab visibility changes
    check();
    const onVis = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [mounted]);

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

  useEffect(() => {
    const clampToViewport = () => setPos(p => clampPos(p.x, p.y));
    window.addEventListener("resize", clampToViewport);
    window.addEventListener("orientationchange", clampToViewport);
    return () => {
      window.removeEventListener("resize", clampToViewport);
      window.removeEventListener("orientationchange", clampToViewport);
    };
  }, []);

  const resetToDefault = () => {
    setPos(defaultPos());
  };

  const snapToEdge = (x: number, y: number) => {
    const vw = window.innerWidth;
    const left = SAFE;
    const right = vw - BTN - SAFE;
    return { x: Math.abs(x - left) < Math.abs(x - right) ? left : right, y };
  };
  const snapToCorner = (x: number, y: number) => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const left = SAFE, right = vw - BTN - SAFE;
    const top = SAFE, bottom = vh - BTN - SAFE;
    const corners = [{x:left,y:top},{x:right,y:top},{x:left,y:bottom},{x:right,y:bottom}];
    let best = corners[0], d = Infinity;
    for (const c of corners) { const dd = Math.hypot(c.x - x, c.y - y); if (dd < d) { d = dd; best = c; } }
    return best;
  };

  // Add continuous clamping during drag
  const onDrag = (_: any, info: { point: { x: number; y: number } }) => {
    const btn = wrapRef.current?.getBoundingClientRect();
    const w = btn?.width ?? BTN, h = btn?.height ?? BTN;
    let x = info.point.x - w / 2;
    let y = info.point.y - h / 2;
    setPos(clampPos(x, y));
  };

  // Keep your existing onDragEnd but ensure clamp BEFORE snap
  const onDragEnd = (_: any, info: { point: { x: number; y: number } }) => {
    const btn = wrapRef.current?.getBoundingClientRect();
    const w = btn?.width ?? BTN, h = btn?.height ?? BTN;
    let x = info.point.x - w / 2;
    let y = info.point.y - h / 2;
    const clamped = clampPos(x, y);
    // then snap using your effectiveSnap fn (edge/corner)
    const snapped = effectiveSnap === "edge"
      ? snapToEdge(clamped.x, clamped.y)
      : snapToCorner(clamped.x, clamped.y);
    setPos(snapped);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 24 : 8;
    let { x, y } = pos;
    if (e.key === "ArrowUp") y -= step;
    if (e.key === "ArrowDown") y += step;
    if (e.key === "ArrowLeft") x -= step;
    if (e.key === "ArrowRight") x += step;
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
      e.preventDefault();
      setPos(clampPos(x, y));
    }
    if (e.key === "Enter") setOpen(v => !v);
  };

  // Add keyboard hotkey: Alt+Q to reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "q" || e.key === "Q")) {
        setPos(defaultPos());
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let pressTimer: number | undefined;
  const startPress = () => { pressTimer = window.setTimeout(() => resetToDefault(), 600); };
  const cancelPress = () => { if (pressTimer) window.clearTimeout(pressTimer); };

  const panelAnim = prefersReduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 16 } };

  // Panel smart positioning: compute side/vertical flip
  const panelSide = pos.x > window.innerWidth / 2 ? "left" : "right";
  const panelAlignBottom = pos.y > window.innerHeight - 140; // near bottom

  // Nothing until mounted (avoids SSR/measure issues)
  if (!mounted) return null;

  return (
    <motion.div
      ref={wrapRef}
      className={["fixed z-[80] pointer-events-none", hideOnSmall ? "hidden sm:block" : ""].join(" ")}
      style={{ left: pos.x, top: pos.y }}
      drag
      dragMomentum={!prefersReduced}
      dragElastic={0.12}
      onDrag={onDrag}
      onDragStart={() => setOpen(false)}
      onDragEnd={onDragEnd}
      aria-live="polite"
    >
      {/* Toggle button */}
        <button
          ref={btnRef}
          onClick={() => setOpen(v => !v)}
          onDoubleClick={() => { setPos(defaultPos()); setOpen(false); }}
          onKeyDown={onKeyDown}
          onContextMenu={(e) => { e.preventDefault(); resetToDefault(); }}
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
            className={[
              "pointer-events-auto absolute", // absolute relative to wrapper
              panelSide === "left" ? "right-[48px]" : "left-[48px]",
              panelAlignBottom ? "bottom-0 mb-2" : "top-full mt-2",
              "rounded-2xl border border-line bg-bg/80 backdrop-blur shadow-soft max-w-[220px] overflow-hidden"
            ].join(" ")}
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
