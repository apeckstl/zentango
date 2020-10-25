//TODO: allow them to choose a size
zentangleSize = 2;
var type = "circle";

function start() {
    var radios = document.getElementsByName("template-radio");
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          type = radios[i].value;
          console.log("type " + type)
          // only one radio can be logically checked, don't check the rest
          break;
        }
    }

    var select = document.getElementById("chunk-count");
    zentangleSize = Math.sqrt(select.value);
    //const a = document.createElement('a');
    //a.id = "startbutton";
    window.location.href = "./draw/index.html?type=" + type + "&size=" + zentangleSize;
    return;
    //a.click();
    
}

var imagearray;
var centers, radii, shapes, zen_offsets;
var imagewidth;

var imageindex = 0;

var mode = "draw";

var canvas, zentangle, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var color = "black",
    width = 2;

function drawStyle(style) {
    mode = style;
}

function drawWidth(w) {
    width = w;
}


function setColor() {
	color = document.getElementById('color-btn').value;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    type = getParameterByName("type");
    zentangleSize = getParameterByName("size");


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

    if (type == 'square') {
        imagewidth = 800 / zentangleSize;
        imagearray = new Array(zentangleSize * zentangleSize);
    } else if (type == 'circle') {
        imagearray = new Array(shapes.length);
        imagewidth = 400;
        drawShape();
    }
}

function drawShape() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    console.log(imageindex);
    for (i = 0; i < shapes[imageindex].length; i++) {
        ctx.arc(shapes[imageindex][i][0],shapes[imageindex][i][1],shapes[imageindex][i][2],shapes[imageindex][i][3],shapes[imageindex][i][4],shapes[imageindex][i][5]);
    }
    ctx.stroke();
    ctx.clip();
}

function draw() {
    setWeight();
	setColor();
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}

function nextImage() {
    type = getParameterByName("type");
    zentangleSize = getParameterByName("size");
    var dataURL = canvas.toDataURL();
    imagearray[imageindex] = dataURL;
    console.log("imageindex" + imageindex)
    
    if (++imageindex == imagearray.length) { // last image
        // TODO: eventually call other functions for different templates
        if (type == "square") {
            generateSquareImage();
        } else {
            generateCircleImage();
        }
        
        // change the bootstrap classes for alignment            
        document.getElementById("canvas-col").className = "col d-flex justify-content-center"
        document.getElementById("tools-div").className = "my-auto"
        // hide and display the elements on the page
        document.getElementById("canvas").style.display = "none";
        document.getElementById("next_image").style.display = "none";
        document.getElementById("zentangle").style.display = "block";
        document.getElementById("save_zentangle").style.display = "inline";
        document.getElementById('drawing-tools').style.display = "none";
    } else {
        // reset drawing canvas
        canvas.width = 400;
        if (type == "circle") {
            drawShape();
        }
    }
}

// Saves the zentangle to the user's computer
function save() {
    zentangle = document.getElementById('zentangle');
    const data = zentangle.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'zentangle.png';
    a.click();
}

function generateCircleImage() {
    var ctx = document.getElementById('zentangle').getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,800,800);
    for (let i = 0; i < imagearray.length; i++) {
            console.log("drawing")
            var img = new Image();
            img.onload = function () {
                ctx.drawImage(this, zen_offsets[i][0], zen_offsets[i][1], imagewidth, imagewidth);
            }
            img.src = imagearray[i];
        
    }
}

function generateSquareImage() {
    var ctx = document.getElementById('zentangle').getContext('2d');
    ctx.fillStyle = "white" ;
    ctx.fillRect(0,0,800,800);
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

    /*
    * Draw grid lines between squares, vertical and then horizontal
    */
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    for (i = 1; i < zentangleSize; i++) {
        ctx.beginPath();       // Start a new path
        ctx.moveTo(i * imagewidth, 0);    // Move the pen
        ctx.lineTo(i * imagewidth, 800);  // Draw a line
        ctx.stroke();          // Render the path
    }
    for (i = 1; i < zentangleSize; i++) {
        ctx.beginPath();       // Start a new path
        ctx.moveTo(0, i * imagewidth);    // Move the pen
        ctx.lineTo(800, i * imagewidth);  // Draw a line
        ctx.stroke();          // Render the path
    }
    /*
    * Draw a border around the zentangle
    */
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, 800, 800);
    ctx.stroke();

}

function findxy(res, e) {
    // find bootstrap col to determine relative coordinates of canvas
    col         = document.getElementById('canvas-col');
    mr          = parseInt($("#canvas-col").css("margin-right"))
    ml          = parseInt($("#canvas-col").css("margin-left"))
    mt          = parseInt($("#canvas-col").css("margin-top"))
    mb          = parseInt($("#canvas-col").css("margin-bottom"))
    canvascol   = col.getBoundingClientRect();
    widthDiff   = canvascol.width - ml + mr - canvas.width;
    heightDiff  = canvascol.height - mt + mb - canvas.height;
    newX = canvascol.x + widthDiff/2 ; 
    newY = canvascol.y + heightDiff/2;
    // console.log(ml, mt, mr, mb);
    // console.log(widthDiff, heightDiff);

    // on mouse press, record current coordinates in currX/Y
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - newX;
        currY = e.clientY - newY;

        //turn on flag for continuous draw
        if (mode == 'draw') {
            flag = true;
        }
    }

    if (res == 'up' && mode == 'line') {
        //release draws the straight line
        prevX = currX;
        prevY = currY;
        currX = e.clientX - newX;
        currY = e.clientY - newY;
        draw();
    }
    if (res == 'up' || res == "out") {
        // stop dragging the line
        flag = false;
    }
    if (res == 'move' && mode == 'draw') {
        //draw a new segment on each mouse move
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - newX;
            currY = e.clientY - newY;
            draw();
        }
    }
}

function toggleChunks(el) {
    var chunk = document.getElementById("chunk-count");
    if (el.value == "circle") {
        chunk.disabled = true;
    } else {
        chunk.disabled = false;
    }
}