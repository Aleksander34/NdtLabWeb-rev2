import APP_CONSTS from '../common/appConst.js';

class JointService {
	constructor() {
		this.url = APP_CONSTS.SERVER_URL + 'api/Joints';
	}

	async getAll(file) {
		let result=null;
		await axios
			.get(this.url + '/GetAll')
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
