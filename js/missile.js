class Missile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image;
        this.imageHeight = 50;
        this.imageWidth = 50;
        console.log('Missile constructor is called');
    }

    preload() {
        console.log("Missile preload() is called")
        this.image = loadImage("images/tile000.png");
    }

    draw() {
        console.log("Missile draw() is called")
        image(this.image, this.x, this.y, this.imageHeight, this.imageWidth);
    }
}