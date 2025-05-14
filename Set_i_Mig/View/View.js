const CARD_WIDTH = 208;
const CARD_HEIGHT = 319;
const CARD_SUIT = { 'Oros': 0, 'Copes': 1, 'Espases': 2, 'Bastos': 3 };

export default class View {
    constructor() {
        this._DivPlayerDeck = document.getElementById('player-deck');
        this._DivComputerDeck = document.getElementById('computer-deck');
        this._DivResultat = document.getElementById('resultat');
        this._saldo = document.getElementById('saldo');
    }

    render(player, computer) {
        this._DivPlayerDeck.innerHTML = '';
        this._DivComputerDeck.innerHTML = '';

        player.deck.cards.forEach(card => {
            const cardDiv = this.generateDivCard(card);
            this._DivPlayerDeck.appendChild(cardDiv);
        });

        computer.deck.cards.forEach(card => {
            const cardDiv = this.generateDivCard(card);
            this._DivComputerDeck.appendChild(cardDiv);
        });
    }

    generateDivCard(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        cardDiv.style.backgroundPositionX = `-${(card.value - 1) * CARD_WIDTH}px`;
        cardDiv.style.backgroundPositionY = `-${CARD_SUIT[card.suit] * CARD_HEIGHT}px`;

        return cardDiv;
    }

    showResultat(message) {
        this._DivResultat.textContent = message;
    }
    
    clearResultat() {
        this._DivResultat.textContent = '';
    }

    updateSaldo(diners) {
        this._saldo.textContent = diners;
    }
}
