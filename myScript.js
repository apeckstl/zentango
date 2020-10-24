//TODO: allow them to choose a size
var zentangleSize = 2;

var imagewidth = 800/zentangleSize;

var imagearray = new Array(zentangleSize*zentangleSize);
var imageindex = 0;

var canvas, zentangle, ctx, flag = false,
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


function nextImage() {
    var dataURL = canvas.toDataURL();
    imagearray[imageindex] = dataURL;
    if (++imageindex == imagearray.length) {
        console.log("finished");
        generateSquareImage();
        document.getElementById("canvas").style.display = "none";
        document.getElementById("next_image").style.display = "none";
        document.getElementById("zentangle").style.display = "block";
        document.getElementById("save_zentangle").style.display = "inline";
    } else {
        ctx.clearRect(0, 0, w, h);
    }
}

function save() {
    zentangle = document.getElementById('zentangle');
    const data = zentangle.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'zentangle.png';
    a.click();
}

function generateSquareImage() {
    var ctx = document.getElementById('zentangle').getContext('2d');

    for (i = 0; i < zentangleSize; i++) {
        for (j = 0; j < zentangleSize; j++) {
            var img = new Image();
            img.setAtX = i * imagewidth;
            img.setAtY = j * imagewidth;
            img.onload = function () {
                ctx.drawImage(this, this.setAtX, this.setAtY, imagewidth, imagewidth);
            }
            img.src = imagearray[i * zentangleSize + j];
        }
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    for (i = 1; i < zentangleSize; i++) {
        ctx.beginPath();       // Start a new path
        ctx.moveTo(i*imagewidth, 0);    // Move the pen to (30, 50)
        ctx.lineTo(i*imagewidth, 800);  // Draw a line to (150, 100)
        ctx.stroke();          // Render the path
    }
    for (i = 1; i < zentangleSize; i++) {
        ctx.beginPath();       // Start a new path
        ctx.moveTo(0,i*imagewidth);    // Move the pen to (30, 50)
        ctx.lineTo(800,i*imagewidth);  // Draw a line to (150, 100)
        ctx.stroke();          // Render the path
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, 800, 800);
    ctx.stroke();

    document.getElementById("save_zentangle").removeAttribute("disabled");

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