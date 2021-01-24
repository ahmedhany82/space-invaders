class Game {
    constructor() {
        this.player = new Player();
        this.backgroundimage = new Background();
        this.missiles = [];
        this.invaders = [];
    }

    preload() {
        //this.backgroundimage = loadImage('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
        this.backgroundimage.preload();
        this.player.preload();
    }

    draw() {
        //1image(this.backgroundimage, 0, 0, WIDTH, HEIGHT)
        clear();
        this.backgroundimage.draw();
        this.player.draw();
        if (frameCount % 180 === 0) {
            if(this.invaders.length < 5) {   /* Limit invaders by 10 for testing to avoid crashing to be removed after implementing filterInvaders() */
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
        this.filterMissiles();
        this.filterInvaders();
        this.filterHits();
        
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
        this.missiles = this.missiles.filter((missile) => {

            if (missile.y < 0) {
                return false;
            } else {
                return true;
            }

        })
    } 

    filterInvaders() {
        this.invaders = this.invaders.filter((invader) => {

            if (invader.y > HEIGHT) {
                return false;
            } else {
                return true;
            }

        })
    }

    filterHits() {
        //ToDo detect the invaders that are hit and remove the missile and invader, update this.hitcount which is read by the score function 
        
            for(let i=0; i<this.missiles.length; i++) {
            for(let j=0; j<this.invaders.length; j++) {
                let missileX = this.missiles[i].x + this.missiles[i].imageWidth / 2;
                let missileY = this.missiles[i].y + this.missiles[i].imageHeight / 2;

                let invaderX = this.invaders[j].x + this.invaders[j].imageWidth / 2;
                let invaderY = this.invaders[j].y + this.invaders[j].imageHeight / 2;
                
                if ( Math.abs(missileX - invaderX) < 25 && Math.abs(missileY - invaderY) < 25) {
                    
                    this.missiles.splice(i,1);
                    this.invaders.splice(j,1);
                    //ToDo increment score
                }
            }
        }

    }

    detectCollision() {
        //ToDo detects collisions between spaceship and invaders and calls a player function to decrement lives
    }

    updateScore() {
        //ToDO updates the score based on the # hits
    }
}