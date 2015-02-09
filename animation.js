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
