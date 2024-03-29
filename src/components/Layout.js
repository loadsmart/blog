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

import styled from 'styled-components'

import GlobalStyle from 'components/GlobalStyle'
import Header from 'components/Header'

import { screen } from 'styles/screen'
import { fonts } from 'styles/theme'

const Wrapper = styled.div`
  font-family: ${fonts.text};
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

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyle />

      <Wrapper>
        <Header />
        <Section>{children}</Section>
      </Wrapper>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
