function renderTable() {
    let $tBody = document.querySelector("tbody");

    for (let i = 0, ii = dataSet.length; i < ii; i++) {
        // Insert row and assign to variable
        let $row = $tBody.insertRow(i);

        // Grab each sighting (indices) from dataSet
        let sighting = dataSet[i];

        // Grab the keys from each sighting
        let fields = Object.keys(sighting);

        // a break for testing
        if (i === 50) {
            break;
        }

        for (let j = 0, jj = fields.length; j < jj; j++) {
            let field = fields[j];
            let $cell = $row.insertCell(j);

            // Get the values from dict[key]
            $cell.innerHTML = sighting[field];

            // Add title attribute with cell inner html for hover
            $cell.title = $cell.innerHTML;
        }
    }

}


function myFunction() {
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