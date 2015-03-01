function Vlad(game, isPlayer) {
    //Vlad Sprite
    this.vlad_standingAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304/5), 1536/5, 2304/5, .2, 7, true, false, 17);
    this.vlad_rightwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, 0, 1536 / 5, 2304 / 5, 0.1, 7, true, false, 18);
    this.vlad_jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304/5) * 7, 1536 / 5, 2304 / 5, 0.09, 5, false, false, 19);

    this.vlad_standingLeftAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5), (1536 / 5)+1, 2304 / 5, .2, 7, true, true, 20);
    this.vlad_leftwalkAnim = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), (1536 / 5) * 6, 0, 1536 / 5, 2304 / 5, 0.1, 8, true, true, 21);
    this.vlad_leftjumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304/5) * 7, 1536 / 5, 2304 / 5, 0.09, 5, false, true, 22);

    this.vlad_blockRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), (1536/5) * 3, (2304 / 5) * 6, 1536 / 5, 2304 / 5, 1, 1, true, true, 23);
    this.vlad_blockLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), (1536 / 5) * 4, (2304 / 5) * 6, 1536 / 5, 2304 / 5, 1, 1, true, true, 0);

    /////new controls animation weak punch
    this.vlad_weak_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5) * 2, 1536 / 5, 2304 / 5, .1, 7, false, true, 25);

    this.vlad_weak_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304 / 5) * 2, 1536 / 5, 2304 / 5, .1, 7, false, false, 26);
    
	////// weak kick
    this.vlad_weak_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304 / 5) * 3, 1536 / 5, 2304 / 5, .1, 7, false, false, 27);

    this.vlad_weak_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 25, (2304 / 5) * 3, (1536 / 5)+7, 2304 / 5, .1, 7, false, true, 28);

    //strong punch
    this.vlad_strong_punch_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304 / 5) * 4, 307.2, (2304 / 5), .1, 7, false, false, 29);

    this.vlad_strong_punch_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5) * 4, (1536 / 5), (2304 / 5), .1, 7, false, true, 30);
    //strong kick
    this.vlad_strong_kick_rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite.png"), 0, (2304 / 5) * 5, (307.2)+2, 2304 / 5, .1, 7, false, false, 31);

    this.vlad_strong_kick_leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Vlad_Sprite_reverse.png"), 0, (2304 / 5) *5, (1536 / 5)+2, 2304 / 5, .1, 7, false, true, 32);

    //new boolean values added here
    this.weak_punch = false;
    this.weak_kick = false;
    this.strong_punch = false;
    this.strong_kick = false;
    this.current_action = false;
    this.gotHit = false;
    
	this.isPlayer = isPlayer;
    this.jumping = false;
    this.sittingLeft = false;
    this.sittingRight = false;

    this.standing = true;
    this.rightwalk = false;

    this.standingLeft = false;
    this.leftwalk = false;
    this.isRight = isPlayer;
    this.game = game;
    //this.controlled = false;
    //Entity.call(this, game, 0, 400);
    //this.weakpunchR_hitbox = { x: this.x + 180, y: this.y -120, width: 125, height: 45 }
    this.myboxes = new Hitbox(game, 1);
    this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
    this.bar;
}

//Vlad.prototype = new Entity();
//Vlad.prototype.constructor = Vlad;

Vlad.prototype.loadEnergyBar = function (energy_bar) { this.bar = energy_bar }

Vlad.prototype.updateOrientation = function () {
    this.standing = this.isPlayer;
    this.standingLeft = !this.isPlayer;
    this.isRight = this.isPlayer;

    this.start = this.isPlayer ? 100 : 1000;
    this.ground = 410;
    this.controlled = this.isPlayer;
    this.bar = new Bar(this.game, this);
    Entity.call(this, this.game, this.start, this.ground);
}

