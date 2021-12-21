class CarModel {
  constructor({
    id,
    brand,
    model,
    price,
    year,
    images,
    engineVolume,
    fuelType,
    transmission,
    user,
  }) {
    this.id = id;
    this.brand = brand.title; // brandas turės būti surandamas iš modelio
    this.model = model.title; // model.title
    this.price = price;
    this.year = year;
    this.images = images;
    this.engineVolume = engineVolume;
    this.fuelType = fuelType; // ['a', 'b'] -> [...].join('/')
    this.transmission = transmission.title; // transition.title
    this.user = user;
  }
}

export default CarModel;
