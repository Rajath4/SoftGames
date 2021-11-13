import * as particles from '@pixi/particle-emitter';
import * as PIXI from "pixi.js";
import { fire_config } from '../common/particle_effect/fire';
import { PAGES } from '../constants/enums/PAGES';
import { assets } from "../resources";

export default class Question3Page extends PIXI.Container {
    constructor(navigateTo: Function) {
        super();
        this.init();
        this.navigateTo = navigateTo;
    }

    init() {
        this.particleContainer = new PIXI.Container();
        this.particleContainer.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
        this.addChild(this.particleContainer);

        const loader = new PIXI.Loader();
        loader.add([assets.particle, assets.fire])
        loader.load();
        loader.onComplete.add(this.showEffect.bind(this))
        this.setupBackButton();
    }

    showEffect() {
        const emitter = new particles.Emitter(
            this.particleContainer,
            fire_config
        );

        let elapsed = Date.now();
        let updateId: number;

        const startParticleUpdate = () => {
            elapsed = Date.now();
            emitter.emit = true; // Start emitting
            update(); // Start the update
        }


        const stopParticleUpdate = () => {
            cancelAnimationFrame(updateId);
            emitter.emit = false;
        }

        // Update function to update every frame
        const update = () => {
            updateId = requestAnimationFrame(update); // Update the next frame

            const now = Date.now();
            if (emitter) {
                emitter.update((now - elapsed) * 0.001);
            }
            elapsed = now;
        };

        startParticleUpdate();

        document.addEventListener("visibilitychange", () => {
            document.visibilityState === 'visible' ? startParticleUpdate() : stopParticleUpdate();
        });
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

    private particleContainer: PIXI.Container = null;
    private navigateTo: Function = null;
}