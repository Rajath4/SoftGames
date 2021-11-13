import * as PIXI from "pixi.js";
import { Card } from "../../constants/interface/Card";

export default class ImageImageImageCard extends PIXI.Container implements Card {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.width = window.innerWidth * 0.75;
        this.height = window.innerHeight * 0.75;
        this.setBG();
        this.setupPrimaryContainer();
        this.setupSecondaryContainer();
    }

    setBG() {
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0xAA33BB)
            .lineStyle(4, 0xFFEA00, 1)
            .drawRect(0, 0, window.innerWidth * 0.75, window.innerHeight * 0.75)
            .endFill();
        this.addChild(this.bg);
    }

    setupPrimaryContainer() {
        this.primaryContainer = new PIXI.Graphics();
        this.primaryContainer.beginFill(0xAA33BB)
            .lineStyle(4, 0xFFEA00, 1)
            .drawRect(0, 0, window.innerWidth * 0.75, window.innerHeight * 0.6)
            .endFill();
        this.addChild(this.primaryContainer);
    }

    setupSecondaryContainer() {
        this.secondaryContainer1 = new PIXI.Graphics();
        this.secondaryContainer1.beginFill(0xAA33BB)
            .lineStyle(4, 0xFFEA00, 1)
            .drawRect(0, 0, window.innerWidth * 0.5, window.innerHeight * 0.15)
            .endFill();
        this.secondaryContainer1.y = window.innerHeight * 0.6;
        this.addChild(this.secondaryContainer1);

        this.secondaryContainer2 = new PIXI.Graphics();
        this.secondaryContainer2.beginFill(0xFFFFFF)
            .lineStyle(4, 0xFFEA00, 1)
            .drawRect(0, 0, window.innerWidth * 0.25, window.innerHeight * 0.15)
            .endFill();
        this.secondaryContainer2.y = window.innerHeight * 0.6;
        this.secondaryContainer2.x = window.innerWidth * 0.5;
        this.addChild(this.secondaryContainer2);
    }

    initializeContentHolders(primaryImage: string, thirdImage: string, secondaryImage: string) {
        this.secondaryContainer1.removeChildren();
        this.secondaryContainer2.removeChildren();
        this.primaryContainer.removeChildren();

        this.thirdImage = PIXI.Sprite.from(thirdImage);
        this.thirdImage.width = window.innerWidth * 0.5;
        this.thirdImage.height = window.innerHeight * 0.15;
        this.secondaryContainer1.addChild(this.thirdImage);

        this.secondaryImage = PIXI.Sprite.from(secondaryImage);
        this.secondaryImage.width = window.innerWidth * 0.25;
        this.secondaryImage.height = window.innerHeight * 0.15;
        this.secondaryContainer2.addChild(this.secondaryImage);

        this.primaryImage = PIXI.Sprite.from(primaryImage);
        this.primaryImage.width = window.innerWidth * 0.75;
        this.primaryImage.height = window.innerHeight * 0.6;
        this.primaryContainer.addChild(this.primaryImage);
    }

    initData(data: Array<any>) {
        this.initializeContentHolders(data[0], data[1], data[2]);
    }

    private bg: PIXI.Graphics = null;
    private primaryContainer: PIXI.Graphics = null;
    private secondaryContainer1: PIXI.Graphics = null;
    private secondaryContainer2: PIXI.Graphics = null;
    private primaryImage: PIXI.Sprite = null;
    private secondaryImage: PIXI.Sprite = null;
    private thirdImage: PIXI.Sprite = null;
}