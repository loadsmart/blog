import styled from 'styled-components';

import { theme } from '../styles/theme';

const Text = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 15px 0;
  line-height: 1.5em;
  position: relative;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.light.fonts.title};
  }

  a {
    /* color: ${theme.light.colors.primary}; */
  }
`;

export default Text;
