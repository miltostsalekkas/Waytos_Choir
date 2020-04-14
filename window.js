class Window {
    constructor(x, y, w, h, Color, invert, extraShadow, shadowColorUp, shadowColorDown, TopBorder) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color(Color);
        this.margin = 5;
        this.invert = invert;
        this.colorDown = color(255);
        this.colorUp = color(0);
        this.extraShadow = extraShadow;
        this.shadowColorDown = shadowColorDown;
        this.shadowColorUp = shadowColorUp;
        this.TopBorder = TopBorder;
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
            fill(color(int(this.colorDown + 40)));
            beginShape();
            vertex(this.x - this.w / 2, this.y - this.h / 2);
            vertex(this.x - this.w / 2 + this.margin, this.y - this.h / 2 + this.margin);
            vertex(this.x - this.w / 2 + this.margin, this.y + this.h / 2 - this.margin);
            vertex(this.x - this.w / 2, this.y + this.h / 2);
            endShape(CLOSE);
            pop();
            push();
            beginShape();
            fill(this.colorDown);
            vertex(this.x - this.w / 2, this.y - this.h / 2);
            vertex(this.x + this.w / 2, this.y - this.h / 2);
            vertex(this.x + this.w / 2 - this.margin, this.y - this.h / 2 + this.margin);
            vertex(this.x - this.w / 2 + this.margin, this.y - this.h / 2 + this.margin);
            endShape(CLOSE);
            pop();
        }



    }

    displayText(textIn,numberIn,TextSize) {
        push();
        fill(0);
        textSize(TextSize)
        this.text = textIn;
        push();
        textAlign(LEFT);
        text(this.text, this.x+TextSize+10, this.y+80);
        pop();
        pop();
    }

}
