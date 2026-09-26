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

const DEFAULT_LANGUAGE = 'en';
const PAGES_DIR = path.resolve('./src/pages');

const getLocalizedRoute = componentPath => {
	const relative = path.relative(PAGES_DIR, componentPath).split(path.sep).join('/');
	const [name, ...rest] = relative.split('.');
	const route = `/${name.replace(/(^|\/)index$/, '')}/`.replace(/\/+/g, '/');

	if (rest.length === 2) {
		const language = rest[0];
		const prefix = language === DEFAULT_LANGUAGE ? '' : `/${language}`;
		return { path: `${prefix}${route}`, language };
	}

	const [firstSegment] = name.split('/');
	const language = /^[a-z]{2}$/.test(firstSegment) && name.includes('/') ? firstSegment : DEFAULT_LANGUAGE;
	return { path: route, language };
};

const isOwnPage = componentPath => !path.relative(PAGES_DIR, componentPath).startsWith('..');

exports.onCreatePage = async ({ page, actions }) => {
	const { createPage, deletePage } = actions;

	if (page.context.slug || !isOwnPage(page.componentPath)) return;

	const { path: localizedPath, language } = getLocalizedRoute(page.componentPath);
	const newPage = {
		...page,
		path: page.path === '/404.html' ? '/404.html' : localizedPath,
		context: { ...page.context, slug: localizedPath, langKey: language },
	};

	if (newPage.path.match(/^\/[a-z]{2}\/404\/$/)) {
		const langCode = newPage.path.split(`/`)[1];
		newPage.matchPath = `/${langCode}/*`;
	}

	deletePage(page);
	createPage(newPage);
};
