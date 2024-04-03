export class Item {
	constructor({ category, name, price, description, imageURL }) {
		try {
			// throw an error if any of the required fields are missing
			if (!category || !name || !price || !description)
				throw new Error('One or more required fields are missing');

			if (!category instanceof Category)
				throw new Error('Category must be an instance of Category');

			this.category = category;
			this.name = name;
			this.price = price;
			this.description = description;
			this.imageURL = imageURL;
		} catch (error) {
			console.error(error);
		}
	}
}

export class CartItem {
	constructor({ id, quantity = 1, item }) {
		this.id = id;
		this.item = item;
		this.quantity = quantity;
	}
}

export class Category {
	constructor({ id, name }) {
		try {
			// throw an error if any of the required fields are missing
			if (!id || !name)
				throw new Error('One or more required fields are missing');

			this.id = id;
			this.name = name;
		} catch (error) {
			console.error(error);
		}
	}
}
