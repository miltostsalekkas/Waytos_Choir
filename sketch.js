var noteglobal ={};

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
var Background;
var Characters;
var RightBar;
var MicTile;
var ColorLegend;
var Slider;
var PaletteDock;
var Palette;

var CharNo;
var Users;

var marker;

var img = [];
var ImagesRead = false;

var RandomNumbers = [];
var NoteColors = ['#F393B5', '#2DB467', '#F05A24', '#5555AA', '#EE3D3D', '#AB88BE', '#E9E85E', '#CE7F3E'];

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let noteSpan;


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
    // fft = new p5.FFT();
    // fft.setInput(mic);


    Id = socket.id;

    socket.on('Public',
        // When we receive data
        function (data) {
            LocalData = data;

        }
    );
    socket.on('CharNo',
        // When we receive data
        function (data) {
            CharNo = data;

        }
    );
    socket.on('Users',
        // When we receive data
        function (data) {
            Users = data.Users;
        }
    );


    user = new Window(5, windowWidth / 2, windowHeight / 2, 390, 220, 200, false, true);
    userInput = new Window(5, windowWidth / 2, windowHeight / 2, 250, 50, 250, true);


    for (var i = 0; i < 15; i++) {
        RandomNumbers.push(Math.floor(random(1, 8)));
    }
    marker = loadImage('./assets/Characters/marker.png');
    noteSpan = select('#note');

}

function keyTyped(bla) {
    return bla;
}

function ReadImages() {
    if (CharNo != null) {
        for (var i = 0; i < CharNo; i++) {

            img[i] = loadImage('./assets/Characters/300ppi/' + (i + 1) + '.png');

        }
        ImagesRead = true;
    }
}
function draw() {


    if (!ImagesRead) {
        ReadImages();
    }


    var margin = 0.85;
    var RightMargin = 200;
    TileSize = 190;
    var FrameMargin = 350;
    columnsNo = Math.floor((windowWidth - RightMargin) / TileSize);
    rowsNo = Math.floor((windowHeight - 2 * FrameMargin) / TileSize);

    push();
    Background = new Window(10, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight,
        221, false, true, 240, 150, true);
    Background.display();
    pop();



    push();
    RightBar = new Window(5, 1550, windowHeight / 2, 350, 800,
        221, false, false, 240, 150, true);
    RightBar.display();
    RightBar.HorLine(1550, 280, 260);
    RightBar.HorLine(1550, 350, 260);
    pop();



    push();
    for (let i = 0; i < Users; i++) {
        Characters = new Window(5, FrameMargin / 2 + 10, 100 + 100 * i, 250, 90,
            221, false, false, 250, 120, true, true);
        Characters.display();
    }
    pop();

    push();
    for (var i = 0; i < NoteColors.length; i++) {
        ColorLegend = new Window(3, 470 + 105 * i, 800, 80, 80,
            NoteColors[i], false, false, 200, 150, true, false, true, true, 4);
        ColorLegend.display();
        ColorLegend.displayText(i, "", 11, -30, 30);
    }
    pop();

    push();
    MicTile = new Window(5, 1550, 170, 150, 150,
        (NoteColors[3]), true, false, 240, 150, true);
    MicTile.display();
    pop();

    push();
    Slider = new Window(5, 1490, 600, 17, 450,
        (0), true, false, 240, 150, true);
    Slider.display();
    pop();
    push();
    PaletteDock = new Window(5, 1600, 600, 80, 450,
        (221), false, false, 240, 150, true);
    PaletteDock.display();
    pop();
    push();
    for (var i = 0; i < NoteColors.length; i++) {
        Palette = new Window(5, 1600, 422 + 50 * i, 40, 40,
            NoteColors[i], true, false, 0, 60, true, false, true, true, null, true);
        Palette.display();
    }
    pop();
    push();

    translate(1460, 422);
    scale(0.2);
    image(marker, 0, 0);
    pop();

    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 3; y++) {

            noStroke();

            fill(210, 210, 210);

            // square(FrameMargin + x * TileSize, FrameMargin + y * TileSize, TileSize * margin);

            Tile = new Window(5, FrameMargin + x * TileSize + TileSize / 2, 140 + y * TileSize + TileSize / 2, TileSize * margin, TileSize * margin, 250, false, true, 230, 180, false);
            Tile.display();
            Tile.displayText("Miltos", RandomNumbers[y * x], 11, 25, 70);

        }
    }



    push();
    for (let i = 0; i < Users; i++) {


        Characters = new Window(5, FrameMargin / 2 + 10, 100 + 100 * i, 250, 90,
            221, false, false, 250, 120, true, true, true);
        Characters.display();
        push();
        translate(FrameMargin / 2 - 100, 70 + 100 * i);
        scale(0.2);
        image(img[i], 0, 0);
        pop();

    }
    pop();

    console.log(noteglobal);
    if (LocalData != null) {



        var Microphones = [];
        var Positions = [{ x: 1, y: 2 }];
        var Colors = [];
        if (LocalData[i]) {
            for (var i = 0; i < LocalData.length; i++) {
                Microphones.push(Object.values(LocalData[i])[0].Volume);
                Positions.push(Object.values(LocalData[i])[0].position);
                if (Object.keys(LocalData[i])[0] === socket.id) {
                    bgcolor = (Object.values(LocalData[i])[0].color.hex);

                }
                Colors.push((Object.values(LocalData[i])[0].color.hex));



            }
        }


        if (GridInit && socket.id) {


            sendGrid(columnsNo, rowsNo);
            GridInit = false;
        }




        // for (var x = 0; x < columnsNo; x++) {
        //     for (var y = 0; y < rowsNo; y++) {
        //         for (var i = 0; i < LocalData.length; i++) {
        //             noStroke();
        //             fill(210, 210, 210);

        //             //  square(FrameMargin + x * TileSize, FrameMargin + y * TileSize, TileSize * margin);
        //             push();
        //             fill(color(Colors[i]).levels[0], color(Colors[i]).levels[1], color(Colors[i]).levels[2], Aux(Microphones[i]));
        //             square(FrameMargin + Positions[i].x * TileSize, FrameMargin + Positions[i].y * TileSize, TileSize * margin);
        //             pop();
        //         }
        //     }
        // }
    }

    push();
    noStroke();
    fill(246, 246, 246);


    pop();

    push();

    noStroke();
    fill(bgcolor);
    var PersonalTileSize = 180;
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

    xPos = 1670 - RightMargin + (RightMargin - PersonalTileSize) / 2 + PersonalTileSize / 2;
    yPos = 170;
    size = 100 + heightAux1 / 4;
    StrokeW = 2;

    PixCircle(1550, yPos, size / 2, StrokeW, 1, 5);   //(xPos,yPos,diameter,strokeWeight,strokeGaps,pixelSize)
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
