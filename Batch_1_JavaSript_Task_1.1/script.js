// this is the function to insert textbox 
function insertRow() {
    const maxCondition = 5;
    // condition for insert textbox only 5 times  
    if (document.getElementById('textBoxTable').rows.length <= maxCondition) {
        var x = document.getElementById('textBoxTable').insertRow(-1);
        var firstColumn = x.insertCell(0); // insert in first column
        var secondColumn = x.insertCell(1); // insert in second column
        var thirdColumn = x.insertCell(2); // insert in third column
        firstColumn.innerHTML = `<input type="text">`;
        secondColumn.innerHTML = `<input type="text">`;
        thirdColumn.innerHTML = `<button class="btn minusButton py-1" id="rowAddButton" onclick="deleteRow(this)">-</button>`;
    } else { //else part to disable the plus button & showing alert message 
        document.getElementById('Add').disabled = true;
        document.getElementById('alertBox').innerHTML = `<div class="alert alert-primary mt-5" role="alert"> You Can't Add More Rows! </div>`;
    }
}
// this is the function to detele textbox 
function deleteRow(row) {
    if (document.getElementById('textBoxTable').rows.length >= 3) {
        document.getElementById('Add').disabled = false; // to re-enable the plus button
        document.getElementById('alertBox').innerHTML = `<div></div>`; // to remove alert message
        var particularRow = row.parentNode.parentNode.rowIndex;
        document.getElementById('textBoxTable').deleteRow(particularRow);
    }
}
// *********** reload DOM without refreshing page **************
const domContainer = document.getElementById('domContainer').innerHTML;
function reloadDom() {
    // method 1
    // document.getElementById('textBoxRow').innerHTML = `<tr><td><input type="text"></td><td><input type="text"></td><td></td></tr>`;
    // method 2
    document.getElementById('domContainer').innerHTML = "";
    document.getElementById('domContainer').innerHTML = domContainer;
}