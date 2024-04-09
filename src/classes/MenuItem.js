export default class MenuItem {
	constructor(id, restaurant_id, category_id, title, description, price) {
		this.id = {
			item: id,
			restaurant: restaurant_id,
			category: category_id,
		};
		this.title = title;
		this.description = description;
		this.price = price;
	}
}
