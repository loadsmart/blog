import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #ccc;
  border-radius: 50%;
  color: #fff;
  display: inline-block;
  height: 36px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 36px;

  svg {
    position: absolute;
    left: 0;
    bottom: -5px;
  }
`

const Avatar = (props) => (
  <Wrapper>
    <svg
      viewBox="0 0 48 48"
      aria-label="user icon"
      fill="currentColor"
      fillRule="evenodd"
      width="100%"
      {...props}
    >
      <path d="M6.5 44c-.69 0-1.25-.56-1.25-1.25v-5.516a6.257 6.257 0 014.111-5.875C12.335 30.282 17.29 29 24 29c6.71 0 11.665 1.282 14.639 2.359a6.257 6.257 0 014.111 5.875v5.516c0 .69-.56 1.25-1.25 1.25zM24 26.5c-5.514 0-10-4.486-10-10V14c0-5.514 4.486-10 10-10s10 4.486 10 10v2.5c0 5.514-4.486 10-10 10z" />
    </svg>
  </Wrapper>
)

export default Avatar
