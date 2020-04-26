var noteglobal = {};

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
var LowerPitchTile = [];
var Slider;
var PaletteDock;
var Palette;

var CharNo;
var Users = 0;

var chordNum = 5;

var marker;

var img = [];
var ImagesRead = false;


var RandomNumbers = [];
var NoteColors = ['#F393B5', '#2DB467', '#F05A24', '#5555AA', '#EE3D3D', '#AB88BE', '#E9E85E', '#5EBDCC', '#04D939', '#A7989A', '#CE7F3E', '#F24968'];
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let noteSpan;
var noteNum = 12;
var LowerPTileState = [false, false, false, false];

var UserVoice = [];

var state = false;
var IDS;
notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];



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


            if (LocalData) {
                for (let i = 0; i < Users; i++) {
                    if (LocalData[i]) {

                        if (socket.id !== Object.keys(LocalData[i])[0]) {
                          
                            var LNote = Object.values(LocalData[i])[0].Note;
                            var LOctave = Object.values(LocalData[i])[0].Octave;
                            var Ltime = Object.values(LocalData[i])[0].Time;


                            if (Users && LNote && LOctave && Ltime) {
                               
                                UserSing(Users, LNote, LOctave, Ltime);
                            }

                        }
                    }
                }

            }



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
            IDS = data.IDs;
            for (var i = 0; i < Users; i++) {
                UserVoice[i] = new Tone.Synth().toMaster();
            }
        }
    );


    // user = new Window(5, windowWidth / 2, windowHeight / 2, 390, 220, 200, false, true);
    // userInput = new Window(5, windowWidth / 2, windowHeight / 2, 250, 50, 250, true);


    for (var i = 0; i < 15; i++) {
        RandomNumbers.push(Math.floor(random(1, 12)));
    }
    marker = loadImage('./assets/Characters/marker.png');
    noteSpan = select('#note');


    synth = new Tone.Synth().toMaster();
    keys = new Tone.Synth().toMaster();


}

////////////////////user
////////////////////
function mousePressed(event) {

    for (var i = 0; i < NoteColors.length; i++) {
        if (event.clientX > LowerPitchTile[i].reportPos().minBorder.x &&
            event.clientX < LowerPitchTile[i].reportPos().maxBorder.x &&
            event.clientY > LowerPitchTile[i].reportPos().minBorder.y &&
            event.clientY < LowerPitchTile[i].reportPos().maxBorder.y
        ) {
            keys.triggerAttackRelease(notes[i] + "4", 0.01);
            LowerPTileState[i] = true;
        }

    }
}



function mouseReleased(event) {

    LowerPTileState = [false, false, false, false];

}

function keyPressed() {

    if (key === "m" || key === "M") {
        state = !state;
        Tone.Master.mute = state;
    }
    //I have to add Mute button here
}


function keyTyped(bla) {
    return bla;
}


function ReadImages() {

    for (var i = 0; i < 45; i++) {

        img[i] = loadImage('./assets/Characters/300ppi/' + (i + 1) + '.png');

    }
    ImagesRead = true;

}

