import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.purple,
        secondary: colors.orange,
        neutral: colors.neutral,
        green: colors.green,
        red: colors.red,
        white: colors.white,
        black: colors.black,
        cyan: colors.cyan,
        blue: colors.blue,
        amber: colors.amber,
      }
    },
  },
  plugins: [],
}
