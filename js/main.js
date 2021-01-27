const game = new Game();


function preload() {
    game.preload();
}

function setup() {
    let cnv = createCanvas(WIDTH, HEIGHT);
    cnv.parent('sketch-holder');
}


function draw() {
    game.draw();  
    game.checkGameOver();
    if(game.pauseLoop === false) {
        loop();
    } else {
        noLoop();
    }
}

function keyPressed() {
    game.handleKey(keyCode);
}
