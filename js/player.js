class Player {
    constructor() {
        this.image;
        this.imageHeight = 100;
        this.imageWidth = 100;
        this.x = WIDTH/2;
        this.y = HEIGHT - this.imageHeight;
        this.lives;  //# of lives to decrement with each hit
        this.sound;
    }


    preload() {
        /* https://www.seekpng.com/ipng/u2q8o0o0a9i1o0t4_free-png-space-ship-png-images-transparent-nave/ */
        this.image = loadImage("images/SeekPng.com_space-ship-png_1581234.png");
        http://www.classicgaming.cc/classics/space-invaders/files/sounds/shoot.zip
        //this.sound = createAudio('Sounds/shoot.wav');
        //https://opengameart.org/content/lasershootingsx
        this.sound = createAudio('Sounds/laser_shooting_sfx.wav');
    }

    draw() {
        image(this.image, this.x, this.y, this.imageHeight, this.imageWidth);

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
        let missile = new Missile(this.x + (this.imageWidth / 2) - 10, this.y + (this.imageHeight / 2));
        missile.preload();
        this.sound.play();
        game.missiles.push(missile);  //ToDo: adjust the position to the center of the spaceship
    }
}
