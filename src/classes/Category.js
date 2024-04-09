export default class Category {
	constructor(id, restaurant_id, category) {
		this.id = {
			category: id,
			restaurant: restaurant_id,
		};
		this.category = category;
	}
}
