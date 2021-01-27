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
        this.invadersSpeed = 2;
        this.playerExplosion;
        this.decrementLivesFlag = 0;
        this.pauseLoop = false;
        this.gameDuration = 30; //1 minute
        this.countDownID;
        this.selectedShip = 0;
        this.selectedShipPrev = 0;
    }

    preload() {
        this.backgroundimage.preload();
        this.player.preload();
        //http://www.classicgaming.cc/classics/space-invaders/files/sounds/invaderkilled.zip
        this.invaderKilledSound = createAudio('Sounds/invaderkilled.wav');
        http://www.classicgaming.cc/classics/space-invaders/files/sounds/explosion.zip
        this.playerExplosion = createAudio('Sounds/explosion.wav');
        this.countDown(this.gameDuration);
    }

    draw() {
        clear();
        this.backgroundimage.draw();

        if(this.makeVisible || frameCount % 2 === 0)
        {
            this.player.draw();
        }

        if (frameCount % (Math.floor(50 / this.selectedLevel)) === 0) {
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
        
        this.detectCollision();

        this.checkSelectedSpaceShip();

        if(this.selectedShip !== this.selectedShipPrev) {
            this.player.changeSpaceShip(this.selectedShip);
        }

        this.selectedShipPrev = this.selectedShip;
    }

    handleKey(keyCode) {
        if (keyCode === 32) this.player.fireMissile();
        if ( (keyCode === 13) && (this.gameOverFlag === true) ) {
            console.log("Enter Key is pressed.")
            $('#myWinningModal').modal('hide');
            $('#myLosingModal').modal('hide');
            this.invaders = [];
            this.missedInvaders = 0;
            document.querySelector('.missed').querySelector("span").innerText = this.missedInvaders;
            this.player.score = 0;
            document.querySelector(".score").querySelector("span").innerText = this.player.score;
            this.player.lives = 3;
            document.querySelector(".lives").querySelector("span").innerText = this.player.lives;
            this.pauseLoop = false;
            this.gameOverFlag = false;
            this.countDown(this.gameDuration);
            loop();
        }
    }

    moveMissiles() {
        for(let missile of this.missiles) {
            missile.y -= MISSILE_SPEED;
        }   
    }

    addInvaders() {
        let x = (Math.floor(Math.random() * WIDTH));
        let y = 5;
        let invader = new Invader(x,y,this.invadersSpeed);
        invader.preload(Math.floor(Math.random() * 6));
        this.invaders.push(invader);
    }

    moveInvaders() {
        for(let invader of this.invaders) {
            invader.moveInvader();
        }    
    }

    filterMissiles() {
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
                    }
            }
        }

    }

    checkGameOver() {
        if( (this.missedInvaders === 50 || this.player.lives === 0) && this.gameOverFlag === false) {
            this.pauseLoop = true;
            this.gameOverFlag = true;
            clearInterval(this.countDownID);
            $('#myLosingModal').modal('show');
        } 
    }

    detectCollision() {
        let playerX = this.player.x + this.player.imageWidth / 2;
        let playerY = this.player.y + this.player.imageHeight / 2;
        
        for(let j=0; j<this.invaders.length; j++) {
            let invaderX = this.invaders[j].x + this.invaders[j].imageWidth / 2;
            let invaderY = this.invaders[j].y + this.invaders[j].imageHeight / 2;
            
            if ( Math.abs(playerX - invaderX) < 25 && Math.abs(playerY - invaderY) < 25) {
                
                console.log('Invader Player collision');
                this.playerExplosion.play();
            
                this.decrementLivesFlag = 1;
                this.makeVisible = 0;
                /* a timeout for 3 seconds afterwards set the spaceship to fully visible again */
                setTimeout(()=>{
                    this.makeVisible = 1;
                }, 2000);
                if(this.player.lives > 0) {
                    this.player.lives -= 1;
                }
                this.invaders.splice(j,1);
                document.querySelector(".lives").querySelector("span").innerText = this.player.lives;
                console.log("lives : ", this.player.lives);
                break;
            }
        }    
    }

    countDown(duration) {
        //Modified from https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
        console.log("countDown is called")
        let timer = duration;
        let minutes, seconds;
        this.countDownID = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            document.querySelector('.timer').querySelector('span').innerText = minutes + ":" + seconds;
            timer--;
    
            if (timer < 0) {
                clearInterval(this.countDownID);
                this.pauseLoop = true;
                this.gameOverFlag = true;
                document.querySelector('.winscore').innerText = this.player.score;
                $('#myWinningModal').modal('show');
            }
        }, 1000);
    }

    checkSelectedLevel() {
        if(document.querySelector('#levelSelector1').checked)
        {
            this.selectedLevel = 1;
            this.invadersSpeed = 2;
        } else {
            if(document.querySelector('#levelSelector2').checked) {
                this.selectedLevel = 2;
                this.invadersSpeed = 4;
            } else {
                this.selectedLevel = 3;
                this.invadersSpeed = 6;
            }
        }
    }

    checkSelectedSpaceShip() {
        if(document.querySelector('#ShipSelector1').checked)
        {
            this.selectedShip = 0;
        } else {
            this.selectedShip = 1;
        }
    }
}