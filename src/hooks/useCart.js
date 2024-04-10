import { create } from 'zustand';

const useCart = create((set) => ({
	orders: [],

	// {
	// 	item,
	// 	quantity
	// }[]

	addItem: (item) =>
		set((state) => {
			// find if the item already exists
			const index = state.orders.findIndex(
				(order) => order.item.id['item'] == item.id['item']
			);

			// if it does not exist, add it
			if (index === -1)
				return { orders: [...state.orders, { item, quantity: 1 }] };

			// if it does exist, increment the quantity
			state.orders[index].quantity++;
			return { orders: [...state.orders] };
		}),

	reduceOrderQuantity: (itemID) =>
		set((state) => {
			// find if the item already exists
			const index = state.orders.findIndex(
				(order) => order.item.id['item'] == itemID
			);

			if (state.orders[index].quantity > 1)
				state.orders[index].quantity--;
			else state.removeItem(itemID);

			return { orders: [...state.orders] };
		}),
	removeItem: (itemID) =>
		set((state) => {
			// find if the item already exists
			const index = state.orders.findIndex(
				(order) => order.item.id['item'] == itemID
			);

			state.orders.splice(index, 1);

			return { orders: [...state.orders] };
		}),
}));

export default useCart;
