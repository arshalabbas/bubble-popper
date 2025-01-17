import { Game } from "./Game";

export class Background {
  image: HTMLImageElement = document.getElementById("bg") as HTMLImageElement;
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, 0, this.game.width, this.game.height);
  }
}
