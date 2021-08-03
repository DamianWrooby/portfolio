const path = require('path');
exports.createPages = async ({ graphql, actions }) => {
	const { createPage, deletePage } = actions;

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

exports.onCreatePage = async ({ page, actions }) => {
	const { createPage, deletePage } = actions;
	// Check if the page is a localized 404
	if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
		const oldPage = { ...page };
		// Get the language code from the path, and match all paths
		// starting with this code (apart from other valid paths)
		const langCode = page.path.split(`/`)[1];
		page.matchPath = `/${langCode}/*`;
		// Recreate the modified page
		deletePage(oldPage);
		createPage(page);
	}
};
