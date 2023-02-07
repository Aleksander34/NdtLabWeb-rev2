import APP_CONSTS from '../common/appConst.js';

class RequestService {
	constructor() {
		this.url = APP_CONSTS.SERVER_URL + 'api/Requests';
	}

	async getPreviewRequest(file) {
		let formData = new FormData();
		formData.append('input', file);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		let result = null;
		await axios
			.post(this.url + '/GetPreviewRequest', formData, config)
			.then(function (response) {
				result = response.data;
				console.log(result);
			})
			.catch(function (error) {
				console.log(error);
			});
		return result;
	}

	async addRequest(file) {
		let formData = new FormData(); // формат дата мы отправляем файлы иксель
		formData.append('input', file);

		const config = {
			//заголовок форм даты
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		let result = null;
		await axios
			.post(this.url + '/AddRequest', formData, config) // конфиг засовываем сюда
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
export default new RequestService();
