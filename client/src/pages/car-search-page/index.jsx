import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CarTable from './car-table';
import CarFilters from './car-filters';
import ApiService from '../../services/api-service';
import { useSearchParams } from 'react-router-dom';
import CarModel from '../../models/car-model';
import { createUrlParamObj } from '../../helpers';
import CarOptions from './car-options';
import CarGrid from './car-grid';

const CarSearch = () => {
	const [cars, setCars] = useState([]);
	const [carSearchViewType, setCarSearchViewType] = useState('table'); // Atvaizdavimo tipas
	const [searchParams] = useSearchParams();

	if (cars[0]) {
		console.table(cars[0].brand);
	}

	useEffect(
		() => {
			(async () => {
				const params = createUrlParamObj(searchParams);
				const fetchedCars = await ApiService.fetchCars(params);
				const cars = fetchedCars.map((carData) => new CarModel(carData));
				setCars(cars);
			})();
		},
		[searchParams],
	);

	// Keiciamas atvaizdavimo tipas
	const handleViewChange = (_, nextView) => {
		setCarSearchViewType(nextView);
	};

	return (
		<Container maxWidth="xl" sx={{ mt: 3 }}>
			{cars.length > 0 ? (
				<Typography component="h1" variant="h3" gutterBottom align="center">
					Mašinos
				</Typography>
			) : null}
			<Grid container spacing={2}>
				<Grid item xs={2}>
					{/* Atvaizdavimo pasirinkimai */}
					<CarOptions view={carSearchViewType} onChange={handleViewChange} />
					<CarFilters />
				</Grid>
				<Grid item xs={10}>
					{/* Jei yra masinu */}
					{cars.length > 0 ? (
						// Jei atvaizdavimo tipas lentele
						carSearchViewType === 'table' ? (
							<CarTable cars={cars} />
						) : (
							// Jei atvaizdavimo tipas ne lentele
							<CarGrid cars={cars} />
						)
					) : null}
				</Grid>
			</Grid>
		</Container>
	);
};

export default CarSearch;
