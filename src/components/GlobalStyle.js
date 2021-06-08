import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--background);
    color: var(--text-primary);

    &.light-mode {
      --background: #e7ebef;
      --text-primary: #1d2124;
      --text-secondary: #6a7884;
      --text-content: #333333;
      --accent-primary: #29D455;
    }

    &.dark-mode {
      --background: #191b1f;
      --text-primary: #FFFFFF;
      --text-secondary: #CCCCCC;
      --text-content: #CCCCCC;
      --accent-primary: #29D455;
    }
  }

  .gatsby-highlight {
    font-size: 15px;
  }

  :not(pre) > code[class*="language-"] {
    font-size: 15px;
    padding: .1em .4em;
  }
`

export default GlobalStyle
