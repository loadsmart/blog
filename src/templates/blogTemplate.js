import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Title from '../components/Title';
import Section from '../components/Section';
import Text from '../components/Text';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import profile from './ls-icon.png';

import { screen } from '../styles/screen';
import { theme } from '../styles/theme';

const PostWrapper = styled.div`
  .gatsby-highlight {
    margin: 10px 0 20px;

    pre {
      background-color: ${theme.light.colors.secondary};
    }
  }
`;

const Footer = styled.h1`
  margin: 75px 0 25px 0;
  font-size: 1em;
  text-transform: uppercase;

  img,
  ul {
    display: block;
    margin: 0;

    ${screen.md} {
      display: inline-block;
      vertical-align: middle;
    }
  }

  img {
    margin: 0 0 25px 0;

    ${screen.md} {
      margin: 0 25px 0 0;
    }
  }

  li {
    display: block;
    padding: 10px 10px 10px 0;

    ${screen.md} {
      display: inline-block;
      margin-right: 25px;
      padding: 0;
    }
  }

  ${screen.md} {
    margin: 100px 0 15px 5px;
    letter-spacing: -0.04em;
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Section>
        <span>{frontmatter.date}</span>

        <PostWrapper>
          <Title>{frontmatter.title}</Title>
          <Text>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Text>
        </PostWrapper>

        <Footer>
          <img src={profile} alt='profile' width={25} height={25} />
          <ul>
            <li>
              <a
                href='https://www.youtube.com/channel/x'
                target='_blank'
                rel='noopener noreferrer'
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href='https://twitter.com/loadsmartus'
                target='_blank'
                rel='noopener noreferrer'
              >
                Twitter
              </a>
            </li>
          </ul>
        </Footer>
      </Section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 500)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
