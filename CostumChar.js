var UserCostum;
var TitleBarSize;
var Timer;
var TimerTile;
var shadowWidth;
var Instructions;
var Inst;
var Custom;
var ArrowLeft = [];
var ArrowRight = [];
var ArrowText = ['Hair', 'Eyes', 'Mouth', 'Skin'];

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

}



function draw() {

    userHeight = windowHeight;
    TitleBarSize = windowHeight * 0.051;
    shadowWidth = 0.0055 * userHeight;
    userWidth = userHeight * 1.485;
    FontSize = 0.017 * windowHeight;

    background(0);

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
            (221), false, false, 240, 90, true);
        ArrowRight[i] = new Window(shadowWidth * 0.7, windowWidth / 2 - userHeight / 2 + ButtonGap, windowHeight * 0.49 + i * ButtonGap, userHeight * 0.046, userHeight * 0.046,
            (221), false, false, 240, 90, true);
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

    console.log(Instructions[0]);
}

function mouseClicked() {

}