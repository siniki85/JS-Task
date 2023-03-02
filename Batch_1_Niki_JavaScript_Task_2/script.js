function insertData() {
    var table = document.getElementById("dataTableMain");
    var row = table.insertRow(-1);
    var firstColumn = row.insertCell(0); // insert in first column
    var secondColumn = row.insertCell(1); // insert in second column
    var thirdColumn = row.insertCell(2); // insert in third column
    var fourthColumn = row.insertCell(3); // insert in fourth column
    var fifthColumn = row.insertCell(4); // insert in fifth column
    var lastColumn = row.insertCell(5); // insert in last column
    firstColumn.innerHTML = `<p class="counter"></p>`;
    secondColumn.innerHTML = `<input type="text" name="fname" class="form-control" onkeydown="return/[a-zA-Z]/i.test(event.key)"/>`;
    thirdColumn.innerHTML = `<input type="text" name="sub" class="form-control" onkeydown="return/[a-zA-Z]/i.test(event.key)">`;
    fourthColumn.innerHTML = `<input type="number" name="mark" class="form-control" min="0" max="100" />`;
    fifthColumn.innerHTML = `<button type="button" class="btn accept m-1"><i class="bi bi-check-square"></i></button><button type="button" class="btn reject m-1"><i class="bi bi-x-square"></i></button>`;
    lastColumn.innerHTML = `<button type="button" class="btn remove m-1" id="removeButton" onclick="deleteRow(this)"><i class="bi bi-trash-fill"></i></button>`;
}
// this is the function to detele textbox 
function deleteRow(row) {
    var particularRow = row.parentNode.parentNode.rowIndex;
    document.getElementById('dataTableMain').deleteRow(particularRow);
}
function showData() {
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    if (!document.getElementById("myForm").checkValidity()) {
        return false;
    }
    const formVar = document.getElementById('myForm');
    const formdata = new FormData(formVar);
    var getName = formdata.getAll('fname');
    var getSub = formdata.getAll('sub')
    var getMark = formdata.getAll('mark');
    var table = document.getElementById("showData");
    table.innerHTML = "";
    table.innerHTML = `<thead><tr> <th scope="col">No.</th> 
                                <th scope="col" onclick="sortByName()">Name</th> <th scope="col" onclick="sortBySubject()">Subject</th> <th scope="col">Mark</th> <th scope="col">Result</th> 
                        </tr></thead>`;
    for (let i = 0; i < getName.length; i++) {
        var row = table.insertRow();
        var firstColumn = row.insertCell(0); // Fill Data in first column
        var secondColumn = row.insertCell(1); // Fill Data in second column
        var thirdColumn = row.insertCell(2); // Fill Data in third column
        var fourthColumn = row.insertCell(3); // Fill Data in fourth column
        var fifthColumn = row.insertCell(4); // Fill Data in fifth column
        if (getMark[i] < 34) {
            row.className = "table-danger";
            firstColumn.innerHTML = `<p class="counter"></p>`;
            secondColumn.innerHTML = getName[i];
            thirdColumn.innerHTML = getSub[i];
            fourthColumn.innerHTML = getMark[i];
            fifthColumn.innerHTML = "Fail";
        } else {
            firstColumn.innerHTML = `<p class="counter"></p>`;
            secondColumn.innerHTML = getName[i];
            thirdColumn.innerHTML = getSub[i];
            fourthColumn.innerHTML = getMark[i];
            fifthColumn.innerHTML = "Pass";
        }
    }
}

let searchByName_Subject = document.getElementById('searchHere');
searchByName_Subject.addEventListener("keyup", function () {
    document.getElementById("dataForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    var keyword = this.value;
    keyword = keyword.toUpperCase();
    var table_2 = document.getElementById("showData");
    var all_tr = table_2.getElementsByTagName("tr");
    for (var i = 0; i < all_tr.length; i++) {
        var name_column = all_tr[i].getElementsByTagName("td")[1];
        var sub_column = all_tr[i].getElementsByTagName("td")[2];
        if (name_column && sub_column) {
            var name_value = name_column.textContent || name_column.innerText;
            var sub_value = sub_column.textContent || sub_column.innerText;
            name_value = name_value.toUpperCase();
            sub_value = sub_value.toUpperCase();
            if ((name_value.indexOf(keyword) > -1) || (sub_value.indexOf(keyword) > -1)) {
                all_tr[i].style.display = ""; // show
            } else {
                all_tr[i].style.display = "none"; // hide
            }
        }
    }
});

function sortByName() {
    document.getElementById("dataForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    var table, i, x, y;
    table = document.getElementById("showData");
    var switching = true;
    while (switching) {
        switching = false;
        var rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];  
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                Switch = true;
                break;
            }
        }
        if (Switch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function sortBySubject() {
    document.getElementById("dataForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    var table, i, x, y;
    table = document.getElementById("showData");
    var switching = true;
    while (switching) {
        switching = false;
        var rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];  
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                Switch = true;
                break;
            }
        }
        if (Switch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}