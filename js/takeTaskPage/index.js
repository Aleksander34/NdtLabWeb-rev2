import jointService from '../api/jointService.js';
import inspectionService from '../api/inspectionService.js';
import employeeService from '../api/employeeService.js';
import equipmentService from '../api/equipmentService.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#takeTaskTable');

	$('.requestType').click(function () {
		$('.requestType').removeClass('active');
		$(this).addClass('active');
	});

	$('#productionRequest2').click(function () {
		$('#qualificationRequestType2').addClass('d-none');
		$('#productionRequestType2').removeClass('d-none');
		$(this).addClass('active');
		$('#qualificationRequest2').removeClass('active');
	});

	$('#qualificationRequest2').click(function () {
		$('#productionRequestType2').addClass('d-none');
		$('#qualificationRequestType2').removeClass('d-none');
		$(this).addClass('active');
		$('#productionRequest2').removeClass('active');
	});

	$('#inspectionResultFilterShowHide').click(function () {
		if ($('#mainFilters').hasClass('d-none')) {
			$('#inspectionResultFilterShowHide').text('Скрыть фильтры');
		} else {
			$('#inspectionResultFilterShowHide').text('Показать фильтры');
		}
		$('#mainFilters').toggleClass('d-none');
	});

	$('#checkAll').click(function () {
		let checkedCount = $('#mainFilters .form-check-input:checked').length;
		let allCount = $('#mainFilters .form-check-input').length;
		if (checkedCount != allCount) {
			$('#mainFilters .form-check-input').prop('checked', true);
			$(this).text('снять все');
		} else {
			$('#mainFilters .form-check-input').prop('checked', false);
			$(this).text('выбрать все');
			$('#mainFilters select').val('default').change();
		}
	});

	//таблица
	let language = {
		emptyTable: 'нет данных',
		info: 'показано c: _START_ по: _END_ из: _TOTAL_',
		infoEmpty: 'нет данных',
		lengthMenu: 'элементов _MENU_ на странице',
		paginate: {
			first: 'первая страница',
			last: 'последняя страница',
			next: 'следующая страница',
			previous: 'предыдущая страница',
		},
	};

	_$table.DataTable({
		processing: true,
		serverSide: true,
		paging: true,
		ordering: false,
		searching: false,
		scrollX: true,
		dom: [
			"<'row'<'col-md-12'f>>",
			"<'row'<'col-md-12't>>",
			"<'row mt-2'",
			"<'col-lg-1 col-xs-12'<'float-left text-center data-tables-refresh'B>>",
			"<'col-lg-3 col-xs-12'<'float-left text-center'i>>",
			"<'col-lg-3 col-xs-12'<'text-center'l>>",
			"<'col-lg-5 col-xs-12'<'float-right'p>>",
			'>',
		].join(''),
		buttons: [{ name: 'refresh', text: '<i class="fa-solid fa-rotate"></i>', action: () => books.ajax.reload().draw(false) }],
		language: language,
		drawCallback: () => {
			$('[data-bs-toggle="tooltip"]').tooltip();
		},
		ajax: async (data, success, failure) => {
			let result = await jointService.getAll();
			success(result);
		},
		columns: [
			{
				searchable: false,
				orderable: false,
				targets: 0,
				data: null,
				render: function (data, type, row, meta) {
					return (
						`<input type="checkbox" class="JointTask" data-id="${row.id}">` +
						`<button data-bs-toggle="modal" data-bs-target="#inspectionResultModal" data-id="${row.id}" class="btn btn-primary">Результаты контроля</button>` +
						(meta.row + meta.settings._iDisplayStart + 1)
					);
				},
			},
			{
				data: 'request.number',
			},
			{
				data: 'request.partObject',
			},
			{
				data: 'number',
			},
			{
				data: 'request.piping.zone',
			},
			{
				data: 'request.piping.line',
			},
			{
				data: 'request.piping.spool',
			},
			{
				data: 'request.steelStructure.part',
			},
			{
				data: 'request.steelStructure.sector',
			},
			{
				data: 'request.tank.part',
			},
			{
				data: 'request.pipeLine.distance',
			},
			{
				data: 'connectionType',
			},
			{
				data: 'weldingType',
			},
			{
				data: 'stamps',
			},
			{
				data: 'weldingDate',
			},
			{
				data: 'request.date',
			},
			{
				data: 'elementOne',
			},
			{
				data: 'elementTwo',
			},
			{
				data: 'diameterOne',
			},
			{
				data: 'diameterTwo',
			},
			{
				data: 'thicknessOne',
			},
			{
				data: 'thicknessTwo',
			},
			{
				data: 'gradeOne',
			},
			{
				data: 'gradeTwo',
			},
			{
				data: 'request.categoryGost',
			},
			{
				data: 'request.otherCategory',
			},
			{
				data: 'inspections',
				render: (data, type, row) => {
					let inspections = data.map((x) => {
						if (x.result == 1) {
							return `<span style="color: green;">${x.name}</span>`;
						}
						if (x.result == 2) {
							return `<span style="color: red;">${x.name}</span>`;
						}
						return x.name;
					});
					inspections = inspections.join(', ');
					return (inspections && `<button data-joint="${row.id}" type="button" class="jointInspections btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#inspectionModal">${inspections}</button>`) || '';
				},
			},
		],
	});
});
