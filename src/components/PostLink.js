import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';
import { screen } from '../styles/screen';

const Wrapper = styled.div`
  border-bottom: 1px solid #bdc7d0;
  margin-bottom: 30px;
`;

const Block = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const Publication = styled(Block)`
  display: inline-block;
  width: 100%;
  color: #6a7884;
  font-family: ${theme.light.fonts.title};
  font-size: 14px;
  letter-spacing: 0;

  ${screen.lg} {
    width: 20%;
  }
`;

const Date = styled.div`
  display: inline-block;
  font-weight: bold;
  display: inline-block;
  line-height: 1em;
  margin: 0 10px 10px 0;

  ${screen.lg} {
    display: block;
  }
`;

const Author = styled.div`
  display: inline-block;
  font-weight: 300;
  line-height: 1em;
  width: 50%;

  br {
    display: none;

    ${screen.lg} {
      display: inline-block;
    }
  }

  ${screen.lg} {
    display: block;
    width: auto;
  }
`;

const Article = styled(Block)`
  color: #1d2124;
  display: inline-block;
  width: 100%;

  ${screen.lg} {
    width: 80%;
  }
`;

const Title = styled.h1`
  font-family: ${theme.light.fonts.title};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 1em;
  margin-bottom: 10px;

  a {
    text-decoration: none;
  }
`;

const Text = styled.p`
  margin: 20px 0 10px 0;
  font-family: ${theme.light.fonts.text};
  font-size: 16px;
  font-weight: 400;
`;

const ReadMore = styled.a`
  color: #6a7884;
  display: block;
  font-family: ${theme.light.fonts.title};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 18px;
  margin-bottom: 15px;
  text-align: right;
`;

const TwitterHandle = styled.a`
  display: inline-block;
  margin-top: 5px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PostLink = ({ post }) => (
  <Wrapper>
    <Publication>
      <Date>{post.frontmatter.date}</Date>
      <Author>
        by <br />
        <TwitterHandle href={post.frontmatter.twitter}>
          {post.frontmatter.author}
        </TwitterHandle>
      </Author>
    </Publication>
    <Article>
      <Title>
        <a href={post.frontmatter.path}>{post.frontmatter.title}</a>
      </Title>
      <Text>{post.excerpt}</Text>
      <ReadMore href={post.frontmatter.path}>Read more</ReadMore>
    </Article>
  </Wrapper>
);

export default PostLink;
