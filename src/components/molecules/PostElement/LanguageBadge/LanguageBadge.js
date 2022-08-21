import React from "react";
import styled from "styled-components";

import polandIcon from "../../../../assets/icons/poland.svg";
import britishIcon from "../../../../assets/icons/united-kingdom.svg";

const Wrapper = styled.div`
	position: absolute;
	padding: 1rem;
	z-index: 1;
`;

const Icon = styled.i`
	margin: 8px 0;
	transition: all 0.2 ease;
	&:before {
		content: "";
		display: inline-block;
		width: 23px;
		height: 23px;
		background: ${props => `url(${props.icon}) no-repeat top center`};
		background-size: 100%;
	}
`;

const LanguageBadge = ({ lang }) => {
	return (
		<Wrapper>
			{lang === "pl" && <Icon icon={polandIcon} />}
			{lang === "en" && <Icon icon={britishIcon} />}
		</Wrapper>
	);
};

export default LanguageBadge;
