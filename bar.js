function Bar(game, the_fighter) {
    this.fighter = the_fighter;
    this.game = game;
    this.bar = this.fighter.isPlayer ? ASSET_MANAGER.getAsset("./img/lifebarLEFT.png") : ASSET_MANAGER.getAsset("./img/lifebarRIGHT.png");

    this.greenRedSprite = ASSET_MANAGER.getAsset("./img/green1.png");


    this.barwidth = 400;
    this.barheight = 150;
    
    this.health = 0;
    this.greenRedheight = 5;
    this.redwidth = 256;
    this.greenwidth = 256;

    this.x = this.fighter.isPlayer ? 70 : 900;
    //this.x2 = 1050;

    this.y = 5;

    this.greenX = this.fighter.isPlayer ? this.x + 88 : this.x + 55;
    this.greenRedY = this.y + 63
    this.redX = this.fighter.isPlayer ? 70 + 88 : 900 + 55;
    //this.greenRIGHTwidth = 210;

    //this.hitDamage = 21;
    this.totalHits = 0;

    //this.theBar = new Animation(this.bar, 0, 0, this.barwidth, this.barheight, .1, 1, false, false, 0);
    //this.theGreen = new Animation(this.greenSprite, 0, 0, this.greenwidth, this.greenheight, .1, 1, false, false, 0);

    Entity.call(this, this.game, this.x, this.y);
}

Bar.prototype = new Entity();
Bar.prototype.constructor = Bar;

Bar.prototype.update = function () { }

Bar.prototype.draw = function (ctx) {
    ctx.drawImage(this.greenRedSprite, 0, 17, this.redwidth, this.greenRedheight, this.redX, this.greenRedY, this.redwidth, this.greenRedheight); //red bar 
    ctx.drawImage(this.greenRedSprite, 0, 0, this.greenwidth, this.greenRedheight, this.greenX, this.greenRedY, this.greenwidth, this.greenRedheight); // green bar
    ctx.drawImage(this.bar, 0, 0, this.barwidth, this.barheight, this.x, this.y, this.barwidth, this.barheight); // health bar

    Entity.prototype.draw.call(this);
}

Bar.prototype.decreaseHealth = function (damage) {
    this.health -= damage;
    if( this.health <= 0 ) {
        this.fighter.game.updateFight();
    }
    this.fighter.isPlayer ? this.greenwidth -= damage : this.greenX += damage, this.greenwidth -= damage;
}


