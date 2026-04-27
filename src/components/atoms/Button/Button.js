import PropTypes from 'prop-types';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const isExternalLink = url =>
	typeof url === 'string' && /^(https?:)?\/\//.test(url);

const neonGlow = color => css`
	box-shadow:
		0 0 5px ${color},
		0 0 25px ${color},
		0 0 50px ${color},
		0 0 200px ${color};
	-webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
`;

const variantStyles = {
	blue: css`
		background: ${({ theme }) => theme.neonBlue};
		color: ${({ theme }) => theme.dark};
		&:hover {
			background: ${({ theme }) => theme.dark};
			color: ${({ theme }) => theme.neonBlue};
		}
	`,
	green: css`
		background: ${({ theme }) => theme.green};
		color: ${({ theme }) => theme.dark};
		&:hover {
			background: ${({ theme }) => theme.green};
			color: ${({ theme }) => theme.dark};
		}
	`,
	red: css`
		background: ${({ theme }) => theme.red};
		color: ${({ theme }) => theme.dark};
		&:hover {
			background: ${({ theme }) => theme.red};
			color: ${({ theme }) => theme.dark};
		}
	`,
};

const StyledButton = styled.button`
	position: relative;
	cursor: pointer;
	font-size: ${({ theme }) => theme.fontSize.xs};
	font-weight: ${({ theme }) => theme.regular};
	text-align: center;
	background: ${({ theme }) => theme.neonBlue};
	color: ${({ theme }) => theme.dark};
	display: inline-block;
	font-family: ${({ theme }) => theme.fonts.subFont};
	padding: 20px 10px;
	text-decoration: none;
	text-transform: uppercase;
	transition: 0.5s;
	letter-spacing: 4px;
	overflow: hidden;
	border: none;

	&:hover {
		background: ${({ theme }) => theme.dark};
		color: ${({ theme }) => theme.neonBlue};
	}

	${({ $animated, theme }) =>
		$animated &&
		css`
			background: transparent;
			color: ${theme.neonBlue};
			&:hover {
				background: ${theme.neonBlue};
				color: ${theme.dark};
				${neonGlow(theme.neonBlue)};
			}
		`};

	${({ $color }) => $color && variantStyles[$color]};

	&:disabled,
	&[aria-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	${({ theme }) => theme.mq.s} {
		font-size: ${({ theme }) => theme.fontSize.lg};
		padding: 20px;
	}
`;

const animate1 = keyframes`
	0% { left: -100%; }
	50%, 100% { left: 100%; }
`;
const animate2 = keyframes`
	0% { top: -100%; }
	50%, 100% { top: 100%; }
`;
const animate3 = keyframes`
	0% { right: -100%; }
	50%, 100% { right: 100%; }
`;
const animate4 = keyframes`
	0% { bottom: -100%; }
	50%, 100% { bottom: 100%; }
`;

const StyledSpan = styled.span`
	position: absolute;
	display: block;
	background: ${({ $color, theme }) =>
		$color === 'green' || $color === 'red' ? theme.dark : theme.neonBlue};

	&:nth-child(1) {
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		${({ $animated, theme }) =>
			$animated &&
			css`
				background: linear-gradient(90deg, transparent, ${theme.neonBlue});
				animation: ${animate1} 1s linear infinite;
			`}
	}
	&:nth-child(2) {
		top: 0;
		right: 0;
		width: 2px;
		height: 100%;
		${({ $animated, theme }) =>
			$animated &&
			css`
				top: -100%;
				background: linear-gradient(180deg, transparent, ${theme.neonBlue});
				animation: ${animate2} 1s linear infinite;
				animation-delay: 0.25s;
			`}
	}
	&:nth-child(3) {
		bottom: 0;
		right: 0;
		width: 100%;
		height: 2px;
		${({ $animated, theme }) =>
			$animated &&
			css`
				background: linear-gradient(270deg, transparent, ${theme.neonBlue});
				animation: ${animate3} 1s linear infinite;
				animation-delay: 0.5s;
			`}
	}
	&:nth-child(4) {
		bottom: 0;
		left: 0;
		width: 2px;
		height: 100%;
		${({ $animated, theme }) =>
			$animated &&
			css`
				bottom: -100%;
				background: linear-gradient(360deg, transparent, ${theme.neonBlue});
				animation: ${animate4} 1s linear infinite;
				animation-delay: 0.75s;
			`}
	}

	[disabled] &,
	[aria-disabled='true'] & {
		animation: none;
	}
`;

const Button = ({
	label,
	link = '',
	animated = false,
	renderAs = 'button',
	color,
	className,
	onClick,
	type,
	disabled = false,
	title,
	target,
	rel,
}) => {
	const renderAsAnchor = renderAs === 'a' && Boolean(link);
	const tag = renderAsAnchor ? 'a' : 'button';
	const external = isExternalLink(link);

	const anchorProps = renderAsAnchor
		? {
				href: link,
				target: target ?? (external ? '_blank' : undefined),
				rel: rel ?? (external ? 'noopener noreferrer' : undefined),
			}
		: {};

	const buttonProps =
		tag === 'button'
			? {
					type: type ?? 'button',
					disabled,
				}
			: {};

	return (
		<StyledButton
			as={tag}
			className={className}
			$color={color}
			$animated={animated}
			title={title}
			onClick={disabled ? undefined : onClick}
			aria-disabled={disabled || undefined}
			{...anchorProps}
			{...buttonProps}>
			<StyledSpan aria-hidden="true" $color={color} $animated={animated} />
			<StyledSpan aria-hidden="true" $color={color} $animated={animated} />
			<StyledSpan aria-hidden="true" $color={color} $animated={animated} />
			<StyledSpan aria-hidden="true" $color={color} $animated={animated} />
			{label}
		</StyledButton>
	);
};

Button.propTypes = {
	label: PropTypes.string.isRequired,
	link: PropTypes.string,
	animated: PropTypes.bool,
	renderAs: PropTypes.oneOf(['button', 'a']),
	color: PropTypes.oneOf(['blue', 'green', 'red']),
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	disabled: PropTypes.bool,
	title: PropTypes.string,
	target: PropTypes.string,
	rel: PropTypes.string,
};

export default Button;
