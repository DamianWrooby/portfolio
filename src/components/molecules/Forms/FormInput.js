import React from "react";
import styled, { css } from "styled-components";

const InputItem = styled.div`
	width: 100%;
	margin: 10px 0 45px;
	position: relative;
	&:last-of-type {
		margin: 0;
	}
`;

const Label = styled.label`
	position: absolute;
	top: -25px;
	left: 10px;
	transition: 0.2s ease-out all;
	color: ${({ theme }) => theme.gray50};
	font-weight: ${({ theme }) => theme.medium};
	font-size: ${({ theme }) => theme.fontSize.xs};
	cursor: auto;
	${({ theme }) => theme.mq.xs} {
		font-size: ${({ theme }) => theme.fontSize.s};
	}
	${({ isInvalid }) =>
		isInvalid &&
		css`
			color: ${({ theme }) => theme.red};
		`}
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 15px 30px;
	background: ${({ theme }) => theme.dark200};
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xs};
	border: 2px solid ${({ theme }) => theme.dark150};
	color: ${({ theme }) => theme.dark};
	border-radius: 4px;
	padding-left: 15px;
	transition: 0.3s;
	resize: none;
	&:focus {
		border-color: ${({ theme }) => theme.blue100};
	}
	&:focus + ${Label} {
		color: ${({ theme }) => theme.neonBlue};
	}
	${({ theme }) => theme.mq.xs} {
		font-size: ${({ theme }) => theme.fontSize.s};
	}
	${({ valid }) =>
		valid &&
		css`
			border-color: ${({ theme }) => theme.green};
		`}
	${({ invalid }) =>
		invalid &&
		css`
			border-color: ${({ theme }) => theme.red100};
		`}
`;

const FormInput = ({
	id,
	onChangeFn,
	onBlurFn,
	value,
	touched,
	errors,
	label,
	textarea,
	className,
}) => (
	<InputItem>
		<StyledInput
			type="text"
			as={textarea ? "textarea" : "input"}
			rows={textarea ? "6" : undefined}
			id={id}
			name={id}
			placeholder=" "
			onChange={onChangeFn}
			onBlur={onBlurFn}
			value={value}
			invalid={Boolean(touched && errors)}
			valid={Boolean(touched && !errors)}
		/>
		<Label htmlFor={id} isInvalid={Boolean(touched && errors)}>
			{(errors && touched && errors) || label}
		</Label>
	</InputItem>
);

export default FormInput;
