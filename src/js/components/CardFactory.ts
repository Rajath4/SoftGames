import { TILE_CONFIG } from "../constants/enums/TILE_CONFIG";
import { Card } from "../constants/interface/Card";
import ImageImageImageCard from "./Cards/ImageImageImageCard";
import ImageImageTextCard from "./Cards/ImageImageTextCard";
import ImageTextImageCard from "./Cards/ImageTextImageCard";
import TextImageTextCard from "./Cards/TextImageTextCard";

export default class CardFactory {
    constructor() {
        this.cardPool = new Map<TILE_CONFIG, Array<any>>();
    }

    getCard(cardType: TILE_CONFIG): Card {
        return (this.cardPool.has(cardType) && this.cardPool.get(cardType).length > 0) ? this.cardPool.get(cardType).pop() : this.generateCard(cardType);
    }

    puBackCard(cardType: TILE_CONFIG, card: any) {
        this.cardPool.has(cardType) ? this.cardPool.get(cardType).push(card) : this.cardPool.set(cardType, [card]);
    }

    generateCard(cardType: TILE_CONFIG) {
        switch (cardType) {
            case TILE_CONFIG.IMAGE_TEXT_IMAGE: return new ImageTextImageCard();
            case TILE_CONFIG.IMAGE_IMAGE_IMAGE: return new ImageImageImageCard();
            case TILE_CONFIG.IMAGE_IMAGE_TEXT: return new ImageImageTextCard();
            case TILE_CONFIG.TEXT_IMAGE_TEXT: return new TextImageTextCard();
        }
    }

    private cardPool: Map<TILE_CONFIG, Array<any>> = null;
}