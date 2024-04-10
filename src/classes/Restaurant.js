export default class Restaurant {
	constructor(id, name, opens_at, closes_at, city, phone, email) {
		this.id = id;
		this.name = name;
		this.opens_at = opens_at;
		this.closes_at = closes_at;
		this.city = city;
		this.phone = phone;
		this.email = email;
	}

	static formatTime(time) {
		const [hours, minutes] = time.split(':');
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 || 12;
		return `${formattedHours}:${minutes} ${period}`;
	}

	static openingHours(opens_at, closes_at) {
		return `${this.formatTime(opens_at)} - ${this.formatTime(closes_at)}`;
	}

	static isOpen(opens_at, closes_at) {
		const now = new Date();
		
		const opens = new Date();
		const closes = new Date();

		const [opensHours, opensMinutes] = opens_at.split(':');
		const [closesHours, closesMinutes] = closes_at.split(':');

		opens.setHours(opensHours, opensMinutes, 0, 0);
		closes.setHours(closesHours, closesMinutes, 0, 0);

		return now >= opens && now <= closes;
	}
}
