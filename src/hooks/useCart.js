import { create } from 'zustand';

const useCart = create((set) => ({
	orders: [],

	// {
	// 	item,
	// 	quantity
	// }[]

	getTotal: (orders) => {
		return 50 + orders.reduce(
			(acc, order) => acc + order.item.price * order.quantity,
			0
		);
	},
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

			const order = state.orders[index];

			if (order.quantity > 1) order.quantity--;
			else state.removeItem(order.item.id['item']);

			return { orders: [...state.orders] };
		}),
	removeItem: (itemID) =>
		set((state) => {
			// find if the item already exists
			const index = state.orders.findIndex(
				(order) => order.item.id['item'] == itemID['item']
			);

			state.orders.splice(index, 1);

			return { orders: [...state.orders] };
		}),
}));

export default useCart;
