import * as PIXI from "pixi.js";
import { PAGES } from "../constants/enums/PAGES";
import MainMenuButtons from "./MainMenuButtons";

export default class LandingPage extends PIXI.Container {
    constructor(navigateTo: Function) {
        super();
        this.navigateTo = navigateTo;
        this.init();
    }

    init() {
        this.question1Button = new MainMenuButtons("Assignment 1", PAGES.QUESTION1, this.navigateTo.bind(this));
        this.addChild(this.question1Button);

        this.question2Button = new MainMenuButtons("Assignment 2", PAGES.QUESTION2, this.navigateTo.bind(this));
        this.question2Button.y = 200;
        this.addChild(this.question2Button);

        this.question3Button = new MainMenuButtons("Assignment 3", PAGES.QUESTION3, this.navigateTo.bind(this));
        this.question3Button.y = 400;
        this.addChild(this.question3Button);
    }

    private question1Button: MainMenuButtons = null;
    private question2Button: MainMenuButtons = null;
    private question3Button: MainMenuButtons = null;
    private navigateTo: Function = null;
}