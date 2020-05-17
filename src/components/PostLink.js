import React from 'react';
import styled from 'styled-components';

import { font, colors, theme } from '../styles/theme';

const Title = styled.h1`
  color: ${colors.light.primary};
  font-family: ${font.title};
  font-weight: 900;
  margin: 0;
  font-size: 40px;
  letter-spacing: -2px;
  line-height: 1.1;

  a {
    text-decoration: none;
  }
`;

const ItemDate = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ccc;
  line-height: 1.75;
  display: block;
`;

const Text = styled.div`
  margin: 20px 0 50px 0;
  font-family: ${theme.light.fonts.text};
  font-size: 20px;
  font-weight: 500;
`;

const PostLink = ({ post }) => (
  <>
    <Title>
      <a href={post.frontmatter.path}>{post.frontmatter.title}</a>
    </Title>
    <ItemDate>{post.frontmatter.date}</ItemDate>
    <Text>{post.excerpt}</Text>
  </>
);

export default PostLink;
