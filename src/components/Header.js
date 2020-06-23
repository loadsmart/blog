import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import LogoMobile from './LogoMobile'
import LogoDesktop from './LogoDesktop'
import { theme } from 'styles/theme'
import { screen } from 'styles/screen'

const Wrapper = styled(Section)`
  position: relative;
  width: 100%;

  ${screen.lg} {
    max-width: ${theme.light.sizes.max};
    width: ${theme.light.sizes.default};
  }
`

const WrapperLogoDesktop = styled.div`
  display: none;

  ${screen.lg} {
    display: inline-block;
  }
`

const WrapperLogoMobile = styled.div`
  display: inline-block;

  ${screen.lg} {
    display: none;
  }
`

const Nav = styled.nav`
  background: #e7ebef;
  color: ${theme.light.colors.primary};
  padding: 15px 15px 25px 15px;
  margin: 0 auto;
  text-transform: uppercase;
  width: 100%;

  ${screen.lg} {
    padding: 25px 15px;
  }
`

const Logo = styled.a`
  display: inline-block;
  text-align: left;
  width: 40%;

  span {
    color: #6a7884 !important;
    display: inline-block;
    font-family: ${theme.light.fonts.text};
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 22px;
    text-decoration: none;
    vertical-align: bottom;

    ${screen.lg} {
      margin-left: 6px;
    }

    &:before {
      content: '/';
      display: none;
      margin-right: 3px;

      ${screen.lg} {
        display: inline-block;
      }
    }
  }

  svg {
    vertical-align: middle;
  }
`

const Links = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  vertical-align: top;

  a {
    padding: 0;
    color: #333b43 !important;
    display: inline-block;
    font-family: ${theme.light.fonts.title};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 16px;
    margin-left: 15px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Header = () => (
  <Nav>
    <Wrapper>
      <Logo href="/">
        <WrapperLogoMobile>
          <LogoMobile />
        </WrapperLogoMobile>
        <WrapperLogoDesktop>
          <LogoDesktop />
        </WrapperLogoDesktop>
      </Logo>
      <Links>
        <a href="https://loadsmart.com/careers/">Carreers</a>
        <a href="https://github.com/loadsmart/">Github</a>
      </Links>
    </Wrapper>
  </Nav>
)

export default Header
