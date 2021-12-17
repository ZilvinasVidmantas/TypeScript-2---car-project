import React, { createContext, useEffect } from 'react';
import API from '../services/api-service';
import useFilters from '../hooks/useFilters';

const carState = {
	cars: [],
	filters: [],
	changeFilter: () => new Error('You must use a Provider and implement logic'),
};

export const CarContext = createContext(carState);

const filterSettings = [
	{ type: 'checkboxGroup', prop: 'brand', title: 'Markė' },
	{ type: 'checkboxGroup', prop: 'model', title: 'Modelis' },
	{ type: 'range', prop: 'price', title: 'Kaina' },
	{ type: 'range', prop: 'year', title: 'Metai' },
];

export const CarProvider = ({ children }) => {
	const [cars, filters, setInitCars, changeFilter] = useFilters(filterSettings);

	useEffect(
		() => {
			const fecthInitialData = async () => {
				const initCars = await API.fetchCars();
				setInitCars(initCars);
			};

			fecthInitialData();
		},
		[setInitCars],
	);

	const getCar = (id) => {
		return cars.find((car) => car.id === id);
	};

	return (
		<CarContext.Provider
			value={{
				cars,
				filters,
				changeFilter,
				getCar,
			}}
		>
			{children}
		</CarContext.Provider>
	);
};

export default CarContext;
