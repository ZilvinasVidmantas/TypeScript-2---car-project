const fetchCars = async (params) => {
	try {
		let requestUrl = 'http://localhost:5000/cars?_expand=user&_expand=brand&_expand=model&_expand=transmission';

		if (params.brand) {
			const brandFilters = params.brand
				.map((brand) => `brandId=${brand}`)
				.join('&');

			requestUrl += '&' + brandFilters;
		}
		if (params.model) {
			const modelFilters = params.model
				.map((model) => `modelId=${model}`)
				.join('&');

			requestUrl += '&' + modelFilters;
		}
		if (params.transmissions) {
			const transmissionsFilters = params.transmissions
				.map((transmission) => `transmissionId=${transmission}`)
				.join('&');
		
			requestUrl += '&' + transmissionsFilters;
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
		const response = await fetch(`http://localhost:5000/cars/${id}?_expand=user&_expand=brand&_expand=model&_expand=transmission`);
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
		const response = await fetch(`http://localhost:5000/fuelTypes`);
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
