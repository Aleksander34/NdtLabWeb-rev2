import jointService from '../api/jointService.js';
import inspectionService from '../api/inspectionService.js';
import employeeService from '../api/employeeService.js';
import equipmentService from '../api/equipmentService.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#example');

		let jointTypeDict = {
			piping:0,
			tanks:1,
			steelStructure:2,
			pipeLine:3,
			DS:5,
			TR:6,
			PQR:7,
			KSS:4,
			rebar:8,
		}

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

	let jointsTable=_$table.DataTable({
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
			let filters = {};
			filters.countOnPage = data.length; //входный данные фильтров
			filters.skipCount = data.start; //входный данные фильтров
			filters.jointType = jointTypeDict[$('.requestType.active').data('type')]
			filters.isNeedInspection = true;
			console.log(filters);
			let result = await jointService.getAll(filters);
			success(result);
		},
		columns: [
			// {
			// 	data: null,
			// 	render: (data) => {
			// 		let btns = [
			// 			`<button type="button" class="btn text-danger btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Удалить"><i class="fa-solid fa-xmark"></i></button>`,
			// 			`<button type="button" class="btn text-secondary btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Редактировать"><i class="fa-solid fa-pen"></i></button>`,
			// 			`<button type="button" class="showRepairCountModal btn text-secondary btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Количество: 10"><i class="fa-regular fa-eye"></i></button>`,
			// 		].join('');
			// 		return `<div class="d-flex align-items-center">
			// 		${btns}
			// 		</div>`;
			// 	},
			// },

			{
				searchable: false,
				orderable: false,
				targets: 0,
				data: null,
				render: function (data, type, row, meta) {
					return `<input type="checkbox" class="JointTask" data-id="${row.id}">` + (meta.row + meta.settings._iDisplayStart + 1);
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
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.piping?.zone || '';
				},
				
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.piping?.line || '';
				},
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.piping?.spool || '';
				},
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.steelStructure?.part || '';
				},
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.steelStructure?.sector || '';
				},
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.tank?.part || '';
				},
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.request?.pipeLine?.distance || '';
				},
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

	new AirDatepicker('#jointsDate', {
		range: true,
		multipleDatesSeparator: ' - ',
	});

	new AirDatepicker('#startWorkDateTime', {
		timepicker: true,
		timeFormat: 'hh:mm AA',
	});

	$('#teamLead').select2({
		width: '100%',
		placeholder: 'Select a state',
		allowClear: true,
		ajax: {
			transport: function (params, success, failure) {
				employeeService.getAll().then(function (result) {
					console.log(result);
					success({
						results: result.map((x) => {
							return { text: x.name, id: x.name };
						}),
					});
				});
			},
		},

		templateResult: (data) => data.text,
		templateSelection: (data) => data.text,
		dropdownParent: $('#taskPersonalModal'),
	});

	$('#validCertificate').select2({
		width: '100%',
		placeholder: 'Select a state',
		allowClear: true,
		ajax: {
			transport: function (params, success, failure) {
				employeeService.getAll().then(function (result) {
					console.log(result);
					success({
						results: result.map((x) => {
							return { text: x.name, id: x.name };
						}),
					});
				});
			},
		},
		templateResult: (data) => data.text,
		templateSelection: (data) => data.text,
		dropdownParent: $('#taskPersonalModal'),
	});

	$('#inspectors').select2({
		tags: true,
		width: '100%',
		placeholder: 'Select a state',
		allowClear: true,
		ajax: {
			transport: function (params, success, failure) {
				employeeService.getAll().then(function (result) {
					console.log(result);
					success({
						results: result.map((x) => {
							return { text: x.name, id: x.name };
						}),
					});
				});
			},
		},
		createTag: function (params) {
			var term = $.trim(params.term);

			if (term === '') {
				return null;
			}

			return {
				id: term,
				text: term,
			};
		},
		templateResult: (data) => data.text,
		templateSelection: (data) => data.text,
		dropdownParent: $('#taskPersonalModal'),
	});

	$('#tools').select2({
		tags: true,
		width: '100%',
		placeholder: 'Select a state',
		allowClear: true,
		ajax: {
			transport: function (params, success, failure) {
				equipmentService.getAll().then(function (result) {
					console.log(result);
					success({
						results: result.map((x) => {
							return { text: x.name, id: x.name };
						}),
					});
				});
			},
		},
		createTag: function (params) {
			var term = $.trim(params.term);

			if (term === '') {
				return null;
			}

			return {
				id: term,
				text: term,
			};
		},
		templateResult: (data) => data.text,
		templateSelection: (data) => data.text,
		dropdownParent: $('#taskPersonalModal'),
	});

	$('#mainDevice').select2({
		tags: true,
		width: '100%',
		placeholder: 'Select a state',
		allowClear: true,
		ajax: {
			transport: function (params, success, failure) {
				equipmentService.getAll().then(function (result) {
					console.log(result);
					success({
						results: result.map((x) => {
							return { text: x.name, id: x.name };
						}),
					});
				});
			},
		},
		createTag: function (params) {
			var term = $.trim(params.term);

			if (term === '') {
				return null;
			}

			return {
				id: term,
				text: term,
			};
		},
		templateResult: (data) => data.text,
		templateSelection: (data) => data.text,
		dropdownParent: $('#taskPersonalModal'),
	});

	$('#saveTask').click(function () {
		let setTaskInputDto = {
			StartDateTime: $('#startWorkDateTime').val(),
			JointIds: $('#').val(),
			EquipmentIds: $('#tools').val(),
			MainEquipmentIds: $('#mainDevice').val(),
			TeamLeadId: $('#teamLead').val(),
			EmployeeIds: $('#inspectors').val(),
			ValidCertificateId: $('#validCertificate').val(),
		};
		console.log(setTaskInputDto);
		// await bookService.update(bookDto);
		// $('#taskPersonalModal').modal('hide');
	});

	$('[data-type]').click(function () {
		let type = $(this).data('type')
		console.log(type);
		switch(type){
			case 'piping': 
			{
						jointsTable.column('4').visible(true);
						jointsTable.column('5').visible(true);
						jointsTable.column('6').visible(true);
						jointsTable.column('7').visible(false);
						jointsTable.column('8').visible(false);
						jointsTable.column('9').visible(false);
						jointsTable.column('10').visible(false);
			}
				break;
				case 'tanks': 
				{
					jointsTable.column('4').visible(false);
					jointsTable.column('5').visible(false);
					jointsTable.column('6').visible(false);
					jointsTable.column('7').visible(false);
					jointsTable.column('8').visible(false);
					jointsTable.column('9').visible(true);
					jointsTable.column('10').visible(false);
				}
					break;
					case 'steelStructure': 
				{
					jointsTable.column('4').visible(false);
					jointsTable.column('5').visible(false);
					jointsTable.column('6').visible(false);
					jointsTable.column('7').visible(true);
					jointsTable.column('8').visible(false);
					jointsTable.column('9').visible(false);
					jointsTable.column('10').visible(false);
				}
					break;
					case 'pipeLine': 
					{
						jointsTable.column('4').visible(false);
						jointsTable.column('5').visible(false);
						jointsTable.column('6').visible(false);
						jointsTable.column('7').visible(false);
						jointsTable.column('8').visible(false);
						jointsTable.column('9').visible(false);
						jointsTable.column('10').visible(true);
					}
						break;
						case 'qualification': 
						{
							jointsTable.column('4').visible(false);
							jointsTable.column('5').visible(false);
							jointsTable.column('6').visible(false);
							jointsTable.column('7').visible(false);
							jointsTable.column('8').visible(false);
							jointsTable.column('9').visible(false);
							jointsTable.column('10').visible(false);
						}
							break;

							case 'rebar': 
							{
								jointsTable.column('4').visible(false);
								jointsTable.column('5').visible(false);
								jointsTable.column('6').visible(false);
								jointsTable.column('7').visible(false);
								jointsTable.column('8').visible(false);
								jointsTable.column('9').visible(false);
								jointsTable.column('10').visible(false);
							}
								break;
		}
		jointsTable.ajax.reload();

	});
	$('[data-type].active').trigger('click');

});
