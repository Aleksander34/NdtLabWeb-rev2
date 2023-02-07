import accountService from '../api/accountService.js';
$(function () {
	$('#loginButton').click(async function () {
		let login = $('#login').val();
		let password = $('#password').val();
		let token = await accountService.login(login, password);

		if (token != null) {
			console.log('sssdfsdfdsfdsfdsf');
			window.location.href = 'http://127.0.0.1:5501//pages/jointsPage/index.html'; //меняем путь после входа
		}
	});
});
