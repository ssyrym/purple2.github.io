function Alex(game, isPlayer) {
    //Alex Sprite
    this.alex_standingAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 2250+10, 251.5, 325, .2, 4, true, false, 0);
    this.alex_rightwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 1280 + 10, 251.5, 325, 0.2, 7, true, false, 0);
    this.alex_jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 1615, 251.5, 325, 0.15, 5, false, false, 0);

    this.alex_standingLeftAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008-1002, 2250+10, 251.5, 325, .2, 4, true, true, 0);
    this.alex_leftwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 0, 1280 + 10, 251.5, 325, 0.2, 7, true, true, 0);
    this.alex_leftjumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 750.5, 1615, 251.5, 325, 0.15, 5, false, true, 0);

    this.alex_blockRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 4200+10, 251.5, 325, 1, 1, true, false, 0);
    this.alex_blockLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 1756.5, 4200+10, 251.5, 325, 1, 1, true, false, 0);


    /////new controls animation 
    //weak punch
    this.alex_weak_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 650, 251.5, 325, .1, 4, false, false, 0);
    this.alex_weak_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008 - 1002, 650, 251.5, 325, .1, 4, false, true, 0);

    //weak kick
    this.alex_weak_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 325, 251.5, 325, .1, 4, false, false, 0);
    this.alex_weak_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008 - 1002, 325, 251.5, 325, .1, 4, false, true, 0);

    //strong punch
    this.alex_strong_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 975, 251.5, 325, .1, 4, false, false, 0);
    this.alex_strong_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008 - 1002, 975, 251.5, 325, .1, 4, false, true, 0);

    //strong kick
    this.alex_strong_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 0, 251.5, 325, .1, 4, false, false, 0);
    //this.alex_strong_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new2.png"), 2008 - 1002, 0, 251.5, 325, .1, 4, false, true, 0);

    //victory
    this.alex_victory_Animation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 3875, 251.5, 325, .2, 4, false, false, 0);
   
    //loss
    this.alex_loss_Animation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 3875-325, 251.5, 325, .2, 4, false, false, 0);
    
    //hit right
    this.alex_high_hit__rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 2585, 251.5, 325, .1, 4, false, false, 0);
    
     //hit left
    this.alex_strong_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/alex_sprite_new.png"), 0, 2585, 251.5, 325, .1, 4, false, true, 0);
    
    //new boolean values added here
    this.weak_punch = false;
    this.weak_kick = false;
    this.strong_punch = false;
    this.strong_kick = false;
    this.jumping = false;
    this.sittingLeft = false;
    this.sittingRight = false;
    this.rightwalk = false;
    this.leftwalk = false;
    this.current_action = false;
    this.gotHit = false;
    this.isPlayer = isPlayer;
    this.game = game;
    this.myboxes = new Hitbox(game, 2);
    this.myboxes.setHitbox(this.x + 85, this.y - 140, 110, 300);
    this.bar;
}

Alex.prototype = new Entity();
Alex.prototype.constructor = Alex;


Alex.prototype.loadEnergyBar = function (energy_bar) { this.bar = energy_bar }

Alex.prototype.updateOrientation = function () {
    this.standing = this.isPlayer;
    this.standingLeft = !this.isPlayer;
    this.isRight = this.isPlayer;

    this.start = this.isPlayer ? 100 : 1000;
    this.ground = 410;
    this.controlled = this.isPlayer;
    Entity.call(this, this.game, this.start, this.ground);
}

