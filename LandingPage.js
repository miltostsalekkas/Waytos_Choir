var User;
var userWidth = 500;
var Logo;
var TitleBarSize = 30;
var fontPixel;
var UserInput;
var inputString = "";
var inputLen;
var startPressed;
var colorStartButton;
var UserLength;
var barcolor;
var ImagesRead;
var CharNo;
var img = [];
var TextWidth ;

function setup() {

    createCanvas(windowWidth, windowHeight)
    
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


function keyTyped() {

    if (key >= 'A' && key <= 'Z' || key >= 'a' && key <= 'z') {
        inputString += str(key);
        if (inputString.length > 12) {
            inputString = inputString.slice(0, -1);
        }
    }
    if (inputString.length > 3) {
        UserLength = true;
    }

}

function keyPressed() {

    if (inputString.length < 3) {
        UserLength = false;
    }
    if (inputString.length > 0 && keyCode === BACKSPACE) {
        inputString = inputString.slice(0, -1);

    }
    else if (inputString.length > 0 && keyCode === 32) {
        inputString += str(" ");
    }
    if (inputString.length > 0 && keyCode === 13) {
        if (UserLength) {
            startPressed = true;
            window.open('./index.html', '_blank','resizable,height=230,width=330');
        }
    }
}



function preload() {
    fontPixel = loadFont('./assets/pixelmix.ttf');
    fontPixelBold = loadFont('./assets/pixelmix_bold.ttf')
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function mouseReleased(event) {
    // console.log(event);

    // windowWidth / 2, windowHeight / 2 + 240, (userWidth / 3) * 0.9, 50
    if (event.clientX > windowWidth / 2 - ((userWidth / 3) * 0.9) / 2
        && event.clientX < windowWidth / 2 + ((userWidth / 3) * 0.9) / 2
        && event.clientY > windowHeight / 2 + 240 - 25
        && event.clientY < windowHeight / 2 + 240 + 25
    ) {
        if (UserLength) {
            startPressed = true;
            window.open('./index.html', '_blank');
        }
    }
}


function ReadImages() {
    if (CharNo != null) {
        for (var i = 0; i < CharNo-6; i++) {

            img[i] = loadImage('./assets/Characters/300ppi/' + (i + 1) + '.png');

        }
        ImagesRead = true;
    }
}



function draw() {


    if (!ImagesRead) {
        ReadImages();
    }

    background(0)

    push();
    User = new Window(5, windowWidth / 2, windowHeight / 2, userWidth, 1.19 * userWidth,
        (221), false, false, 240, 150, true);
    User.display();
    pop();
    push();
    Logo = new Window(5, windowWidth / 2, windowHeight / 2 - 70, userWidth * 0.8, 0.6 * userWidth,
        '#1193BC', true, false, 240, 150, true);
    Logo.display();
    textFont(fontPixelBold);
    Logo.displayText("QUARANTINE", "", 40, 0, -60, 1);
    Logo.displayText("QUARANTINE", "", 40, 3, -57, 1, 60);
    push();
    textFont(fontPixelBold);
    Logo.displayText("CHORALE", "", 61, 0, 5, 1);
    Logo.displayText("CHORALE", "", 61, 3, 8, 1, 60);
    pop();
    pop();
    push();
    noStroke();
    fill(0);
    rectMode(CENTER);
    rect(windowWidth / 2, windowHeight / 2 - (1.19 * userWidth) / 2 + 5 + TitleBarSize / 2, userWidth - 10, TitleBarSize);
    pop();
    push();

    textFont(fontPixel);
    UserInput = new Window(5, windowWidth / 2, windowHeight / 2 + 165, userWidth - 100, 40,
        (255), true, false, 230, 150, true);
    UserInput.display();
    UserInput.displayText("USER NAME", "", 19, -136, -40, 1);
    UserInput.displayText(inputString, "", 19, -190, 7, 0);
    pop();

    
  
    push();
    
    noStroke();
    if (frameCount % 30 == 0) {
        barcolor = !barcolor;
    }
    if (barcolor) {
        fill(0);
    }

    else { fill(255) }
    textFont(fontPixel);
    textSize(19);
    TextWidth = textWidth(inputString);;
    rect((windowWidth / 2) - 190 + TextWidth, windowHeight / 2 + 155, 2, 20);
    pop();


    push();
    textFont(fontPixel);
    colorStartButton = color("#FF9E4A");
    if (!UserLength) {
        colorStartButton.setAlpha(60);
    }
    startButton = new Window(5, windowWidth / 2, windowHeight / 2 + 240, (userWidth / 3) * 0.9, 50,
        (colorStartButton), startPressed, false, 250, 150, true, false, 100, null, null, false);
    startButton.display();
    startButton.displayText("START", "", 18, 0, 7, 1);
    pop();


}
