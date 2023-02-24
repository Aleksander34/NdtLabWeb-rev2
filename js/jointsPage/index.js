import requestService from '../api/requestService.js';
import jointService from '../api/jointService.js';
import inspectionService from '../api/inspectionService.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#example');

		let jointTypeDict = {
			piping:0,
			tanks:1,
			steelStructure:2,
			pipeLine:3,
			DS:4,
			TR:5,
			PQR:6,
			KSS:7,
			rebar:8,
		}

	$('#requestPreviewTable').DataTable({
		ordering: false,
		searching: false,
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
		info: false,
		paging: false,

		columns: [
			{
				data: 'number',
			},
			{
				data: 'weldingDate',
			},
			{
				data: 'weldingType',
			},
			{
				data: 'connectionType',
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
				data: 'stamps',
			},
			{
				data: null,
				render: function (data, type, row, meta) {
					return row.inspections?.map(x=>x.name).join(', ') || '';
			}},
			{
				data: 'weldLength',
			},
			{
				data: 'note',
			},
		],
	});

	$('#repairCountTable').DataTable({
		ordering: false,
		searching: false,
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
		info: false,
		paging: false,
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

	let data = [];

	let jointsTable = _$table.DataTable({
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
					return meta.row + meta.settings._iDisplayStart + 1;
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

	_$modal
		.on('shown.bs.modal', () => {}) //действия при открытии
		.on('hidden.bs.modal', () => {
			$('#requestFile').val('');
			$('#requestPreviewInfo').addClass('d-none'); // действия при закрытии
		}); //ивент который происходит во время запуска модального окна

	$('#productionRequest').click(function () {
		$('#qualificationRequestType').addClass('d-none');
		$('#productionRequestType').removeClass('d-none');
		$(this).addClass('active');
		$('#qualificationRequest').removeClass('active');
	});

	$('#qualificationRequest').click(function () {
		$('#productionRequestType').addClass('d-none');
		$('#qualificationRequestType').removeClass('d-none');
		$(this).addClass('active');
		$('#productionRequest').removeClass('active');
	});

	$('.requestType').click(function () {
		$('.requestType').removeClass('active');
		$(this).addClass('active');
	});

	//на главной
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

	let file;

	$('#requestFile').change(async function () {
		if ($(this).get(0).files.length > 0) {
			let fileName = $(this).get(0).files[0].name;
			if (!fileName.match(/.*\.(xlsx|xls|xlsb)/)) {
				toastr['warning']('Допустимые форматы: .xlsx .xls .xlsb', 'Не верный формат файла');
				$('#requestPreviewInfo').addClass('d-none');
				return;
			}

			file = $(this).get(0).files[0];
			let previewRequest = await requestService.getPreviewRequest(file);
			console.log(previewRequest);
			$('#requestNumber').text(previewRequest.request.number);
			$('#requestData').text(new Date(previewRequest.request.date).toLocaleDateString());
			$('#requestWeldingCompany').text(previewRequest.request.weldingCompany);
			$('#divisionName').text(previewRequest.request.division.name);
			$('#requestObject').text(previewRequest.request.object);
			$('#requestPartObject').text(previewRequest.request.partObject);
			$('#requestCategoryGost').text(previewRequest.request.categoryGost);
			$('#requestOtherCategory').text(previewRequest.request.otherCategory);
			$('#requestDraw').text(previewRequest.request.draw);
			$('#requestTemperature').text(previewRequest.request.temperature);

			$('#requestReferencesDocMainDoc').text(previewRequest.request.referencesDoc.mainDoc);
			$('#requestReferencesDocWeldingDoc').text(previewRequest.request.referencesDoc.weldingDoc);
			$('#requestReferencesDocInspectionDoc').text(previewRequest.request.referencesDoc.inspectionDoc);
			$('#requestReferencesDocQualityCriteria').text(previewRequest.request.referencesDoc.qualityCriteria);

			$('#requestPipingZone').text(previewRequest.request.piping.zone);
			$('#requestPipingLine').text(previewRequest.request.piping.line);
			$('#requestPipingSpool').text(previewRequest.request.piping.spool);
			$('#requestSteelStructureSector').text(previewRequest.request.steelStructure.sector);
			$('#requestSteelStructurePart').text(previewRequest.request.steelStructure.part);
			$('#tankPart').text(previewRequest.request.tank.part);
			$('#requestPipeLineDistance').text(previewRequest.request.pipeLine.distance);
			$('#requestRebar').text(previewRequest.request.rebar);
			$('#QualificationType').text(previewRequest.request.qualification);

			$('#requestSubmittedBy').text(previewRequest.request.submittedBy);
			$('#requestReceivedByFio').text(previewRequest.request.receivedByFio);

			previewRequest.joints.forEach((element) => {
				console.log(element);
				$('#requestPreviewTable').DataTable().row.add(element).draw(false);
			});

			$('#requestPreviewInfo').removeClass('d-none');
		}
	});

	$('#saveRequest').click(async function () {
		$('#exampleModal').modal('hide');
		await requestService.addRequest(file);
		swal('Успешно!', 'Заявка загружена', 'success');
	});

	// let f1 = initColumnFilter('#example', '.colWithFilter[data-num="3"]');
	// let f2 = initColumnFilter('#example', '.colWithFilter[data-num="2"]');
	// let f3 = initColumnFilter('#example', '.colWithFilter[data-num="1"]');

	$(document).on('click', '.showRepairCountModal', function () {
		$('#repairCountModal').modal('show');
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

	let jointId;
	let inspectionTable = $('#inspectionTable').DataTable({
		ordering: false,
		searching: false,
		dom: [
			"<'row'<'col-md-12'f>>",
			"<'row'<'col-md-12't>>",
			"<'row mt-2'",
			"<'col-lg-1 col-xs-12'<'float-left text-center data-tables-refresh'>>",
			"<'col-lg-3 col-xs-12'<'float-left text-center'i>>",
			"<'col-lg-3 col-xs-12'<'text-center'l>>",
			"<'col-lg-5 col-xs-12'<'float-right'p>>",
			'>',
		].join(''),
		info: false,
		paging: false,
		buttons: [{ name: 'refresh', text: '<i class="fa-solid fa-rotate"></i>', action: () => inspectionTable.ajax.reload().draw(false) }],
		language: language,
		drawCallback: () => {
			$('[data-bs-toggle="tooltip"]').tooltip();
		},
		ajax: (data, success, failure) => {
			console.log(jointId);
			if (jointId) {
				inspectionService.getAll(jointId).then(function (result) {
					success(result);
				});
			} else {
				success({ data: [], recordsTotal: 0, recordsFiltered: 0 });
			}
		},
		columns: [
			{
				data: 'name',
				render: (data, type, row) => {
					return `${data}
				<button type="button" data-id="${row.id}" data-bs-toggle="tooltip" title="История" class="btn btn-primary ms-2 btn-inspectionHistory">
					<span class="badge bg-secondary">${5}</span>
				</button>`;
				},
			},
			{
				data: 'result',
			},
			{
				data: 'date',
			},
			{
				data: 'requestDate',
			},
			{
				data: 'reportNumber',
			},
			{
				data: 'reportDate',
			},
			{
				data: 'description',
			},
			{
				data: 'type',
			},
			{
				data: 'timeInProcess',
			},
		],
	});

	$(document).on('click', '.jointInspections', function () {
		jointId = $(this).data('joint');
		console.log(jointId);
		inspectionTable.ajax.reload();
	});

	$(document).on('click', '.btn-inspectionHistory', function () {
		$('#inspectionHistory').removeClass('d-none');
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