class Background {
    constructor() {
        this.y = 0;
        this.img;
        this.speed = 4
    }

    preload() {
        /* source: https://www.pexels.com/photo/cluster-of-stars-1341279/ */
        this.img = loadImage('images/pexels-photo-1341279.jpeg');
    }

    draw() {
        image(this.img, 0, this.y, WIDTH, HEIGHT);
        image(this.img, 0, this.y - HEIGHT, WIDTH, HEIGHT)
        this.y += this.speed;
        if (this.y >=  HEIGHT) {
             this.y = 0;
        }
    }
}
