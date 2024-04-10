import Category from '@/classes/Category';
import Restaurant from '@/classes/Restaurant';
import MenuItem from '@/classes/MenuItem';
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
			new Category(1, 1, 'Cooked'),
			new Category(3, 1, 'Raw'),
			new Category(2, 1, 'Vegan'),
			new Category(4, 1, 'Vegetarian'),
		],
		items: [
			new MenuItem(
				1,
				1,
				1,
				'California Roll',
				'A lovely sushi roll containing crab and seaweed',
				12.99
			),
			new MenuItem(
				2,
				1,
				1,
				'Salmon Roll',
				'A delicious sushi roll made with fresh salmon',
				14.99
			),
			new MenuItem(
				3,
				1,
				2,
				'Avocado Roll',
				'A refreshing sushi roll filled with creamy avocado',
				10.99
			),
			new MenuItem(
				4,
				1,
				3,
				'Cucumber Roll',
				'A light and crunchy sushi roll with cucumber',
				8.99
			),
			
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
			new Category(5, 2, 'Greek'),
			new Category(6, 2, 'Vegetarian'),
			new Category(7, 2, 'Chicken'),
		],
		items: [
			new MenuItem(
				5,
				2,
				5,
				'Chicken Gyro',
				'Grilled chicken wrapped in pita bread with tzatziki sauce',
				9.99
			),
			new MenuItem(
				6,
				2,
				5,
				'Beef Gyro',
				'Tender beef wrapped in pita bread with tzatziki sauce',
				10.99
			),
			new MenuItem(
				7,
				2,
				6,
				'Greek Salad',
				'Fresh salad with tomatoes, cucumbers, olives, and feta cheese',
				7.99
			),
			new MenuItem(
				8,
				2,
				7,
				'Chicken Souvlaki',
				'Grilled chicken skewers served with pita bread and tzatziki sauce',
				12.99
			),
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
			new Category(8, 3, 'BBQ'),
			new Category(9, 3, 'Ribs'),
			new Category(10, 3, 'Burgers'),
		],
		items: [
			new MenuItem(
				9,
				3,
				8,
				'Pulled Pork Sandwich',
				'Slow-cooked pulled pork served on a bun with BBQ sauce',
				11.99
			),
			new MenuItem(
				10,
				3,
				9,
				'Baby Back Ribs',
				'Tender and juicy baby back ribs with BBQ sauce',
				16.99
			),
			new MenuItem(
				11,
				3,
				9,
				'Beef Ribs',
				'Flavorful beef ribs slow-cooked to perfection',
				18.99
			),
			new MenuItem(
				12,
				3,
				10,
				'Cheeseburger',
				'Classic cheeseburger with lettuce, tomato, and cheese',
				9.99
			),
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
			new Category(11, 4, 'Cheese'),
			new Category(12, 4, 'Pepperoni'),
			new Category(13, 4, 'Vegetarian'),
		],
		items: [
			new MenuItem(
				13,
				4,
				11,
				'Margherita Pizza',
				'Classic pizza topped with tomato sauce, mozzarella, and basil',
				10.99
			),
			new MenuItem(
				14,
				4,
				12,
				'Meat Lovers Pizza',
				'Pizza loaded with pepperoni, sausage, bacon, and ham',
				14.99
			),
			new MenuItem(
				15,
				4,
				13,
				'Mushroom Pizza',
				'Pizza topped with fresh mushrooms and melted cheese',
				12.99
			),
			new MenuItem(
				16,
				4,
				13,
				'Veggie Supreme Pizza',
				'Pizza packed with a variety of fresh vegetables',
				13.99
			),
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
