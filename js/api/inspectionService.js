import APP_CONSTS from '../common/appConst.js';

class InspectionService {
	constructor() {
		this.url = APP_CONSTS.SERVER_URL + 'api/Inspections';
	}

	async getAll(jointId) {
		let result = null;
		await axios
			.get(this.url + '/GetAll?jointId=' + jointId)
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
export default new InspectionService();
