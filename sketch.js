var mic, fft;
var sensibility;
var LocalData;
var bgcolor;
var tilecolor;
var heightAux2 = 0;
var PixelEntry;
var columnsNo = 0;
var rowsNo = 0;
var GridInit = true;
var Id;

var fontPixel;
var fontReady;

var Tile;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // sendGrid(columnsNo, rowsNo);
}

function preload() {
    fontPixel = loadFont('./assets/pixelmix.ttf');
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    bgcolor = color(255);

    socket = io();

    sensibility = 4;

    textFont(fontPixel, 32);


    getAudioContext().suspend();
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    Id = socket.id;

    socket.on('Public',
        // When we receive data
        function (data) {
            LocalData = data;

        }
    );

    user = new Window(windowWidth / 2, windowHeight / 2, 390, 220, 200, false, true);
    userInput = new Window(windowWidth / 2, windowHeight / 2, 250, 50, 250, true);


}

function keyTyped(bla) {
    return bla;
}
function draw() {


    background(246, 246, 246);
    console.log(keyTyped());


    var margin = 0.8;
    var RightMargin = 250;
    TileSize = 250;
    var FrameMargin = 20;
    columnsNo = Math.floor((windowWidth - RightMargin) / TileSize);
    rowsNo = Math.floor((windowHeight - 2 * FrameMargin) / TileSize);


    for (var x = 0; x < columnsNo; x++) {
        for (var y = 0; y < rowsNo; y++) {

            noStroke();

            fill(210, 210, 210);

            // square(FrameMargin + x * TileSize, FrameMargin + y * TileSize, TileSize * margin);

            Tile = new Window(FrameMargin + x * TileSize + TileSize / 2, FrameMargin + y * TileSize + TileSize / 2, TileSize * margin, TileSize * margin, 250, false, true, 230,180, false);
            Tile.display();
            Tile.displayText("Miltos",Math.floor(random(8)),15);

        }
    }




    if (LocalData != null) {


        var Microphones = [];
        var Positions = [{ x: 1, y: 2 }];
        var Colors = [];

        for (var i = 0; i < LocalData.length; i++) {
            Microphones.push(Object.values(LocalData[i])[0].Volume);
            Positions.push(Object.values(LocalData[i])[0].position);
            if (Object.keys(LocalData[i])[0] === socket.id) {
                bgcolor = (Object.values(LocalData[i])[0].color.hex);

            }
            Colors.push((Object.values(LocalData[i])[0].color.hex));
        }

        if (GridInit && socket.id) {


            sendGrid(columnsNo, rowsNo);
            GridInit = false;
        }




        for (var x = 0; x < columnsNo; x++) {
            for (var y = 0; y < rowsNo; y++) {
                for (var i = 0; i < LocalData.length; i++) {
                    noStroke();
                    fill(210, 210, 210);

                    //  square(FrameMargin + x * TileSize, FrameMargin + y * TileSize, TileSize * margin);
                    push();
                    fill(color(Colors[i]).levels[0], color(Colors[i]).levels[1], color(Colors[i]).levels[2], Aux(Microphones[i]));
                    square(FrameMargin + Positions[i].x * TileSize, FrameMargin + Positions[i].y * TileSize, TileSize * margin);
                    pop();
                }
            }
        }
    }

    push();
    noStroke();
    fill(246, 246, 246);

    rect(windowWidth - RightMargin, 0, windowWidth, windowHeight);
    pop();

    push();

    noStroke();
    fill(bgcolor);
    var PersonalTileSize = 180;
    square(windowWidth - RightMargin + (RightMargin - PersonalTileSize) / 2, FrameMargin, PersonalTileSize);
    pop();

    noStroke();
    fill(255);
    textSize(20);



    var volume = mic.getLevel();
    if (volume > 0.01) {
        sendmouse(volume);

    }




    var heightAux1 = map(volume * sensibility, 0, 1, 50, 400);
    function Aux(volume) {
        var heightAux = map(volume * sensibility, 0.1, 1, 0, 300);
        return heightAux;
    }

    noFill();
    strokeWeight(heightAux1 / 8);
    stroke('#A37B73');
    ellipseMode(CENTER);
    // ellipse(windowWidth - RightMargin + (RightMargin - PersonalTileSize) / 2 + PersonalTileSize / 2, PersonalTileSize / 2 + FrameMargin, 100 + heightAux1 / 8, 100 + heightAux1 / 8);

    xPos = windowWidth - RightMargin + (RightMargin - PersonalTileSize) / 2 + PersonalTileSize / 2;
    yPos = PersonalTileSize / 2 + FrameMargin;
    size = 100 + heightAux1 / 4;
    StrokeW = 2;

    PixCircle(xPos, yPos, size, StrokeW, 1, 7);   //(xPos,yPos,diameter,strokeWeight,strokeGaps,pixelSize)
    // user.display();
    // userInput.display();
    // userInput.displayText("miltos");
}

//Pixelates a Circle

function PixCircle(xPos, yPos, CircleSize, thickness, gaps, pixelRatio) {
    push();
    noStroke();
    fill(255);
    for (var x = 0; x < CircleSize; x = x + pixelRatio) {
        for (var y = 0; y < CircleSize; y = y + pixelRatio) {

            var radio = CircleSize / 2;
            var Point = { x: x + xPos - CircleSize / 2, y: y + yPos - CircleSize / 2 };

            if (dist(xPos, yPos, Point.x, Point.y) < radio && dist(xPos, yPos, Point.x, Point.y) > radio - pixelRatio * thickness) {

                square(xPos + x - CircleSize / 2, yPos + y - CircleSize / 2, pixelRatio - gaps);
            }
        }
    }
    pop();
}


function mouseMoved() {
    userStartAudio();
}

// // Function for sending to the socket
function sendmouse(volume) {
    // We are sending!
    // ////console.log("Send MicVolume: " + volume);

    var data = {
        [socket.id]: { Volume: volume, Grid: { x: columnsNo, y: rowsNo } }
    };


    socket.emit('mic', data);
}
function sendGrid(columnsNo, rowsNo) {


    var data = {
        [socket.id]: { x: columnsNo, y: rowsNo }
    };
    ////console.log(socket.id, columnsNo, rowsNo);
    socket.emit('grid', data);
}
