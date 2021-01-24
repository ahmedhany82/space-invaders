const game = new Game();

function preload() {
    game.preload();
}

function setup() {
    createCanvas(WIDTH, HEIGHT);  
}

function draw() {
    game.draw();
}

function keyPressed() {
    game.handleKey(keyCode);
}