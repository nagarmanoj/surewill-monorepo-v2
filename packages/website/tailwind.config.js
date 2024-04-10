/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1280px",
        },
      },
      colors: {
        error: {
          DEFAULT: "#E00040",
        },
        success: {
          DEFAULT: "#629677",
        },
        brand: {
          blue: {
            DEFAULT: "#61BDD1",
            light: "#CFEBF2",
            extraLight: "var(--color-brand-blue-extraLight)",
            1: "#0C0C46",
          },
          gray: {
            DEFAULT: "#405564",
            light: "#A8BAC7",
            extraLight: "#CED7DF",
          },
          green: {
            DEFAULT: "#629677",
            light: "#9CBFAA",
            extraLight: "#CEDFD4",
            3: "#CEDFD4",
          },
          navy: {
            DEFAULT: "var(--color-text-base)",
          },
          purple: {
            DEFAULT: "#742183",
          },
          sand: {
            DEFAULT: "#F3E4D0",
          },
        },
      },
      fontSize: {
        "3xl": "1.75rem",
        "6xl": "4.125rem",
      },
      backgroundImage: {
        "brand-purple-blue":
          "linear-gradient(315deg, var(--color-brand-purple) 0%, rgba(97, 189, 209, 1) 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(12, 12, 70, 0.7) 0%, rgba(241, 249, 252, 0.3) 100%)",
        "card-gradient-active":
          "linear-gradient(135deg, rgba(116, 33, 131, 0.9) 0%, rgba(97, 189, 209, 0.5) 100%)",
        "wave-blue": `
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="471px" viewBox="0 0 1440 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="layer-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.1"><g transform="translate(0, -1184)" fill="%2361BDD1"><path d="M0,1517 C367,1517 1074,1184 1440,1184 C1440,1348.66667 1440,1505.66667 1440,1655 L0,1655 C0,1625.66667 0,1579.66667 0,1517 Z" id="Rectangle"></path></g></g></svg>'),
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="565px" viewBox="0 0 1440 565" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="layer-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.1"><g transform="translate(0, -1090)" fill="%2361BDD1"><path d="M0,1492 C367,1492 1074,1090 1440,1090 C1440,1254.66667 1440,1443 1440,1655 L0,1655 C0,1609 0,1554.66667 0,1492 Z" id="Rectangle"></path></g></g></svg>'),
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="530px" viewBox="0 0 1440 530" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="layer-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.1"><g transform="translate(0, -1125)" fill="%2361BDD1"><path d="M0,1507 C367,1507 1074,1125 1440,1125 C1440,1289.66667 1440,1466.33333 1440,1655 L0,1655 C0,1619 0,1569.66667 0,1507 Z" id="Rectangle"></path></g></g></svg>')
        `,
        "wave-green": `
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="244px" viewBox="0 0 1440 244" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Rectangle</title><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.2"><g id="CTA-Section---Start" fill="%23629677"><path d="M0,392 C367,392 1074,-10 1440,-10 C1440,154.666667 1440,343 1440,555 L0,555 C0,509 0,454.666667 0,392 Z" id="Rectangle"></path></g></g></svg>'),
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="219px" viewBox="0 0 1440 219" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Rectangle</title><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.2"><g id="CTA-Section---Start" transform="translate(0, -25)" fill="%23629677"><path d="M0,407 C367,407 1074,25 1440,25 C1440,189.666667 1440,366.333333 1440,555 L0,555 C0,519 0,469.666667 0,407 Z" id="Rectangle"></path></g></g></svg>'),
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="160px" viewBox="0 0 1440 160" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Rectangle</title><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.2"><g id="CTA-Section---Start" transform="translate(0, -84)" fill="%23629677"><path d="M0,417 C367,417 1074,84 1440,84 C1440,248.666667 1440,405.666667 1440,555 L0,555 C0,525.666667 0,479.666667 0,417 Z" id="Rectangle"></path></g></g></svg>')
        `,
      },
      boxShadow: {
        "button": "4px 4px 10px 0px rgba(12, 12, 70, 0.2)",
        "card": "6px 6px 12px rgba(12, 12, 70, 0.1)",
        "card-dark": "6px 6px 12px rgba(12, 12, 70, 0.2)",
      },
      dropShadow: {
        "text-shadow": "6px 6px 12px rgba(12, 12, 70, 0.1)",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
