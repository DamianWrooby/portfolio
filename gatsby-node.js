const path = require('path');
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
	const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
            language
          }
        }
      }
    }
  `);
	res.data.allContentfulBlogPost.edges.forEach((edge) => {
		createPage({
			component: blogPostTemplate,
			path: `/${edge.node.language}/blog/${edge.node.slug}`,
			context: {
				slug: edge.node.slug
			}
		});
	});
};
