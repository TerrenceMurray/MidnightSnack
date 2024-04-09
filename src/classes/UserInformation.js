export default class UserInformation {
	constructor(id, restaurant_id, fname, lname, email, phone) {
		this.id = {
			user: id,
			restaurant: restaurant_id,
		};
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.phone = phone;
	}

	getFullName() {
		return `${this.fname} ${this.lname}`;
	}

	getInitials() {
		return `${this.fname.charAt(0)}${this.lname.charAt(0)}`;
	}
}
