var ASSET_MANAGER = new AssetManager();

/*
FOR SYRYM'S SPRITES
ASSET_MANAGER.queueDownload("./img/");
ASSET_MANAGER.queueDownload("./img/");

*/

ASSET_MANAGER.queueDownload("./img/alex_sprite_new.png");
ASSET_MANAGER.queueDownload("./img/alex_sprite_new2.png");

ASSET_MANAGER.queueDownload("./img/John_Sprites_Right.png");
ASSET_MANAGER.queueDownload("./img/John_Sprites_Left.png");

ASSET_MANAGER.queueDownload("./img/Vlad_Sprite.png");
ASSET_MANAGER.queueDownload("./img/Vlad_Sprite_reverse.png");

ASSET_MANAGER.queueDownload("./img/syrym1reversed.png");
ASSET_MANAGER.queueDownload("./img/syrym1.png");

ASSET_MANAGER.queueDownload("./img/char_select.png");
ASSET_MANAGER.queueDownload("./img/staircase.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.start();
});
