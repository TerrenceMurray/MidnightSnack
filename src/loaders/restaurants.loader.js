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
		)
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
		)
	},
	{
		restaurant: new Restaurant(
			3,
			'Smoke House',
			'10:00',
			'23:30',
			'Port of Spain',
			'555-9012',
			'restaurant3@example.com'
		)
	},
	{
		restaurant: new Restaurant(
			4,
			'Pizza Plaza',
			'11:00',
			'23:59',
			'St. Joseph',
			'555-3456',
			'restaurant4@example.com'
		)
	}
];

export default async function loader() {
	return json(testData, { status: 200 });
}
