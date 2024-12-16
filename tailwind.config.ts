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
        white: '#FFFFFF',
      },
      fontFamily: {
        spoqa: ['SpoqaHanSansNeo', 'sans-serif'],
      },
      fontSize: {
        // 12 PX
        '12': ['12px', { lineHeight: '16px', fontWeight: '400' }], // 기본(레귤러)

        // 14 PX
        '14': ['14px', { lineHeight: '22px', fontWeight: '400' }], // 기본(레귤러)
        '14m': ['14px', { lineHeight: '17px', fontWeight: '500' }], // 미디움
        '14b': ['14px', { lineHeight: '18px', fontWeight: '700' }], // 볼드

        // 16 PX
        '16': ['16px', { lineHeight: '26px', fontWeight: '400' }], // 기본(레귤러)
        '16m': ['16px', { lineHeight: '19px', fontWeight: '500' }], // 미디움
        '16b': ['16px', { lineHeight: '20px', fontWeight: '700' }], // 볼드

        // 18 PX
        '18m': ['18px', { lineHeight: '21px', fontWeight: '500' }], // 미디움
        '18b': ['18px', { lineHeight: '23px', fontWeight: '700' }], // 볼드

        // 20 PX
        '20b': ['20px', { lineHeight: '25px', fontWeight: '700' }], // 볼드

        // 24 PX
        '24b': ['24px', { lineHeight: '30px', fontWeight: '700' }], // 볼드

        // 28 PX
        '28b': ['28px', { lineHeight: '35px', fontWeight: '700' }], // 볼드
      },
      screens: {
        sm: '375px',
        md: '744px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
