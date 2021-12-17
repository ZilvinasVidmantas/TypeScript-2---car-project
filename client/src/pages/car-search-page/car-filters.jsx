import React, { useState, useEffect } from 'react';
import { Typography, Paper, Autocomplete, TextField } from '@mui/material';
// import CheckboxGroupFilter from '../../components/controls/checkbox-group-filter';
// import RangeFilter from '../../components/controls/range-filter';
import { useSearchParams } from 'react-router-dom';
import { createUrlParamObj } from '../../helpers';
import APIService from '../../services/api-service';

const CarFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [brands, setBrands] = useState([]);

	const changeUrlFilters = (urlFilters) => {
		const newParams = createUrlParamObj(searchParams, urlFilters);
		setSearchParams(newParams);
	};

	const handleBrandChange = (_, selectedBrandOption) => {
		if (selectedBrandOption) {
			const urlFilter = { key: 'brand', value: selectedBrandOption.id };
			changeUrlFilters([urlFilter]);
		}
	};

	useEffect(() => {
		//  Immediatly invoked function expression
		(async () => {
			const fetchedBrands = await APIService.fetchBrands();
			const fetchedBrandslabeled = fetchedBrands.map((x) => ({
				...x,
				label: x.title,
			}));
			setBrands(fetchedBrandslabeled);
		})();
	}, []);

	return (
		<Paper elevation={4} sx={{ p: 2 }}>
			<Typography component="h2" variant="h4" />
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={brands}
				renderInput={(params) => (
					<TextField {...params} label="Markės" size="small" />
				)}
				onChange={handleBrandChange}
			/>
		</Paper>
	);
};

export default CarFilters;
