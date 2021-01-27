class Invader {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y;
        this.image;
        this.imageHeight = 30;
        this.imageWidth = 30;
        this.direction = (this.x >= (WIDTH*2/3))  ? 1 : -1;
        this.speed = speed;
        this.sound;
    }

    preload(invader) {
        switch(invader) {
            case 0:
                //https://www.seekpng.com/ipng/u2w7w7a9y3y3i1r5_space-invaders-png-space-invaders-alien/
                this.image = loadImage("images/SeekPng.com_space-invader-png_1925983.png");
                break;
            case 1:
                //https://www.seekpng.com/ipng/u2q8a9y3a9u2r5q8_space-invaders-png-transparent-picture-space-invader-no/
                this.image = loadImage("images/SeekPng.com_space-png_139338.png");
                break;
            case 2:
                //https://www.seekpng.com/ipng/u2q8q8e6o0e6y3i1_space-invaders-png-file-space-invaders-png/
                this.image = loadImage("images/orange_invader.png");
                break;
            case 3:
                //https://www.seekpng.com/ipng/u2q8a9o0o0t4q8e6_space-invaders-alien-png-image-background-space-invaders/
                this.image = loadImage("images/SeekPng.com_alien-png_196794.png");
                break;
            case 4:
                this.image = loadImage("images/yellow_invader.png");
                break;
            case 5:
                this.image = loadImage("images/magenta_invader.png");
                break;
        }
    }

    draw() {
        image(this.image, this.x, this.y, this.imageHeight, this.imageWidth);
    }

    moveInvader() {
        this.y += this.speed;
        this.x += (this.speed * this.direction);

        this.bounceOffEdges();
        this.bounceAtSetHeight();
    }

    bounceOffEdges() {
        if( (this.x + this.imageWidth) >= WIDTH || this.x <= 0) {
            this.direction *= -1;
            this.x += (8*this.speed * this.direction); //to prevent getting stuck in the if-condition
        }
    }

    bounceAtSetHeight() {
        if(Math.abs(this.y - 450) < 5 ) {
            this.direction *= -1;
        }
    }
}
