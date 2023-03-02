// *************** New Logic ****************** 

let tableRef = document.getElementById('textBoxTable');
if (tableRef.rows.length <= maxCondition) {
    let table = document.getElementById("textBoxRow");

    // Create row element
    let row = document.createElement("tr");

    // Create cells
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");

    // Insert data to cells
    c1.innerHTML = `<input id="input" type="text">`;
    c2.innerHTML = `<input id="input" type="text">`;
    c3.innerHTML = `<button class="btn minusButton py-1" id="rowAddButton" onclick="deleteRow(this)">-</button>`;

    // Append cells to row
    row.appendChild(c1);
    row.appendChild(c2); 
    row.appendChild(c3);

    // Append row to table body
    table.appendChild(row);
} else {
    document.getElementById('Add').disabled = true;
    document.getElementById('alertBox').innerHTML = `<div class="alert alert-primary mt-5" role="alert"> You Can't Add More Rows! </div>`;
}


// page reload jquery logic
$("#reload").on("click", function () {
    $('#dom').load('#dom');
});