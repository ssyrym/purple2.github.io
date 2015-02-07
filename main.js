
//Still working on much of the game logic, the details for the kicks and punches need to be entered and likely tweaked
//need to figure out how to do the logic between switching characters
//Pess the P key to switch between characters
//Do not know why my Left animations are bugging out it must be because of the offsets
//so far I have only implimented strong punch, strong kick, walking, idle, and jumping since its all we need for this part of the project
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse, animation) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.animation = animation;
}

Animation.prototype.drawFrame = function (game, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += game.clockTick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }

    var xindex = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var yindex = 0;
    if (this.reverse) {
        if (xindex < 0) {
            xindex = this.frames - 1;
        }
    } else {
        if ((xindex + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            xindex -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            yindex++;
        }
        while ((xindex + 1) * this.frameWidth > this.spriteSheet.width) {
            xindex -= Math.floor(this.spriteSheet.width / this.frameWidth);
            yindex++;
        }
    }
   

    var locX = x;
    var locY = y;

    if (game.theFPressed && (this.animation === 2 || this.animation === 5)) {
        yindex = 1;
    } else {
        yindex = 0;
    }

    var offset = yindex === 0 ? this.startX : 0;
    if (this.reverse) {
        if (this.animation === 4) {// standing to left
            offset = 1002;
        } else if (this.animation === 5) { // walking left
            offset = 0;
        } else if (this.animation === 6) { // jumping left
            offset = 770;
        } else if (this.animation === 10) { // weak punch
            offset = 1002;
        } else if (this.animation === 12) { // weak kick
            offset = 1002;
        } else if (this.animation === 14) { // strong punch
            offset = 1002;
        } else if (this.animation === 16) { // strong kick
            offset = 1002;
        } else if (this.animation === 20) { // standing left
            offset = 0;
        } else if (this.animation === 21) { // walking left
            offset = 0;
        } else if (this.animation === 22) { // jumping left
            offset = 0;
        } else if (this.animation === 24) { // weak punch
            offset = 0;
        } else if (this.animation === 25) { // 
            offset = 0;
        } else if (this.animation === 28) { //
            offset = 0;
        } else if (this.animation === 30) { // 
            offset = 0;
        } else if (this.animation === 32) { // 
            offset = 0;
        }

    }
   
    ctx.drawImage(this.spriteSheet,
                  xindex * this.frameWidth + offset, yindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}



function Sonic(game) {
    //Alex Sprite
    this.alex_standingAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 2250, 251.5, 325, .15, 4, true, false, 1);
    this.alex_rightwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 1280, 251.5, 325, 0.1, 8, true, false, 2);
    this.alex_jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 1615, 251.5, 325, 0.09, 5, false, false, 3);

    this.alex_standingLeftAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 2250, 251.5, 325, .15, 4, true, true, 4);
    this.alex_leftwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 1280, 251.5, 325, 0.1, 8, true, true, 5);
    this.alex_leftjumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 1615, 251.5, 325, 0.09, 5, false, true, 6);

    this.alex_blockRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 4200, 251.5, 325, 1, 1, true, false, 7);
    this.alex_blockLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 1756.5, 4200, 251.5, 325, 1, 1, true, false, 8);


    /////new controls animation 
    //weak punch
    this.alex_weak_puch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 650, 251.5, 325, .1, 4, false, false, 9);
    this.alex_weak_puch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 650, 251.5, 325, .1, 4, false, false, 10);

    ////// weak kick
    this.alex_weak_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 325, 251.5, 325, .1, 4, false, false, 11);
    this.alex_weak_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 325, 251.5, 325, .1, 4, false, false, 12);

    //strong punch
    this.alex_strong_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 975, 251.5, 325, .1, 4, false, false, 13);
    this.alex_strong_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 975, 251.5, 325, .1, 4, false, true, 14);

    //strong kick
    this.alex_strong_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 0, 251.5, 325, .1, 4, false, false, 15);
    this.alex_strong_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008, 0, 251.5, 325, .1, 4, false, true, 16);





    //Vlad Sprite
    this.vlad_standingAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304/5), 1536/5, 2304/5, .35, 7, true, false, 17);
    this.vlad_rightwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, 0, 1536 / 5, 2304 / 5, 0.1, 7, true, false, 18);
    this.vlad_jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304/5) * 7, 1536 / 5, 2304 / 5, 0.05, 7, false, false, 19);

    this.vlad_standingLeftAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5), 1536 / 5, 2304 / 5, .15, 7, true, true, 20);
    this.vlad_leftwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), (1536 / 5) * 6, 0, 1536 / 5, 2304 / 5, 0.1, 8, true, true, 21);
    this.vlad_leftjumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304/5) * 7, 1536 / 5, 2304 / 5, 0.05, 7, false, true, 22);

    this.vlad_blockRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), (1536/5) * 3, (2304 / 5) * 6, 1536 / 5, 2304 / 5, 1, 1, true, true, 23);
    this.vlad_blockLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), (1536 / 5) * 3, (2304 / 5) * 6, 1536 / 5, 2304 / 5, 1, 1, true, true, 24);


    /////new controls animation weak punch
    this.vlad_weak_puch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 1756.5, 4200, 1536 / 5, 2304 / 5, 1, 1, true, false, 25);

    this.vlad_weak_puch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 1756.5, 4200, 1536 / 5, 2304 / 5, 1, 1, true, false, 26);
    ////// weak kick
    this.vlad_weak_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 1756.5, 4200, 1536 / 5, 2304 / 5, 1, 1, true, false, 27);

    this.vlad_weak_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 1756.5, 4200, 1536 / 5, 2304 / 5, 1, 1, true, false, 28);

    //strong punch
    this.vlad_strong_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304 / 5) * 4, 307.2, (2304 / 5), .1, 7, false, false, 29);

    this.vlad_strong_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5) * 4, (1536 / 5), (2304 / 5), .1, 7, false, true, 30);
    //strong kick
    this.vlad_strong_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304 / 5) * 5, 307.2, 2304 / 5, .1, 7, false, false, 31);

    this.vlad_strong_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5) *5, 1536 / 5, 2304 / 5, .1, 7, false, true, 32);

    //new boolean values added here
    this.weak_punch = false;
    this.weak_kick = false;
    this.strong_punch = false;
    this.strong_kick = false;
    this.current_action = false;
    this.alex = false;
    this.vlad = true;
    this.john = false;
    this.syrim = false;
    ////////////////////////////////

    this.jumping = false;
    this.sittingLeft = false;
    this.sittingRight = false;

    this.standing = true;
    this.rightwalk = false;

    this.standingLeft = false;
    this.leftwalk = false;


    this.isRight = true;

    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, 400);
}

