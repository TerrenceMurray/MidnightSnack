export default class UserInformation {
	static getFullName(fname, lname) {
		return `${fname} ${lname}`;
	}

	static getInitials(fname, lname) {
		return `${fname
			.charAt(0)
			.toUpperCase()}${lname
			.charAt(0)
			.toUpperCase()}`;
	}
}
