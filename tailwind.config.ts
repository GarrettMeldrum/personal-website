import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
