const watch = process.env.ROLLUP_WATCH;

module.exports = {
  purge: {
    enabled: !watch,
    content: ["./client/**/*.html", "./client-src/**/*.svelte"],
  },
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
