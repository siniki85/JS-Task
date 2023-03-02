var index = 1;
const formVar = document.getElementById('myForm');

function insertData() {
    let table = document.getElementById("dataTableMain");
    let row = table.insertRow(-1);
    let firstColumn = row.insertCell(0); // insert in first column
    let secondColumn = row.insertCell(1); // insert in second column
    let thirdColumn = row.insertCell(2); // insert in third column
    let fourthColumn = row.insertCell(3); // insert in fourth column
    let fifthColumn = row.insertCell(4); // insert in fifth column
    let lastColumn = row.insertCell(5); // insert in last column
    firstColumn.innerHTML = `<p class="counter"></p>`;
    secondColumn.innerHTML = `<input type="text" name="fname" class="form-control" onkeydown="return/[a-zA-Z]/i.test(event.key)"/>`;
    thirdColumn.innerHTML = `<input type="text" name="sub" class="form-control" onkeydown="return/[a-zA-Z]/i.test(event.key)">`;
    fourthColumn.innerHTML = `<input type="number" name="mark" class="form-control" min="0" max="100" />`;
    fifthColumn.innerHTML = `<button type="button" onclick="onAccept(this)" class="btn accept m-1"><i class="bi bi-check-square"></i> </button><button type="button" class="btn reject m-1" onclick="onReject(this)"><i class="bi bi-x-square"></i></button>`;
    lastColumn.innerHTML = `<button type="button" class="btn remove m-1"  onclick="getindex(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="bi bi-trash-fill"></i> </button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">Delete Row</h4>
          </div>
          <div class="modal-body" style="font-size:18px;">
            Do You Want To Delete The Row ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn accept" id="" onclick="deleteRow()" data-bs-dismiss="modal">Confirm</button>
            <button type="button" class="btn remove" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
}

function getindex(row) {
    index = row.parentNode.parentNode.rowIndex;
}

function deleteRow() {
    document.getElementById('dataTableMain').deleteRow(index);
}

function showData() {
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    if (!document.getElementById("myForm").checkValidity()) {
        return false;
    }
    let formdata = new FormData(formVar);
    let getName = formdata.getAll('fname');
    let getSub = formdata.getAll('sub')
    let getMark = formdata.getAll('mark');
    let showDiv = document.getElementById("dataContainer");
    showDiv.style.visibility = "visible";
    let table = document.getElementById("showData");
    table.innerHTML = "";
    table.innerHTML = `<thead><tr> <th scope="col">No.</th> <th scope="col" onclick="sortByName_Subject(1)">Name <i class="bi bi-sort-alpha-down"></i></th> <th scope="col" onclick="sortByName_Subject(2)">Subject <i class="bi bi-sort-alpha-down"></i></th> <th scope="col">Mark</th> <th scope="col">Result</th> </tr></thead>`;
    for (let i = 0; i < getName.length; i++) {
        let row = table.insertRow();
        let firstColumn = row.insertCell(0); // Fill Data in first column
        let secondColumn = row.insertCell(1); // Fill Data in second column
        let thirdColumn = row.insertCell(2); // Fill Data in third column
        let fourthColumn = row.insertCell(3); // Fill Data in fourth column
        let fifthColumn = row.insertCell(4); // Fill Data in fifth column
        if (getMark[i] < 34) {
            row.className = "table-danger";
            fifthColumn.innerHTML = "Fail";
        } else {
            fifthColumn.innerHTML = "Pass";
        }
        firstColumn.innerHTML = `<p class="counter"></p>`;
        secondColumn.innerHTML = getName[i];
        thirdColumn.innerHTML = getSub[i];
        fourthColumn.innerHTML = getMark[i];
    }
    calcPercentage();
}
let searchByName_Subject = document.getElementById('searchHere');
searchByName_Subject.addEventListener("keyup", function () {
    document.getElementById("dataForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    let keyword = this.value;
    keyword = keyword.toUpperCase();
    let table_2 = document.getElementById("showData");
    let all_tr = table_2.getElementsByTagName("tr");
    for (let i = 0; i < all_tr.length; i++) {
        let name_column = all_tr[i].getElementsByTagName("td")[1];
        let sub_column = all_tr[i].getElementsByTagName("td")[2];
        if (name_column && sub_column) {
            let name_value = name_column.textContent || name_column.innerText;
            let sub_value = sub_column.textContent || sub_column.innerText;
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

function sortByName_Subject(colIndex) {
    document.getElementById("dataForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    let table, i, x, y;
    table = document.getElementById("showData");
    let switching = true;
    while (switching) {
        switching = false;
        let rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;
            x = rows[i].getElementsByTagName("TD")[colIndex];
            y = rows[i + 1].getElementsByTagName("TD")[colIndex];
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

function calcPercentage() {
    let formdata = new FormData(formVar);
    let getName = formdata.getAll('fname');
    let getSub = formdata.getAll('sub')
    let getMark = formdata.getAll('mark');
    let data = [];
    getName.forEach((element, index) => {
        element = {
            name: element,
            mark: getMark[index],
            sub: getSub[index],
        }
        data.push(element);
    });
    let table = document.getElementById("showPer");
    table.innerHTML = "";
    table.innerHTML = `<thead><tr> <th scope="col">No.</th> <th scope="col">Name</th> <th scope="col">Percentage</th> </tr></thead>`;
    const set1 = new Set(getName);
    set1.forEach((name) => {
        let row = table.insertRow();
        let firstColumn = row.insertCell(0); // Fill Data in first column
        let secondColumn = row.insertCell(1); // Fill Data in second column
        let thirdColumn = row.insertCell(2); // Fill Data in third column
        let totalMarks = 0;
        let count = 0;
        for (let j = 0; j < data.length; j++) {
            if (name == data[j].name) {
                count++;
                firstColumn.innerHTML = `<p class="counter"></p>`;
                secondColumn.innerHTML = data[j].name;
                totalMarks += parseInt(data[j].mark);
                if (data[j].mark <= 33) {
                    row.className = "table-danger";
                }
            }
        }
        let percentage = totalMarks / count;
        thirdColumn.innerHTML = percentage.toFixed(2) + `%`;
    });
}

function onAccept(acceptBtn) {
    acceptBtn.style.background = "linear-gradient(to bottom right, #1b2a20, #47a152)";
    acceptBtn.style.color = "white"
    acceptBtn.style.transition = "all 0.7s";
    acceptBtn.style.border = "1px solid rgb(17, 52, 42)";
    acceptBtn.style.boxShadow = "rgba(43, 131, 106, 0.35) 0px 5px 15px";
    let rejectBtn = acceptBtn.nextSibling;
    rejectBtn.style = 'none';
}

function onReject(rejectBtn) {
    rejectBtn.style.background = "linear-gradient(to bottom right, #EF4765, #FF9A5A)";
    rejectBtn.style.color = "white"
    rejectBtn.style.transition = "all 0.7s";
    rejectBtn.style.border = "1px solid #c82543";
    rejectBtn.style.boxShadow = "rgba(148, 31, 31, 0.35) 0px 5px 15px";
    let acceptBtn = rejectBtn.previousSibling;
    acceptBtn.style = 'none';
}