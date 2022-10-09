import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { languages } from "../../../consts/languages";
import Filter from "./Filter/Filter";

const FiltersWrapper = styled.div`
	margin: auto;
	max-width: 35rem;
	padding-bottom: 2rem;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const Filters = ({ lang, filterValues, onFiltersChange }) => {
	const languageOptions = languages.reduce(
		(acc, lang) => {
			acc.push({
				value: lang,
				label: lang.toUpperCase(),
			});
			return acc;
		},
		[{ value: "all", label: lang === "pl" ? "Wszystkie" : "All" }]
	);

	const sortOptions = [
		{ value: "oldest", label: lang === "pl" ? "Najstarsze" : "Oldest" },
		{ value: "newest", label: lang === "pl" ? "Najnowsze" : "Newest" },
	];

	return (
		<FiltersWrapper>
			<Filter
				name="language"
				type="option"
				options={languageOptions}
				label={lang === "pl" ? "Język" : "Language"}
				value={filterValues.language}
				onValueChange={onFiltersChange}
			/>
			<Filter
				name="sort"
				type="option"
				options={sortOptions}
				label={lang === "pl" ? "Sortuj" : "Sort"}
				value={filterValues.sort}
				onValueChange={onFiltersChange}
			/>
		</FiltersWrapper>
	);
};

Filters.propTypes = {
	lang: PropTypes.string.isRequired,
	filterValues: PropTypes.shape({
		language: PropTypes.string,
		sort: PropTypes.string,
	}).isRequired,
	onFiltersChange: PropTypes.func.isRequired,
};

export default Filters;
