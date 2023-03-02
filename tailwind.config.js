const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--poppins-font)"],
				jakarta: ["var(--jakartaSans-font)"],
				code: ["var(--font-fira-code)"],
				emoji: ["Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
			},
			colors: {
				primary: {
					DEFAULT: "var(--bg-primary)",
					800: "var(--bg-primary-800)",
					700: "var(--bg-primary-700)",
					600: "var(--bg-primary-600)",
					500: "var(--bg-primary-500)",
					400: "var(--bg-primary-400)",
					300: "var(--bg-primary-300)",
					200: "var(--bg-primary-200)",
					100: "var(--bg-primary-100)",
					50: "var(--bg-primary-50)",
				},
			},
		},
	},

	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				html: { fontSize: "14px" },
			});
		}),
	],
};
