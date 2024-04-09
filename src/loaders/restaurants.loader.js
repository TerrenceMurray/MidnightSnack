import Restaurant from '@/classes/Restaurant';
import { json } from 'react-router-dom';

const testData = [
	new Restaurant(
		1,
		'Sushi House',
		'08:00',
		'22:00',
		'Tunapuna',
		'555-1234',
		'restaurant1@example.com'
	),
	new Restaurant(
		2,
		'Gyro Hub',
		'09:00',
		'23:00',
		'Tunapuna',
		'555-5678',
		'restaurant2@example.com'
	),
	new Restaurant(
		3,
		'Smoke House',
		'10:00',
		'00:00',
		'Port of Spain',
		'555-9012',
		'restaurant3@example.com'
	),
	new Restaurant(
		4,
		'Pizza Plaza',
		'11:00',
		'01:00',
		'St. Joseph',
		'555-3456',
		'restaurant4@example.com'
	),
];

export default async function loader() {
	return json(testData, { status: 200 });
}
