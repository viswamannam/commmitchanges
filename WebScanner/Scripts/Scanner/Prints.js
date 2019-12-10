var curCaptureId;


   //$.ajax({
   //     type: "GET",
   //    url: "../EBTS/GetAllImages",
   //    // contentType: "application/json;charset=utf-8",
   //     //data: { fieldid: curCaptureId },
   //     success: function (data) {
   //         if (data !== " ") {

   //             for (i = 0; i < data.data.length; i++) {

   //                 if (data.data[i].Transaction_BinaryValue !== null) {
                        
   //                     $('#' + data.data[i].Transaction_Value).attr('src', 'data:image/jpeg;base64, ' + bin2string(data.data[i].Transaction_BinaryValue));
   //                 }
   //             }
   //             console.log(data);
   //         }
           
   //     },
   //     error: function (data) {
   //         $('#loadingModal').modal('hide');
   //     }
   //});

function bin2string(array) {
    var result = "";
    for (var i = 0; i < array.Length; ++i) {
        result += (String.fromCharCode(array[i]));
    }
    return result;
}

function showCaptureModal(id) {
    curCaptureId = id;
    $('#captureModal').modal("show");
    sendMessage('device:=' + getSelectValueById('deviceSelect') +
        '**' + 'sequence:=' + '4' +
        '**start');

    //$.ajax({
    //    type: "POST",
    //    url: "../EBTS/GetSaveImage",
    //   // contentType: "application/json;charset=utf-8",
    //    data: { fieldid: curCaptureId },
    //    success: function (data) {
    //        $('#loadingModal').modal('hide');
    //        if (data !== " ") {
               
    //            $('#'+curCaptureId).attr('src', 'data:image/jpeg;base64, ' + data.data);
    //        }
    //        else {
    //            $('#preview').attr('src', 'data:image/jpeg;base64, R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
    //            $('#capture').attr('src', 'data:image/jpeg;base64, R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='); }
    //        console.log(data);
    //    },
    //    error: function (data) {
    //        $('#loadingModal').modal('hide');
    //    }
    //});

    $('#preview').attr('src', 'data:image/jpeg;base64, R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
               $('#capture').attr('src', 'data:image/jpeg;base64, R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
    
}

function saveCapture() {
    copyImg('capture', curCaptureId);
    $('#captureModal').modal("hide");
}

function showViewDeleteModal(id) {
    curCaptureId = id;
    $('#viewDeleteModal').modal('show');
    $.ajax({
        type: "POST",
        url: "../EBTS/GetSaveImage",
       // contentType: "application/json;charset=utf-8",
        data: { fieldid: curCaptureId },
        success: function (data) {
            $('#loadingModal').modal('hide');
            if (data !== " ") {

                $('#viewDeleteImage').attr('src', 'data:image/jpeg;base64, ' + data.data);
            }
            else {
                $('#viewDeleteImage').attr('src', 'data:image/jpeg;base64, R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
            }
            console.log(data);
        },
        error: function (data) {
            $('#loadingModal').modal('hide');
        }
    });
    copyImg(id, 'viewDeleteImage');
}

function deleteCurrentImage() {
    $.ajax({
        type: "POST",
        url: "../EBTS/DeleteImage",
        // contentType: "application/json;charset=utf-8",
        data: { fieldid: curCaptureId },
        success: function (data) {
            if (data !== " ") {
                $('#' + curCaptureId).attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
            }

            console.log(data);
        },
        error: function (data) {
            $('#loadingModal').modal('hide');
        }
    });
    //$('#' + curCaptureId).attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    $('#viewDeleteModal').modal('hide');
}

$(document).ready(function () {
    img_find();
    function img_find() {
        var imgs = document.getElementsByTagName("img");
        var imgSrcs = [];

        for (var i = 2; i < document.images.length; i++) {
            var fieldid = document.images[i].id;
                $.ajax({
                    type: "POST",
                    url: "../EBTS/GetSaveImage",
                    // contentType: "application/json;charset=utf-8",
                    data: { fieldid: fieldid},
                    success: function (data) {
                        if (data !== " ") {
                            $('#' + data.image).attr('src', 'data:image/jpeg;base64, ' + data.data);
                        }
                        
                        console.log(data);
                    },
                    error: function (data) {
                        $('#loadingModal').modal('hide');
                    }
                });
           
        }

       // return imgSrcs;
    }
});