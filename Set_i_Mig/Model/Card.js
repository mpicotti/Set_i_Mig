export default class card {

    constructor (suit, value){
        this._suit = suit;
        this._value = value;
    }

    
    get suit(){
        return this._suit;
    }

    get value(){
        return this._value;
    }

    set suit(suit){
        this._suit = suit;
    }
    

    set value(value){
        this._value = value;
    }

}