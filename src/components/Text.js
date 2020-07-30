import styled from 'styled-components'

import { fonts } from 'styles/theme'

const Text = styled.div`
  padding: 15px 0;
  position: relative;
  color: var(--text-content);
  font-size: 17px;
  font-weight: 400;
  line-height: 2em;
  letter-spacing: 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${fonts.title};
  }
`

export default Text
