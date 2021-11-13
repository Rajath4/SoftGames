import * as PIXI from "pixi.js";
import { PAGES } from "../constants/enums/PAGES";
import { assets } from "../resources";
import MainMenuButtons from "./MainMenuButtons";


export default class Question1Page extends PIXI.Container {
    constructor(navigateTo: Function) {
        super();
        this.init();
        this.navigateTo = navigateTo;
    }

    init() {
        this.stack1 = new PIXI.Container();
        this.stack1.position.set(100, 100);
        this.addChild(this.stack1);

        this.stack2 = new PIXI.Container();
        this.stack2.position.set(300, 100);
        this.addChild(this.stack2);

        this.fillStack1();
        this.startTileMovement();

        this.setupBackButton();
    }

    fillStack1() {
        for (let i = 144; i > 0; i--) {
            const tile = this.getTile();
            tile.y = i * 4;
            this.stack1.addChild(tile);
            this.stack1Tiles.push(tile);
        }
    }

    startTileMovement() {
        const timer = setInterval(() => {
            if (this.stack1Tiles.length === 0) {
                clearInterval(timer);
                return;
            }
            const tile = this.stack1Tiles.pop();
            const tileLoc = tile.position;
            const initialPos = this.stack1.toGlobal(tile.position);
            this.stack1.removeChild(tile);
            tile.position.set(initialPos.x, initialPos.y);
            const a = this.stack2.toGlobal({ x: 0, y: (144 * 4) - initialPos.y })
            a.x = this.stack2.position.x;
            this.moveTileToStack2(tile, a);
        }, 1000);
    }


    moveTileToStack2(tile: PIXI.Sprite, destinationPos: PIXI.Point) {
        this.addChild(tile);
        //@ts-ignore
        const tween = PIXI.tweenManager.createTween(tile);

        tween.to(destinationPos)
        tween.time = 2000;

        tween.on('end', () => {
            // this.removeChild(tile);
            // tile.x = 0;
            // this.stack2.addChild(tile)
        });
        tween.start();
    }

    getTileDestinationPos(i: number) {
        return this.stack2Tiles.length
    }

    getTile() {
        const tile = PIXI.Sprite.from(assets.tiles);
        return tile;
    }

    setupBackButton() {
        const backButton = PIXI.Sprite.from(assets.back_button);
        backButton.y = window.innerHeight - 150;
        backButton.scale.set(0.1);
        this.addChild(backButton);

        //@ts-ignore
        backButton.interactive = true;
        //@ts-ignore
        backButton.buttonMode = true;

        //@ts-ignore
        backButton.on('tap', this.onBackClicked.bind(this)).on('click', this.onBackClicked.bind(this));
    }

    onBackClicked() {
        this.navigateTo(PAGES.LANDING);
        this.destroy();
    }

    private stack1: PIXI.Container = null;
    private stack2: PIXI.Container = null;

    private stack1Tiles: Array<PIXI.Sprite> = [];
    private stack2Tiles: Array<PIXI.Sprite> = [];
    private navigateTo: Function = null;
}