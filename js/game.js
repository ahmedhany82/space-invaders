class Game {
    constructor() {
        this.player = new Player();
        this.backgroundimage;
        this.missiles = [];
        this.invaders = [];
    }

    preload() {
        this.backgroundimage = loadImage('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
        this.player.preload();
    }

    draw() {
        image(this.backgroundimage, 0, 0, WIDTH, HEIGHT);
        this.player.draw();
        if (frameCount % 180 === 0) {
            if(this.invaders.length < 10) {   /* Limit invaders by 10 for testing to avoid crashing to be removed after implementing filterInvaders() */
                this.addInvaders();
            }
        }
        for (let missile of this.missiles) {
            missile.draw();
        }        
        this.moveMissiles();
        for (let invader of this.invaders) {
            invader.draw();
        }
        this.moveInvaders();
        
    }

    handleKey(keyCode) {
        if (keyCode === 32) this.player.fireMissile();
    }

    moveMissiles() {
        for(let missile of this.missiles) {
            missile.y -= MISSILE_SPEED;
            //console.log(missile.x, missile.y);
        }   
    }

    addInvaders() {
        let x = (Math.floor(Math.random() * WIDTH));
        let y = 50;
        let invader = new Invader(x,y);
        invader.preload();
        this.invaders.push(invader);
    }

    moveInvaders() {
        for(let invader of this.invaders) {
            invader.y += INVADER_SPEED;
            //console.log(missile.x, missile.y);
        }    
    }

    filterMissiles() {
        //ToDo remove missiles that leave the screen
    }

    filterInvaders() {
        //ToDo remove invaders that leave the screen
    }

    filterHits() {
        //ToDo detect the invaders that are hit and remove the missile and invader, update this.hitcount which is read by the score function 
    }

    updateScore() {
        //ToDO updates the score based on the # hits
    }
}