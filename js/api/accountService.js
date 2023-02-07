import APP_CONSTS from '../common/appConst.js';

class AccountService {
	constructor() {
		this.url = APP_CONSTS.SERVER_URL + 'api/Account';
	}

	async login(login, password) {
		let result = null;
		await axios
			.post(this.url + '/Login', {
				Login: login,
				Password: password,
			})
			.then(function (response) {
				result = response.data;
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		return result;
	}
}
export default new AccountService();
