import { json } from 'react-router-dom';
import { supabase } from '@/client/supabase';

export default async function loader() {
	const { data, error } = await supabase.from('restaurant').select('*');

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	for (const restaurant of data) {
		const { data: cover, error: coverError } = await supabase.storage
			.from('restaurants')
			.getPublicUrl(restaurant.cover);
		if (coverError)
			return json(
				{ data: [], error: coverError.message },
				{ status: 500 }
			);

		restaurant.imageURL = cover.publicUrl;
	}

	return json({ data, error }, { status: 200 });
}
