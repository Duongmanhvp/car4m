/** @type {import('tailwindcss').Config} */
module.exports = {
  	content: [
			"./app/**/*.{js,ts,jsx,tsx}",
    		"./pages/**/*.{js,ts,jsx,tsx}",
    		"./components/**/*.{js,ts,jsx,tsx}"
  	],
  	theme: {
    		extend: {
      			colors: {
        				"primary-0": "#fff",
        				lightsteelblue: "rgba(195, 212, 233, 0.4)",
        				primary: "#1572d3",
        				darkslategray: "#484848"
      			},
      			spacing: {},
      			fontFamily: {
        				poppins: "Poppins"
      			}
    		},
    		fontSize: {
      			base: "16px",
      			inherit: "inherit",
				'custom-size': '16px'
    		}
  	},
  	corePlugins: {
    		preflight: false
  	}
}