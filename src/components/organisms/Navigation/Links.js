import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { NavigationContext } from '../../../contexts/NavigationContext';
import { Link } from 'react-scroll';
import { Link as GatsbyLink } from 'gatsby';
import LanguageToggler from '../../atoms/LanguageToggler/LanguageToggler';

const ListItem = styled.li`
	position: relative;
	cursor: pointer;
	margin-top: 15px;
	color: ${({ theme }) => theme.gray};
	font-weight: ${({ theme }) => theme.medium};
	&:hover {
		color: ${({ theme }) => theme.neonBlue};
	}
	${({ theme }) => theme.mq.s} {
		font-size: ${({ theme }) => theme.fontSize.xs};
		&:after {
			width: 150px;
		}
	}
	${({ theme }) => theme.mq.md} {
		margin-left: 35px;
		margin-top: 0;
	}
`;

const StyledLink = styled(Link)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: ${({ theme }) => theme.gray};
  &:before,
  &:after {
    content: "";
    position: absolute;
    transition: transform 0.5s ease;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.neonBlue};
  }
  &:before {
    width: 100%;
    height: 2px;
    transform: translateX(101%);
  }
  &:after {
    width: 2px;
    height: 100%;
    transform: translateY(100%);
  }
  &:hover {
    color: #16ffff;
  }
  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }
  ${({ active }) =>
		active &&
		css`
			color: ${({ theme }) => theme.neonBlue};
			&:before,
			&:after {
				transform: translate(0, 0);
			}
		`}
`;

const StyledGatsbyLink = styled(GatsbyLink)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-family: "Sarala", sans-serif;
  text-decoration: none;
  color: ${({ theme }) => theme.gray};
  font-weight: ${({ theme }) => theme.medium};
  &:hover {
    color: ${({ theme }) => theme.neonBlue};
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    transition: transform 0.5s ease;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.neonBlue};
  }
  &:before {
    width: 100%;
    height: 2px;
    transform: translateX(101%);
  }
  &:after {
    width: 2px;
    height: 100%;
    transform: translateY(100%);
  }
  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }
  ${({ active }) =>
		active &&
		css`
			color: ${({ theme }) => theme.neonBlue};
			&:before,
			&:after {
				transform: translate(0, 0);
			}
		`}
`;

const StyledSpan = styled.span`
	position: relative;
	color: inherit;
	text-decoration: none;
	line-height: 24px;
	display: block;
	padding: 8px;
	&:before,
	&:after {
		content: "";
		position: absolute;
		transition: transform 0.5s ease;
		left: 0;
		top: 0;
		background: ${({ theme }) => theme.neonBlue};
	}
	&:before {
		width: 100%;
		height: 2px;
		transform: translateX(101%);
	}
	&:after {
		width: 2px;
		height: 100%;
		transform: translateY(-100%);
	}
	&:hover:before,
	&:hover:after,
	&:hover > span:before,
	&:hover > span:after {
		transform: translate(0, 0);
	}
	${({ active }) =>
		active &&
		css`
			color: ${({ theme }) => theme.neonBlue};
			&:before,
			&:after {
				transform: translate(0, 0);
			}
		`};
`;

