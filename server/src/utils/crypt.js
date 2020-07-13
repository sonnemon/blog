import bcrypt from 'bcrypt';
class Crypt {
	constructor() {
		this.saltRounds = 10;
		this.salt = bcrypt.genSaltSync(this.saltRounds);
	}
	hash(password) {
		return bcrypt.hashSync(password, this.salt);
	}
	compare(password, hash) {
		return bcrypt.compareSync(password, hash);
	}
}
export default new Crypt();
