function John(game, isPlayer) {
    //John Sprite
    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, -20, 100, 270, .3, 5, true, false, 0);
    this.walkRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 260, 140, 280, 0.1, 12, true, false, 0);
    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 870, 140, 280, 0.15, 5, false, false, 0);

    this.idleLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 2020, -20, 100, 270, .3, 5, true, false, 0);
    this.walkLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 840, 260, 140, 280, 0.1, 12, true, false, 0);
    this.jumpLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 1820, 870, 140, 280, 0.15, 5, false, true, 0);

    this.blockRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 1610, 100, 280, 1, 1, true, false, 0);
    this.blockLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 2420, 1610, 100, 280, 1, 1, true, false, 0);

    //this.tauntRight = new Animation(ASSET_MANAGER.getAsset())
    //this.tauntLeft = new Animation

    /////new controls animation 
    //weak punch
    this.wkPunchRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 1890, 180, 280, .1, 11, false, false, 0);
    this.wkPunchLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 540, 1890, 180, 280, .1, 11, false, true, 0);

    ////// weak kick
    this.wkKickRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 2450, 200, 280, .07, 12, false, false, 0);
    this.wkKickLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 120, 2450, 200, 280, .07, 12, false, true, 0);

    //strong punch
    this.strPunchRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 2170, 200, 280, .1, 6, false, false, 0);
    this.strPunchLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 1320, 2170, 200, 280, .1, 6, false, true, 0);

    //strong kick
    this.strKickRight = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Right.png"), 0, 2730, 274, 280, .1, 9, false, false, 0);
    this.strKickLeft = new Animation(ASSET_MANAGER.getAsset("./img/John_Sprites_Left.png"), 54, 2730, 274, 280, .1, 9, false, true, 0);

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
    this.myboxes = new Hitbox(game, 3);//new hitbox
    this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
    
}

John.prototype = new Entity();
John.prototype.constructor = John;

John.prototype.updateOrientation = function () {
    this.standing = this.isPlayer;
    this.standingLeft = !this.isPlayer;
    this.isRight = this.isPlayer;

    this.start = this.isPlayer ? 100 : 1000;
    this.ground = 440;
    this.controlled = this.isPlayer;
    Entity.call(this, this.game, this.start, this.ground);
}

John.prototype.update = function () {
    if (this.isRight) {
        this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
    } if (!this.isRight) {
        this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
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
                if (this.jumpRight.isDone()) {
                    this.jumpRight.elapsedTime = 0;
                    this.jumping = false;
                    this.standing = true;
                    this.current_action = false;
                }
                jumpDistance = this.jumpRight.elapsedTime / this.jumpRight.totalTime;
            } else {
                if (this.jumpLeft.isDone()) {
                    this.jumpLeft.elapsedTime = 0;
                    this.jumping = false;
                }
                jumpDistance = this.jumpLeft.elapsedTime / this.jumpRight.totalTime;
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
                
            } else if (this.game.leftArrow) {
                this.x -= 10;
                
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
                if (this.wkPunchRight.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.wkPunchRight.isDone()) {
                    this.wkPunchRight.elapsedTime = 0;
                    this.weak_punch = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.wkPunchLeft.currentFrame() === 3) {//new code from here 3 is the frame it checks for
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// Left weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }//to here
                if (this.wkPunchLeft.isDone()) {
                    this.wkPunchLeft.elapsedTime = 0;
                    this.weak_punch = false;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }
        if (this.strong_punch) {
            if (this.isRight) {
                if (this.strPunchRight.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.strPunchRight.isDone()) {
                    this.strPunchRight.elapsedTime = 0;
                    this.strong_punch = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.strPunchLeft.currentFrame() === 3) {//hitbox here check frame and change to what you want
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.strPunchLeft.isDone()) {
                    this.strPunchLeft.elapsedTime = 0;
                    this.strong_punch = false;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }
        if (this.weak_kick) {
            if (this.isRight) {
                if (this.wkKickRight.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.wkKickRight.isDone()) {
                    this.wkKickRight.elapsedTime = 0;
                    this.weak_kick = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.wkKickLeft.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.wkKickLeft.isDone()) {
                    this.wkKickLeft.elapsedTime = 0;
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
                if (this.strKickRight.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.strKickRight.isDone()) {
                    this.strKickRight.elapsedTime = 0;
                    this.strong_kick = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.strKickLeft.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.strKickLeft.isDone()) {
                    this.strKickLeft.elapsedTime = 0;
                    this.strong_kick = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }

        if (this.rightwalk) {
            this.x += 3;
            
        } else if (this.leftwalk) {
            this.x -= 3;
            
        }
        
    }//
    //Entity.prototype.update.call(this);
}

John.prototype.draw = function (ctx) {
    ctx.fillStyle = "DarkGreen";
    ctx.fillRect(this.myboxes.hitbox.x, this.myboxes.hitbox.y, this.myboxes.hitbox.width, this.myboxes.hitbox.height);
    Entity.prototype.draw.call(this);
    if (this.current_action) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.myboxes.attackbox.x, this.myboxes.attackbox.y, this.myboxes.attackbox.width, this.myboxes.attackbox.height);
        Entity.prototype.draw.call(this);
    }
    if (this.jumping) {
        if (this.isRight) {
            this.jumpRight.drawFrame(this.game, ctx, this.x, this.y - 190);
        } else {
            this.jumpLeft.drawFrame(this.game, ctx, this.x, this.y - 190);
        }
    } else if (this.rightwalk) {
        this.walkRight.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.leftwalk) {
        this.walkLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.sittingLeft) {
        this.blockLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.sittingRight) {
        this.blockRight.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.weak_punch) {
        if (this.isRight) {
            this.wkPunchRight.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.wkPunchLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
            //console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
        ////////////////////////////////////////////Added if statement^^
    } else if (this.weak_kick) {
        if (this.isRight) {
            this.wkKickRight.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.wkKickLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
        ////////////////////////////////////////////Added if statement^^
    } else if (this.strong_punch) {
        if (this.isRight) {
            this.strPunchRight.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.strPunchLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
            //console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    } else if (this.strong_kick) {
        if (this.isRight) {
            this.strKickRight.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.strKickLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    } else if (this.standing) {//////////////////////////////////////
        this.idleRight.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.standingLeft) {
        this.idleLeft.drawFrame(this.game, ctx, this.x, this.y - 150);
    }


    Entity.prototype.draw.call(this);
}
