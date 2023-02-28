const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--poppins-font)", ...fontFamily.sans],
				jakarta: ["var(--jakartaSans-font)", ...fontFamily.sans],
			},
			colors: {
				primary: {
					DEFAULT: "#003582",
					800: "#224797",
					700: "#3D5AAC",
					600: "#556dc2",
					500: "#6C81D9",
					400: "#8296F0",
					300: "#99ABFF",
					200: "#B0C1FF",
					100: "#C7D7FF",
					50: "#DFEDFF",
				},
			},
		},
	},
	plugins: [],
};
