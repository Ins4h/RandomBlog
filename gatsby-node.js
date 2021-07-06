const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve(`src/templates/BlogTemplate.js`)
  const result = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
            id
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.map(edge => {
    createPage({
      path: edge.node.frontmatter.slug,
      component: blogTemplate,
      context: {
        id: edge.node.id,
      },
    })
  })
}
