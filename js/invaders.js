class Invader {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.image;
        this.imageHeight = 50;
        this.imageWidth = 50;
    }

    preload(invader) {
        switch(invader) {
            case 0:
                this.image = loadImage("images/SeekPng.com_space-invader-png_1925983.png");
                break;
            case 1:
                this.image = loadImage("images/SeekPng.com_space-png_139338.png");
                break;
            case 2:
                this.image = loadImage("images/SeekPng.com_space-png_256238.png");
                break;
            case 3:
                this.image = loadImage("images/SeekPng.com_alien-png_196794.png");
                break;
        }
        //this.image = loadImage("images/SeekPng.com_space-invader-png_1925983.png");
    }

    draw() {
        image(this.image, this.x, this.y, this.imageHeight, this.imageWidth);
    }
}
