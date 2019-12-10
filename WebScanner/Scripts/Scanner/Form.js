function typeSelected(value) {
    console.log("changed to " + value);
    loadFields(value);
}

var personalTypes = ['name', 'place of birth', 'date of birth', 'sex'];
var physicalTypes = ['race', 'height', 'weight', 'color eyes', 'hair color'];

function loadFields(fieldId) {
    $.ajax({
        type: "POST",
        url: "/Dashboard/GetEnrollementFields",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ fieldId: fieldId }),
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var item = data[i].Description.toLowerCase();
                if (personalTypes.includes(item)) {
                    $('#personalForm').append(`
                    <div class="col-6">
                        <label>${data[i].Description}</label>
                        <input class="form-control"/>
                    </div>
                    `);
                } else if (physicalTypes.includes(item)) {
                    $('#physicalForm').append(`
                    <div class="col-6">
                        <label>${data[i].Description}</label>
                        <input class="form-control"/>
                    </div>
                    `);
                } else {
                    $('#otherForm').append(`
                    <div class="col-6">
                        <label>${data[i].Description}</label>
                        <input class="form-control"/>
                    </div>
                    `);
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function clearBtns() {
    document.getElementById('physicalBtn').classList.replace('btn-info', 'bg-transparent');
    document.getElementById('otherBtn').classList.replace('btn-info', 'bg-transparent');
    document.getElementById('personalBtn').classList.replace('btn-info', 'bg-transparent');
    document.getElementById('printsBtn').classList.replace('btn-info', 'bg-transparent');
}

function hideAll() {
    document.getElementById('personalForm').hidden = true;
    document.getElementById('physicalForm').hidden = true;
    document.getElementById('otherForm').hidden = true;
}

function showPhysical() {
    hideAll();
    document.getElementById('physicalForm').hidden = false;

    clearBtns();
    document.getElementById('physicalBtn').classList.replace('bg-transparent', 'btn-info');
}

function showOther() {
    hideAll();
    document.getElementById('otherForm').hidden = false;

    clearBtns();
    document.getElementById('otherBtn').classList.replace('bg-transparent', 'btn-info');
}

function showPrints() {
    hideAll();
    document.getElementById('printsForm').hidden = false;

    clearBtns();
    document.getElementById('otherBtn').classList.replace('bg-transparent', 'btn-info');
}

function showPersonal() {
    hideAll();
    document.getElementById('personalForm').hidden = false;

    clearBtns();
    document.getElementById('personalBtn').classList.replace('bg-transparent', 'btn-info');
}

window.onload = function () {
    hideAll();
    showPersonal();
    typeSelected(pageModel.SelectedType);
};