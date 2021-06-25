import React from 'react';
import styled from 'styled-components';

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

const Footer = ({ lang }) => (
	<Wrapper>
		{lang === 'en' && <Text>&copy; 2021 Damian Wróblewski. All rights reserved.</Text>}
		{lang === 'pl' && <Text>&copy; 2021 Damian Wróblewski. Wszelkie prawa zastrzeżone.</Text>}
	</Wrapper>
);

export default Footer;
