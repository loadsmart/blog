import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Section from './Section';
import SwitchTheme from './SwitchTheme';
import { font, theme } from '../styles/theme';

const Logo = styled.span`
  display: inline-block;
  text-align: left;
  width: 40%;

  svg {
    vertical-align: middle;
  }
`;

const Wrapper = styled(Section)`
  position: relative;
  max-width: ${theme.light.sizes.default};
`;

const Nav = styled.nav`
  color: ${theme.light.colors.primary};
  padding: 25px 0;
  margin: 0 auto;
  position: fixed;
  text-transform: uppercase;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 10;

  a {
    display: inline-block;
    margin-left: 10px;
    line-height: 22px;
    font-family: ${font.title};
    font-weight: 900;
    text-decoration: none;
    vertical-align: sub;
  }
`;

const Links = styled.div`
    display: inline-block;
    position: absolute;
    right: 0;
    vertical-align: top;

    a {
      padding: 0;
    }
  }
`;

const Header = () => (
  <Nav>
    <Wrapper>
      <Logo>
        <svg
          width='131'
          height='22'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 130.73 21.95'
        >
          <defs>
            <symbol id='a' viewBox='0 0 208.77 208.77'>
              <path
                fill='#14d64d'
                d='M73.46 0v65.72h65.72a3.87 3.87 0 0 1 3.82 3.87v65.72h65.72V7.73A7.73 7.73 0 0 0 201 0z'
              ></path>
              <path
                fill='#14d64d'
                d='M65.72 139.19V3.87L2.26 67.33A7.73 7.73 0 0 0 0 72.8V201a7.72 7.72 0 0 0 7.72 7.72H136a7.73 7.73 0 0 0 5.47-2.26L204.91 143H69.59a3.86 3.86 0 0 1-3.87-3.81z'
              ></path>
            </symbol>
          </defs>
          <g data-name='Layer 1'>
            <path
              fill='#14d64d'
              d='M128.61 14.05v-3.22h2.12V7.94h-2.12V3.78l-3.09 1.63v8.67c0 3.53 1.17 4.7 4.76 4.7h.45V16c-1.89 0-2.12-.26-2.12-2m-6-3.23h2V7.94h-1.24a3.2 3.2 0 0 0-3.11 1.78V7.94h-3.07v10.84h3.09v-5.12c0-2 .72-2.84 2.37-2.84m-10.18 8h3.09V7.94h-3.09V9a4.61 4.61 0 0 0-3.36-1.28 5.39 5.39 0 0 0-5.48 5.63A5.46 5.46 0 0 0 109 19a4.47 4.47 0 0 0 3.4-1.43zm.09-5.44a2.87 2.87 0 0 1-2.89 2.93 2.92 2.92 0 1 1 0-5.83 2.85 2.85 0 0 1 2.89 2.9m-13.2 5.44h3.13v-6.65c0-2.8-1.42-4.44-4.28-4.44a4.34 4.34 0 0 0-3.52 1.71 4.19 4.19 0 0 0-6.47-.35V7.94h-3.11v10.84h3.09v-5.92c0-1.82.86-2.6 2-2.6 1.38 0 2 .85 2 2.3v6.22h3.13v-5.92c0-1.82.86-2.6 2-2.6 1.38 0 2 .85 2 2.3zM77.47 11c0-.48.45-.89 1.47-.89A2.12 2.12 0 0 1 81 11.35l2.73-1.11c-.8-1.52-2.24-2.51-4.73-2.51-2.8 0-4.62 1.58-4.62 3.4 0 2.32 2 3 4.06 3.34 1.31.24 2.41.41 2.41 1s-.54 1-1.56 1a2.36 2.36 0 0 1-2.4-1.47l-3 1.11C74.75 18 76.39 19 79.12 19c3.25 0 4.78-2 4.78-3.62 0-2.34-2.19-3-4.08-3.36-1.69-.32-2.34-.5-2.34-1M70 18.78h3.09V3H70v6a4.61 4.61 0 0 0-3.36-1.28 5.39 5.39 0 0 0-5.48 5.63A5.46 5.46 0 0 0 66.6 19a4.47 4.47 0 0 0 3.4-1.44zm.09-5.44a2.87 2.87 0 0 1-2.89 2.93 2.92 2.92 0 1 1 0-5.83 2.85 2.85 0 0 1 2.89 2.9M56.9 18.78H60V7.94h-3.1V9a4.61 4.61 0 0 0-3.36-1.28 5.39 5.39 0 0 0-5.48 5.63A5.46 5.46 0 0 0 53.49 19a4.47 4.47 0 0 0 3.4-1.43zm.1-5.44a2.87 2.87 0 0 1-2.89 2.93 2.92 2.92 0 1 1 0-5.83 2.85 2.85 0 0 1 2.89 2.9m-9.87 0a5.84 5.84 0 0 0-11.68 0 5.84 5.84 0 0 0 11.68 0m-3 0a2.83 2.83 0 0 1-2.84 2.82 2.82 2.82 0 1 1 0-5.63 2.83 2.83 0 0 1 2.84 2.82m-13 5.42h3.09V3h-3.08z'
            ></path>
            <use
              width='208.77'
              height='208.77'
              transform='scale(.11)'
              xlinkHref='#a'
            ></use>
          </g>
        </svg>
        <Link to='/'>Engineering</Link>
      </Logo>
      <Links>
        <SwitchTheme />
      </Links>
    </Wrapper>
  </Nav>
);

export default Header;
