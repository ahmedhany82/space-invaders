const game = new Game();

function preload() {
    game.preload();
}

function setup() {
    let cnv = createCanvas(WIDTH, HEIGHT);
    cnv.parent('sketch-holder');
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2 + 50;
    //let x = 1600;
    //let y = (windowHeight - height) - 50;
    //let y = 130;
    cnv.position(x, y);
}

function draw() {
    game.draw();
}

function keyPressed() {
    game.handleKey(keyCode);
}
