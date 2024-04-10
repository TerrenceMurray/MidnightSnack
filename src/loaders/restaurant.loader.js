import Category from '@/classes/Category';
import Restaurant from '@/classes/Restaurant';
import { json } from 'react-router-dom';

const testData = [
	{
		restaurant: new Restaurant(
			1,
			'Sushi House',
			'09:00',
			'23:00',
			'Tunapuna',
			'555-5678',
			'restaurant2@example.com'
		),
		categories: [
			new Category(1, 1, 'Sushi'),
			new Category(2, 1, 'Rolls'),
			new Category(3, 1, 'Nigiri'),
		],
	},
	{
		restaurant: new Restaurant(
			2,
			'Gyro Hub',
			'09:00',
			'23:00',
			'Tunapuna',
			'555-5678',
			'restaurant2@example.com'
		),
		categories: [
			new Category(1, 2, 'Greek'),
			new Category(2, 2, 'Vegetarian'),
			new Category(3, 2, 'Chicken'),
		],
	},
	{
		restaurant: new Restaurant(
			3,
			'Smoke House',
			'10:00',
			'00:00',
			'Port of Spain',
			'555-9012',
			'restaurant3@example.com'
		),
		categories: [
			new Category(1, 3, 'BBQ'),
			new Category(2, 3, 'Ribs'),
			new Category(3, 3, 'Burgers'),
		],
	},
	{
		restaurant: new Restaurant(
			4,
			'Pizza Plaza',
			'11:00',
			'01:00',
			'St. Joseph',
			'555-3456',
			'restaurant4@example.com'
		),
		categories: [
			new Category(1, 4, 'Cheese'),
			new Category(2, 4, 'Pepperoni'),
			new Category(3, 4, 'Vegetarian'),
		],
	},
];

export default async function loader({ params }) {
	return json(
		testData.find(
			(business) => business.restaurant.id.toString() === params.id
		),
		{ status: 200 }
	);
}
