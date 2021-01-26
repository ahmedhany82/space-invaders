class Game {
    constructor() {
        this.player = new Player();
        this.backgroundimage = new Background();
        this.missiles = [];
        this.invaders = [];
        this.invaderKilledSound;
        this.missedInvaders = 0;
        this.gameOverFlag = false;
        this.makeVisible = true;
        this.selectedLevel = 1;
    }

    preload() {
        //this.backgroundimage = loadImage('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
        this.backgroundimage.preload();
        this.player.preload();
        //http://www.classicgaming.cc/classics/space-invaders/files/sounds/invaderkilled.zip
        this.invaderKilledSound = createAudio('Sounds/invaderkilled.wav');
    }

    draw() {
        //1image(this.backgroundimage, 0, 0, WIDTH, HEIGHT)
        clear();
        this.backgroundimage.draw();

        if(this.makeVisible || frameCount % 2 === 0)
        {
            this.player.draw();
        }

        //console.log(frameCount % 50)
        if (frameCount % (Math.floor(50 / this.selectedLevel)) === 0) {
            // if(this.invaders.length < 5) {   /* Limit invaders by 10 for testing to avoid crashing to be removed after implementing filterInvaders() */
            //      this.addInvaders();
            //  }
            this.addInvaders();
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

        this.checkSelectedLevel();      
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
        //let x = Math.floor(Math.random() * 2) ? (Math.floor(Math.random() * (WIDTH/3))) : (WIDTH*2/3) + (Math.floor(Math.random() * (WIDTH/3)))
        let y = 5;
        let invader = new Invader(x,y);
        invader.preload(Math.floor(Math.random() * 6));
        this.invaders.push(invader);
    }

    moveInvaders() {
        // ToDo create a method in the invaders class to move an invader and call it here in each iteration.
        for(let invader of this.invaders) {
            //invader.y += INVADER_SPEED;
            invader.moveInvader();
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
                this.missedInvaders++;
                document.querySelector('.missed').querySelector("span").innerText = this.missedInvaders;
                return false;
            } else {
                return true;
            }

        })
    }

    filterHits() {
        //ToDo detect the invaders that are hit and remove the missile and invader, update this.hitcount which is read by the score function 
        
            for(let i=0; i<this.missiles.length; i++) {
                let missileX = this.missiles[i].x + this.missiles[i].imageWidth / 2;
                let missileY = this.missiles[i].y + this.missiles[i].imageHeight / 2;

                for(let j=0; j<this.invaders.length; j++) {
                    let invaderX = this.invaders[j].x + this.invaders[j].imageWidth / 2;
                    let invaderY = this.invaders[j].y + this.invaders[j].imageHeight / 2;
                    
                    if ( Math.abs(missileX - invaderX) < 25 && Math.abs(missileY - invaderY) < 25) {
                        
                        this.invaderKilledSound.play();
                        this.missiles.splice(i,1);
                        this.invaders.splice(j,1);
                        this.player.score++;
                        document.querySelector(".score").querySelector("span").innerText = this.player.score;
                        //ToDo increment score
                    }
            }
        }

    }

    checkGameOver() {
        if(this.missedInvaders === 50 && this.gameOverFlag === false) {
            noLoop();
            window.alert("Game Over!! You missed 50 invaders!!");
            this.gameOverFlag = true;
        } 
    }

    detectCollision() {
        //ToDo detects collisions between spaceship and invaders and calls a player function to decrement lives
    }

    updateScore() {
        //ToDO updates the score based on the # hits
    }

    checkSelectedLevel() {
        if(document.querySelector('#levelSelector1').checked)
        {
            this.selectedLevel = 1;
        } else {
            if(document.querySelector('#levelSelector2').checked) {
                this.selectedLevel = 2;
            } else {
                this.selectedLevel = 3;
            }
        }
    }
}