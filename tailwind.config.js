const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--poppins-font)", ...fontFamily.sans],
				jakarta: ["var(--jakartaSans-font)", ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
