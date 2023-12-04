import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import polandIcon from '../../../assets/icons/poland.svg';
import britishIcon from '../../../assets/icons/united-kingdom.svg';

const Wrapper = styled.div`
	margin-right: 10px;
`;

const Icon = styled.i`
	margin: 8px 0;
	transition: all 0.2 ease;
	&:before {
		content: '';
		display: inline-block;
		width: 20px;
		height: 20px;
		background: ${props => `url(${props.icon}) no-repeat top center`};
		background-size: 100%;
	}
	&:hover {
		opacity: 0.8;
	}
`;

const LanguageToggler = ({ lang }) => {
	const [path, setPath] = useState('/');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const pathName = window.location.pathname;
			const blogRegex = /\/blog\/[a-z0-9\-]/;
			const projectRegex = /\/projects\/[a-z0-9\-]/;
			const websiteRegex = /\/websites\/[a-z0-9\-]/;
			if (pathName.match(blogRegex)) {
				setPath('/blog');
			} else if (pathName.match(websiteRegex) || pathName.match(projectRegex)) {
				if (lang === 'en') {
					setPath(pathName.replace('en/', ''));
				} else {
					setPath(pathName.replace('pl/', 'en/'));
				}
			} else {
				setPath(pathName);
			}
		} else {
			setPath('/');
		}
	}, []);

	return (
		<Wrapper>
			{lang === 'en' && (
				<Link to={`/pl${path}`}>
					<Icon icon={polandIcon} />
				</Link>
			)}
			{lang === 'pl' && (
				<Link to={path.replace('/pl/', '/')}>
					<Icon icon={britishIcon} />
				</Link>
			)}
		</Wrapper>
	);
};

export default LanguageToggler;