const HomePageLinks = ({ lang, active }) => {
	return (
		<React.Fragment>
			<ListItem>
				<StyledLink active={active === 'home' ? 1 : 0} duration={800} smooth={true} to="home" spy={true}>
					{lang === 'en' && <StyledSpan active={active === 'home' ? 1 : 0}>Home</StyledSpan>}
					{lang === 'pl' && <StyledSpan active={active === 'home' ? 1 : 0}>Strona główna</StyledSpan>}
				</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink
					active={active === 'technologies' ? 1 : 0}
					duration={800}
					offset={-100}
					smooth={true}
					to="technologies"
					spy={true}
				>
					{lang === 'en' && <StyledSpan active={active === 'technologies' ? 1 : 0}>Technologies</StyledSpan>}
					{lang === 'pl' && <StyledSpan active={active === 'technologies' ? 1 : 0}>Technologie</StyledSpan>}
				</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink
					active={active === 'projects' ? 1 : 0}
					duration={800}
					offset={-100}
					smooth={true}
					to="projects"
					spy={true}
				>
					{lang === 'en' && <StyledSpan active={active === 'projects' ? 1 : 0}>Projects</StyledSpan>}
					{lang === 'pl' && <StyledSpan active={active === 'projects' ? 1 : 0}>Projekty</StyledSpan>}
				</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink
					active={active === 'websites' ? 1 : 0}
					duration={800}
					offset={-100}
					smooth={true}
					to="websites"
					spy={true}
				>
					{lang === 'en' && <StyledSpan active={active === 'websites' ? 1 : 0}>Websites</StyledSpan>}
					{lang === 'pl' && <StyledSpan active={active === 'websites' ? 1 : 0}>Strony WWW</StyledSpan>}
				</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink active={active === 'contact' ? 1 : 0} duration={800} smooth={true} to="contact" spy={true}>
					{lang === 'en' && <StyledSpan active={active === 'contact' ? 1 : 0}>Contact</StyledSpan>}
					{lang === 'pl' && <StyledSpan active={active === 'contact' ? 1 : 0}>Kontakt</StyledSpan>}
				</StyledLink>
			</ListItem>
			{/* <ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === '/blog/' ? 1 : 0} to="/blog/">
						<StyledSpan active={active === '/blog/' ? 1 : 0}>Blog</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === '/pl/blog/' ? 1 : 0} to="/pl/blog/">
						<StyledSpan active={active === '/pl/blog/' ? 1 : 0}>Blog</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem> */}
			<ListItem>
				<LanguageToggler lang={lang} />
			</ListItem>
		</React.Fragment>
	);
};

function BlogPageLinks({ lang, active }) {
	return (
		<React.Fragment>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'home' ? 1 : 0} to="/">
						<StyledSpan active={active === 'home' ? 1 : 0}>Home</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'home' ? 1 : 0} to="/pl/">
						<StyledSpan active={active === 'home' ? 1 : 0}>Strona główna</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'technologies' ? 1 : 0} to="/#technologies">
						<StyledSpan active={active === 'technologies' ? 1 : 0}>Technologies</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'technologies' ? 1 : 0} to="/pl/#technologies">
						<StyledSpan active={active === 'technologies' ? 1 : 0}>Technologie</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'projects' ? 1 : 0} to="/#projects">
						<StyledSpan active={active === 'projects' ? 1 : 0}>Projects</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'projects' ? 1 : 0} to="/pl/#projects">
						<StyledSpan active={active === 'projects' ? 1 : 0}>Projekty</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'websites' ? 1 : 0} to="/#websites">
						<StyledSpan active={active === 'websites' ? 1 : 0}>Websites</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'websites' ? 1 : 0} to="/pl/#websites">
						<StyledSpan active={active === 'websites' ? 1 : 0}>Strony WWW</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'contact' ? 1 : 0} to="/#contact">
						<StyledSpan active={active === 'contact' ? 1 : 0}>Contact</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'contact' ? 1 : 0} to="/pl/#contact">
						<StyledSpan active={active === 'contact' ? 1 : 0}>Kontakt</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>

			{/* <ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'blog/' ? 1 : 0} to="/blog/">
						<StyledSpan active={active === 'blog/' ? 1 : 0}>Blog</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'pl/blog/' ? 1 : 0} to="/pl/blog/">
						<StyledSpan active={active === 'pl/blog/' ? 1 : 0}>Blog</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem> */}
			<ListItem>
				<LanguageToggler lang={lang} />
			</ListItem>
		</React.Fragment>
	);
}

const Links = ({ lang }) => {
	const { activeLink, currentPage } = useContext(NavigationContext);

	return currentPage.includes('blog') ? (
		<BlogPageLinks lang={lang} active={currentPage} />
	) : (
		<HomePageLinks lang={lang} active={activeLink} />
	);
};

export default Links;
