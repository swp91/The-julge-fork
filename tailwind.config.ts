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
        gray: {
          50: '#FAFAFA',
          100: '#F2F2F3',
          200: '#E5E4E7',
          300: '#CBC9CF',
          400: '#A4A1AA',
          500: '#7D7986',
        },
        black: '#111322',
        red: {
          10: '#FFEBE7',
          20: '#FFAF9B',
          30: '#FF8D72',
          40: '#FF4040',
        },
        blue: {
          10: '#CCE6FF',
          20: '#0080FF',
        },
        green: {
          10: '#D4F7D4',
          20: '#20A81E',
        },
        kakao: '#FEE500',
      },
    },
  },
  plugins: [],
} satisfies Config;
