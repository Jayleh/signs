function renderTable() {
    let $tBody = document.querySelector("tbody");

    for (let i = 0, ii = dataSet.length; i < ii; i++) {
        // Insert row and assign to variable
        let $row = $tBody.insertRow(i);
        // $row.setAttribute("class", "ufo-table-row");

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

        // a break for testing
        if (i === 149) {
            break;
        }
    }

}

function filterDate() {
    let $input, filter, $table, $tr;

    $input = document.querySelector("#searchDate");
    filter = $input.value;
    $table = document.querySelector("table");
    $tr = $table.querySelectorAll("tr");

    for (let i = 0, ii = $tr.length; i < ii; i++) {

        let $td = $tr[i].querySelectorAll("td")[0];
        if ($td) {
            if ($td.innerHTML.indexOf(filter) > -1) {
                $tr[i].style.display = "";
            }
            else {
                $tr[i].style.display = "none";
            }
        }
    }
}

renderTable();

// jQuery for pagination
$(document).ready(() => {

    // $("#searchDate").on("keyup", () => {
    //     let value = $(this).val().toLowerCase();


    //     $("#myTable tr").filter(function () {
    //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    // });



    let totalRows = $('#ufo-table tbody tr').length;
    let maxRows = 25;
    $(`#ufo-table tbody tr:gt(${maxRows - 1})`).hide();

    let totalPages = Math.ceil(totalRows / maxRows);

    for (let i = 1; i <= totalPages; i++) {
        $(`.pagination > li:nth-child(${i})`).after(`<li data-page="${i}" class="page-item page-num"><a class="page-link" href="javascript:void(0)">${i}</a></li>`).show();
    }

    $(`.pagination li[data-page='1']`).addClass('active');

    $('.pagination li.page-num').on('click', event => {
        if ($(event.currentTarget).hasClass('active')) {
            return false;
        }
        else {
            let pageNum = $(event.currentTarget).index();
            console.log(`User clicked on page #${pageNum}`);
            $('.pagination li').removeClass('active');
            $(event.currentTarget).addClass('active');

            $(`#ufo-table tbody tr`).hide();

            let grandTotal = maxRows * pageNum;

            for (let j = grandTotal - maxRows; j < grandTotal; j++) {
                $(`#ufo-table tbody tr:eq(${j})`).show();
            }
        }
    });

    $('#next-btn').on('click', () => {
        let currentPage = $('.pagination li.active').index();
        if (currentPage === totalPages) {
            return false;
        }
        else {
            currentPage++;
            $('.pagination li').removeClass('active');
            $('#ufo-table tbody tr').hide();

            let grandTotal = maxRows * currentPage;

            for (let j = grandTotal - maxRows; j < grandTotal; j++) {
                $(`#ufo-table tbody tr:eq(${j})`).show();
            }

            $(`.pagination li.page-num:eq(${currentPage - 1})`).addClass('active');
        }
    });

    $('#previous-btn').on('click', () => {
        let currentPage = $('.pagination li.active').index();
        if (currentPage === 1) {
            return false;
        }
        else {
            currentPage--;
            $('.pagination li').removeClass('active');
            $('#ufo-table tbody tr').hide();

            let grandTotal = maxRows * currentPage;

            for (let j = grandTotal - maxRows; j < grandTotal; j++) {
                $(`#ufo-table tbody tr:eq(${j})`).show();
            }

            $(`.pagination li.page-num:eq(${currentPage - 1})`).addClass('active');
        }
    });

})



















// $(document).ready(() => {

//     let $table = document.querySelector('table');

//     $('.pagination li').html();
//     let trNum = 0;
//     let maxRows = 25;
//     let totalRows = $(`${ $table } tbody tr`).length;

//     $(`${ $table } tr: gt(0) `).each(() => {
//         trNum++;
//         if (trNum > maxRows) {
//             $(this).hide();
//         }
//         else if (trNum <= maxRows) {
//             $(this).show();
//         }
//     });

//     if (totalRows > maxRows) {
//         let pageNum = Math.ceil(totalRows / maxRows);
//         for (let i = 1; i <= pageNum;) {
//             $('#previous-btn').append(`< li data - page="${i}" > <span>${i++}<span class="sr-only">(curent)</span></span></li > `).show();
//         }
//     }

//     $('pagination li:first-child').addClass('active');
//     $('pagination li').on('click', () => {
//         let pageNum = $(this).attr('data-page');
//         let trIndex = 0;
//         $('pagination li').removeClass('active');
//         $(`${ $table } tr: gt(0) `).each(() => {
//             trIndex++
//             if ((trIndex > (maxRows * pageNum)) || (trIndex <= ((maxRows * pageNum) - maxRows))) {
//                 $(this).hide();
//             }
//             else {
//                 $(this).show();
//             }
//         });
//     });
// })