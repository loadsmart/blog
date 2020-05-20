import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';

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
  width: 20%;
  color: #6a7884;
  font-family: ${theme.light.fonts.title};
  font-size: 14px;
  letter-spacing: 0;
`;

const Date = styled.div`
  font-weight: bold;
  line-height: 1em;
  margin-bottom: 10px;
`;

const Author = styled.div`
  font-weight: 300;
  line-height: 16px;
`;

const Article = styled(Block)`
  color: #1d2124;
  display: inline-block;
  width: 80%;
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

const PostLink = ({ post }) => (
  <Wrapper>
    <Publication>
      <Date>{post.frontmatter.date}</Date>
      <Author>
        by <br />
        {post.frontmatter.author}
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
