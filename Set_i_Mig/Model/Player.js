import Deck from "./Deck.js";

export default class Player {
    constructor(name) {
        this._name = name;
        this._deck = new Deck();
        this._money = 0;
    }

    get name() {
        return this._name;
    }

    get deck() {
        return this._deck;
    }

    get money() {
        return this._money;
    }

    set name(name) {
        this._name = name;
    }

    set money(money) {
        this._money = money;
    }

    calculatePoints() {
        let total = 0;
        for (const card of this._deck.cards) {
            if (card.value >= 10) {
                total += 0.5;
            } else {
                total += card.value;
            }
        }
        return total;
    }
}
