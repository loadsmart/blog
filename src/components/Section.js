import styled from 'styled-components'

import { sizes } from 'styles/theme'
import { screen } from 'styles/screen'

const Section = styled.div`
  margin: 0 auto;
  width: 100%;

  ${screen.lg} {
    max-width: ${sizes.max};
    width: ${sizes.default};
  }
`

export default Section
