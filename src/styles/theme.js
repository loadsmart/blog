export const font = {
  text: `Georgia, Garamond, serif`,
  title: `SharpSans, Helvetica, Arial, sans-serif`,
};

export const colors = {
  light: {
    primary: `#29D455`,
    secondary: `#353e47`,
    text: `#000`,
  },
  dark: {
    primary: `#353e47`,
    secondary: `#29D455`,
    text: `#fff`,
  },
  primary: `#29D455`,
  secondary: `#353e47`,
};

const THEME_LIGHT = {
  fonts: {
    body: `SharpSans, Helvetica, Arial, sans-serif`,
    title: `SharpSans, Helvetica, Arial, sans-serif`,
    text: `'Roboto Slab', serif`,
  },
  colors: {
    primary: `#29D455`,
    secondary: `#353e47`,
    text: `#000`,
  },
  sizes: {
    default: 'max(50vw, 900px)',
    min: '340px',
  },
};

export const theme = {
  light: THEME_LIGHT,
};
