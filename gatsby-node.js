/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// note we do use https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/
// for more info read https://www.gatsbyjs.org/docs/authentication-tutorial/#creating-client-only-routes

const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      github {
        organization(login: "Healthwise") {
          team(slug: "healthwise-frontend") {
            members(first: 5) {
              edges {
                node {
                  login
                }
              }
            }
          }
        }
      }
    }
  `)

  data.github.organization.team.members.edges.forEach(({ node }) => {
    createPage({
      path: `resumes/${node.login}`,
      component: path.resolve(`./src/templates/UserPageGh.js`),
      context: {
        username: node.login,
      },
    })
  })
}
