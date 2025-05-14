
import Card from "./Card.js";

const SUITS = ['Espases', 'Oros' , 'Bastos' , 'Copes'];
const VALUES = [1,2,3,4,5,6,7,10,11,12];

export default class Deck{

    constructor(){
        this._cards = [];
    }

    get cards() {
        return this._cards;
    }

    pop() {
        return this._cards.shift();
    }

    push(Card) {
        this._cards.push(Card);
    }

    createDeck() {
        for (let suit of SUITS){
            for (let value of VALUES) {
                this._cards.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        for (let i = this._cards.length - 1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
        }
    }
}