import styled from 'styled-components'

import { fonts } from 'styles/theme'
import { screen } from 'styles/screen'

const Title = styled.h1`
  color: var(--text-primary);
  font-style: normal;
  font-family: ${fonts.title};
  font-weight: 900;
  font-size: 25px;
  line-height: 1.5em;
  margin: 0;

  ${screen.lg} {
    font-size: 40px;
    line-height: 1.2em;
    letter-spacing: -2px;
    margin: 20px 0 10px 0;
  }
`

export default Title
