export default function initColumnFilter(selectorTable, selectorCol) {
	initFilter($(selectorCol));
	let _$table = $(selectorTable);
	let _$filter = $(selectorCol).find('.tableColumnFilter');
	let colNum = $(selectorCol).data('num');
	let column = _$table.DataTable().column(colNum - 1);

	let set = new Set();
	column.data().each((element) => {
		set.add(element);
	});

	let filter = {
		data: [...set],
		selectedItems: [],
	};

	filter.data.forEach((element) => {
		_$filter.find('.tableColumnFilter__items')
			.append(`<li class="k-item" data-name="${element}"><label class="k-label k-checkbox-label"><input type="checkbox" class="k-checkbox k-checkbox-md k-rounded-md" value="Perth Pasties" /><span>${element}</span></label>
</li>`);
	});

	_$filter.find('.tableColumnFilter__search').on('keyup', function () {
		let keyword = $(this).val().toLowerCase().trim();

		if (keyword == '') {
			_$filter.find('.tableColumnFilter__items').find(`[data-name]`).removeClass('d-none');
			return;
		}

		_$filter.find('.tableColumnFilter__items').find(`[data-name]`).addClass('d-none');
		let filteredData = filter.data.filter((x) => x.toLowerCase().includes(keyword.toLowerCase()));
		filteredData.forEach((element) => {
			_$filter.find('.tableColumnFilter__items').find(`[data-name=${element}]`).removeClass('d-none');
		});
	});

	_$filter.find('.tableColumnFilter__items input:checkbox').change(function () {
		let choisedElement = $(this).siblings('span').text();
		if (this.checked) {
			filter.selectedItems.push(choisedElement);
		} else {
			filter.selectedItems = filter.selectedItems.filter((x) => x != choisedElement);
		}
	});

	_$filter.find('.tableColumnFilter__filter-btn').click(function () {
		let regExp = '';
		if (filter.selectedItems.length > 0) {
			regExp = '(' + filter.selectedItems.join('|');
			regExp = regExp.substring(0, regExp.length - 2);
			regExp += ')';
		}

		let api = _$table.DataTable();
		api.column(colNum - 1)
			.search(regExp, true)
			.draw();
	});

	_$filter.find('.tableColumnFilter__clear-btn').click(function () {
		_$filter.find('.tableColumnFilter__items input:checkbox:checked').each(function () {
			$(this).prop('checked', false);
			let api = _$table.DataTable();
			api.column(colNum - 1)
				.search('', true)
				.draw();
		});
	});
	_$filter.siblings('.filterShow').click(function () {
		// _$filter.toggleClass('d-none');
	});
	$('.dataTables_scrollBody').find('.tableColumnFilter-wrapper').addClass('d-none');
	return filter;
}

//создание метода фильтра создает фильтр на странице
function initFilter(_$col) {
	_$col.append(`
	<div class="tableColumnFilter-wrapper dropdown">
	<button type="button" class="btn text-secondary btnIcon filterShow" data-bs-toggle="dropdown" data-bs-title="Фильтр"><i class="fa-solid fa-filter"></i></button>
	<div class="tableColumnFilter dropdown-menu dropdown-menu-lg dropdown-menu-right">
		<span class="dropdown-header">15 выбрано</span>
		<div class="dropdown-divider"></div>
		<input class="tableColumnFilter__search dropdown-item" type="text" placeholder="Search" />
		<ul class="tableColumnFilter__items dropdown-item"></ul>
		<div class="dropdown-divider"></div>
		<div class="dropdown-item dropdown-footer">
			<button type="button" class="tableColumnFilter__filter-btn">поиск фильтр</button>
			<button type="button" class="tableColumnFilter__clear-btn">очистить фильтр</button>
		</div>
	</div>
</div>
	`);
}
