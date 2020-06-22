/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'

import 'styles/typography.css'
import 'styles/layout.css'

import styled, { createGlobalStyle } from 'styled-components'

import { screen } from 'styles/screen'
import { theme } from 'styles/theme'

import Header from './Header'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.light.colors.text}
  }
`

const Wrapper = styled.div`
  font-family: ${theme.light.fonts.text};
  padding: 15px 7px 15px 0;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;

  a {
    color: inherit;
  }
`

const Section = styled.div`
  display: inline-block;
  padding: 0 15px 15px 15px;
  vertical-align: top;
  width: 100%;

  ${screen.lg} {
    padding: 0;
  }
`

const Layout = ({ children }) => (
  <div>
    <GlobalStyle />

    <Wrapper>
      <Header />
      <Section>{children}</Section>
    </Wrapper>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
