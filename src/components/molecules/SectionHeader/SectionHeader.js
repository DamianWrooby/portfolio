import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
	width: 100%;
	text-align: center;
	padding: 0 0 80px 0;
	z-index: 3;
`;

const Header = styled.h2`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xxl};
	font-weight: ${({ theme }) => theme.bold};
	color: white;
	padding: 0 0 25px 0;
	${({ theme }) => theme.mq.md} {
		font-size: ${({ theme }) => theme.fontSize.xxxl};
	}
`;
const Paragraph = styled.p`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.m};
	color: ${({ theme }) => theme.gray};
	line-height: 1.3;
	margin: auto;
	width: 90%;
	${({ theme }) => theme.mq.md} {
		width: 70%;
	}
	${({ theme }) => theme.mq.xl} {
		width: 50%;
	}
`;

const SectionHeader = ({ className, heading, paragraph }) => {
	return (
		<Wrapper className={className}>
			<Header>{heading}</Header>
			<Paragraph>{paragraph}</Paragraph>
		</Wrapper>
	);
};

SectionHeader.defaultProps = {
	paragraph: ''
};

SectionHeader.propTypes = {
	heading: PropTypes.string.isRequired,
	paragraph: PropTypes.string
};

export default SectionHeader;
