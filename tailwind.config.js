/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './**/*.html',
      './*.html',
      '*.html'
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1560px',
    },
    extend: {
      colors: {},
      fontSize: {
        '0': '0rem',
        '9': '0.5625rem',
        '10': '0.625rem',
        '11': '0.6875rem',
        '12': '0.75rem',
        '13': '0.813rem',
        '14': '0.875rem',
        '15': '0.9375rem',
        '16': '1rem',
        '18': '1.125rem',
        '19': '1.1875rem',
        '20': '1.25rem',
        '21': '1.3125rem',
        '22': '1.375rem',
        '24': '1.5rem',
        '26': '1.625rem',
        '28': '1.75rem',
        '32': '2rem',
        '33': '2.0625rem',
        '36': '2.25rem',
        '40': '2.5rem',
        '42': '2.625rem',
        '60': '3.75rem',
      },
      lineHeight: {
        'default': '1.5',
        '0': '0rem',
        '21': '1,3125rem',
        '26': '1.625rem',
        '28': '1.75rem',
        '33': '2.0625rem',
        '40': '2.5rem',
        '50': '3.125rem',
        '60': '3.75rem',
        '65': '4.0625rem',
      },
      textColor: {
        dark: {'DEFAULT': '#DCD7CD'},
        light: {'DEFAULT': '#13120F'}
      },
      backgroundColor: {
        dark: {'DEFAULT': '#151515'},
        color: {'DEFAULT': '#ffe3c1'},
        light: {'DEFAULT': '#F6F6F6'},
      },
      borderColor: {},
      spacing: {
        '1/1': '100%',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/7': '14.285742%',
        '2/7': '28.571428%',
        '3/7': '42.857142%',
        '4/7': '57.142857%',
        '5/7': '71.428571%',
        '6/7': '85.714285%',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
        '1/9': '11.111111%',
        '2/9': '22.222222%',
        '3/9': '33.333333%',
        '4/9': '44.444444%',
        '5/9': '55.555555%',
        '6/9': '66.666667%',
        '7/9': '77.777778%',
        '8/9': '88.888889%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '1/11': '9.090909%',
        '2/11': '18.181818%',
        '3/11': '27.272727%',
        '4/11': '36.363636%',
        '5/11': '45.454545%',
        '6/11': '54.545455%',
        '7/11': '63.636364%',
        '8/11': '72.727273%',
        '9/11': '81.818182%',
        '10/11': '90.909091%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333337%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      width: {
        'screen-xs': '480px'
      },
      maxWidth: {
        '1/1': '100%',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/7': '14.285742%',
        '2/7': '28.571428%',
        '3/7': '42.857142%',
        '4/7': '57.142857%',
        '5/7': '71.428571%',
        '6/7': '85.714285%',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
        '1/9': '11.111111%',
        '2/9': '22.222222%',
        '3/9': '33.333333%',
        '4/9': '44.444444%',
        '5/9': '55.555555%',
        '6/9': '66.666667%',
        '7/9': '77.777778%',
        '8/9': '88.888889%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '1/11': '9.090909%',
        '2/11': '18.181818%',
        '3/11': '27.272727%',
        '4/11': '36.363636%',
        '5/11': '45.454545%',
        '6/11': '54.545455%',
        '7/11': '63.636364%',
        '8/11': '72.727273%',
        '9/11': '81.818182%',
        '10/11': '90.909091%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333337%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      minWidth: {
        'screen-xs': '480px'
      },
      minHeight: {
        'screen-25': '25vh',
        'screen-50': '50vh',
        'screen-75': '75vh',
        'screen-100': '100vh',
        '1/1': '100%',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/7': '14.285742%',
        '2/7': '28.571428%',
        '3/7': '42.857142%',
        '4/7': '57.142857%',
        '5/7': '71.428571%',
        '6/7': '85.714285%',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
        '1/9': '11.111111%',
        '2/9': '22.222222%',
        '3/9': '33.333333%',
        '4/9': '44.444444%',
        '5/9': '55.555555%',
        '6/9': '66.666667%',
        '7/9': '77.777778%',
        '8/9': '88.888889%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '1/11': '9.090909%',
        '2/11': '18.181818%',
        '3/11': '27.272727%',
        '4/11': '36.363636%',
        '5/11': '45.454545%',
        '6/11': '54.545455%',
        '7/11': '63.636364%',
        '8/11': '72.727273%',
        '9/11': '81.818182%',
        '10/11': '90.909091%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333337%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      maxHeight: {
        '0': '0',
        'screen-25': '25vh',
        'screen-50': '50vh',
        'screen-75': '75vh',
        'screen-100': '100vh',
      }
    },
  },
  plugins: [],
}
