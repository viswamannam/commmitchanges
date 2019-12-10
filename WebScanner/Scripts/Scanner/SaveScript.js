var curEntry = 1;
var savedImages = [];

function captureSave() {
    copyImg('preview', 'capture');

    addTableEntry();
}

function addTableEntry() {
    var picId = uuidv4();
    var imgValue = $('#capture').attr('src');
    var ebtsPath = '';

    savedImages.push({
        pictureId: picId,
        entryNum: curEntry,
        data: imgValue,
        type: $('#sequenceSelect option:selected').text()
    });

    var newRowHtml = `
                <tr id='tablerow${picId}' rowvalue=${picId}>
                    <th scope="row" id='entrynum${picId}'>
                        ${curEntry}
                    </th>
                    <td scope="row">
                        ${$('#sequenceSelect option:selected').text()}
                    </td>
                    <td scope="row">
                        Saved
                    </td>
                    <td scope="row">
                        <button class='btn btn-primary' onclick='viewTableEntry("${picId}")'>View122</button>
                        <button class='btn btn-danger' onclick='deleteTableEntry("${picId}")'>Delete</button>
                    </td>
                </tr>
            `;

    $('#tableRows').append(newRowHtml);
    curEntry++;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function saveEbtsFile() {

    $('#loadingModal').modal({ backdrop: 'static', keyboard: false });

    var transaction = {
        TransactionFiles: [],
        TransactionDetails: []
    };

    transaction.TransactionDetails.push({
        FieldName: "Retention",
        EBTSValue: $('#retention').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "Name",
        EBTSValue: $('#lname').val() + ', ' + $('#fname').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "PlaceOfBirth",
        EBTSValue: $('#country').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "DoB",
        EBTSValue: $('#DoB').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "Sex",
        EBTSValue: $('#sex').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "Race",
        EBTSValue: $('#race').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "Height",
        EBTSValue: $('#height').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "Weight",
        EBTSValue: $('#weight').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "EyeColor",
        EBTSValue: $('#ecolor').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "HairColor",
        EBTSValue: $('#hcolor').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "ArrestDate",
        EBTSValue: $('#DoA').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "DateOfOffence",
        EBTSValue: $('#DoO').val()
    });

    transaction.TransactionDetails.push({
        FieldName: "Offense",
        EBTSValue: $('#offense').val()
    });

    savedImages.forEach(x => {
        transaction.TransactionFiles.push({
            FileData: x.data.replace("data:image/jpeg;base64, ", ""),
            ScanType: x.type
        });
    });

    console.log(transaction);

    $.ajax({
        type: "POST",
        url: "/Save/SaveTransaction",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ transaction: transaction }),
        success: function (data) {
            $('#loadingModal').modal('hide');
            if (data !== "ERROR") {
                downloadFile(data);
            }
            console.log(data);
        },
        error: function (data) {
            $('#loadingModal').modal('hide');
        }
    });
}

function downloadFile(file) {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = "EbtsFile.ebts";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function closeSuccess() {
    window.open('/Save/DownloadFile?Path=' + ebtsPath, '_blank');
    $('#successModal').modal('hide');
}

function closeError() {
    $('#errorModal').modal('hide');
}

function viewTableEntry(itemId) {
    var item = savedImages.find(e => e.pictureId === itemId);
    $('#imagePopup').attr('src', item.data);
    $('#viewImageModal').modal();
}

function deleteTableEntry(itemId) {

    $.ajax({
        type: "POST",
        url: "/Save/DeletePicture",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ name: itemId }),
        success: function (msg) {

            var item = savedImages.find(e => e.pictureId === itemId);
            savedImages = savedImages.filter(item => item.pictureId !== itemId);
            $('#tablerow' + itemId).remove();
            curEntry--;
            for (var i = 0; i < savedImages.length; i++) {
                if (savedImages[i].entryNum > item.entryNum) {
                    savedImages[i].entryNum--;
                    $('#entrynum' + savedImages[i].pictureId).text(savedImages[i].entryNum);
                }
            }

        }
    });

    
}