Sonic.prototype = new Entity();
Sonic.prototype.constructor = Sonic;

Sonic.prototype.update = function () {
    if (this.game.thePPressed) {
        if(this.alex) {
            this.alex = false;
            this.vlad = true;
        } else if (this.vlad) {
            this.vlad = false;
            this.alex = true;
        }
    }
    if (this.game.space) this.jumping = true;

    if (this.game.rightArrow) {
        this.rightwalk = true;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.isRight = true;
    } else if (this.game.leftArrow) {
        this.leftwalk = true;
        this.rightwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.isRight = false;
    } else if (this.game.downArrow && this.isRight) {
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = true;
        this.sittingLeft = false;
        this.strong_kick = false;
    } else if (this.game.downArrow && !this.isRight) {
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = true;
        this.strong_kick = false;

    } else if (this.game.theAPressed ) {//A weak punch

    } else if (this.game.theSPressed ) {//S weak kick

    } else if (this.game.theDPressed && !this.strong_kick ) {//D Strong punch
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
        this.strong_kick = false;
        this.strong_punch = true;
    } else if (this.game.theFPressed && !this.strong_punch ) {//F Strong kick
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
        this.strong_kick = true;
    
    } else if (this.isRight) {//if not any previous actions then just idle to right
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = true;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
    } else if (!this.isRight) {// idle to left
        this.rightwalk = false;
        this.leftwalk = false;
        this.standingLeft = true;
        this.standing = false;
        this.sittingRight = false;
        this.sittingLeft = false;
    }


    if (this.jumping) {
        var jumpDistance;
        if (this.alex) {
            if (this.isRight) {
                if (this.alex_jumpAnimation.isDone()) {
                    this.alex_jumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                }
                jumpDistance = this.alex_jumpAnimation.elapsedTime / this.alex_jumpAnimation.totalTime;
            } else {
                if (this.alex_leftjumpAnimation.isDone()) {
                    this.alex_leftjumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                }
                jumpDistance = this.alex_leftjumpAnimation.elapsedTime / this.alex_jumpAnimation.totalTime;
            }
        } else if (this.vlad) {
            if (this.isRight) {
                if (this.vlad_jumpAnimation.isDone()) {
                    this.vlad_jumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                }
                jumpDistance = this.vlad_jumpAnimation.elapsedTime / this.vlad_jumpAnimation.totalTime;
            } else {
                if (this.vlad_leftjumpAnimation.isDone()) {
                    this.vlad_leftjumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                }
                jumpDistance = this.vlad_leftjumpAnimation.elapsedTime / this.vlad_jumpAnimation.totalTime;
            }
        }
        

        var totalHeight = 200;
        var howHigh = -4;
        if (this.game.upArrowPressed) {
            howHigh = -6;
        }
        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        var height = totalHeight * (howHigh * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        if (this.game.rightArrow) {
            this.x += 10;
            //if(this.game.theFPressed){
            //    this.x += 15;
            //} else {
            //    this.x += 10;
            //}
        } else if (this.game.leftArrow) {
            this.x -= 10;
        //    if(this.game.theFPressed){
        //        this.x -= 15;
        //    } else {
        //        this.x -= 10;
        //    }
        }
        this.leftwalk = false;
        this.rightwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
        this.weak_punch = false;
        this.weak_kick = false;
        this.strong_punch = false;
        this.strong_kick = false;

    }

    if (this.weak_punch) {

    }

    if (this.strong_punch) {
        if (this.alex) {
            if (this.isRight) {
                if (this.alex_strong_punch_rightAnimation.isDone()) {
                    this.alex_strong_punch_rightAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    this.standingLeft = false;
                    this.standing = true;
                }
            } else {
                if (this.alex_strong_punch_leftAnimation.isDone()) {
                    this.alex_strong_punch_leftAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    this.standingLeft = true;
                    this.standing = false;
                }
            }

        }else if (this.vlad) {
            if(this.isRight) {
                if (this.vlad_strong_punch_rightAnimation.isDone()) {
                    this.vlad_strong_punch_rightAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    this.standingLeft = false;
                    this.standing = true;
                }
            } else {
                if (this.vlad_strong_punch_leftAnimation.isDone()) {
                    this.vlad_strong_punch_leftAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    this.standingLeft = true;
                    this.standing = false;
                }
            }
        }
    }
    if (this.weak_kick) {

    }
    if (this.strong_kick) {
        if (this.alex) {
            if (this.isRight) {
                if (this.alex_strong_kick_rightAnimation.isDone()) {
                    this.alex_strong_kick_rightAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    this.standingLeft = false;
                    this.standing = true;
              }
            } else {
                if (this.alex_strong_kick_leftAnimation.isDone()) {
                    this.alex_strong_kick_leftAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    this.standingLeft = true;
                    this.standing = false;
                }
            }
            
        } else if (this.vlad) {
            if (this.isRight) {
                if (this.vlad_strong_kick_rightAnimation.isDone()) {
                    this.vlad_strong_kick_rightAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    this.standingLeft = false;
                    this.standing = true;
                }
            } else {
                if (this.vlad_strong_kick_leftAnimation.isDone()) {
                    this.vlad_strong_kick_leftAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    this.standingLeft = true;
                    this.standing = false;
                }
            }
        }

    }

    if (this.rightwalk) {
        this.x += 3;
        //if(this.game.theFPressed){
        //    this.x += 6;
        //} else {
        //    this.x += 3;
        //}
    } else if (this.leftwalk) {
        this.x -= 3;
        //if(this.game.theFPressed){
        //    this.x -= 6;
        //} else {
        //    this.x -= 3;
        //}
    }
    Entity.prototype.update.call(this);
}

Sonic.prototype.draw = function (ctx) {
    if (this.jumping) {
        if (this.isRight) {
            if (this.alex) {
                this.alex_jumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 190);
            } else if (this.vlad) {
                this.vlad_jumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 290);
            }
            
        } else {
            if (this.alex) {
                this.alex_leftjumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 190);
            } else if (this.vlad) {
                this.vlad_leftjumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 290);
            }
            
        }
    } else if (this.rightwalk) {
        if (this.alex) {
            this.alex_rightwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (this.vlad) {
            this.vlad_rightwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 250);
        }
        
    } else if (this.leftwalk) {
        if (this.alex) {
            this.alex_leftwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (this.vlad) {
            this.vlad_leftwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 250);
        }
    } else if (this.sittingLeft) {
        if (this.alex) {
            this.alex_blockLeftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (this.vlad) {
            this.vlad_blockLeftAnimation.drawFrame(this.game, ctx, this.x, this.y - 250);
        }
        
    } else if (this.sittingRight) {
        if (this.alex) {
            this.alex_blockRightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (this.vlad) {
            this.vlad_blockRightAnimation.drawFrame(this.game, ctx, this.x, this.y - 250);
        }
        

    } else if (this.weak_punch) {
        if (this.alex) {

        }

    }  else if (this.weak_kick) {
        if (this.alex) {

        }
    }  else if (this.strong_punch) {
        if (this.alex) {
            if (this.isRight) {
                this.alex_strong_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            } else if (!this.isRight)  {
                this.alex_strong_punch_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
                //console.log("this.x " + this.x + " this.y " + this.y, +" ");
            }
        } else if (this.vlad) {
            if (this.isRight) {
                this.vlad_strong_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 250);
            } else if (!this.isRight) {
                this.vlad_strong_punch_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 250);
                //console.log("this.x " + this.x + " this.y " + this.y, +" ");
            }
        }
    } else if (this.strong_kick) {
        if (this.alex) {
            if(this.isRight) {
                this.alex_strong_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            } else if (!this.isRight) {
                this.alex_strong_kick_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
                console.log("this.x "+ this.x + " this.y "+ this.y, +" ");
            }
        } else if (this.vlad) {
            if (this.isRight) {
                this.vlad_strong_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 250);
            } else if (!this.isRight) {
                this.vlad_strong_kick_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 250);
                console.log("this.x " + this.x + " this.y " + this.y, +" ");
            }
        }
    } else if (this.standing) {//////////////////////////////////////
        if (this.alex) {
            this.alex_standingAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (this.vlad) {
            this.vlad_standingAnim.drawFrame(this.game, ctx, this.x, this.y - 250);
        }
        
    } else if (this.standingLeft) {
        if (this.alex) {
            this.alex_standingLeftAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (this.vlad) {
            this.vlad_standingLeftAnim.drawFrame(this.game, ctx, this.x, this.y - 250);
        }
       
    }

    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/alex_sprite_new.png");
ASSET_MANAGER.queueDownload("./img/alex_sprite_new2.png");

ASSET_MANAGER.queueDownload("./img/Vlad_Sprite.png");
//ASSET_MANAGER.queueDownload("./img/Vlad_Sprite2.png");
ASSET_MANAGER.queueDownload("./img/Vlad_Sprite_reverse.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var gameEngine = new GameEngine();
    var sonic = new Sonic(gameEngine);

    gameEngine.addEntity(sonic);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
