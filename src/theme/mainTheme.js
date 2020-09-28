const breakpoints = {
  xs: 420,
  s: 576,
  md: 800,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const theme = {
  fonts: {
    mainFont: `'Sarala', sans-serif`,
    subFont: `'Open Sans', sans-serif;`,
  },
  white: "hsl(0, 0%, 100%)",
  gray: "hsl(0, 0%, 72%)",
  lightGray: "hsl(0, 0%, 82%)",
  dark: "#03131D",
  red100: "hsla(348, 100%, 63%, 0.8)",
  neonBlue: "#16ffff",
  darkBlue: "#16232e",
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  fontSize: {
    xs: "1.4rem",
    s: "1.6rem",
    m: "1.8rem",
    lg: "2rem",
    xlg: "2.3rem",
    xl: "2.8rem",
    xxlm: "3.6rem",
    xxl: "4.8rem",
    xxxl: "8.6rem",
  },
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),
};
