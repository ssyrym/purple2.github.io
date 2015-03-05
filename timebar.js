function TimeBar(game) {
    this.game = game;
	this.numbersprite = ASSET_MANAGER.getAsset("./img/numbers.png");
	this.isTimeBarOn = true;
	this.date = new Date();
	this.seconds;
	this.lastTime = this.date.getSeconds();
	this.x = 1350/2 - 52;
	this.y = 50;
	
	this.timesec = 90;
	this.s1 = 468;
	this.s2 = 520;
	
	this.width = 800;
	this.y = 50;
	Entity.call(this, this.game, this.x, this.y);
}
TimeBar.prototype = new Entity();
TimeBar.prototype.constructor = TimeBar;

TimeBar.prototype.start = function(){
	this.isTimeBarOn = true;
}
TimeBar.prototype.pause = function(){
	this.isTimeBarOn = false;
}
TimeBar.prototype.reset = function(){
	this.isTimeBarOn = false;
	this.timesec = 90;
	this.s1 = 468;
	this.s2 = 520;
}
TimeBar.prototype.getTimeSec = function(){
	return this.timesec;
}
TimeBar.prototype.update = function () { 
	this.date = new Date();
	this.seconds = this.date.getSeconds();
	
	if(this.isTimeBarOn && (this.seconds - this.lastTime) === 1){
		this.s1 = 52 * Math.floor((this.timesec / 10));
		this.s2 = 52 * (this.timesec % 10);		
		if(this.timesec > 1){
			this.timesec = this.timesec - 1;
		} else {
			this.timesec = 0;
		}
	}
	this.lastTime = this.seconds;
}

TimeBar.prototype.draw = function (ctx) {
	if(this.isTimeBarOn){
		ctx.drawImage(this.numbersprite, this.s1, 0, 52, 100, this.x, this.y, 52, 100);
		ctx.drawImage(this.numbersprite,  this.s2, 0, 52, 100, this.x+52, this.y, 52, 100);
	}
    Entity.prototype.draw.call(this);
}

