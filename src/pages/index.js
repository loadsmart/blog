import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import useDarkMode from 'use-dark-mode'

import PostLink from 'components/PostLink'
import Section from 'components/Section'
import Layout from 'components/Layout'
import SEO from 'components/SEO'

import { screen } from 'styles/screen'

const Wrapper = styled(Section)`
  background: var(--background);
  ${screen.lg} {
    margin-top: 20px;
  }
`

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />)

  useDarkMode(false)

  return (
    <Layout>
      <SEO title={'Loadsmart Engineering'} />
      <Wrapper>
        <div>{Posts}</div>
      </Wrapper>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 500)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            author
            twitter
          }
        }
      }
    }
  }
`
