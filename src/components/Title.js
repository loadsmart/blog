import styled from 'styled-components';

import { theme } from '../styles/theme';
import { screen } from '../styles/screen';

const Title = styled.h1`
  color: #333;
  font-style: normal;
  font-family: ${theme.light.fonts.title};
  font-weight: 900;
  line-height: 1em;
  margin: 50px 0 25px 0;
  font-size: 25px;

  ${screen.lg} {
    font-size: 40px;
    line-height: 1.2em;
    letter-spacing: -2px;
    margin: 60px 0 30px 0;
  }
`;

export default Title;
