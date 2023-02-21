import APP_CONSTS from '../common/appConst.js';

class JointService {
	constructor() {
		this.url = APP_CONSTS.SERVER_URL + 'api/Joints';
	}

	async getAll(input) {
		let result = null;
		await axios
			.post(this.url + '/GetAll', input)
			.then(function (response) {
				result = response.data;
				console.log(result);
			})
			.catch(function (error) {
				console.log(error);
			});
		return result;
	}
}
export default new JointService();
