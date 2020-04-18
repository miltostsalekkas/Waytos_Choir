var UserCostum;
var TitleBarSize;
var Timer;
var TimerTile;
var shadowWidth;
var Instructions;
var Inst;
var Custom;
var CharTile;

var LeftArrowState = [];
var RightArrowState = [];

var ArrowLeft = [];
var ArrowRight = [];
var ArrowText = ['Hair', 'Eyes', 'Mouth', 'Skin'];

var Hair = [];
var Eyes = [];
var Mouth = [];
var Skin = [];

var ImagesRead;

var ChaarId = [];


var HairId = 1;
var EyesId = 1;
var MouthId = 1;
var SkinId = 1;

var Outline;

var LeftLastState = [false, false, false, false];
var RightLastState = [false, false, false, false];

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function preload() {
    fontPixel = loadFont('./assets/pixelmix.ttf');
    fontPixelBold = loadFont('./assets/pixelmix_bold.ttf');
    Instructions = loadStrings('./assets/Instructions/Instructions.txt');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // socket = io();
    // socket.on('CharNo',
    //     // When we receive data
    //     function (data) {
    //         CharNo = data;

    //     }
    // );
    // socket.on('Users',
    //     // When we receive data
    //     function (data) {
    //         Users = data.Users;
    //     }
    // );

}

function ReadImages() {

    for (var i = 0; i < 44; i++) {

        Hair[i] = loadImage('./assets/Characters/300ppi/hair/' + (i + 1) + '.png');
        Eyes[i] = loadImage('./assets/Characters/300ppi/eyes/' + (i + 1) + '.png');
        Mouth[i] = loadImage('./assets/Characters/300ppi/mouth/' + (i + 1) + '.png');
        Skin[i] = loadImage('./assets/Characters/300ppi/skin/' + (i + 1) + '.png');
        Outline = loadImage('./assets/Characters/300ppi/Outline.png');

    }
    ImagesRead = true;

}

function mousePressed(event) {

    for (var i = 0; i < ArrowLeft.length; i++) {
        if (event.clientX > ArrowLeft[i].reportPos().minBorder.x &&
            event.clientX < ArrowLeft[i].reportPos().maxBorder.x &&
            event.clientY > ArrowLeft[i].reportPos().minBorder.y &&
            event.clientY < ArrowLeft[i].reportPos().maxBorder.y
        ) {
            LeftArrowState[i] = true;
        }

        if (event.clientX > ArrowRight[i].reportPos().minBorder.x &&
            event.clientX < ArrowRight[i].reportPos().maxBorder.x &&
            event.clientY > ArrowRight[i].reportPos().minBorder.y &&
            event.clientY < ArrowRight[i].reportPos().maxBorder.y
        ) {
            RightArrowState[i] = true;
        }
    }
}

function mouseReleased() {

    LeftArrowState = [false, false, false, false];
    RightArrowState = [false, false, false, false];

}