function draw() {




    if (!ImagesRead) {
        ReadImages();
    }

    var margin = 0.85;
    var RightMargin = 200;
    TileSize = windowWidth * 0.11;
    var FrameMargin = 350;
    columnsNo = Math.floor((windowWidth - RightMargin) / TileSize);
    rowsNo = Math.floor((windowHeight - 2 * FrameMargin) / TileSize);

    // Background // 
    push();
    Background = new Window(windowWidth * 0.0035, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight,
        221, false, true, 240, 150, true);
    Background.display();
    pop();


    // Progression //     
    push();
    for (var i = 0; i < 5; i++) {

        Progression = new Window(windowWidth * 0.0017, (windowWidth * 0.28) + (i * (windowWidth * 0.10995)), windowWidth * 0.04, windowWidth * 0.0925, windowHeight * 0.0175,
            NoteColors[1], true, false, 240, 150, true, false, 255, false);
        Progression.display();
        Progression.displayText("Chord", "", windowWidth * 0.006, (- windowWidth * 0.0465) + (i * (windowWidth * 0.00025)), - windowHeight * 0.02, 0, 255)
        Progression.displayText(i + 1, "", windowWidth * 0.006, (- windowWidth * 0.02) + (i * (windowWidth * 0.00025)), - windowHeight * 0.02, 0, 255)
    }
    pop();


    // Slider Box //     
    push();
    RightBar = new Window(windowWidth * 0.00225, windowWidth * 0.895, windowHeight / 2, windowWidth * 0.15, windowHeight * 0.88,
        221, false, false, 240, 100, true, false, 255, false);
    RightBar.display();
    RightBar.HorLine(windowWidth * 0.8975, windowHeight * 0.275, windowWidth * 0.12);
    RightBar.HorLine(windowWidth * 0.8975, windowHeight * 0.35, windowWidth * 0.12);
    pop();


    // Lower Pitch Tile // 
    push();
    for (var i = 0; i < NoteColors.length; i++) {
        var npTileGap = windowWidth * 0.042
        var npTileSize = windowWidth * 0.035


        LowerPitchTile[i] = new Window(windowWidth * 0.002, ((windowWidth / 2) + (i * npTileGap) + npTileGap / 2) - (noteNum / 2 * npTileGap), windowHeight * 0.885, npTileSize, npTileSize,
            NoteColors[i], true, false, 200, 100, LowerPTileState[i], false, true, LowerPTileState[i], 4);
        LowerPitchTile[i].display();
        LowerPitchTile[i].displayText(i + 1, "", windowWidth * 0.005, - windowWidth * 0.015, windowHeight * 0.03, 0, 255);

    }

    push();


    pop();


    // Mic Tile // 
    push();
    MicTile = new Window(windowWidth * 0.00175, windowWidth * 0.8975, windowHeight * 0.175, windowHeight * 0.125, windowHeight * 0.125,
        (NoteColors[10]), true, false, 240, 150, true);
    MicTile.display();
    MicTile.displayText(10, "", windowWidth * 0.0085, - windowWidth * 0.0225, windowHeight * 0.05, 0, 255)
    pop();

    // Slider Vert // 
    push();
    Slider = new Window(windowWidth * 0.00175, windowWidth * 0.875, windowHeight * 0.6425, windowWidth * 0.0075, windowHeight * 0.515,
        (0), true, false, 240, 150, true);
    Slider.display();
    pop();

    // Slider Pitch - Box // 
    push();
    PaletteDock = new Window(windowWidth * 0.00175, windowWidth * 0.915, windowHeight * 0.6425, windowWidth * 0.0275, windowHeight * 0.52,
        (221), false, false, 240, 150, true);
    PaletteDock.display();
    pop();

    // Slider - Pitch // 
    push();
    for (var i = 0; i < NoteColors.length; i++) {
        Palette = new Window(windowWidth * 0.00175, windowWidth * 0.915, windowHeight * 0.87 + ((windowHeight * -0.0415) * i), windowHeight * 0.0325, windowHeight * 0.0325,
            NoteColors[i], true, false, 0, 60, true, false, true, true, null, true);
        Palette.display();
        //442
    }
    pop();

    var volume = mic.getLevel();
    if (volume > 0.1) {



        // Slider Pointer // 
        push();
        if (noteglobal.name == "C") {

            translate(windowWidth * 0.8625, windowHeight * 0.8575)
        }
        if (noteglobal.name == "C♯") {

            translate(windowWidth * 0.8625, windowHeight * 0.815)
        }
        if (noteglobal.name == "D") {

            translate(windowWidth * 0.8625, windowHeight * 0.7725)
        }
        if (noteglobal.name == "D♯") {

            translate(windowWidth * 0.8625, windowHeight * 0.73)
        }
        if (noteglobal.name == "E") {

            translate(windowWidth * 0.8625, windowHeight * 0.6875)
        }
        if (noteglobal.name == "F") {

            translate(windowWidth * 0.8625, windowHeight * 0.6475)
        }
        if (noteglobal.name == "F♯") {

            translate(windowWidth * 0.8625, windowHeight * 0.605)
        }
        if (noteglobal.name == "G") {

            translate(windowWidth * 0.8625, windowHeight * 0.565)
        }
        if (noteglobal.name == "G♯") {

            translate(windowWidth * 0.8625, windowHeight * 0.5225)
        }
        if (noteglobal.name == "A") {

            translate(windowWidth * 0.8625, windowHeight * 0.48)
        }
        if (noteglobal.name == "A♯") {

            translate(windowWidth * 0.8625, windowHeight * 0.4385)
        }
        if (noteglobal.name == "B") {

            translate(windowWidth * 0.8625, windowHeight * 0.3975)
        }


    }
    else {
        translate(windowWidth * 0.8625, windowHeight * 0.8575)
        noteglobal = {};


    }

    scale(windowWidth * 0.0001);
    image(marker, 0, 0);
    pop();



    sing(noteglobal);

    // sing(noteglobal);

    // Chord Tile // 
    var chordNum = 5
    var playerNum = 3
    for (var x = 0; x < chordNum; x++) {
        for (var y = 0; y < Users; y++) {

            noStroke();

            fill(210, 210, 210);


            Tile = new Window(windowWidth * 0.00175, ((windowWidth / 2) + (x * TileSize) + TileSize / 2) - (TileSize * chordNum / 2), ((windowHeight / 2.25) + (y * TileSize) + TileSize / 2) - (TileSize * Users / 2), TileSize * margin, TileSize * margin,
                250, false, true, 230, 180, false);
            // Tile = new Window(5, FrameMargin + x * TileSize + TileSize / 2, 140 + y * TileSize + TileSize / 2, TileSize * margin, TileSize * margin, 250, false, true, 230, 180, false);
            Tile.display();
            Tile.displayText("Toothy Jellycat", "", windowWidth * 0.006, windowWidth * 0.0425, windowHeight * 0.0825, 2, 255);
            Tile.displayText(RandomNumbers[y * x], "", windowWidth * 0.006, - windowWidth * 0.0415, windowHeight * 0.0825, 0, 255);


        }
    }

    // User Block // 
    push();
    for (let i = 0; i < Users; i++) {

        Characters = new Window(windowWidth * 0.002, windowWidth * 0.1, windowHeight * 0.13 + (windowHeight * 0.15) * i, windowWidth * 0.15, windowHeight * 0.125,
            221, false, false, 250, 80, true, true, false, false);
        Characters.display();
        push();
        translate(windowWidth * 0.04, windowHeight * 0.1 + (windowHeight * 0.15) * i);
        scale(windowWidth * 0.00005);
        image(img[i], 0, 0);
        pop();

    }
    pop();



    // if (LocalData != null) {

    //     var Microphones = [];
    //     var Positions = [{ x: 1, y: 2 }];
    //     var Colors = [];
    //     if (LocalData[i]) {
    //         for (var i = 0; i < LocalData.length; i++) {

    //             Microphones.push(Object.values(LocalData[i])[0].Volume);
    //             Positions.push(Object.values(LocalData[i])[0].position);
    //             if (Object.keys(LocalData[i])[0] === socket.id) {
    //                 bgcolor = (Object.values(LocalData[i])[0].color.hex);

    //             }

    //             Colors.push((Object.values(LocalData[i])[0].color.hex));

    //         }
    //     }

    //     if (GridInit && socket.id) {

    //         sendGrid(columnsNo, rowsNo);
    //         GridInit = false;

    //     }

    // }

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




    if (volume > 0.1) {

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

    // 1670 - RightMargin + (RightMargin - PersonalTileSize) / 2 + PersonalTileSize / 2;
    xPos = windowWidth * 0.8965
    yPos = windowHeight * 0.1725;
    size = windowWidth * 0.035 + heightAux1 / 4;
    StrokeW = 3;

    PixCircle(xPos, yPos, size / 2, StrokeW, 1, 4);   //(xPos,yPos,diameter,strokeWeight,strokeGaps,pixelSize)



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



function sendmouse(volume) {
    // We are sending!


    var data = {
        [socket.id]: { Volume: volume, Note: Note, Octave: Octave, Time: Time }
    };


    socket.emit('mic', data);
}
function sendGrid(columnsNo, rowsNo) {


    var data = {
        IDs: { x: columnsNo, y: rowsNo }
    };

    socket.emit('ID', data);
}

