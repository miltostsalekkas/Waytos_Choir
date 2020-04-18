

class Window {
    constructor(margin, x, y, w, h, Color, invert, extraShadow, shadowColorUp,
        shadowColorDown, TopBorder, line, opacity, LowBorder, OneShadow) {

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
        this.opacity = opacity;
        this.LowBorder = LowBorder;
        this.OneShadow = OneShadow;
    }
    display() {

        if (this.OneShadow != null) {
            push();
            stroke(4)
            strokeWeight(5);
            fill(0);
            beginShape();
            vertex(this.x + this.OneShadow - this.w / 2, this.y + this.OneShadow + this.h / 2);
            vertex(this.x + this.OneShadow + this.w / 2, this.y + this.OneShadow + this.h / 2);
            vertex(this.x + this.OneShadow + this.w / 2, this.y + this.OneShadow - this.h / 2);
            vertex(this.x + this.w / 2, this.y - this.h / 2);
            vertex(this.x - this.w / 2, this.y - this.h / 2);
            vertex(this.x - this.w / 2, this.y + this.h / 2);
            endShape(CLOSE);
            pop();
        }
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
        if (!this.LowBorder) {
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
        }
        if (this.TopBorder) {
            push()
            noStroke();
            var col = color(int(this.colorDown + 20));
            if (this.opacity) {
                col.setAlpha(this.opacity);
            }
            fill(col);
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
            var col2 = color(this.colorDown)
            if (this.opacity) {
                col2.setAlpha(100);
            }
            fill(col2);
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
            vertex(this.x - 30, this.y + this.h / 2 * 0.7);
            vertex(this.x - 30, this.y - this.h / 2 * 0.7);
            endShape();
            pop();
            push();
            stroke(255);
            strokeWeight(2);
            beginShape();
            vertex(this.x + 3 - 30, this.y + this.h / 2 * 0.7);
            vertex(this.x + 3 - 30, this.y - this.h / 2 * 0.7);
            endShape();
            pop();
        }

    }

    HorLine(x, y, w) {
        push();
        stroke(150);
        strokeWeight(2);
        beginShape();
        vertex(x + w / 2, y);
        vertex(x - w / 2, y);
        endShape();
        pop();
        push();
        stroke(255);
        strokeWeight(2);
        beginShape();
        vertex(x + w / 2, y + 2);
        vertex(x - w / 2, y + 2);
        endShape();
        pop();
    }

    VertLine(x, y, h) {
        push();
        stroke(150);
        strokeWeight(2);
        beginShape();
        vertex(x, y + h / 2);
        vertex(x, y - h / 2);
        endShape();
        pop();
        push();
        stroke(255);
        strokeWeight(2);
        beginShape();
        vertex(x + 2, y + h / 2);
        vertex(x + 2, y - h / 2);
        endShape();
        pop();
    }

    displayArrow(x, y, size, r, rx) {

        r = radians(r);

        push();
        fill(0);
        beginShape();

        for (r; r < 4 * PI; r = r + (2 * PI) / 3) {
            var xPos = x + Math.cos(r) * size * rx;
            var yPos = y + Math.sin(r) * size;

            vertex(xPos, yPos);
        }
        endShape(CLOSE);
        pop();
    }

    displayText(textIn, numberIn, TextSize, w, h, align, opacity) {
        push();

        textSize(TextSize);
        let TextColor = color(0);

        if (opacity != null) { TextColor.setAlpha(opacity); }

        fill(TextColor);
        noStroke();
        if (align === 0) {
            textAlign(LEFT);
        }
        else if (align === 1) {
            textAlign(CENTER);
        }
        else if (align === 2) {
            textAlign(RIGHT);
        }
        else {
            textAlign(LEFT);
        }


        this.text = textIn;


        text(this.text, this.x + w, this.y + h);


        text(numberIn, this.x - 65, this.y + h);
        pop();

    }
    reportPos() {
        return {
            minBorder:{ x: this.x - this.w / 2, y: this.y - this.h / 2 },
            maxBorder:{ x: this.x + this.w / 2, y: this.y + this.h / 2 }
        }
    }

}
