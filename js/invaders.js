class Invader {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.image;
        this.imageHeight = 50;
        this.imageWidth = 50;
    }

    preload() {
        this.image = loadImage("images/SeekPng.com_space-invader-png_1925983.png");
    }

    draw() {
        image(this.image, this.x, this.y, this.imageHeight, this.imageWidth);
    }
}
