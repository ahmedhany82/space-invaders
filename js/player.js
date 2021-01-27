class Player {
    constructor() {
        this.image;
        this.imageHeight = 150;
        this.imageWidth = 120;
        this.x = WIDTH/2;
        this.y = HEIGHT - this.imageHeight;
        this.lives = 3;
        this.sound;
        this.score = 0;
    }


    preload() {

        /* https://www.seekpng.com/ipng/u2q8o0o0a9i1o0t4_free-png-space-ship-png-images-transparent-nave/ */
        this.image = loadImage("images/SeekPng.com_space-ship-png_1581234.png");

        /* https://www.seekpng.com/png/full/337-3370143_spaceship-sprite-png.png */
        //this.image = loadImage("images/SeekPng.com_spaceship-sprite-png_3370143.png");
        
        //https://opengameart.org/content/lasershootingsx
        this.sound = createAudio('Sounds/laser_shooting_sfx.wav');
    }

    draw() {
        image(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (keyIsDown(LEFT_ARROW)) {
            this.moveLeft();
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.moveRight();
        }

    }

    moveLeft() {
        if(this.x >= SPEED) {
            this.x -= SPEED;
        }
        
    }

    moveRight() {
        if(this.x <= WIDTH - SPEED - this.imageWidth) {
            this.x += SPEED;
        }
    }

    fireMissile() {
        let missile = new Missile(this.x + (this.imageWidth / 2) - 10, this.y);
        missile.preload();
        this.sound.play();
        game.missiles.push(missile);
    }
}
