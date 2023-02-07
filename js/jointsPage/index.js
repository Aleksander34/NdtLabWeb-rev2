import requestService from '../api/requestService.js';
import initColumnFilter from '../libs/tableColumnFilter.js';
$(function () {
	var _$modal = $('#exampleModal'),
		_$table = $('#example');

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
				data: 'requiredInspection',
			},
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

	_$table.DataTable({
		ordering: false,
		searching: false,
		data: data,
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
		buttons: [{ name: 'refresh', text: '<i class="fa-solid fa-rotate"></i>', action: () => console.log('refresh') }],
		language: language,
		drawCallback: () => {
			$('[data-bs-toggle="tooltip"]').tooltip();
		},
		columns: [
			{
				data: null,
				render: (data) => {
					let btns = [
						`<button type="button" class="btn text-danger btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Удалить"><i class="fa-solid fa-xmark"></i></button>`,
						`<button type="button" class="btn text-secondary btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Редактировать"><i class="fa-solid fa-pen"></i></button>`,
						`<button type="button" class="showRepairCountModal btn text-secondary btnIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Количество: 10"><i class="fa-regular fa-eye"></i></button>`,
					].join('');
					return `<div class="d-flex align-items-center">
					${btns}
					</div>`;
				},
			},

			{
				data: 'sN',
			},
			{
				data: 'request_number',
			},
			{
				data: 'request_partObject',
			},
			{
				data: 'joint_number',
			},
			{
				data: 'piping_zone',
			},
			{
				data: 'piping_line',
			},
			{
				data: 'piping_spool',
			},
			{
				data: 'steelStructure_part',
			},
			{
				data: 'steelStructure_sector',
			},
			{
				data: 'tank_part',
			},
			{
				data: 'pipeLine_distance',
			},
			{
				data: 'joint_connectionType',
			},
			{
				data: 'joint_weldingType',
			},
			{
				data: 'welder_stamp',
			},
			{
				data: 'joint_weldingDate',
			},
			{
				data: 'request_date',
			},
			{
				data: 'joint_elementOne',
			},
			{
				data: 'joint_elementTwo',
			},
			{
				data: 'joint_diameterOne',
			},
			{
				data: 'joint_diameterTwo',
			},
			{
				data: 'joint_thicknessOne',
			},
			{
				data: 'joint_thicknessTwo',
			},
			{
				data: 'joint_gradeOne',
			},
			{
				data: 'joint_gradeTwo',
			},
			{
				data: 'request_categoryGost',
			},
			{
				data: 'request_otherCategory',
			},
			{
				data: 'requiredInspection_name',
			},
			{
				data: 'rt_inspection_name',
			},
			{
				data: 'rt_inspection_date',
			},
			{
				data: 'rt_inspection_reportDate',
			},
			{
				data: 'rt_inspection_reportNumber',
			},
			{
				data: 'rt_inspection_result',
			},
			{
				data: 'rt_inspection_description',
			},
			{
				data: 'paut_Inspection_name',
			},
			{
				data: 'paut_inspection_date',
			},
			{
				data: 'paut_inspection_reportDate',
			},
			{
				data: 'paut_inspection_reportNumber',
			},
			{
				data: 'paut_inspection_result',
			},
			{
				data: 'paut_inspection_description',
			},
			{
				data: 'ut_inspection_name',
			},
			{
				data: 'ut_inspection_date',
			},
			{
				data: 'ut_inspection_reportDate',
			},
			{
				data: 'ut_inspection_reportNumber',
			},
			{
				data: 'ut_inspection_result',
			},
			{
				data: 'ut_inspection_description',
			},
			{
				data: 'vt_inspection_name',
			},
			{
				data: 'vtinspection_date',
			},
			{
				data: 'vtinspection_reportDate',
			},
			{
				data: 'vtinspection_reportNumber',
			},
			{
				data: 'vtinspection_result',
			},
			{
				data: 'vtinspection_description',
			},
			{
				data: 'pt_inspection_name',
			},
			{
				data: 'pt_inspection_date',
			},
			{
				data: 'pt_inspection_reportDate',
			},
			{
				data: 'pt_inspection_reportNumber',
			},
			{
				data: 'pt_inspection_result',
			},
			{
				data: 'pt_inspection_description',
			},
			{
				data: 'mt_inspection_name',
			},
			{
				data: 'mt_inspection_date',
			},
			{
				data: 'mt_inspection_reportDate',
			},
			{
				data: 'mt_inspection_reportNumber',
			},
			{
				data: 'mt_inspection_result',
			},
			{
				data: 'mt_inspection_description',
			},
			{
				data: 'lt_inspection_name',
			},
			{
				data: 'lt_inspection_date',
			},
			{
				data: 'lt_inspection_reportDate',
			},
			{
				data: 'lt_inspection_reportNumber',
			},
			{
				data: 'lt_inspection_result',
			},
			{
				data: 'lt_inspection_description',
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
			$('#divisionName').text(previewRequest.division.name);
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
			$('#tankPart').text(previewRequest.tankPart);
			$('#requestPipeLineDistance').text(previewRequest.request.pipeLine.distance);
			$('#requestRebar').text(previewRequest.request.rebar);
			$('#QualificationType').text(previewRequest.qualificationType);

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

	let f1 = initColumnFilter('#example', '.colWithFilter[data-num="3"]');
	let f2 = initColumnFilter('#example', '.colWithFilter[data-num="2"]');
	let f3 = initColumnFilter('#example', '.colWithFilter[data-num="1"]');

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
});
