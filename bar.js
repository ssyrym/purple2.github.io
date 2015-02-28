function Bar() {
    this.LEFTbar = ASSET_MANAGER.getAsset("./img/lifebarLEFT.png");
    this.RIGHTbar = ASSET_MANAGER.getAsset("./img/lifebarRIGHT.png");
    this.greenSprite = ASSET_MANAGER.getAsset("./img/green.png");

    this.barwidth = 220;
    this.barheight = 30;

    this.greenheight = 16;
    this.greenLEFTwidth = 210;
    this.greenRIGHTwidth = 210;

    this.x1 = 50;
    this.x2 = 1050;

    this.y = 100;
    this.hitDamage = 21;
    this.totalHits = 0;
}

Bar.prototype.drawBar = function (ctx) {
    ctx.drawImage(this.LEFTbar, 0, 0, this.barwidth, this.barheight, this.x1, this.y, this.barwidth, this.barheight);
    ctx.drawImage(this.greenSprite, 0, 0, this.greenLEFTwidth, this.greenheight, this.x1 + 4, this.y + 7, this.greenLEFTwidth, this.greenheight);

    ctx.drawImage(this.RIGHTbar, 0, 0, this.barwidth, this.barheight, this.x2, this.y, this.barwidth, this.barheight);
    ctx.drawImage(this.greenSprite, 0, 0, this.greenRIGHTwidth, this.greenheight, this.x2 + 6, this.y + 7, this.greenRIGHTwidth, this.greenheight);
}



Bar.prototype.decreaseHealth = function (isLeftFihter) {
    if (isLeftFihter) {
        this.greenLEFTwidth = this.greenLEFTwidth - this.hitDamage;
    } else {
        this.x2 = this.x2 + this.hitDamage;
        this.greenRIGHTwidth = this.greenRIGHTwidth - this.hitDamage;
    }
}
