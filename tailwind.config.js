/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
		extend: {fontFamily: {
			monolisaregular: ["MonoLisaRegular", "sans-serif"],
			monolisabold: ["MonoLisaBold", "sans-serif"],
		}}
		
	},
	daisyui: {
		themes: [
			{
				dracula: {
					primary: '#f8f8f2',
					secondary: '#9580FF',
					accent: '#FFFF80',
					accent2: '#FF80BF',
					neutral: '#f8f8f2',
					'base-100': '#22212C',
					'base-200': '#2C2A37',
					info: '#80FFEA',
					success: '#8AFF80',
					warning: '#FF80BF',
					error: '#FF9580'
				}
			}
		]
	},
	

	plugins: [require("daisyui")],
	safelist: [
		'shadow-secondary',
		'shadow-error',
		'shadow-success',
		'shadow-info',
		'badge-secondary',
		'badge-error',
		'badge-success',
		'badge-info',
	]
}

