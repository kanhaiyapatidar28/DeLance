export default {
  plugins: {
    // tailwindcss is handled via @import in Tailwind 4, or needs @tailwindcss/postcss
    // Since we don't have @tailwindcss/postcss, we'll let Vite handle what it can.
    autoprefixer: {},
  },
}
