import type { Config } from 'tailwindcss';
import { plugin, content } from 'flowbite-react/tailwind'; // Use named imports

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
    content({ base: './' }), // Use the content function from Flowbite
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f9ff',
          100: '#eaf3ff',
          200: '#cbe0ff',
          300: '#abd2ff',
          400: '#6db7ff',
          500: '#2e9bff',
          600: '#2988e6',
          700: '#1c5aa5',
          800: '#144173',
          900: '#0e2c52',
        },
      },
    },
  },
  plugins: [plugin()], // Use the plugin function from Flowbite
} satisfies Config;
