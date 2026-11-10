/** @type {import('tailwindcss').Config} */
// Every colour below resolves to a CSS custom property defined in src/input.css
// (light and dark sets). Components never carry raw hex values.
const v = (name) => `rgb(var(--md-sys-color-${name}) / <alpha-value>)`;

module.exports = {
  content: ['./dist/**/*.html', './dist/js/app.js', './dist/js/data.js', './dist/js/data-wave.js', './dist/js/data-officials.js', './dist/js/data-provenance.js', './dist/js/data-buildpower.js', './dist/js/suggest.js', './dist/js/translate.js'],
  theme: {
    // Breakpoints are raised so that multi-column layouts engage only when the
    // content area (viewport minus the navigation rail) is wide enough for them.
    screens: { sm: '640px', md: '768px', lg: '1152px', xl: '1408px', '2xl': '1664px' },
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],
        sm: ['0.9375rem', { lineHeight: '1.5rem' }],
      },
      colors: {
        paper: { DEFAULT: v('surface'), 50: v('surface-container-low'), 100: v('surface'), 200: v('surface-container-high'), 300: v('outline-variant') },
        stone: { DEFAULT: v('stone'), 600: v('on-surface-subtle'), 700: v('on-surface-subtle') },
        ink: { DEFAULT: v('on-surface'), 700: v('on-surface-variant'), 500: v('on-surface-muted') },
        lapis: { DEFAULT: v('primary'), 50: v('primary-container'), 100: v('primary-container-high'), 700: v('on-primary-container') },
        verd: { DEFAULT: v('secondary'), 50: v('secondary-container'), 100: v('secondary-container-high'), 700: v('on-secondary-container') },
        ochre: { DEFAULT: v('tertiary'), 50: v('tertiary-container'), 100: v('tertiary-container-high'), 700: v('on-tertiary-container') },
        terra: { DEFAULT: v('error'), 50: v('error-container'), 100: v('error-container-high'), 700: v('on-error-container') },
        gold: { DEFAULT: v('accent'), 700: v('accent-text') },
        line: v('outline'),
        onprimary: v('on-primary'),
        inverse: v('inverse-surface'),
        oninverse: v('on-inverse-surface'),
        invaccent: v('inverse-accent'),
        invmuted: v('inverse-muted'),
        scrim: v('scrim'),
      },
      maxWidth: { prose2: '68ch' },
      transitionTimingFunction: { standard: 'cubic-bezier(0.2, 0, 0, 1)' },
    },
  },
  plugins: [],
};
