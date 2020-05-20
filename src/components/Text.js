import styled from 'styled-components';

import { theme } from '../styles/theme';

const Text = styled.div`
  padding: 15px 0;
  position: relative;
  color: #1d2124;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.light.fonts.title};
  }
`;

export default Text;
