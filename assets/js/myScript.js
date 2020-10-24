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
    const a = document.createElement('a');
    a.href = "./draw/index.html?type=" + type + "&size=" + zentangleSize;
    a.click();
    
}

/*
1.80, 120, 40
2. 40, 170, 95
3. 200, 200, 50
4. 260, 160, 40
5. 210, 40, 75
6. 160, 40, 60
*/


var imagearray;
var centers, radii, xes, yes, circlestart, circleend;
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
        centers = [[120,160],[135,265],[250,250],[300,200],[285,115],[220,100]];
        radii = [40*2.5,95*2.5,40*2.5,95*2.5,50,40,75,60];
        xes = [centers[0][0],centers[1][0]+21,
                   centers[0][0],centers[1][0]+21]
        yes = [centers[0][1],centers[1][1]+152,
                   centers[0][1],centers[1][1]+152]
        circlestart = [0.8235*Math.PI,1.58*(Math.PI), // circle 1, circle 2
                       0.09*(Math.PI),1.33*Math.PI]
        circleend = [0.087*(Math.PI),1.334*Math.PI,
                     0.82*Math.PI,1.3348*Math.PI]

                    
        // for each shape, we need a two item array of the circles that compose it. for each circle, we need
        // x, y, radius, start, end, direction
        shapes = [
            [[centers[0][0],centers[0][1],40*2.5,0.8235*Math.PI,0.087*(Math.PI)],[]],
            [[],[]]
        ]

        imagearray = new Array(2);
        imagewidth = 400;
        drawShape();
        
        // for (let i = 0; i < 6; i++) {
        //     ctx.beginPath();
        //     ctx.arc(centers[i][0], centers[i][1], radii[i], 0, 2 * Math.PI);
        //     ctx.stroke(); 
        // }
    }
}

function drawShape() {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.arc(xes[imageindex*2], yes[imageindex*2], radii[imageindex*2], circlestart[imageindex*2], circleend[imageindex*2]);
    ctx.arc(xes[imageindex*2+1], yes[imageindex*2+1], radii[imageindex*2+1], circlestart[imageindex*2+1], circleend[imageindex*2+1],true);
    ctx.stroke();

    ctx.clip();
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}

function nextImage() {
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
        
        // hide and display the elements on the page
        document.getElementById("canvas").style.display = "none";
        document.getElementById("next_image").style.display = "none";
        document.getElementById("zentangle").style.display = "block";
        document.getElementById("save_zentangle").style.display = "inline";
    } else {
        // reset drawing canvas
        canvas.width = 400;
        if (type = "circle") {
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

    for (let i = 0; i < imagearray.length; i++) {
            console.log("drawing")
            var img = new Image();
            img.onload = function () {
                ctx.drawImage(this, 0, 0, imagewidth, imagewidth);
            }
            img.src = imagearray[i];
        
    }
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
    // on mouse press, record current coordinates in currX/Y
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        //turn on flag for continuous draw
        if (mode == 'draw') {
            flag = true;
        }
    }

    if (res == 'up' && mode == 'line') {
        //release draws the straight line
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
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
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}