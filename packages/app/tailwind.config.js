/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      backgroundImage: {
        "aside-pattern":
          "linear-gradient(0deg, var(--color-brand-purple) 0%, rgba(97, 189, 209, 1) 100%)",
        "stepper-pattern":
          "linear-gradient(45deg, rgba(98, 150, 119, 1) 0%, rgba(156, 191, 170, 1) 100%)",
        "auth-layout": `
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="471px" viewBox="0 0 1440 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="layer-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.1"><g transform="translate(0, -1184)" fill="%2361BDD1"><path d="M0,1517 C367,1517 1074,1184 1440,1184 C1440,1348.66667 1440,1505.66667 1440,1655 L0,1655 C0,1625.66667 0,1579.66667 0,1517 Z" id="Rectangle"></path></g></g></svg>'),
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="565px" viewBox="0 0 1440 565" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="layer-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.1"><g transform="translate(0, -1090)" fill="%2361BDD1"><path d="M0,1492 C367,1492 1074,1090 1440,1090 C1440,1254.66667 1440,1443 1440,1655 L0,1655 C0,1609 0,1554.66667 0,1492 Z" id="Rectangle"></path></g></g></svg>'),
          url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg width="1440px" height="530px" viewBox="0 0 1440 530" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="layer-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.1"><g transform="translate(0, -1125)" fill="%2361BDD1"><path d="M0,1507 C367,1507 1074,1125 1440,1125 C1440,1289.66667 1440,1466.33333 1440,1655 L0,1655 C0,1619 0,1569.66667 0,1507 Z" id="Rectangle"></path></g></g></svg>')
        `,
      },
      colors: {
        error: {
          DEFAULT: "var(--color-error)",
        },
        brand: {
          purple: {
            DEFAULT: "#742183",
          },
          green: {
            DEFAULT: "#629677",
            light: "#9CBFAA",
            extraLight: "#CEDFD4",
          },
          blue: {
            DEFAULT: "var(--color-text-base)",
            extraLight: "#F1F9FC",
            light: "#61BDD1",
          },
          gray: {
            DEFAULT: "#405564",
            light: "#A8BAC7",
          },
        },
      },
      maxWidth: {
        "form-2": "440px",
        "form-3": "675px",
        "form-full": "910px",
      },
      fontSize: {
        "3xl": "1.75rem",
      },
      boxShadow: {
        button: "4px 4px 10px 0px rgba(12, 12, 70, 0.2)",
        card: "6px 6px 12px rgba(12, 12, 70, 0.1)",
        "card-dark": "6px 6px 12px rgba(12, 12, 70, 0.2)",
      },
      dropShadow: {
        "text-shadow": "6px 6px 12px rgba(12, 12, 70, 0.1)",
      },
    },
  },
  plugins: [],
};
