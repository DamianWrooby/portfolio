import React from 'react';
import styled from 'styled-components';
import polandIcon from '../../../assets/icons/poland.svg';
import britishIcon from '../../../assets/icons/united kingdom.svg';
import { Link } from 'gatsby';

const Wrapper = styled.div``;

const Icon = styled.i`
	margin: 8px 0;
	transition: all 0.2 ease;
	&:before {
		content: "";
		display: inline-block;
		width: 20px;
		height: 20px;
		background: ${(props) => `url(${props.icon}) no-repeat top center`};
		background-size: 100%;
		margin-right: 10px;
	}
	&:hover {
		opacity: 0.8;
	}
`;

let path;

if (typeof window !== 'undefined') {
	path = window.location.pathname;
} else {
	path = '/';
}

const LanguageToggler = ({ lang, location }) => {
	return (
		<Wrapper>
			{lang === 'pl' && (
				<Link to={`${path}`}>
					<Icon icon={britishIcon} />
				</Link>
			)}
			{lang === 'en' && (
				<Link to={`pl/${path}`}>
					<Icon icon={polandIcon} />
				</Link>
			)}
		</Wrapper>
	);
};

export default LanguageToggler;
