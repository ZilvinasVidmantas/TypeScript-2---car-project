const fetchCars = async (params) => {
	try {
		let requestUrl = 'http://localhost:5000/cars?_expand=user&_expand=brand';

		console.log(params.brand);
		if (params.brand) {
			const brandFilters = params.brand
				.map((brand) => `brandId=${brand}`)
				.join('&');

			requestUrl += '&' + brandFilters;
		}

		const response = await fetch(requestUrl);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Aprašyta klaida: Serverio klaida');
	}
};

const fetchCar = async (id) => {
	try {
		const response = await fetch(`http://localhost:5000/cars/${id}`);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Aprašyta klaida: Serverio klaida');
	}
};

const fetchBrands = async () => {
	try {
		const response = await fetch(`http://localhost:5000/brands`);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Aprašyta klaida: Serverio klaida');
	}
};

const fetchModels = async () => {
	try {
		const response = await fetch(`http://localhost:5000/models`);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Aprašyta klaida: Serverio klaida');
	}
};

const fetchTransmissions = async () => {
	try {
		const response = await fetch(`http://localhost:5000/transmissions`);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Aprašyta klaida: Serverio klaida');
	}
};

const fetchFuels = async () => {
	try {
		const response = await fetch(`http://localhost:5000/fuels`);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Aprašyta klaida: Serverio klaida');
	}
};

const API = {
	fetchCars,
	fetchCar,
	fetchBrands,
	fetchModels,
	fetchTransmissions,
	fetchFuels
};

export default API;
