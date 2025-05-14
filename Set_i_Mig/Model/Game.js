import Player from "./Player.js";
import Deck from "./Deck.js";


export default class Game {
    constructor () {
        this._deck = new Deck();
        this._player = "";
        this._computer = "";
        
        this._currentPlayerIndex = 0;
    }

    get deck(){
        return this._deck;
    }

    get player() {
        return this._player;
    }

    get computer() {
        return this._computer;
    }

    get currentPlayerIndex() {
        return this._currentPlayerIndex;
    }



    initGame() {
        this._deck.createDeck();
        this._deck.shuffle();

        this._player = new Player ("Player");
        this.player.money = 100;
        this._player.deck.push(this._deck.pop());
        
        this._computer = new Player("Computer");
        this._computer.deck.push(this._deck.pop());
    }

}