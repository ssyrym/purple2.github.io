// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;

    this.rightArrow = false;
    this.leftArrow = false;
    this.downArrow = false;
    this.upArrowPressed = false;

    //A S D F T KEYS
    this.theTPressed = false;//T key
    this.theAPressed = false;
    this.theSPressed = false;
    this.theDPresed = false;
    this.theFPressed = false;
    this.thePPressed = false;

    this.rightPressed = false;
    this.leftPressed = false;

    //Game States
    this.inMenu = true;
    this.inFight = false;
    this.fightOver = false;
    this.gameOver = false;

    //Fighters
    this.Fighters = [new John(this, null), new Alex(this, null), new Vlad(this, null), new Syrym(this, null)];
    this.selection = null;
   // this.Bar = new Bar();

}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        if (that.inMenu) {
            that.getSelections();
        } else if (that.inFight) {

            //console.log("In gameLoop inFight");
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        } else {//------------------------------
            that.displayMessage();
        }//-------------------------------------
    })();
}

// ---------------------------------
GameEngine.prototype.displayMessage = function () {
    this.inMessage = true;
    var message = "";
    if (this.Fighter.bar.health <= 0) {
        message = "You are NOT the man!"
    } else {
        message = "You da man, yo!"
    }

    this.ctx.fillStyle = 'black';
    this.ctx.font = 'italic bold 60px sans-serif';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(message, 380, 200);
    this.ctx.fillText("Click to Select New Fighter", 300, 400);
    //this.inMenu = true;
    //this.start();
}

GameEngine.prototype.clearEntities = function () {
    var clear_ind = 0;
    while (clear_ind < this.entities.length) {
        this.entities[clear_ind].removeFromWorld = true;
        clear_ind++;
    }
};

GameEngine.prototype.updateFight = function () {
    this.inFight = false;

    this.clearEntities();
};
//-------------------------------
GameEngine.prototype.setFighters = function (selection) {
    this.Fighter = this.Fighters[selection];
    this.Fighter.isPlayer = true;
    this.Fighter.updateOrientation();
    this.Fighter.loadEnergyBar(new Bar(this, this.Fighter));
    var opponentIndex = selection;

    while (selection === opponentIndex) {
        opponentIndex = Math.floor(Math.random() * this.Fighters.length);
    }

    this.Opponent = this.Fighters[opponentIndex];
    this.Opponent.isPlayer = false;
    this.Opponent.updateOrientation();
    this.Opponent.loadEnergyBar(new Bar(this, this.Opponent));
    this.entities[0].removeFromWorld = true;
    
    this.addEntity(new Background(this, ASSET_MANAGER.getAsset("./img/staircase.png")));
    this.addEntity(this.Fighter);
    this.addEntity(this.Opponent);
    this.addEntity(this.Fighter.bar);
    this.addEntity(this.Opponent.bar);

    console.log('Finished Selecting');

    this.inMenu = false;
    this.inFight = true;
    console.log('State changed.');

    this.start();
};

GameEngine.prototype.getSelections = function () {
    console.log('In menu');

    var that = this;

    this.ctx.canvas.addEventListener("click", function (e) {
        if (that.inMenu) {
            console.log(Math.floor(e.clientX / 250));
            that.setFighters(Math.floor(e.clientX / 250));
        } else if (that.inMessage){//-----
            that.inMessage = false;
            that.inMenu = true;
            that.start();
        }//-------------------------------
    })

    this.addEntity(new Background(this, ASSET_MANAGER.getAsset("./img/char_select.png")));

    (function listenForSelection() {
        console.log("listening for selection");
        if (that.inMenu) {
            that.loop();
            console.log("in listening, called loop");
            requestAnimFrame(listenForSelection, that.ctx.canvas);
        } else {
            return;
        }

    })();
};

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.which === 32) {
            that.space = true;
        } else if (e.which === 39) {
            that.rightArrow = true;
        } else if (e.which === 37) {
            that.leftArrow = true;
        } else if (e.which === 65) {//A KEY
            that.theAPressed = true;
        } else if (e.which === 83) {//S key
            that.theSPressed = true;
        } else if (e.which === 84) {//T key
            that.theTPressed = true;
        } else if (e.which === 68) {// D key
            that.theDPressed = true;
        } else if (e.which === 70) {// F key
            that.theFPressed = true;
        } else if (e.which === 80) { // P key
            that.thePPressed = true;
        } else if (e.which === 38) {
            that.upArrowPressed = true;
        } else if (e.which === 40) {
            that.downArrow = true;
        }
            e.preventDefault();

        }, false);
    this.ctx.canvas.addEventListener("keypress", function (e) {
        if (e.which === 39) {
            that.rightPressed = true;
        } else if (e.which === 37) {
            that.leftPressed = true;
        } else if (e.which === 65) {//A KEY
            that.theAPressed = true;
        } else if (e.which === 83) {//S key
            that.theSPressed = true;
        } else if (e.which === 84) {//T key
            that.theTPressed = true;
        } else if (e.which === 68) {// D key
            that.theDPressed = true;
        } else if (e.which === 70) {//F key
            that.theFPressed = true;
        } else if (e.which === 80) { // P key
            //that.thePPressed = true;
        } else if (e.which === 38) {
            that.upArrowPressed = true;
        } else if (e.which === 40) {
            that.downArrow = true;
        }
        e.preventDefault();
    }, false);
    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.which === 39) {
            that.rightArrow = false;
        } else if (e.which === 37) {
            that.leftArrow = false;
        } else if (e.which === 32) {
            that.space = false;
        } else if (e.which === 65) {//A KEY
            that.theAPressed = false;
        } else if (e.which === 83) {//S key
            that.theSPressed = false;
        } else if (e.which === 84) {//T key
            that.theTPressed = false;
        } else if (e.which === 68) {// D key
            that.theDPressed = false;
        } else if (e.which === 70) {//F KEY
            that.theFPressed = false;
        } else if (e.which === 80) { // P key
            that.thePPressed = false;
        } else if (e.which === 38) {
            that.upArrowPressed = false;
        } else if (e.which === 40) {
            that.downArrow = false;
        }

    }, false);
    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
  /*  if (this.inFight) {
        this.Bar.draw(this.ctx);
    }*/
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
