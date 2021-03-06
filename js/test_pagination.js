function renderTable() {
    let $tBody = document.querySelector('tbody');

    for (let i = 0, ii = dataSet.length; i < ii; i++) {
        // Insert row and assign to variable
        let $row = $tBody.insertRow(i);
        // $row.setAttribute('class', 'ufo-table-row');

        // Grab each sighting (indices) from dataSet
        let sighting = dataSet[i];

        // Grab the keys from each sighting
        let fields = Object.keys(sighting);

        for (let j = 0, jj = fields.length; j < jj; j++) {
            let field = fields[j];
            let $cell = $row.insertCell(j);

            // Get the values from dict[key]
            $cell.innerHTML = sighting[field];

            // Add title attribute with cell inner html for hover
            $cell.title = $cell.innerHTML;
        }

        // Break for testing
        if (i === 2499) {
            break;
        }
    }
}


renderTable();


function filterDate() {
    let $input, filter, $table, $tr;

    $input = document.querySelector('#searchDate');
    filter = $input.value;
    $table = document.querySelector('table');
    $tr = $table.querySelectorAll('tr');

    for (let i = 0, ii = $tr.length; i < ii; i++) {

        let $td = $tr[i].querySelectorAll('td')[0];
        if ($td) {
            if ($td.innerHTML.indexOf(filter) > -1) {
                $tr[i].style.display = '';
            }
            else {
                $tr[i].style.display = 'none';
            }
        }
    }
}


$(document).ready(() => {

    // $("#searchDate").on("keyup", () => {
    //     let value = $(this).val();

    //     $("#ufo-table tbody tr").filter(() => {
    //         $(this).toggle($(this).text().indexOf(value) > -1)
    //     });
    // });

    // Returns an array of maxLength (or less) page numbers
    // where a 0 in the returned array denotes a gap in the series.
    // Parameters:
    //   totalPages:     total number of pages
    //   page:           current page
    //   maxLength:      maximum size of returned array
    function getPageList(totalPages, page, maxLength) {
        if (maxLength < 5) throw 'maxLength must be at least 5';

        function range(start, end) {
            return Array.from(Array(end - start + 1), (_, i) => i + start);
        }

        let sideWidth = maxLength < 9 ? 1 : 2;
        let leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
        let rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
        if (totalPages <= maxLength) {
            // no breaks in list
            return range(1, totalPages);
        }
        else if (page <= maxLength - sideWidth - 1 - rightWidth) {
            // no break on left of page
            return range(1, maxLength - sideWidth - 1)
                .concat([0])
                .concat(range(totalPages - sideWidth + 1, totalPages));
        }
        else if (page >= totalPages - sideWidth - 1 - rightWidth) {
            // no break on right of page
            return range(1, sideWidth)
                .concat([0])
                .concat(range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }
        // Breaks on both sides
        return range(1, sideWidth)
            .concat([0])
            .concat(range(page - leftWidth, page + rightWidth))
            .concat([0])
            .concat(range(totalPages - sideWidth + 1, totalPages));
    }

    $(function () {
        // Number of items and limits the number of items per page
        let numberOfItems = $('#ufo-table tbody tr').length;
        // let numberOfItems = $('#ufo-table tbody tr:''').length;
        // let numberOfItems = $('#ufo-table tbody tr').filter(function () {
        //     return $(this).css('display') !== 'none';
        // }).length;

        let limitPerPage = 20;
        // Total pages rounded upwards
        let totalPages = Math.ceil(numberOfItems / limitPerPage);
        // Number of buttons at the top, not counting prev/next,
        // but including the dotted buttons.
        // Must be at least 5:
        let paginationSize = 7;
        let currentPage;

        function showPage(whichPage) {
            if (whichPage < 1 || whichPage > totalPages) {
                return false;
            }
            currentPage = whichPage;
            $('#ufo-table tbody tr').hide()
                .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

            // Replace the navigation items (not prev/next):            
            $('.pagination li').slice(1, -1).remove();
            getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                $('<li>').addClass('page-item')
                    .addClass(item ? 'current-page' : 'disabled')
                    .toggleClass('active', item === currentPage).append(
                        $('<a>').addClass('page-link').attr({
                            href: 'javascript:void(0)'
                        }).text(item || '...')
                    ).insertBefore('#next-page');
            });
            // Disable prev/next when at first/last page:
            $('#previous-page').toggleClass('disabled', currentPage === 1);
            $('#next-page').toggleClass('disabled', currentPage === totalPages);
            return true;
        }

        // Include the prev/next buttons:
        $('.pagination').append(
            $('<li>').addClass('page-item').attr({ id: 'previous-page' }).append(
                $('<a>').addClass('page-link').attr({
                    href: 'javascript:void(0)'
                }).text('Prev')
            ),
            $('<li>').addClass('page-item').attr({ id: 'next-page' }).append(
                $('<a>').addClass('page-link').attr({
                    href: 'javascript:void(0)'
                }).text('Next')
            )
        );

        // Show the page links
        $('#ufo-table').show();
        showPage(1);

        // Use event delegation, as these items are recreated later    
        $(document).on('click', '.pagination li.current-page:not(.active)', function () {
            return showPage(+$(this).text());
        });

        $('#next-page').on('click', function () {
            return showPage(currentPage + 1);
        });

        $('#previous-page').on('click', function () {
            return showPage(currentPage - 1);
        });
    });

});