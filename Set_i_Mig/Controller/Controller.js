import Game from "../Model/Game.js";
import View from "../View/View.js";

export default class Controller {
  constructor() {
    this._model = new Game();
    this._view = new View();

    this._model.initGame();

    this._demanarCartaBtn = document.getElementById("demanar-carta");
    this._plantarseBtn = document.getElementById("plantar-se");
    this._resetBtn = document.getElementById("reset");
    this._ferApostaBtn = document.getElementById("fer-aposta");
    this._inputAposta = document.getElementById("input-aposta");

    this._demanarCartaBtn.addEventListener("click", () => this.demanarCarta());
    this._plantarseBtn.addEventListener("click", () => this.plantarSe());
    this._resetBtn.addEventListener("click", () => this.resetGame());
    this._ferApostaBtn.addEventListener("click", () => this.ferAposta());

    this._apostaActual = 0;
    this._view.updateSaldo(this._model.player.money);
  }

  run() {
    this._view.render(this._model.player, this._model.computer);
  }

  ferAposta() {
    const aposta = parseInt(this._inputAposta.value);
    if (isNaN(aposta) || aposta <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Aposta invàlida",
        text: "Introdueix una aposta vàlida.",
      });
      return;
    }

    if (aposta > this._model.player.money) {
      Swal.fire({
        icon: "error",
        title: "Sense diners",
        text: "No tens prou diners per fer aquesta aposta.",
      });
      return;
    }

    this._apostaActual = aposta;
    this._model.player.money -= aposta;
    this._view.updateSaldo(this._model.player.money);
    this._ferApostaBtn.disabled = true;
  }

  demanarCarta() {
    if (this._apostaActual <= 0) {
      Swal.fire({
        icon: "info",
        title: "Fes una aposta",
        text: "Has de fer una aposta abans de demanar carta.",
      });
      return;
    }

    this._model.player.deck.push(this._model.deck.pop());
    this._view.render(this._model.player, this._model.computer);

    const punts = this.calcularPunts(this._model.player);
    if (punts > 7.5) {
      this._view.updateSaldo(this._model.player.money);
      Swal.fire({
        icon: "error",
        title: "T'has passat!",
        text: "Has perdut aquesta ronda.",
      });
      this.disableButtons();
    }
  }

  jugadaBanca() {
    const jugadorPunts = this.calcularPunts(this._model.player);
    const bancaPunts = this.calcularPunts(this._model.computer);

      if (this.calcularPunts(this._model.computer) < jugadorPunts && this.calcularPunts(this._model.computer) <= 7.5) {
      this._model.computer.deck.push(this._model.deck.pop());
      this._view.render(this._model.player, this._model.computer);

     setTimeout(this.jugadaBanca, 1000)
    } else {
        if (bancaPunts > 7.5 || jugadorPunts > bancaPunts) {
            this._model.player.money += this._apostaActual * 2;
            this._view.updateSaldo(this._model.player.money);
            Swal.fire({
              icon: "success",
              title: "Has guanyat! 🎉",
              text: `Ara tens ${this._model.player.money} monedes.`,
            });
          } else if (jugadorPunts === bancaPunts) {
            this._model.player.money += this._apostaActual;
            this._view.updateSaldo(this._model.player.money);
      
            Swal.fire({
              icon: "info",
              title: "Empat 🤝",
              text: "Recuperes l'aposta.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Has perdut 😢",
              text: "La banca ha guanyat aquesta ronda.",
            });
          }
      
          this.disableButtons();
        }
    }
  


  plantarSe() {
    const jugadorPunts = this.calcularPunts(this._model.player);
    this.jugadaBanca()

    const bancaPunts = this.calcularPunts(this._model.computer);
  }
    

  calcularPunts(player) {
    return player.deck.cards.reduce((acc, carta) => {
      if (carta.value >= 10) {
        return acc + 0.5;
      }
      return acc + carta.value;
    }, 0);
}

  resetGame() {
    this._model = new Game();
    this._model.initGame();
    this._apostaActual = 0;
    this._view.clearResultat();
    this._view.render(this._model.player, this._model.computer);
    this._view.updateSaldo(this._model.player.money);
    this.enableButtons();
    this._ferApostaBtn.disabled = false;
  }

  disableButtons() {
    this._demanarCartaBtn.disabled = true;
    this._plantarseBtn.disabled = true;
  }

  enableButtons() {
    this._demanarCartaBtn.disabled = false;
    this._plantarseBtn.disabled = false;
  }
}