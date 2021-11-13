import { TILE_CONFIG } from "../constants/enums/TILE_CONFIG";
import { assets } from "../resources";
var randomWords = require('random-words');

export default class CardDataFactory {
    constructor() {

    }

    getData(cardType: TILE_CONFIG) {
        switch (cardType) {
            case TILE_CONFIG.IMAGE_TEXT_IMAGE: return [this.getRandomThumbnailImage(), randomWords({ exactly: 1 })[0], this.getRandomSecondaryImage()];
            case TILE_CONFIG.IMAGE_IMAGE_IMAGE: return [this.getRandomThumbnailImage(), this.getRandomLabelImage(), this.getRandomSecondaryImage()];
            case TILE_CONFIG.IMAGE_IMAGE_TEXT: return [this.getRandomThumbnailImage(), this.getRandomSecondaryImage(), randomWords({ exactly: 1, maxLength: 8 })[0]];
            case TILE_CONFIG.TEXT_IMAGE_TEXT: return [randomWords({ exactly: 25, join: ' ' }), randomWords({ exactly: 1 })[0], this.getRandomSecondaryImage()];
        }
    }

    getRandomThumbnailImage() {
        return `assets/thumbnail/${Math.floor(Math.random() * 6)}.jpg`
    }


    getRandomSecondaryImage() {
        return `assets/emoji/${Math.floor(Math.random() * 6)}.png`
    }

    getRandomLabelImage() {
        return `assets/label/${Math.floor(Math.random() * 6)}.jpg`
    }
}