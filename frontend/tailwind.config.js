/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'red': '#eb4034',
        'blue-5': '#172554',
        'blue-4': "#1d4ed8",
        'blue-3': '#60a5fa',
        'blue-2': '#93c5fd',
        'blue-1': '#bfdbfe',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'black': '#000000',
        'white': '#ffffff'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      }
    },
    plugins:[{
      tailwindcss: { config: './tailwindcss-config.js' }
    }] 
  }
  