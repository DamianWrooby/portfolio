import PropTypes from "prop-types";
import React from "react";
import styled, { css, keyframes } from "styled-components";

const StyledButton = styled.button`
	position: relative;
	cursor: pointer;
	font-size: ${({ theme }) => theme.fontSize.xs};
	text-align: center;
	background: #03e9f4;
	color: ${({ theme }) => theme.dark};
	display: inline-block;
	font-family: ${({ theme }) => theme.fonts.subFont};
	padding: 20px 10px;
	text-decoration: none;
	text-transform: uppercase;
	transition: 0.5s;
	letter-spacing: 4px;
	overflow: hidden;
	margin-right: 20px;
	&:hover {
		background: ${({ theme }) => theme.dark};
		color: ${({ theme }) => theme.neonBlue};
		${({ animation }) =>
			animation &&
			css`
				&:hover {
					background: #03e9f4;
					color: ${({ theme }) => theme.dark};
					box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
						0 0 200px #03e9f4;
					-webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
				}
			`}
	}
	${({ animation }) =>
		animation &&
		css`
			background: transparent;
			color: #16ffff;
		`};
	${({ color }) =>
		color === "blue" &&
		css`
			background: #03e9f4;
			color: ${({ theme }) => theme.dark};
		`};
	${({ color }) =>
		color === "green" &&
		css`
			border-color: ${({ theme }) => theme.dark};
			background: ${({ theme }) => theme.green};
			&:hover {
				background: ${({ theme }) => theme.green};
				color: ${({ theme }) => theme.dark};
			}
		`};
	${({ color }) =>
		color === "red" &&
		css`
			background: ${({ theme }) => theme.red};
			&:hover {
				background: ${({ theme }) => theme.red};
				color: ${({ theme }) => theme.dark};
			}
		`};
	${({ theme }) => theme.mq.s} {
		font-size: ${({ theme }) => theme.fontSize.lg};
		padding: 20px;
		margin-right: 50px;
	}
`;

const animate1 = keyframes`  
    0%{
        left: -100%;
    }
    50%,100%{
        left: 100%;
    }
`;
const animate2 = keyframes`
    0%{
        top: -100%;
    }
    50%,100%{
        top: 100%;
    }
`;
const animate3 = keyframes`
    0%{
        right: -100%;
    }
    50%,100%{
        right: 100%;
    }
`;
const animate4 = keyframes`
    0%{
        bottom: -100%;
    }
    50%,100%{
        bottom: 100%;
    }
`;

const StyledSpan = styled.span`
	position: absolute;
	display: block;
	&:nth-child(1) {
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: #03e9f4;
		${({ animation }) =>
			animation &&
			css`
				background: linear-gradient(90deg, transparent, #03e9f4);
				animation: ${animate1} 1s linear infinite;
			`}
		${({ color }) =>
			color === "green" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
      ${({ color }) =>
			color === "red" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
	}
	&:nth-child(2) {
		top: 0;
		right: 0;
		width: 2px;
		height: 100%;
		background: #03e9f4;
		${({ animation }) =>
			animation &&
			css`
				top: -100%;
				background: linear-gradient(180deg, transparent, #03e9f4);
				animation: ${animate2} 1s linear infinite;
				animation-delay: 0.25s;
			`}
		${({ color }) =>
			color === "green" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
      ${({ color }) =>
			color === "red" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
	}
	&:nth-child(3) {
		bottom: 0;
		right: 0;
		width: 100%;
		height: 2px;
		background: #03e9f4;
		${({ animation }) =>
			animation &&
			css`
				background: linear-gradient(270deg, transparent, #03e9f4);
				animation: ${animate3} 1s linear infinite;
				animation-delay: 0.5s;
			`}
		${({ color }) =>
			color === "green" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
      ${({ color }) =>
			color === "red" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
	}
	&:nth-child(4) {
		bottom: 0;
		left: 0;
		width: 2px;
		height: 100%;
		background: #03e9f4;
		${({ animation }) =>
			animation &&
			css`
				bottom: -100%;
				background: linear-gradient(360deg, transparent, #03e9f4);
				animation: ${animate4} 1s linear infinite;
				animation-delay: 0.75s;
			`}
		${({ color }) =>
			color === "green" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
      ${({ color }) =>
			color === "red" &&
			css`
				background: ${({ theme }) => theme.dark};
			`}
	}
`;

const Button = ({
	label,
	link,
	animated,
	renderAs,
	color,
	className,
	clickHandler = null,
	type = undefined,
}) => {
	return (
		<StyledButton
			className={className}
			color={color}
			href={link || undefined}
			role={renderAs === "a" ? "link" : "button"}
			target={renderAs === "a" ? "_blank" : undefined}
			rel={renderAs === "a" ? "noopener noreferrer" : undefined}
			as={renderAs}
			animation={animated}
			onClick={clickHandler}
			type={type}
		>
			<StyledSpan color={color} animation={animated}></StyledSpan>
			<StyledSpan color={color} animation={animated}></StyledSpan>
			<StyledSpan color={color} animation={animated}></StyledSpan>
			<StyledSpan color={color} animation={animated}></StyledSpan>
			{label}
		</StyledButton>
	);
};

Button.defaultProps = {
	animated: false,
	link: "",
	renderAs: "button",
};

Button.propTypes = {
	animated: PropTypes.bool,
	label: PropTypes.string.isRequired,
	link: PropTypes.string,
	renderAs: PropTypes.string,
};

export default Button;
