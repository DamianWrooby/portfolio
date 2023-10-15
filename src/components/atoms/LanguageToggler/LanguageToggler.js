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
			const blogRegex = /\/blog\/[a-z0-9\-]/;
			const projectRegex = /\/projects\/[a-z0-9\-]/;
			if (window.location.pathname.match(blogRegex)) {
				setPath('/blog');
			} else if (window.location.pathname.match(projectRegex)) {
				setPath(`/projects`);
			} else {
				setPath(window.location.pathname);
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
