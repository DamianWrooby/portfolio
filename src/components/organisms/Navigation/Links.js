import { Link as GatsbyLink } from 'gatsby';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { NavigationContext } from '../../../contexts/NavigationContext';
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

const StyledGatsbyLink = styled(GatsbyLink)`
	position: relative;
	display: inline-block;
	overflow: hidden;
	font-family: 'Sarala', sans-serif;
	text-decoration: none;
	color: ${({ theme }) => theme.gray};
	font-weight: ${({ theme }) => theme.medium};
	&:hover {
		color: ${({ theme }) => theme.neonBlue};
	}
	&:before,
	&:after {
		content: '';
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
		content: '';
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

const LinkList = ({ lang, active }) => {
	return (
		<React.Fragment>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'home-page' ? 1 : 0} to="/">
						<StyledSpan active={active === 'home-page' ? 1 : 0}>
							Home
						</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink active={active === 'home-page' ? 1 : 0} to="/pl/">
						<StyledSpan active={active === 'home-page' ? 1 : 0}>
							Strona główna
						</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink active={active === 'blog-page' ? 1 : 0} to="/blog">
						<StyledSpan active={active === 'blog-page' ? 1 : 0}>
							Blog
						</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink
						active={active === 'pl/blog-page' ? 1 : 0}
						to="/pl/blog">
						<StyledSpan active={active === 'pl/blog-page' ? 1 : 0}>
							Blog
						</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink
						active={active === 'projects-page' ? 1 : 0}
						to="/projects">
						<StyledSpan active={active === 'projects-page' ? 1 : 0}>
							Projects
						</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink
						active={active === 'pl/projects-page' ? 1 : 0}
						to="/pl/projects">
						<StyledSpan active={active === 'pl/projects-page' ? 1 : 0}>
							Projekty
						</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink
						active={active === 'websites-page' ? 1 : 0}
						to="/websites">
						<StyledSpan active={active === 'websites-page' ? 1 : 0}>
							Websites
						</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink
						active={active === 'pl/websites-page' ? 1 : 0}
						to="/pl/websites">
						<StyledSpan active={active === 'pl/websites-page' ? 1 : 0}>
							Strony internetowe
						</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				{lang === 'en' && (
					<StyledGatsbyLink
						active={active === 'contact' ? 1 : 0}
						to="/#contact">
						<StyledSpan active={active === 'contact' ? 1 : 0}>
							Contact
						</StyledSpan>
					</StyledGatsbyLink>
				)}
				{lang === 'pl' && (
					<StyledGatsbyLink
						active={active === 'contact' ? 1 : 0}
						to="/pl/#contact">
						<StyledSpan active={active === 'contact' ? 1 : 0}>
							Kontakt
						</StyledSpan>
					</StyledGatsbyLink>
				)}
			</ListItem>
			<ListItem>
				<LanguageToggler lang={lang} />
			</ListItem>
		</React.Fragment>
	);
};

const Links = ({ lang }) => {
	const { activeLink, currentPage } = useContext(NavigationContext);

	return currentPage === 'home-page' ? (
		<LinkList lang={lang} active={activeLink} />
	) : (
		<LinkList lang={lang} active={currentPage} />
	);
};

export default Links;