function draw() {




    userHeight = windowHeight;
    TitleBarSize = windowHeight * 0.051;
    shadowWidth = 0.0055 * userHeight;
    userWidth = userHeight * 1.485;
    FontSize = 0.017 * windowHeight;

    background(0);


    if (!ImagesRead) {
        ReadImages();
    }

    push();
    UserCostum = new Window(shadowWidth, windowWidth / 2, windowHeight / 2, userWidth, userHeight,
        (221), false, false, 240, 150, true);
    UserCostum.display();
    UserCostum.VertLine(windowWidth / 2, windowHeight * 0.475, userHeight * 0.7);
    pop();

    push();
    noStroke();
    fill(0);
    rectMode(CENTER);
    rect(windowWidth / 2, windowHeight / 2 - userHeight / 2 + shadowWidth + TitleBarSize / 2, userWidth - 2 * shadowWidth, TitleBarSize);
    pop();
    push();

    push();
    Timer = new Window(shadowWidth, windowWidth / 2 - userWidth * 0.25, windowHeight / 4, userWidth * 0.4, userHeight * 0.15,
        (221), false, false, 240, 150, true);
    Timer.display();
    push();
    textFont(fontPixel);
    Timer.displayText("Time", "", FontSize, -(userWidth * 0.4) / 2, -windowHeight * 0.10);
    pop();
    pop();

    push();
    TimerTile = new Window(shadowWidth, windowWidth / 2 - userWidth * 0.25, windowHeight / 4, userHeight * 0.11, userHeight * 0.11,
        (255), true, false, 180, 100, true);
    TimerTile.display();
    pop();


    push();
    Custom = new Window(shadowWidth, windowWidth / 2 - userWidth * 0.25, windowHeight * 0.58, userWidth * 0.4, userHeight * 0.346,
        (221), false, false, 240, 150, true);
    Custom.display();
    push();
    textFont(fontPixel);
    Custom.displayText("Customization", "", FontSize, -(userWidth * 0.4) / 2, -userHeight * 0.2);
    UserCostum.VertLine(windowWidth / 2 - userWidth * 0.25, windowHeight * 0.58, userHeight * 0.25);
    pop();
    pop();

    push();

    var ButtonGap = userHeight * 0.06;
    for (let i = 0; i < 4; i++) {
        ArrowLeft[i] = new Window(shadowWidth * 0.7, windowWidth / 2 - userHeight / 2, windowHeight * 0.49 + i * ButtonGap, userHeight * 0.046, userHeight * 0.046,
            (221), LeftArrowState[i], false, 240, 90, true);
        ArrowRight[i] = new Window(shadowWidth * 0.7, windowWidth / 2 - userHeight / 2 + ButtonGap, windowHeight * 0.49 + i * ButtonGap, userHeight * 0.046, userHeight * 0.046,
            (221), RightArrowState[i], false, 240, 90, true);
        ArrowLeft[i].display();
        ArrowRight[i].display();

        ArrowLeft[i].displayArrow(windowWidth / 2 - userHeight / 2, windowHeight * 0.49 + i * ButtonGap, userHeight * 0.016, 180, 0.6);
        ArrowRight[i].displayArrow(windowWidth / 2 - userHeight / 2 + ButtonGap, windowHeight * 0.49 + i * ButtonGap, userHeight * 0.016, 0, 0.6);
        push();
        textFont(fontPixel);

        ArrowLeft[i].displayText(ArrowText[i], "", FontSize, -userWidth * 0.08, +userHeight * 0.005);
    }
    pop();
    pop();


    push();
    Inst = new Window(shadowWidth, windowWidth / 2 + userWidth * 0.25, windowHeight * 0.5, userWidth * 0.4, userHeight * 0.657,
        (255), true, false, 240, 150, true);
    Inst.display();
    push();
    textFont(fontPixel);
    Inst.displayText("Instruction", "", FontSize, -(userWidth * 0.4) / 2, -userHeight * 0.355);

    for (let i = 0; i < Instructions.length; i++) {
        Inst.displayText(Instructions[i], "", 0.8 * FontSize, -(userWidth * 0.35) / 2, -userHeight * 0.28 + i * 0.018 * windowHeight);
    }
    pop();
    pop();
    push();
    CharTile = new Window(shadowWidth, windowWidth / 2 - userWidth * 0.151, windowHeight * 0.58, userHeight * 0.176, userHeight * 0.176,
        (255), true, false, 180, 100, true);
    CharTile.display();
    CharPoint = {
        x: CharTile.reportPos().minBorder.x,
        y: CharTile.reportPos().minBorder.y
    }
    push();
    translate(CharPoint.x, CharPoint.y);
    scale(0.00024 * windowHeight);

    if (LeftArrowState !== null && RightArrowState !== null) {
        for (var i = 0; i < 4; i++) {

            if (LeftArrowState[i] && LeftLastState[i] !== LeftArrowState[i]) {
                if (i == 0) {
                    HairId -= 1;
                }
                else if (i == 1) {
                    EyesId -= 1;
                }
                else if (i == 2) {
                    MouthId -= 1;
                }
                else {
                    SkinId -= 1;
                }

            }
            else if (RightArrowState[i] && RightLastState[i] !== RightArrowState[i]) {
                if (i == 0) {
                    HairId += 1;
                }
                else if (i == 1) {
                    EyesId += 1;
                }
                else if (i == 2) {
                    MouthId += 1;
                }
                else {
                    SkinId += 1;
                }
            }
            RightLastState[i] = RightArrowState[i];
            LeftLastState[i] = LeftArrowState[i];
        }

        // Limiting ID from 1 to 47

        if (HairId < 1 && LeftArrowState[0]) {
            HairId = 44;
        }
        else if (HairId === 44&& RightArrowState[0]) {
            HairId = 0;
        }

        if (EyesId < 1 && LeftArrowState[0]) {
            EyesId = 44;
        }
        else if (EyesId === 44&& RightArrowState[0]) {
            EyesId = 0;
        }

        if (MouthId < 1 && LeftArrowState[0]) {
            MouthId = 44;
        }
        else if (MouthId === 44&& RightArrowState[0]) {
            MouthId = 0;
        }

        if (SkinId < 1 && LeftArrowState[0]) {
            SkinId = 44;
        }
        else if (SkinId === 44&& RightArrowState[0]) {
            SkinId = 0;
        }



        console.log(HairId, EyesId, MouthId, SkinId);
    }

   
    image(Skin[SkinId], 0, 0);
    image(Outline, 0, 0);
    image(Hair[HairId], 0, 0);
    image(Mouth[MouthId], 0, 0);
    image(Eyes[EyesId], 0, 0);

    pop();
    pop();

}

