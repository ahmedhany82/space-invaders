const game = new Game();

// here we preload assets - in that case the images
function preload() {
    game.preload();
}
function setup() {
    createCanvas(WIDTH, HEIGHT);
    //canvas.parent("canvas");
    //background(153);
    //console.log('setup is called');
    // here we have to setup some things so they are ready when p5 starts
    // e.g. the width variable in the player - that is the width of the canvas
    //game.setup();
    
}
function draw() {
    //console.log("draw is called");
    game.draw();
}
function keyPressed() {
    // if the spacebar is pressed
    // if (keyCode === 32) {
    //     game.player.jump();
    // }
    game.handleKey(keyCode);
    //console.log(keyCode);
}