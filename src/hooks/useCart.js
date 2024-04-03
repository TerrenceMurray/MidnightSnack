import { create } from 'zustand';

const useCart = create((set) => ({
	items: [],
	addItem: (item) => set((state) =>
	{
		const index = state.items.findIndex((i) => i.item.name === item.item.name);
		if (index === -1)
		{
			return { items: [...state.items, item] };
		}
		const items = [...state.items];
		items[index].quantity += 1;
		return { items };
	}),
}));

export default useCart;