Alex.prototype.update = function () {
    if (this.isRight) {
        this.myboxes.setHitbox(this.x + 70, this.y - 140, 70, 300);
    } if (!this.isRight) {
        this.myboxes.setHitbox(this.x + 110, this.y - 140, 70, 300);
    }
    if (this.game.thePPressed) {
        this.controlled = !this.controlled;
    }

    if (this.controlled) {//
        if (this.game.space) {
            this.jumping = true;
            this.strong_kick = false;
            this.strong_punch = false;
            this.weak_kick = false;
            this.weak_punch = false;
        }
        if (this.game.rightArrow && this.current_action === false) {
            this.rightwalk = true;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.isRight = true;
        } else if (this.game.leftArrow && this.current_action === false) {
            this.leftwalk = true;
            this.rightwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.isRight = false;
        } else if (this.game.downArrow && this.isRight && this.current_action === false) {
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.sittingRight = true;
            this.sittingLeft = false;
            this.strong_kick = false;
        } else if (this.game.downArrow && !this.isRight && this.current_action === false) {
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.sittingRight = false;
            this.sittingLeft = true;
            this.strong_kick = false;

        } else if (this.game.theAPressed && this.current_action === false) {//A weak punch
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.sittingRight = false;
            this.sittingLeft = false;
            this.strong_kick = false;
            this.strong_punch = false;
            this.weak_kick = false;
            this.weak_punch = true;
            this.current_action = true;
            ////////////////////////////////////////////Added if statement^^
        } else if (this.game.theSPressed && this.current_action === false) {//S weak kick
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.sittingRight = false;
            this.sittingLeft = false;
            this.strong_kick = false;
            this.strong_punch = false;
            this.weak_punch = false;
            this.weak_kick = true;
            this.current_action = true;
            ////////////////////////////////////////////Added if statement and weak action booleans^^^^
        } else if (this.game.theDPressed && this.current_action === false) {//D Strong punch
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.sittingRight = false;
            this.sittingLeft = false;
            this.strong_kick = false;
            this.weak_punch = false;
            this.weak_kick = false;
            this.current_action = true;
            ////////////////////////////////////////////Added weak action booleans^^
            this.strong_punch = true;
        } else if (this.game.theFPressed && this.current_action === false) {//F Strong kick
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = false;
            this.standingLeft = false;
            this.sittingRight = false;
            this.sittingLeft = false;
            this.weak_punch = false;
            this.weak_kick = false;
            this.strong_kick = true;
            this.current_action = true;
            ////////////////////////////////////////////Added weak action booleans^^

        } else if (this.isRight && this.current_action === false) {//if not any previous actions then just idle to right
            this.rightwalk = false;
            this.leftwalk = false;
            this.standing = true;
            this.standingLeft = false;
            this.sittingRight = false;
            this.sittingLeft = false;
            this.weak_punch = false;
            this.weak_kick = false;
            ////////////////////////////////////////////Added weak action booleans^^
        } else if (!this.isRight && this.current_action === false) {// idle to left
            this.rightwalk = false;
            this.leftwalk = false;
            this.standingLeft = true;
            this.standing = false;
            this.sittingRight = false;
            this.sittingLeft = false;
            this.weak_punch = false;
            this.weak_kick = false;
            ////////////////////////////////////////////Added weak action booleans^^
        }


        if (this.jumping) {
            var jumpDistance;

            if (this.isRight) {
                if (this.alex_jumpAnimation.isDone()) {
                    this.alex_jumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                    this.standing = true;
                    this.current_action = false;
                }
                jumpDistance = this.alex_jumpAnimation.elapsedTime / this.alex_jumpAnimation.totalTime;
            } else {
                if (this.alex_leftjumpAnimation.isDone()) {
                    this.alex_leftjumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                    this.standing = true;
                }
                jumpDistance = this.alex_leftjumpAnimation.elapsedTime / this.alex_jumpAnimation.totalTime;
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
            ////////////////////////////////////////////Added weak action booleans^^
            this.strong_punch = false;
            this.strong_kick = false;

        }

        if (this.weak_punch) {
            if (this.isRight) {
                if (this.alex_weak_punch_rightAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 80, this.y - 100, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_weak_punch_rightAnimation.isDone()) {
                    this.alex_weak_punch_rightAnimation.elapsedTime = 0;
                    this.weak_punch = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.alex_weak_punch_leftAnimation.currentFrame() === 3) {//new code from here 3 is the frame it checks for
                    this.myboxes.setAttackBox(this.x + 40, this.y - 100, 125, 45);// Left weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }//to here
                if (this.alex_weak_punch_leftAnimation.isDone()) {
                    this.alex_weak_punch_leftAnimation.elapsedTime = 0;
                    this.weak_punch = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }
        ////////////////////////////////////////////Added if statement^^

        if (this.strong_punch) {
            if (this.isRight) {
                if (this.alex_strong_punch_rightAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 100, this.y - 85, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_strong_punch_rightAnimation.isDone()) {
                    this.alex_strong_punch_rightAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.alex_strong_punch_leftAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 25, this.y - 85, 125, 60);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_strong_punch_leftAnimation.isDone()) {
                    this.alex_strong_punch_leftAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }
        if (this.weak_kick) {
            if (this.isRight) {
                if (this.alex_weak_kick_rightAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 85, this.y+70, 125, 25);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_weak_kick_rightAnimation.isDone()) {
                    this.alex_weak_kick_rightAnimation.elapsedTime = 0;
                    this.weak_kick = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.alex_weak_kick_leftAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x +40, this.y+70, 125, 25);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_weak_kick_leftAnimation.isDone()) {
                    this.alex_weak_kick_leftAnimation.elapsedTime = 0;
                    this.weak_kick = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }
        ////////////////////////////////////////////Added if statement^^
        if (this.strong_kick) {
            if (this.isRight) {
                if (this.alex_strong_kick_rightAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 125, this.y -30, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_strong_kick_rightAnimation.isDone()) {
                    this.alex_strong_kick_rightAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.alex_strong_kick_leftAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.alex_strong_kick_leftAnimation.isDone()) {
                    this.alex_strong_kick_leftAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }

        if (this.rightwalk && this.x <= 1150) {
            this.x += 3;
            
        } else if (this.leftwalk && this.x>=-50) {
            this.x -= 3;
            
        }
        
    }//
    //Entity.prototype.update.call(this);
}

Alex.prototype.draw = function (ctx) {
    //ctx.fillStyle = "DarkGreen";
    //ctx.fillRect(this.myboxes.hitbox.x, this.myboxes.hitbox.y, this.myboxes.hitbox.width, this.myboxes.hitbox.height);
    //Entity.prototype.draw.call(this);
    //if (this.current_action) {
    //    ctx.fillStyle = "Red";
    //    ctx.fillRect(this.myboxes.attackbox.x, this.myboxes.attackbox.y, this.myboxes.attackbox.width, this.myboxes.attackbox.height);
    //    Entity.prototype.draw.call(this);
    //}
    if (this.jumping) {
        if (this.isRight) {
            this.alex_jumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 190);
        } else {
            this.alex_leftjumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 190);
        }
    } else if (this.rightwalk) {
        this.alex_rightwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.leftwalk) {
        this.alex_leftwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.sittingLeft) {
        this.alex_blockLeftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.sittingRight) {
        this.alex_blockRightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.weak_punch) {
        if (this.isRight) {
            this.alex_weak_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.alex_weak_punch_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            //console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
        ////////////////////////////////////////////Added if statement^^
    } else if (this.weak_kick) {
        if (this.isRight) {
            this.alex_weak_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.alex_weak_kick_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
        ////////////////////////////////////////////Added if statement^^
    } else if (this.strong_punch) {
        if (this.isRight) {
            this.alex_strong_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.alex_strong_punch_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            //console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    } else if (this.strong_kick) {
        if (this.isRight) {
            this.alex_strong_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.alex_strong_kick_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    } else if (this.standing) {//////////////////////////////////////
        this.alex_standingAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.standingLeft) {
        this.alex_standingLeftAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    }


    Entity.prototype.draw.call(this);
}
