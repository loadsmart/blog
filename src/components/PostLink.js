import React from 'react'
import styled from 'styled-components'

import { fonts } from 'styles/theme'
import { screen } from 'styles/screen'
import PostAuthor from './PostAuthor'

const Wrapper = styled.div`
  border-bottom: 1px solid #bdc7d0;
  margin-bottom: 30px;
`

const Block = styled.div`
  display: inline-block;
  vertical-align: top;
`

const Publication = styled(Block)`
  display: inline-block;
  width: 100%;
  color: var(--text-primary);
  font-family: ${fonts.title};
  font-size: 14px;
  letter-spacing: 0;

  ${screen.lg} {
    width: 20%;
  }
`

const Date = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.25em;
  margin: 0 10px 5px 0;

  ${screen.lg} {
    display: block;
    margin: 0 10px 15px 0;
  }
`

const Article = styled(Block)`
  color: var(--text-primary);
  display: inline-block;
  width: 100%;

  ${screen.lg} {
    width: 80%;
  }
`

const Title = styled.h1`
  font-family: ${fonts.title};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 1.5em;
  margin-bottom: 10px;

  a {
    text-decoration: none;
  }
`

const Text = styled.p`
  margin: 20px 0 10px 0;
  font-family: ${fonts.text};
  font-size: 17px;
  font-weight: 400;
`

const ReadMore = styled.a`
  color: var(--text-secondary);
  display: block;
  font-family: ${fonts.title};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 18px;
  margin-bottom: 15px;
  text-align: right;
`

const PostLink = ({ post }) => (
  <Wrapper>
    <Publication>
      <Date>{post.frontmatter.date}</Date>
      <PostAuthor
        author={post.frontmatter.author}
        twitter={post.frontmatter.twitter}
      />
    </Publication>
    <Article>
      <Title>
        <a href={post.frontmatter.path}>{post.frontmatter.title}</a>
      </Title>
      <Text>{post.excerpt}</Text>
      <ReadMore href={post.frontmatter.path}>read more</ReadMore>
    </Article>
  </Wrapper>
)

export default PostLink
