import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import useDarkMode from 'use-dark-mode'

import Title from 'components/Title'
import PostDate from 'components/PostDate'
import Section from 'components/Section'
import Text from 'components/Text'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import PostAuthor from 'components/PostAuthor'

import { fonts } from 'styles/theme'

const PostWrapper = styled.div`
  .gatsby-highlight {
    margin: 10px 0 20px;
  }
`

const MetaWrapper = styled.div`
  border-bottom: 1px solid #bdc7d0;
  font-family: ${fonts.title};
  padding: 10px 0;
`

export const Comments = () => {
  const darkMode = useDarkMode(false)

  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return
        }
        const scriptElem = document.createElement('script')
        scriptElem.src = 'https://utteranc.es/client.js'
        scriptElem.async = true
        scriptElem.crossOrigin = 'anonymous'
        scriptElem.setAttribute('repo', 'loadsmart/blog')
        scriptElem.setAttribute('issue-term', 'og:title')
        scriptElem.setAttribute('label', 'comments')
        scriptElem.setAttribute(
          'theme',
          darkMode.value ? 'github-dark' : 'github-light'
        )
        elem.innerHTML = ''
        elem.appendChild(scriptElem)
      }}
    />
  )
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt, fields } = markdownRemark
  const { readingTime } = fields

  return (
    <Layout>
      <SEO title={frontmatter.title} excerpt={excerpt} />
      <Section>
        <PostWrapper>
          <Title>{frontmatter.title}</Title>
          <MetaWrapper>
            <PostAuthor author={frontmatter.author} />
            <PostDate>
              {frontmatter.date} • {readingTime.text}
            </PostDate>
          </MetaWrapper>
          <Text>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Text>
        </PostWrapper>
        {frontmatter.comments && <Comments />}
      </Section>
    </Layout>
  )
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
        comments
        author
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
