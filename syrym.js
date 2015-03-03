function Syrym(game, isPlayer) {
    //Syrym Sprite
    this.syrym_standingAnim = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"),  0, 400, 410, 400, 0.15, 10, true, false, 1);
    this.syrym_rightwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 2870, 800, 410, 400, 0.15, 6, true, false, 2);
    this.syrym_rightjumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 0, 2000, 410, 400, 0.2, 4, false, false, 3);

    this.syrym_standingLeftAnim = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 1640, 400, 410, 400, 0.15, 10, true, true, 0);
    this.syrym_leftwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 410, 800, 410, 400, 0.15, 6, true, true, 0);
    this.syrym_leftjumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 4100, 2000, 410, 400, 0.2, 4, false, true, 0);

    this.syrym_blockRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 2460, 1600, 410, 400, 0.07, 1, true, false, 7);
    this.syrym_blockLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 2870, 1600, 410, 400, 0.07, 1, true, true, 0);


    /////new controls animation
    //weak punch
    this.syrym_weak_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 3690, 1200, 410, 400, 0.16, 5, false, false, 9);
    this.syrym_weak_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 0, 1200, 410, 400, 0.16, 5, false, true, 0);

    //weak kick
    this.syrym_weak_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 2870, 1600, 410, 400, 0.1, 6, false, false, 11);
    this.syrym_weak_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 410, 1600, 410, 400, 0.1, 6, false, true, 0);

    //strong punch
    this.syrym_strong_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 3690, 2000, 410, 400, 0.1, 5, false, false, 13);
    this.syrym_strong_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 0, 2000, 410, 400, 0.1, 5, false, true, 0);

    //strong kick
    this.syrym_strong_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 0, 1600, 410, 400, 0.1, 6, false, false, 15);
    this.syrym_strong_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 5740 - 2460, 1600, 410, 400, 0.1, 6, false, true, 0);

    //dead
    this.syrym_dead_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 0, 0, 410, 400, 0.1, 14, false, false, 0);
    this.syrym_dead_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 0, 0, 410, 400, 0.1, 14, false, true, 0);

	   //head punched
    this.syrym_head_punched_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 4100, 800, 410, 400, 0.1, 4, false, false, 0);
    this.syrym_head_punched_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 5740, 800, 410, 400, 0.1, 4, false, true, 0);
	
	   //low punched
    this.syrym_low_punched_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 2460, 2000, 410, 400, 0.1, 3, false, false, 0);
    this.syrym_low_punched_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 2050, 2000, 410, 400, 0.1, 3, false, true, 0);
	
	    //taunt
    this.syrym_taunt_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 0, 810, 410, 400, 0.1, 7, false, false, 0);
    this.syrym_taunt_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 2870, 810, 410, 400, 0.1, 7, false, true, 0);

		//jump punch 
    this.syrym_jump_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 1640, 2000, 410, 400, 0.1, 2, false, false, 0);
    this.syrym_jump_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1reversed.png"), 2460, 2000, 410, 400, 0.1, 2, false, true, 0);
	
	   //victory
    this.syrym_victory_Animation = new Animation(ASSET_MANAGER.getAsset("./img/syrym1.png"), 0, 1230, 410, 400, 0.1, 9, false, false, 0);
 
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
    this.myboxes = new Hitbox(game, 4);
    this.myboxes.setHitbox(this.x + 160, this.y - 77, 95, 290);
    this.bar;
}

Syrym.prototype = new Entity();
Syrym.prototype.constructor = Syrym;

Syrym.prototype.loadEnergyBar = function (energy_bar) { this.bar = energy_bar }

Syrym.prototype.updateOrientation = function () {
    this.standing = this.isPlayer;
    this.standingLeft = !this.isPlayer;
    this.isRight = this.isPlayer;

    this.start = this.isPlayer ? 100 : 1000;
    this.ground = 355;
    this.controlled = this.isPlayer;
    this.bar = new Bar(this.game, this);
    Entity.call(this, this.game, this.start, this.ground);
}

