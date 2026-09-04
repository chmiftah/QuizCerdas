/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: {
            DEFAULT: '#58cc02',
            dark: '#46a302',
            light: '#89e219',
            lightBg: '#ddf4c5'
          },
          blue: {
            DEFAULT: '#1cb0f6',
            dark: '#1899d6',
            light: '#52c4ff',
            lightBg: '#ddf4ff'
          },
          yellow: {
            DEFAULT: '#ffc800',
            dark: '#e5b400',
            light: '#ffdc40'
          },
          red: {
            DEFAULT: '#ff4b4b',
            dark: '#ea2b2b',
            light: '#ff7878',
            lightBg: '#ffdfe0'
          },
          orange: {
            DEFAULT: '#ff9600',
            dark: '#e58700',
            light: '#ffaa2b'
          },
          purple: {
            DEFAULT: '#ce82ff',
            dark: '#a545e8'
          },
          gray: {
            50: '#f7f7f7',
            100: '#e5e5e5',
            200: '#cecece',
            300: '#afafaf',
            400: '#777777',
            500: '#4b4b4b',
            800: '#1b262c'
          }
        }
      },
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif']
      },
      boxShadow: {
        'duo-green': '0 4px 0 #46a302',
        'duo-blue': '0 4px 0 #1899d6',
        'duo-yellow': '0 4px 0 #e5b400',
        'duo-red': '0 4px 0 #ea2b2b',
        'duo-gray': '0 4px 0 #e5e5e5',
        'duo-dark-gray': '0 4px 0 #afafaf'
      }
    }
  },
  plugins: []
}
