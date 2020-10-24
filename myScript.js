var imagearray = new Array(4);
var imageindex = 0;

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}


function save() {
    var dataURL = canvas.toDataURL();
    imagearray[imageindex] = dataURL;
    if (++imageindex == imagearray.length) {
        console.log("finished");
        generateImage();
    } else {
        var m = confirm("Move on to next drawing?");
        if (m) {
            ctx.clearRect(0, 0, w, h);
        }
    }
}

function generateImage() {
    var ctx = document.getElementById('zentangle').getContext('2d');

    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            var img = new Image();
            img.setAtX = i * 400;
            img.setAtY = j * 400;
            img.onload = function () {
                ctx.drawImage(this, this.setAtX, this.setAtY, 400, 400);
            }
            img.src = imagearray[i * 2 + j];
        }
    }

}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}