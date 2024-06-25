
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", './src/**/*.{js,jsx,ts,tsx}'],
  // darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'other': { 'min': '150px', 'max': '767px' },
        'tab': { 'min': '767px', 'max': '900px' },
        'res768': {'min': '767px', 'max':'1100px' },
        'max320': { 'min': '150px', 'max': '320px' },
        'h880': { 'raw': '(min-height: 990px)' },
        'sMobile': { 'min': '320px', 'max': '375px'},
        'mdMobile': { 'min':'375px', 'max': '423px'},
        'lgMobile': { 'min':'423px', 'max': '767px'},
        'otherBig':{'min': '1025px',}

      },
      fontFamily: {
        // 'sensaBold': ["SensationBold"],
        "novaSquare": ["Nova Square"],
        "novaScript": ["Nova Script"],
        "novaOcal": ["Nova Oval"],
        "novaRound": ["Nova Round"],
        "novaCut": ["Nova Cut"],
        "novaFlat": ["Nova Flat"]
      },
    fontSize: {
      'xxs': ['0.65rem', '14px']
    }
    },
  },
  plugins: [require('daisyui'),],
}
