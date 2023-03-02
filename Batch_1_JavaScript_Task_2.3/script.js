var index = 1;
validation();

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
    secondColumn.innerHTML = `<div class="valid"><input type="text" placeholder="Enter Name" name="fname" class="form-control" onkeydown="return/[a-z A-Z]/i.test(event.key)" /><p>*Please Enter Username*</p></div>`;
    thirdColumn.innerHTML = `<div class="valid"><input name="sub" type="text" placeholder="Enter Subject" class="form-control" onkeydown="return /[a-z A-Z]/i.test(event.key)" /><p>*Please Enter Subject*</p></div>`;
    fourthColumn.innerHTML = `<div class="valid"><input name="mark" placeholder="Enter Mark" type="number" class="form-control" min="0" max="100" /><p>*Enter Mark Between 0 to 100*</p></div>`;
    fifthColumn.innerHTML = `<button type="button" onclick="onAccept(this)" class="btn accept m-1"><i class="bi bi-check-square"></i> </button><button type="button" class="btn reject m-1" onclick="onReject(this)"><i class="bi bi-x-square"></i></button>`;
    lastColumn.innerHTML = `<button type="button" class="btn remove m-1"  onclick="getindex(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="bi bi-trash-fill"></i> </button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog"><div class="modal-content">
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
        </div></div>
    </div>`;
    if (!validation()) {
        return false;
    }
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

    Array.from(document.myform.getElementsByTagName("input")).forEach((e) => {
        let flag = true;
        e.value == '' ?
            (e.parentNode.classList.add('invalid'), e.parentNode.classList.remove('valid'), flag = false) :
            (e.parentNode.classList.add('valid'), e.parentNode.classList.remove('invalid'));
        return flag;
    });
    let btnClicked = document.querySelectorAll('.acceptBtn');
    let table = document.getElementById("showData");
    table.innerHTML = "";
    table.innerHTML = `<thead><tr> <th scope="col">No.</th> <th scope="col" onclick="sortByName_Subject(1)">Name <i class="bi bi-arrow-down-up"></i></th> <th scope="col" onclick="sortByName_Subject(2)">Subject <i class="bi bi-arrow-down-up"></i></th> <th scope="col">Mark</th> <th scope="col">Result</th> </tr></thead>`;
    for (let btn of btnClicked) {
        let row = btn.parentNode.parentNode;
        let fname = row.children[1].children[0].children[0].value;
        let sub = row.children[2].children[0].children[0].value;
        let mark = row.children[3].children[0].children[0].value;
        let showDiv = document.getElementById("dataContainer");
        showDiv.style.visibility = "visible";

        let newRow = table.insertRow();
        let firstColumn = newRow.insertCell(0); // Fill Data in first column
        let secondColumn = newRow.insertCell(1); // Fill Data in second column
        let thirdColumn = newRow.insertCell(2); // Fill Data in third column
        let fourthColumn = newRow.insertCell(3); // Fill Data in fourth column
        let fifthColumn = newRow.insertCell(4); // Fill Data in fifth column
        if (mark < 34) {
            newRow.className = "table-danger";
            fifthColumn.innerHTML = "Fail";
        } else {
            fifthColumn.innerHTML = "Pass";
        }
        firstColumn.innerHTML = `<p class="counter"></p>`;
        secondColumn.innerHTML = fname;
        thirdColumn.innerHTML = sub;
        fourthColumn.innerHTML = mark;
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

function checkMark() {
    let table = document.getElementById("showData").getElementsByTagName('tr');
    Array.from(table).forEach((element, i) => {
        element.className = "";
        if (i > 0) {
            let mark = element.children[3].innerHTML;
            if (parseInt(mark) < 34) {
                element.className = "table-danger";
            }
        }
    });
}
let colPrev = 0;

function sortByName_Subject(colIndex) {
    let rows = document.getElementById("showData").rows.length; // num of rows
    let columns = document.getElementById("showData").rows[1].cells.length; // num of columns
    let arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            arrTable[r][c] = document.getElementById("showData").rows[r].cells[c].innerHTML;
        }
    }
    let th = arrTable.shift();
    if (colIndex != colPrev) {
        arrTable.sort(
            function (a, b) {
                if (a[colIndex] == b[colIndex]) {
                    return 0;
                } else {
                    return 1;
                }
            }
        );
    } else {
        arrTable.reverse();
    }
    colPrev = colIndex;
    arrTable.unshift(th);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            document.getElementById("showData").rows[r].cells[c].innerHTML = arrTable[r][c];
        }
    }
    checkMark();
}

function calcPercentage() {
    let btnClicked = Array.from(document.querySelectorAll('.acceptBtn'));
    let getName = btnClicked.map((element) => element.parentNode.parentNode.querySelector('input[name="fname"]').value);
    let getSub = btnClicked.map((element) => element.parentNode.parentNode.querySelector('input[name="sub"]').value);
    let getMark = btnClicked.map((element) => element.parentNode.parentNode.querySelector('input[name="mark"]').value);
    let table = document.getElementById("showPer");
    table.innerHTML = "";
    table.innerHTML = `<thead><tr> <th scope="col">No.</th> <th scope="col">Name</th> <th scope="col">Percentage</th> </tr></thead>`;
    let data = [];
    getName.forEach((element, index) => {
        element = {
            name: element,
            mark: getMark[index],
            sub: getSub[index],
        }
        data.push(element);
    });
    const set1 = new Set(getName);
    set1.forEach((name) => {
        let showDiv = document.getElementById("per");
        showDiv.style.visibility = "visible";
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
    acceptBtn.classList.add('acceptBtn');
    let rejectBtn = acceptBtn.nextElementSibling;
    rejectBtn.classList.remove('rejectBtn');
}

function onReject(rejectBtn) {
    rejectBtn.classList.add('rejectBtn');
    let acceptBtn = rejectBtn.previousElementSibling;
    acceptBtn.classList.remove('acceptBtn');
}

function validation() {
    Array.from(document.myform.fname).forEach((e) =>
        e.addEventListener('keyup', function () {
            let flag = true;
            e.value == '' ?
                (e.parentNode.classList.add('invalid'), e.parentNode.classList.remove('valid'), flag = false) :
                (e.parentNode.classList.add('valid'), e.parentNode.classList.remove('invalid'));
            return flag;
        })
    );

    Array.from(document.myform.mark).forEach((e) =>
        e.addEventListener('keyup', function () {
            let flag = true;
            e.value == '' ?
                (e.parentNode.classList.add('invalid'), e.parentNode.classList.remove('valid'), flag = false) :
                (e.parentNode.classList.add('valid'), e.parentNode.classList.remove('invalid'));
            return flag;
        })
    );

    Array.from(document.myform.sub).forEach((e) =>
        e.addEventListener('keyup', function () {
            let flag = true;
            e.value == '' ?
                (e.parentNode.classList.add('invalid'), e.parentNode.classList.remove('valid'), flag = false) :
                (e.parentNode.classList.add('valid'), e.parentNode.classList.remove('invalid'));
            return flag;
        })
    );
}