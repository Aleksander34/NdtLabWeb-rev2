import APP_CONSTS from '../common/appConst.js';

class EmployeeService {
	constructor() {
		this.url = APP_CONSTS.SERVER_URL + 'api/Employees';
	}

	async getAll() {
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
export default new EmployeeService();
