
import * as PIXI from "pixi.js";
import Easing from './common/tween/Easing';
import Tween from './common/tween/Tween';
import TweenManager from './common/tween/TweenManager';
import TweenPath from './common/tween/TweenPath';
import GameController from "./controller/GameController";
import PixiFps from "pixi-fps";

//extend pixi graphics to draw tweenPaths
//@ts-ignore
PIXI.Graphics.prototype.drawPath = function (path) {
    path.parsePoints();
    this.drawShape(path.polygon);
    return this;
}

let tween = {
    TweenManager: TweenManager,
    Tween: Tween,
    Easing: Easing,
    TweenPath: TweenPath
};

//@ts-ignore
if (!PIXI.tweenManager) {
    //@ts-ignore
    PIXI.tweenManager = new TweenManager();
    //@ts-ignore
    PIXI.tween = tween;
}

const app = new PIXI.Application({
    width: 1080,
    height: 1920,
    antialias: true
});

app.renderer.backgroundColor = 0x23395D;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);
app.stage.addChild(new GameController());

app.ticker.add((delta) => {
    //@ts-ignore
    PIXI.tweenManager.update();
});

const fpsCounter = new PixiFps();
app.stage.addChild(fpsCounter);

