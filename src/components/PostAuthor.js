import React from 'react'
import styled from 'styled-components'

import { screen } from 'styles/screen'

const Author = styled.div`
  color: var(--text-primary);
  display: inline-block;

  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1.25em;
  width: 50%;

  br {
    ${screen.lg} {
      display: inline-block;
    }
  }

  ${screen.lg} {
    display: block;
    width: auto;
  }
`

const TwitterHandle = styled.a`
  display: none;
  font-size: 12px;
  font-weight: 300;
  margin-top: 5px;
  text-decoration: none;
  text-transform: lowercase;

  &:hover {
    text-decoration: underline;
  }

  ${screen.lg} {
    display: inline-block;
  }
`

const AuthorDetails = styled.div`
  display: inline-block;
  vertical-align: top;
`

const PostAuthor = ({ author, twitter }) => (
  <Author>
    <AuthorDetails>
      {author}
      <br />
      {twitter && (
        <TwitterHandle href={`https://twitter.com/${twitter}`}>
          @{twitter}
        </TwitterHandle>
      )}
    </AuthorDetails>
  </Author>
)

export default PostAuthor
