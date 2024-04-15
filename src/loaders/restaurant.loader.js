import { json } from 'react-router-dom';
import { supabase } from '@/client/supabase';

export default async function loader({ params }) {
	const { data: restaurantData, error } = await supabase
		.from('restaurant')
		.select(
			`
			id,
			name,
			city,
			userID
		`
		)
		.eq('id', params.id);

	if (error) return json({ error: error.message }, { status: 500 });

	const { data: categoryData, error: categoryError } = await supabase
		.from('categories')
		.select('*')
		.eq('userID', restaurantData[0].userID);

	if (categoryError)
		return json({ error: categoryError.message }, { status: 500 });

	// select menuItems

	const { data: menuItems, error: menuError } = await supabase
		.from('items')
		.select('*')
		.eq('userID', restaurantData[0].userID);

	if (menuError) return json({ error: menuError.message }, { status: 500 });

	// get menu item cover public url
	for (const item of menuItems) {
		const { data: cover, error: coverError } = await supabase.storage
			.from('items')
			.getPublicUrl(item.cover);

		if (coverError)
			return json(
				{ data: [], error: coverError.message },
				{ status: 500 }
			);

		item.imageURL = cover.publicUrl;
	}

	return json({
		restaurant: restaurantData[0],
		categories: categoryData,
		items: menuItems,
	});
}
