const game = new Game();

function preload() {
    game.preload();
}

function setup() {
    let cnv = createCanvas(WIDTH, HEIGHT);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function draw() {
    game.draw();
}

function keyPressed() {
    game.handleKey(keyCode);
}