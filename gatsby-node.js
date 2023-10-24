const path = require('path');
const { convertToPath } = require('./src/utils/convertTag');
exports.createPages = async ({ graphql, actions }) => {
	const { createPage, deletePage } = actions;

	const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
	const tagsTemplate = path.resolve('./src/templates/tags.js');
	const projectTemplate = path.resolve('./src/templates/project.js');
	const websiteTemplate = path.resolve('./src/templates/website.js');

	const res = await graphql(`
		query {
			allContentfulBlogPost {
				nodes {
					slug
					language
					tags
				}
			}
			allContentfulProject {
				nodes {
					language
					slug
				}
			}
			allContentfulWebsite {
				nodes {
					language
					slug
				}
			}
		}
	`);

	if (res.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	const posts = res.data.allContentfulBlogPost.nodes;
	const projects = res.data.allContentfulProject.nodes;
	const websites = res.data.allContentfulWebsite.nodes;
	const tags = [...new Set(posts.map(post => post.tags).flat())];

	posts.forEach(edge => {
		createPage({
			component: blogPostTemplate,
			path: `/${edge.language}/blog/${edge.slug}`,
			context: {
				slug: edge.slug,
				language: edge.language,
			},
		});
	});

	projects.forEach(project => {
		createPage({
			component: projectTemplate,
			path: `/${project.language}/projects/${project.slug}`,
			context: {
				slug: project.slug,
				language: project.language,
			},
		});
	});

	websites.forEach(website => {
		createPage({
			component: websiteTemplate,
			path: `/${website.language}/websites/${website.slug}`,
			context: {
				slug: website.slug,
				language: website.language,
			},
		});
	});

	tags.forEach(tag => {
		const languages = ['pl', 'en'];
		languages.forEach(language => {
			createPage({
				component: tagsTemplate,
				path: `/${language}/blog/tags/${convertToPath(tag)}`,
				context: {
					tag,
					language,
				},
			});
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