Syrym.prototype.update = function () {
    if (this.isRight) {
        this.myboxes.setHitbox(this.x + 160, this.y - 77, 95, 290);//this.x + 70, this.y - 140, 125, 300);
    } if (!this.isRight) {
        this.myboxes.setHitbox(this.x + 160, this.y - 77, 95, 290);//this.x + 70, this.y - 140, 125, 300);
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
    }
    if (!this.controlled && !this.current_action) {
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
    }
    if (this.gotHit) {//<-----------------------------------------new from here
        this.current_action = true;
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.sittingRight = false;
        this.sittingLeft = false;
        this.weak_punch = false;
        this.weak_kick = false;
        this.strong_punch = false;
        this.strong_kick = false;
        if (this.jumping) {
            this.syrym_rightjumpAnimation.elapsedTime = 0;
            this.syrym_leftjumpAnimation.elapsedTime = 0;
            this.jumping = false;
            this.y = this.ground;
        }
        if (this.isRight) {
            console.log("Hit right");
            if (this.x >= -50) {
                this.x += -1;
            }

            if (this.syrym_low_punched_rightAnimation.isDone()) {
                console.log("end of right hit animation");
                this.syrym_low_punched_rightAnimation.elapsedTime = 0;
                //this.standingLeft = true;
                this.standing = true;
                this.current_action = false;
                this.gotHit = false;
            }//add your animations accordingly both left and right hit animations
        } else {
            console.log("hit left");
            if (this.x < 1100) {
                this.x += 1;
            }

            if (this.syrym_low_punched_leftAnimation.isDone()) {
                console.log("end of hit animation Left");
                this.syrym_low_punched_leftAnimation.elapsedTime = 0;
                this.standingLeft = true;
                this.current_action = false;
                this.gotHit = false;

            }
        }//<-------------------------to here 
	}
        if (this.jumping) {
            var jumpDistance;

            if (this.isRight) {
                if (this.syrym_rightjumpAnimation.isDone()) {
                    this.syrym_rightjumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                    this.standing = true;
                    this.current_action = false;
                }
                jumpDistance = this.syrym_rightjumpAnimation.elapsedTime / this.syrym_rightjumpAnimation.totalTime;
            } else {
                if (this.syrym_leftjumpAnimation.isDone()) {
                    this.syrym_leftjumpAnimation.elapsedTime = 0;
                    this.jumping = false;
                }
                jumpDistance = this.syrym_leftjumpAnimation.elapsedTime / this.syrym_rightjumpAnimation.totalTime;
            }


            var totalHeight = 200;
            var howHigh = -6;
            if (this.game.upArrowPressed) {
                howHigh = -7;
            }
            if (jumpDistance > 0.5)
                jumpDistance = 1 - jumpDistance;

            var height = totalHeight * (howHigh * (jumpDistance * jumpDistance - jumpDistance));
            this.y = this.ground - height;
            if (this.game.rightArrow && this.x <= 1050) {
                this.x += 20;
                
            } else if (this.game.leftArrow && this.x >= -150) {
                this.x -= 20;
                
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
                if (this.syrym_weak_punch_rightAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 230, this.y - 50, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_weak_punch_rightAnimation.isDone()) {
                    this.syrym_weak_punch_rightAnimation.elapsedTime = 0;
                    this.weak_punch = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.syrym_weak_punch_leftAnimation.currentFrame() === 3) {//new code from here 3 is the frame it checks
                    this.myboxes.setAttackBox(this.x + 50, this.y - 50, 125, 45);// Left weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }//to here
                if (this.syrym_weak_punch_leftAnimation.isDone()) {
                    this.syrym_weak_punch_leftAnimation.elapsedTime = 0;
                    this.weak_punch = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }

        if (this.strong_punch) {
            if (this.isRight) {
                if (this.syrym_strong_punch_rightAnimation.currentFrame() === 3) {//adjust hitbox stuff here
                    this.myboxes.setAttackBox(this.x + 240, this.y - 50, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_strong_punch_rightAnimation.isDone()) {
                    this.syrym_strong_punch_rightAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.syrym_strong_punch_leftAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 50, this.y - 50, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_strong_punch_leftAnimation.isDone()) {
                    this.syrym_strong_punch_leftAnimation.elapsedTime = 0;
                    this.strong_punch = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }
        if (this.weak_kick) {
            if (this.isRight) {
                if (this.syrym_weak_kick_rightAnimation.currentFrame() === 3) {//set it to the right frame you want<==========
                    this.myboxes.setAttackBox(this.x + 240, this.y +70, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_weak_kick_rightAnimation.isDone()) {
                    this.syrym_weak_kick_rightAnimation.elapsedTime = 0;
                    this.weak_kick = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.syrym_weak_kick_leftAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 50, this.y + 70, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_weak_kick_leftAnimation.isDone()) {
                    this.syrym_weak_kick_leftAnimation.elapsedTime = 0;
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
                if (this.syrym_strong_kick_rightAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 200, this.y - 70, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_strong_kick_rightAnimation.isDone()) {
                    this.syrym_strong_kick_rightAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    //this.standingLeft = false;
                    this.standing = true;
                    this.current_action = false;
                }
            } else {
                if (this.syrym_strong_kick_leftAnimation.currentFrame() === 3) {
                    this.myboxes.setAttackBox(this.x + 85, this.y - 70, 125, 45);// right weak punch hitbox set****
                    this.myboxes.setAttack();
                    this.myboxes.attackenemy();
                    this.myboxes.unsetAttack();
                }
                if (this.syrym_strong_kick_leftAnimation.isDone()) {
                    this.syrym_strong_kick_leftAnimation.elapsedTime = 0;
                    this.strong_kick = false;
                    //this.standingLeft = true;
                    this.standing = false;
                    this.current_action = false;
                }
            }
        }

        if (this.rightwalk && this.x <= 1050) {
            this.x += 8;

        } else if (this.leftwalk && this.x >= -150) {
            this.x -= 8;

        }
    //}//
    //Entity.prototype.update.call(this);
}

Syrym.prototype.draw = function (ctx) {

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
            this.syrym_rightjumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 190);
        } else {
            this.syrym_leftjumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 190);
        }
	} else if (this.gotHit) {//<-----------------------------------------------------------added hit animation here
        if (this.isRight) {
            this.syrym_low_punched_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else {
            this.syrym_low_punched_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        }
    } else if (this.rightwalk) {
        this.syrym_rightwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.leftwalk) {
        this.syrym_leftwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.sittingLeft) {
        this.syrym_blockLeftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.sittingRight) {
        this.syrym_blockRightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.weak_punch) {
        if (this.isRight) {
            this.syrym_weak_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.syrym_weak_punch_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            //console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
        ////////////////////////////////////////////Added if statement^^
    } else if (this.weak_kick) {
        if (this.isRight) {
            this.syrym_weak_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.syrym_weak_kick_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
        ////////////////////////////////////////////Added if statement^^
    } else if (this.strong_punch) {
        if (this.isRight) {
            this.syrym_strong_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.syrym_strong_punch_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            //console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    } else if (this.strong_kick) {
        if (this.isRight) {
            this.syrym_strong_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
        } else if (!this.isRight) {
            this.syrym_strong_kick_leftAnimation.drawFrame(this.game, ctx, this.x, this.y - 150);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    } else if (this.standing) {//////////////////////////////////////
        this.syrym_standingAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    } else if (this.standingLeft) {
        this.syrym_standingLeftAnim.drawFrame(this.game, ctx, this.x, this.y - 150);
    }


    Entity.prototype.draw.call(this);
}
