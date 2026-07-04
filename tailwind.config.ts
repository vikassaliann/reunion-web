import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#d0c5af",
        "primary-fixed-dim": "#e9c349",
        "surface-container-highest": "#353534",
        "on-primary-fixed": "#241a00",
        "surface-variant": "#353534",
        "on-tertiary-fixed": "#00174b",
        "on-tertiary-container": "#254188",
        "tertiary-fixed-dim": "#b4c5ff",
        "surface-container-low": "#1c1b1b",
        "on-error-container": "#ffdad6",
        "secondary-fixed": "#f1e2ad",
        "on-secondary-fixed-variant": "#50471e",
        "surface-dim": "#131313",
        "background": "#131313",
        "secondary-container": "#50471e",
        "obsidian-deep": "#0A0A0A",
        "surface-container-lowest": "#0e0e0e",
        "on-error": "#690005",
        "secondary": "#d4c693",
        "on-tertiary": "#082b72",
        "tertiary-fixed": "#dbe1ff",
        "inverse-surface": "#e5e2e1",
        "obsidian-elevated": "#1A1A1A",
        "inverse-primary": "#735c00",
        "on-primary-container": "#554300",
        "on-secondary-fixed": "#221b00",
        "on-background": "#e5e2e1",
        "antique-gold": "#C9A84C",
        "on-secondary": "#38300a",
        "border-gold": "rgba(201, 168, 76, 0.3)",
        "surface-container": "#201f1f",
        "on-surface": "#e5e2e1",
        "on-primary": "#3c2f00",
        "on-tertiary-fixed-variant": "#27438a",
        "error": "#ffb4ab",
        "tertiary-container": "#97b0ff",
        "tertiary": "#bfcdff",
        "surface": "#131313",
        "surface-bright": "#3a3939",
        "surface-container-high": "#2a2a2a",
        "inverse-on-surface": "#313030",
        "on-secondary-container": "#c2b583",
        "outline": "#99907c",
        "primary-fixed": "#ffe088",
        "primary-container": "#d4af37",
        "premium-champagne": "#E8C96A",
        "primary": "#f2ca50",
        "on-primary-fixed-variant": "#574500",
        "error-container": "#93000a",
        "obsidian-soft": "#111111",
        "outline-variant": "#4d4635",
        "surface-tint": "#e9c349",
        "secondary-fixed-dim": "#d4c693"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "80px",
        "container-max": "1440px",
        "section-gap": "160px",
        "gutter": "32px",
        "margin-mobile": "24px"
      },
      fontFamily: {
        "label-caps": ["Montserrat"],
        "headline-lg-mobile": ["Playfair Display"],
        "display-xl": ["Playfair Display"],
        "body-md": ["Montserrat"],
        "body-lg": ["Montserrat"],
        "headline-lg": ["Playfair Display"],
        "quote": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "cinzel": ["Cinzel", "serif"],
        "cormorant": ["Cormorant Garamond", "serif"]
      },
      fontSize: {
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.2em", "fontWeight": "600"}],
        "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "400"}],
        "display-xl": ["72px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "1.6", "letterSpacing": "0.02em", "fontWeight": "300"}],
        "body-lg": ["18px", {"lineHeight": "1.8", "letterSpacing": "0.03em", "fontWeight": "300"}],
        "headline-lg": ["48px", {"lineHeight": "1.2", "letterSpacing": "0em", "fontWeight": "400"}],
        "quote": ["24px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "400"}]
      },
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(-50%)" },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
export default config
