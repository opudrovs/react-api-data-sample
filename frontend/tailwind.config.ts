import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontSize: {
        // Match Mantine font sizes
        sm: '16px',
        base: '18px',
        lg: '20px',
        xl: '24px',
      },
    },
  },
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'], // Enables single theme toggle for Mantine and Tailwind CSS
  plugins: [],
} satisfies Config;
