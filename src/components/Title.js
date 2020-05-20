import styled from 'styled-components';

import { theme } from '../styles/theme';

const Title = styled.h1`
  color: #333;
  font-style: normal;
  font-family: ${theme.light.fonts.title};
  font-weight: 900;
  line-height: 65px;
  margin: 75px 0 50px 0;
  font-size: 60px;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export default Title;
