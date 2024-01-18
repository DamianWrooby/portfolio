import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
	background: ${({ theme }) => theme.neonBlue};
	padding: 30px 0;
`;

const Text = styled.p`
	color: ${({ theme }) => theme.darkBlue};
	text-align: center;
	font-size: ${({ theme }) => theme.fontSize.xs};
	${({ theme }) => theme.mq.md} {
		font-size: ${({ theme }) => theme.fontSize.s};
	}
	font-weight: ${({ theme }) => theme.regular};
`;

const currentYear = new Date().getFullYear();
const textPl = `${currentYear} Damian Wróblewski. Wszelkie prawa zastrzeżone.`;
const textEn = `${currentYear} Damian Wróblewski. All rights reserved.`;

const Footer = ({ lang }) => (
	<Wrapper>
		{lang === "en" && (
			<Text>&copy; {textEn}</Text>
		)}
		{lang === "pl" && (
			<Text>&copy; {textPl}</Text>
		)}
	</Wrapper>
);

export default Footer;
