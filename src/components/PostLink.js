import React from 'react';
import styled from 'styled-components';

import Link from '../components/Link';
import { font, colors } from '../styles/theme';

const Title = styled.h1`
  color: ${colors.light.primary};
  font-family: ${font.title};
  font-weight: 900;
  margin: 0;
  font-size: 28px;
  letter-spacing: -2px;
  line-height: 1.1;
  text-transform: uppercase;
`;

const ItemDate = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ccc;
  line-height: 1.75;
  display: block;
`;

const Text = styled.div`
  margin: 20px 0;
`;

const PostLink = ({ post }) => (
  <Link href={post.frontmatter.path}>
    <Title>{post.frontmatter.title}</Title>
    <ItemDate>{post.frontmatter.date}</ItemDate>
    <Text>{post.excerpt}</Text>
  </Link>
);

export default PostLink;
