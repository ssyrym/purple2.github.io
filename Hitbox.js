function Hitbox(game, id) {
    this.game = game;
    this.ID = id;
    this.hitbox = { x: 0, y: 0, width: 0, height: 0 };
    this.attackbox = { x: 0, y: 0, width: 0, height: 0 };
    this.attack = false;
}

Hitbox.prototype.setAttack = function () {
    this.attack = true;
}

Hitbox.prototype.unsetAttack = function () {
    this.attack = false;
}

Hitbox.prototype.setHitbox = function (x1, y1, width1, height1) {
    this.hitbox = { x: x1, y: y1, width: width1, height: height1 }
}

Hitbox.prototype.setAttackBox = function (x1, y1, width1, height1) {
    //console.log("set attack box ");
    this.attackbox = { x: x1, y: y1, width: width1, height: height1 }
}

Hitbox.prototype.collideLeft = function () {
    if (hitbox.x<=0) {
        return true;
    } else {
        return false;
    }
}

Hitbox.prototype.collideRight = function () {
    if (this.hitbox.x + this.hitbox.height >=1350) {
        return true;
    } else {
        return false;
    }
}

Hitbox.prototype.attackenemy = function () {
    var ent = this.game.entities[1];
    var ent2 = this.game.entities[2];
    var damage = 1;
    if (ent.myboxes.ID != this.ID) {
        console.log(this.attack);
        console.log("ent2 ID = this.ID check first ent");
        
        if ((this.attack && !ent.gotHit &&
            (this.attackbox.x < ent.myboxes.hitbox.x + ent.myboxes.hitbox.width)) &&
            (this.attackbox.x + this.attackbox.width > ent.myboxes.hitbox.x) &&
            (this.attackbox.y < ent.myboxes.hitbox.y + ent.myboxes.hitbox.height) &&
            (this.attackbox.height + this.attackbox.y > ent.myboxes.hitbox.y)) {
            
            if (ent.blockLeft || ent.blockRight) {
                damage = .5;
            }
            if (ent2.wkPunch || ent2.wkKick) {
                damage *= 4;
            } else {
                damage *= 8;
            }
            
            ent.bar.decreaseHealth( damage );
            console.log("Player hit lost " + damage + "health");
        }
    } else if (ent2.myboxes.ID != this.ID) {
        console.log(this.attackbox.x < ent2.myboxes.hitbox.x + ent2.myboxes.hitbox.width);
        console.log("ent.ID = this.ID check for second");

        if ((this.attack && !ent2.gotHit &&
            (this.attackbox.x < ent2.myboxes.hitbox.x + ent2.myboxes.hitbox.width)) &&
            (this.attackbox.x + this.attackbox.width > ent2.myboxes.hitbox.x) &&
            (this.attackbox.y < ent2.myboxes.hitbox.y + ent2.myboxes.hitbox.height) &&
            (this.attackbox.height + this.attackbox.y > ent2.myboxes.hitbox.y)) {

            if (ent.blockLeft || ent.blockRight) {
                damage = .5;
            }
            if (ent2.wkPunch || ent2.wkKick) {
                damage *= 4;
            } else {
                damage *= 8;
            }

            console.log("Player hit lost " + damage + "health");
            ent2.bar.decreaseHealth(damage);
            
        }
    }
}


Hitbox.prototype.attackPlayer = function () {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent.Hitbox !== this && ent.active_backround) {
            if (this.hitbox.x < ent.Hitbox.hitbox.x + ent.Hitbox.hitbox.width &&
                this.hitbox.x + this.hitbox.width > ent.Hitbox.hitbox.x &&
                this.hitbox.y < ent.Hitbox.hitbox.y + ent.Hitbox.hitbox.height &&
                this.hitbox.height + this.hitbox.y > ent.Hitbox.hitbox.y) {
                console.log("Players collide");
                return true;
            } else {
                return false;
            }
        }
    }
}