Vlad.prototype.update = function () {
    //this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
    //this.weakpunchR_hitbox = { x: this.x + 180, y: this.y - 120, width: 125, height: 45 }

    //this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);
    if (this.isRight) {
        this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
    } if (!this.isRight) {
        this.myboxes.setHitbox(this.x + 70, this.y - 140, 125, 300);
    }
    

	if (this.game.thePPressed) {
        this.controlled = !this.controlled;
    }
	if( this.controlled) {
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
    } else if (this.game.theDPressed && this.current_action === false) {//D Strong punch
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
        this.strong_kick = false;
        this.strong_punch = true;
        this.current_action = true;
    } else if (this.game.theFPressed && this.current_action === false) {//F Strong kick
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = false;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
        this.strong_kick = true;
        this.current_action = true;
    } else if (this.isRight && this.current_action === false) {//if not any previous actions then just idle to right
        this.rightwalk = false;
        this.leftwalk = false;
        this.standing = true;
        this.standingLeft = false;
        this.sittingRight = false;
        this.sittingLeft = false;
    } else if (!this.isRight && this.current_action === false) {// idle to left
        this.rightwalk = false;
        this.leftwalk = false;
        this.standingLeft = true;
        this.standing = false;
        this.sittingRight = false;
        this.sittingLeft = false;
    }

    if (this.jumping) {
        var jumpDistance;
        
		if (this.isRight) {
			if (this.vlad_jumpAnimation.isDone()) {
				this.vlad_jumpAnimation.elapsedTime = 0;
				this.jumping = false;
				this.standing = true;
				this.current_action = false;
			}
			jumpDistance = this.vlad_jumpAnimation.elapsedTime / this.vlad_jumpAnimation.totalTime;
		} else {
			if (this.vlad_leftjumpAnimation.isDone()) {
				this.vlad_leftjumpAnimation.elapsedTime = 0;
				this.jumping = false;
				this.standing = false;
				this.current_action = false;
			}
			jumpDistance = this.vlad_leftjumpAnimation.elapsedTime / this.vlad_jumpAnimation.totalTime;
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
        if (this.game.rightArrow && this.x < 1100) {
            this.x += 10;
            
        } else if (this.game.leftArrow && this.x > -50) {
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
        this.strong_punch = false;
        this.strong_kick = false;

    }

    if (this.weak_punch) {
        if (this.isRight) {
            if (this.vlad_weak_punch_rightAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
            if (this.vlad_weak_punch_rightAnimation.isDone()) {
                this.vlad_weak_punch_rightAnimation.elapsedTime = 0;
                this.weak_punch = false;
                this.standing = true;
                this.current_action = false;
            }
        } else {
            if (this.vlad_weak_punch_leftAnimation.currentFrame() === 3) {//new code from here 3 is the frame it checks for
                this.myboxes.setAttackBox(this.x -25, this.y - 120, 125, 45);// Left weak punch hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }//to here
            if (this.vlad_weak_punch_leftAnimation.isDone()) {
                this.vlad_weak_punch_leftAnimation.elapsedTime = 0;
                this.weak_punch = false;
                this.standing = false;
                this.current_action = false;
            }
        }
    }

    if (this.strong_punch) {
        if (this.isRight) {
            if (this.vlad_strong_punch_rightAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x + 180, this.y - 120, 125, 45);// right weak punch hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
			if (this.vlad_strong_punch_rightAnimation.isDone()) {
				this.vlad_strong_punch_rightAnimation.elapsedTime = 0;
				this.strong_punch = false;
				this.standing = true;
				this.current_action = false;
			}
        } else {
            if (this.vlad_strong_punch_leftAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x - 22, this.y - 120, 125, 45);// right weak punch hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
			if (this.vlad_strong_punch_leftAnimation.isDone()) {
				this.vlad_strong_punch_leftAnimation.elapsedTime = 0;
				this.strong_punch = false;
				this.standing = false;
				this.current_action = false;
			}
		}
    }
    if (this.weak_kick) {
        if (this.isRight) {
            if (this.vlad_weak_kick_rightAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x + 175, this.y , 125, 65);// right weak punch hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
            if (this.vlad_weak_kick_rightAnimation.isDone()) {
                this.vlad_weak_kick_rightAnimation.elapsedTime = 0;
                this.weak_kick = false;
                this.standing = true;
                this.current_action = false;
            }
        } else {
            if (this.vlad_weak_kick_leftAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x - 30 , this.y , 115, 65);// right weak kick hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
            if (this.vlad_weak_kick_leftAnimation.isDone()) {
                this.vlad_weak_kick_leftAnimation.elapsedTime = 0;
                this.weak_kick = false;
                this.standing = false;
                this.current_action = false;
            }
        }
    }
    if (this.strong_kick) {
        if (this.isRight) {
            if (this.vlad_strong_kick_rightAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x + 180, this.y , 125, 55);// right strong kick hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
			if (this.vlad_strong_kick_rightAnimation.isDone()) {
				this.vlad_strong_kick_rightAnimation.elapsedTime = 0;
				this.strong_kick = false;
				this.standing = true;
				this.current_action = false;
			}
        } else {
            if (this.vlad_strong_kick_leftAnimation.currentFrame() === 3) {
                this.myboxes.setAttackBox(this.x -40, this.y , 125, 55);// right weak punch hitbox set****
                this.myboxes.setAttack();
                this.myboxes.attackenemy();
                this.myboxes.unsetAttack();
            }
			if (this.vlad_strong_kick_leftAnimation.isDone()) {
				this.vlad_strong_kick_leftAnimation.elapsedTime = 0;
				this.strong_kick = false;
				this.standing = false;
				this.current_action = false;
			}
		}


    }

    if (this.rightwalk && this.x <=1100) {
        this.x += 3;

    } else if (this.leftwalk && this.x>=-50) {
        this.x -= 3;

    }
}
}

Vlad.prototype.draw = function (ctx) {
    //commented this part out since is was used for setting hitboxes testing
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
			this.vlad_jumpAnimation.drawFrame(this.game, ctx, this.x, this.y - 340);
        } else {
			this.vlad_leftjumpAnimation.drawFrame(this.game, ctx, this.x-100, this.y - 340);           
        }
    } else if (this.rightwalk) {
        this.vlad_rightwalkAnim.drawFrame(this.game, ctx, this.x, this.y - 300);
    } else if (this.leftwalk) {
		this.vlad_leftwalkAnim.drawFrame(this.game, ctx, this.x-100, this.y - 300);
    } else if (this.sittingLeft) {
        this.vlad_blockLeftAnimation.drawFrame(this.game, ctx, this.x-100, this.y - 300);
        console.log("block Left");
    } else if (this.sittingRight) {
		this.vlad_blockRightAnimation.drawFrame(this.game, ctx, this.x, this.y - 300);
    } else if (this.weak_punch) {
        if (this.isRight) {
            this.vlad_weak_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 300);
        } else if (!this.isRight) {
            this.vlad_weak_punch_leftAnimation.drawFrame(this.game, ctx, this.x-100, this.y - 300);
            
        }
    }  else if (this.weak_kick) {
        if (this.isRight) {
            this.vlad_weak_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 300);
        } else if (!this.isRight) {
            this.vlad_weak_kick_leftAnimation.drawFrame(this.game, ctx, this.x-100, this.y - 300);
            console.log("this.x " + this.x + " this.y " + this.y, +" ");
        }
    }  else if (this.strong_punch) {
        if (this.isRight) {
			this.vlad_strong_punch_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 300);
		} else if (!this.isRight) {
		    this.vlad_strong_punch_leftAnimation.drawFrame(this.game, ctx, this.x-100, this.y - 300);
		}
    } else if (this.strong_kick) {
		if (this.isRight) {
			this.vlad_strong_kick_rightAnimation.drawFrame(this.game, ctx, this.x, this.y - 300);
		} else if (!this.isRight) {
		    this.vlad_strong_kick_leftAnimation.drawFrame(this.game, ctx, this.x-100, this.y - 300);
			console.log("this.x " + this.x + " this.y " + this.y, +" ");
		}
    } else if (this.standing) {
            this.vlad_standingAnim.drawFrame(this.game, ctx, this.x, this.y - 300);        
    } else if (this.standingLeft) {
            this.vlad_standingLeftAnim.drawFrame(this.game, ctx, this.x-100, this.y - 300);
    }
    Entity.prototype.draw.call(this);
}
