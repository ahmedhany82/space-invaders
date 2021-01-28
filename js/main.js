const game = new Game();

function myFunction(e) {
    let arrowKeys = [37, 38, 39, 40];
    if (arrowKeys.indexOf(e.keyCode) !== -1)
    {
        e.target.blur();
        console.log(e.target);
        return false;
    }
}

function preload() {
    game.preload();
    let inputs = document.querySelector('.controls').querySelectorAll('input');
    inputs.forEach(function(e) {
        e.onkeydown = myFunction;
    });
}

function setup() {
    let cnv = createCanvas(WIDTH, HEIGHT);
    cnv.parent('sketch-holder');
}


function draw() {
    game.draw();  
    game.checkGameOver();
    if(game.pauseLoop === true) {
        noLoop();
    }
}

function keyPressed() {
    game.handleKey(keyCode);
}
