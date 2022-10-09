import { useState } from "react";

const useFilter = initialValues => {
	const [filters, setFilters] = useState(initialValues);

	const filtersChangeHandler = event => {
		const { name, value } = event.target;
		setFilters(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	return [filters, filtersChangeHandler];
};

export default useFilter;
