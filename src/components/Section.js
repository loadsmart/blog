import styled from 'styled-components';

import { theme } from '../styles/theme';
import { screen } from '../styles/screen';

const Section = styled.div`
  margin: 0 auto;
  width: 100%;

  ${screen.lg} {
    width: ${theme.light.sizes.default};
  }
`;

export default Section;
