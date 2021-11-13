import * as PIXI from "pixi.js";
import { PAGES } from "../constants/enums/PAGES";
import { assets } from "../resources";

export default class MainMenuButtons extends PIXI.Container {
    constructor(label: string, pageToNavigate: PAGES, navigateTo: Function) {
        super();
        this.label = label;
        this.pageToNavigate = pageToNavigate;
        this.navigateTo = navigateTo;
        this.bgTexture = PIXI.Texture.from(assets.button_bg);
        this.bg = new PIXI.Sprite(this.bgTexture);
        this.addChild(this.bg);
        this.init();
    }

    init() {
        this.labelStyle = new PIXI.TextStyle({
            fontSize: 48,
            fill: "white"
        })
        this.labelText = new PIXI.Text(this.label, this.labelStyle);

        this.labelText.x = 100;
        this.labelText.y = 80;

        this.addChild(this.labelText);

        //@ts-ignore
        this.bg.interactive = true;
        //@ts-ignore
        this.bg.buttonMode = true;

        //@ts-ignore
        this.bg.on('tap', this.onUserInteraction.bind(this))
            .on('click', this.onUserInteraction.bind(this));
    }

    onUserInteraction() {
        this.navigateTo(this.pageToNavigate);
    }

    private labelStyle: PIXI.TextStyle = null;
    private labelText: PIXI.Text = null;
    private bgTexture: PIXI.Texture = null;
    private bg: PIXI.Sprite = null;
    private label: string = null;
    private navigateTo: Function = null;
    private pageToNavigate: PAGES = null;
}