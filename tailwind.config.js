/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				white: {
					50: '#F6FBFF',
					100: '#F1F6FC',
					200: '#ECF2F7',
					300: '#DFE5EA',
					400: '#BDC2C7',
					600: '#515F69',
					800: '#3E454C',
					900: '#373D42',
					950: '#212529',
				},
				green: {
					50: '#F2F8F1',
					100: '#E0EFDC',
					200: '#C2DEBC',
					300: '#8EC188',
					400: '#66A661',
					600: '#2F6D2E',
				},
				red: {
					50: '#FFF1F2',
					100: '#FFE0E1',
					200: '#FFC6C9',
					300: '#FF9EA3',
					400: '#FF666D',
					600: '#EB1721',
				},
				border: 'var(--surface-secondary)',
				input: 'hsl(var(--input))',
				ring: 'var(--ring)',
				background: 'var(--surface-primary)',
				foreground: 'var(--surface-secondary)',
				primary: {
					DEFAULT: 'var(--text-primary)',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'var(--text-secondary)',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'var(--text-accent)',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
