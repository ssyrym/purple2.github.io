function Bar(game, the_fighter) {
    this.fighter = the_fighter;
    this.game = game;
    this.bar = this.fighter.isPlayer ? ASSET_MANAGER.getAsset("./img/lifebarLEFT.png") : ASSET_MANAGER.getAsset("./img/lifebarRIGHT.png");

    this.greenSprite = ASSET_MANAGER.getAsset("./img/green.png");

    this.barwidth = 220;
    this.barheight = 30;

    this.greenheight = 16;
    this.greenwidth = 210;
    this.greenX = this.fighter.isPlayer ? 54 : 1056;
    //this.greenRIGHTwidth = 210;

    this.x = this.fighter.isPlayer ? 50 : 1050;
    //this.x2 = 1050;

    this.y = 100;
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
    
    ctx.drawImage(this.bar, 0, 0, this.barwidth, this.barheight, this.x, this.y, this.barwidth, this.barheight);
    ctx.drawImage(this.greenSprite, 0, 0, this.greenwidth, this.greenheight, this.greenX, this.y + 7, this.greenwidth, this.greenheight);
    
    Entity.prototype.draw.call(this);
}

Bar.prototype.decreaseHealth = function ( damage ) {
    this.fighter.isPlayer ? this.greenwidth -= damage : this.greenX += damage, this.greenwidth -= damage;
}



