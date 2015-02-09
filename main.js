var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/alex_sprite_new.png");
ASSET_MANAGER.queueDownload("./img/alex_sprite_new2.png");

ASSET_MANAGER.queueDownload("./img/Vlad_Sprite.png");
//ASSET_MANAGER.queueDownload("./img/Vlad_Sprite2.png");
ASSET_MANAGER.queueDownload("./img/Vlad_Sprite_reverse.png");

ASSET_MANAGER.queueDownload("./img/staircase.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var gameEngine = new GameEngine();
    var vlad = new Vlad(gameEngine, true);
	var alex = new Alex(gameEngine, false);
	

    
    

    gameEngine.init(ctx);
    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/staircase.png")));
    gameEngine.addEntity(vlad);
	gameEngine.addEntity(alex);
	

    gameEngine.start();
});
