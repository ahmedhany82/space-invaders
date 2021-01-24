class Background {
    constructor() {
        this.y = 0;
        this.img;
        this.speed = 4
    }

    preload() {
        this.img = loadImage('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
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