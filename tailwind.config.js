/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Theme tokens – tweak these to perfectly match the Portz template
        bg: "var(--bg, #ffffff)",
        fg: "var(--fg, #0b0b0b)",
        mute: "var(--mute, #6b7280)",    // muted/caption text
        line: "var(--line, #e5e7eb)",    // dividers/borders
        accent: "var(--accent, #ff6a00)" // primary accent like Portz
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
      spacing: {
        section: "clamp(3rem, 7vw, 7rem)",
        grid: "clamp(1rem, 2.5vw, 2rem)",
      },
      fontSize: {
        hero: ["clamp(2.25rem, 6vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};
