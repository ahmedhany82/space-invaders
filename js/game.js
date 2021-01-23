class Game {
    constructor() {
        this.player = new Player();
        this.backgroundimage;
        this.missiles = [];
    }

    preload() {
        this.backgroundimage = loadImage('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
        this.player.preload();
    }

    draw() {
        image(this.backgroundimage, 0, 0, WIDTH, HEIGHT);
        this.player.draw();
        for (let missile of this.missiles) {
            missile.draw();
        }        
        this.moveMissiles();
    }

    handleKey(keyCode) {
        if (keyCode === 32) this.player.fireMissile();
    }

    moveMissiles() {
        for(let missile of this.missiles) {
            missile.y -= MISSILE_SPEED;
            console.log(missile.x, missile.y);
        }   
    }

    filterMissiles() {
        //ToDo remove missiles that leave the screen
    }
}