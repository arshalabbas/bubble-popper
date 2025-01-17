import { Game } from "./Game";

export class UI {
  game: Game;

  // HP
  hpImage: HTMLImageElement = document.getElementById("hp") as HTMLImageElement;
  hpX = 20;
  hpY = 40;
  hpWidth = 20;
  hpHeight = 20;
  constructor(game: Game) {
    this.game = game;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = "24px sans-serif";
    ctx.fillText(this.game.score.toString().padStart(4, "0"), 20, 30);

    for (let i = 1; i < this.game.player.health + 1; i++) {
      ctx.drawImage(
        this.hpImage,
        i * this.hpX,
        this.hpY,
        this.hpWidth,
        this.hpHeight
      );
    }
  }
}
