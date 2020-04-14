class Window {
    constructor(margin, x, y, w, h, Color, invert, extraShadow, shadowColorUp, shadowColorDown, TopBorder, line) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color(Color);
        this.margin = margin;
        this.invert = invert;
        this.colorDown = color(255);
        this.colorUp = color(0);
        this.extraShadow = extraShadow;
        this.shadowColorDown = shadowColorDown;
        this.shadowColorUp = shadowColorUp;
        this.TopBorder = TopBorder;
        this.line = line;
    }
    display() {

        if (this.extraShadow) {
            for (var i = 0; i < 3; i++) {
                push();
                stroke(0);
                strokeWeight(5);
                fill(0);
                rectMode(CENTER)
                translate(this.margin * i, this.margin * i);
                rect(this.x, this.y, this.w, this.h);
                pop();
            }
        }
        if (this.invert) {
            this.colorDown = this.shadowColorDown;
            this.colorUp = this.shadowColorUp;
        }
        else {
            this.colorDown = this.shadowColorUp;
            this.colorUp = this.shadowColorDown;
        }
        push();
        noStroke();
        fill(this.color);
        beginShape();
        vertex(this.x - this.w / 2, this.y - this.h / 2);
        vertex(this.x - this.w / 2, this.y + this.h / 2);
        vertex(this.x + this.w / 2, this.y + this.h / 2);
        vertex(this.x + this.w / 2, this.y - this.h / 2);
        endShape(CLOSE);

        pop();

        push();
        noStroke();
        fill(color(int(this.colorUp + 40)));
        beginShape();
        vertex(this.x + this.w / 2, this.y + this.h / 2);
        vertex(this.x + this.w / 2 - this.margin, this.y + this.h / 2 - this.margin);
        vertex(this.x + this.w / 2 - this.margin, this.y - this.h / 2 + this.margin);
        vertex(this.x + this.w / 2, this.y - this.h / 2);
        endShape(CLOSE);
        pop();
        push();
        noStroke();
        beginShape();
        fill(this.colorUp);
        vertex(this.x + this.w / 2, this.y + this.h / 2);
        vertex(this.x - this.w / 2, this.y + this.h / 2);
        vertex(this.x - this.w / 2 + this.margin, this.y + this.h / 2 - this.margin);
        vertex(this.x + this.w / 2 - this.margin, this.y + this.h / 2 - this.margin);
        endShape(CLOSE);
        pop();
        if (this.TopBorder) {
            push()
            noStroke();
            fill(color(int(this.colorDown + 20)));
            beginShape();
            vertex(this.x - this.w / 2, this.y - this.h / 2);
            vertex(this.x - this.w / 2 + this.margin, this.y - this.h / 2 + this.margin);
            vertex(this.x - this.w / 2 + this.margin, this.y + this.h / 2 - this.margin);
            vertex(this.x - this.w / 2, this.y + this.h / 2);
            endShape(CLOSE);
            pop();
            push();
            noStroke();
            beginShape();
            fill(this.colorDown);
            vertex(this.x - this.w / 2, this.y - this.h / 2);
            vertex(this.x + this.w / 2, this.y - this.h / 2);
            vertex(this.x + this.w / 2 - this.margin, this.y - this.h / 2 + this.margin);
            vertex(this.x - this.w / 2 + this.margin, this.y - this.h / 2 + this.margin);
            endShape(CLOSE);
            pop();
        }

        if (this.line) {
            push();
            stroke(150);
            strokeWeight(2);
            beginShape();
            vertex(this.x-30,this.y+this.h/2*0.7);
            vertex(this.x-30,this.y-this.h/2*0.7);
            endShape();
            pop();
            push();
            stroke(255);
            strokeWeight(2);
            beginShape();
            vertex(this.x+3-30,this.y+this.h/2*0.7);
            vertex(this.x+3-30,this.y-this.h/2*0.7);
            endShape();
            pop();
        }

    }

    displayText(textIn, numberIn, TextSize) {
        push();
        fill(0);
        textSize(TextSize)
        this.text = textIn;
        push();
        textAlign(LEFT);
        text(this.text, this.x + TextSize + 10, this.y + 60);

        pop();
        push();
        textAlign(LEFT);
        text(numberIn, this.x - 65, this.y + 60);
        pop();
    }

}
