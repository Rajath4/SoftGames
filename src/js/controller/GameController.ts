import * as PIXI from "pixi.js";
import LandingPage from "../components/LandingPage";
import Question1Page from "../components/Question1Page";
import Question2Page from "../components/Question2Page";
import Question3Page from "../components/Question3Page";
import { PAGES } from "../constants/enums/PAGES";


export default class GameController extends PIXI.Container {
    constructor() {
        super();
        this.setup();
    }

    setup() {
        this.landingPage = new LandingPage(this.switchPage.bind(this));
        this.addChild(this.landingPage);

        this.question2Page = new Question2Page(this.switchPage.bind(this));
        this.addChild(this.question2Page);

        this.question3Page = new Question3Page(this.switchPage.bind(this));
        this.addChild(this.question3Page);

        this.switchPage(PAGES.LANDING);
    }

    switchPage(to: PAGES) {
        switch (to) {
            case PAGES.LANDING:
                this.landingPage.visible = true;
                this.question2Page.visible = false;
                this.question3Page.visible = false;
                break;
            case PAGES.QUESTION1:
                this.landingPage.visible = false;
                this.question1Page = new Question1Page(this.switchPage.bind(this));
                this.addChild(this.question1Page);
                this.question2Page.visible = false;
                this.question3Page.visible = false;
                break;
            case PAGES.QUESTION2:
                this.landingPage.visible = false;
                this.question2Page.visible = true;
                this.question3Page.visible = false;
                break;
            case PAGES.QUESTION3:
                this.landingPage.visible = false;
                this.question2Page.visible = false;
                this.question3Page.visible = true;
                break;
        }
    }

    private landingPage: LandingPage = null;
    private question1Page: Question1Page = null;
    private question2Page: Question2Page = null;
    private question3Page: Question3Page = null;
}