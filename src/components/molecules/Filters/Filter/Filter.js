import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	color: ${({ theme }) => theme.lightGray};
	display: flex;
	flex-direction: column;
	margin: 0 10px;

	&& label {
		margin-bottom: 1rem;
	}

	&& select {
		background: transparent;
		border: 1px solid #16ffff;
		border-radius: 4px;
		color: ${({ theme }) => theme.neonBlue};
		cursor: pointer;
	}

	&& option {
		color: ${({ theme }) => theme.neonBlue};
		background: ${({ theme }) => theme.dark};
		cursor: pointer;
	}
`;

const Filter = ({ name, type, label, options, value, onValueChange }) => {
	const SelectFilter = (
		<Wrapper>
			<label htmlFor={name}>{label}</label>
			<select name={name} id="name" value={value} onChange={onValueChange}>
				{options?.map(option => (
					<option value={option.value} key={option.value}>
						{option.label || option.value}
					</option>
				))}
			</select>
		</Wrapper>
	);

	switch (type) {
		case "option":
			return SelectFilter;
		default:
			return null;
	}
};

Filter.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string,
		})
	),
	defaultValue: PropTypes.string,
	value: PropTypes.string.isRequired,
	onValueChange: PropTypes.func,
};

export default Filter;
