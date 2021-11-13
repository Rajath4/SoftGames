import * as PIXI from "pixi.js";
import { PAGES } from "../constants/enums/PAGES";
import { TILE_CONFIG } from "../constants/enums/TILE_CONFIG";
import { assets } from "../resources";
import CardDataFactory from "./CardDataFactory";
import CardFactory from "./CardFactory";

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}
export default class Question2Page extends PIXI.Container {
    constructor(navigateTo: Function) {
        super();
        this.init();
        this.navigateTo = navigateTo;
    }

    init() {
        this.cardHolder = new PIXI.Container();
        this.addChild(this.cardHolder);

        this.cardFactory = new CardFactory();
        this.cardDataFactory = new CardDataFactory();

        let card: any = null;
        let cardConfig: TILE_CONFIG = null;

        const updateCard = () => {
            this.cardHolder.removeChildren();
            if (card != null) {
                this.cardFactory.puBackCard(cardConfig, card);
            }
            cardConfig = randomEnum(TILE_CONFIG);
            card = this.cardFactory.getCard(cardConfig);
            card.initData(this.cardDataFactory.getData(cardConfig));
            this.cardHolder.addChild(card);
        }

        setInterval(updateCard, 2000);
        updateCard();
        this.setupBackButton();
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
    }


    private cardFactory: CardFactory = null;
    private cardDataFactory: CardDataFactory = null;
    private cardHolder: PIXI.Container = null;
    private navigateTo: Function = null;
}