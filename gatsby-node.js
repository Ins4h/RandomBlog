const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve(`src/templates/BlogTemplate.js`)
  const result = await graphql(`
    query MyQuery {
      allMarkdownRemark(filter: { frontmatter: { id: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              path
            }
            id
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.map(edge => {
    createPage({
      path: edge.node.frontmatter.path,
      component: blogTemplate,
      context: {
        id: edge.node.id,
      },
    })
  })
}
