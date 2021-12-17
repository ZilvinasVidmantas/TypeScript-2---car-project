class CarModel {
	id;
	brand;
	model;
	price;
	year;
	images;
	engineVolume;
	fuelType;
	transition;
	user;

	constructor({
		id,
		brand,
		model,
		price,
		year,
		images,
		engineVolume,
		fuelType,
		transition,
		user,
	}) {
		this.id = id;
		this.brand = brand.title; // brandas turės būti surandamas iš modelio
		this.model = model; // model.title
		this.price = price;
		this.year = year;
		this.images = images;
		this.engineVolume = engineVolume;
		this.fuelType = fuelType; // ['a', 'b'] -> [...].join('/')
		this.transition = transition; // transition.title
		this.user = user;
	}
}

export default CarModel;
