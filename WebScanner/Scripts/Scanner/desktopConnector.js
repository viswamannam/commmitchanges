let socket = null;
let state = "Device is Intializing";
let getDataInterval = null;

var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

startSocket();

function onopen (e) {
    getDataInterval = setInterval(getData, 1000);
    sendMessage("getstartdata");
    state = "Device is Ready";

    if (sPage === "Welcome" || sPage === "") {
        window.location.href = "/Home/Index";
    } else {
        $('#curState').text(state);
    }
}

function onmessage(event) {
    console.log(event);
    if (sPage === "Welcome" || sPage === "") {
        window.location.href = "/Home/Index";
    } else {
        if (event.data.includes("JQuerySet")) {

            $('#' + event.data.split("=")[1]).text(event.data.split("=")[2]);

        } else if (event.data.includes("ImageSet")) {

            $('#' + event.data.split("=")[1]).attr("src", event.data.split("=")[2]);

        } else if (event.data.includes("selectData")) {

            var resultHtml = "";
            items = event.data.split("=")[2].split(';');
            for (var x = 0; x < items.length - 1; x++) {
                resultHtml += "<option value='" + items[x].split('/')[0] + "'>" + items[x].split('/')[1] + "</option>";
            }
            $('#' + event.data.split("=")[1]).html(resultHtml);

        }
    }
}

function onclose(event) {
    clearInterval(getDataInterval);
    if (sPage !== "Welcome") {
        if (event.wasClean) {
            console.log("close");
        } else {
            console.log("close");
        }
        state = "Device is Intializing";
        $('#curState').text(state);
    }

    setTimeout(function () {
        startSocket();
    }, 5000);
}

function startSocket() {
    socket = new WebSocket("ws://127.0.0.1:2512");
    socket.addEventListener('open', onopen);
    socket.addEventListener('message', onmessage);
    socket.addEventListener('close', onclose);
}

function getData() {
    socket.send("getdata");
}

function sendMessage(msg) {
    socket.send(msg);
}

function copyImg(src, dest) {
    $('#' + dest).attr('src', $('#' + src).attr('src'));
    if (src === 'capture') {
        $.ajax({
            type: "POST",
            url: "../EBTS/SaveImage",
            contentType: "application/json;charset=utf-8",
            data: { fieldid: curCaptureId, image: $('#' + src).attr('src') },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
            }
        });
    }
}

function getSelectValueById(id) {
    return $('#' + id).find(":selected").val();
}

function startClicked() {
    sendMessage('device:=' + getSelectValueById('deviceSelect') +
        '**' + 'sequence:=' + getSelectValueById('sequenceSelect') +
        '**start');
}