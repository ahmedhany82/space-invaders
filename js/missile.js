class Missile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image;
        this.imageHeight = 50;
        this.imageWidth = 10;
        console.log('Missile constructor is called');
    }

    preload() {
        console.log("Missile preload() is called")
        //http://www.classicgaming.cc/classics/space-invaders/files/graphics/space-invaders-characters.zip
        this.image = loadImage("images/missile.png");
    }

    draw() {
        //console.log("Missile draw() is called")
        image(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
    }
}
