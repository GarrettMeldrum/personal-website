import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      typography: {
        medium: {
          css: {
	    '--tw-prose-body': '#242424',
            maxWidth: '680px',
            a: {
              color: '#1a8917',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '1.3',
            },
            h2: {
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '1.4',
            },
            h3: {
              fontWeight: '700',
              fontSize: '1.25rem',
              lineHeight: '1.4',
            },
            img: {
              borderRadius: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
