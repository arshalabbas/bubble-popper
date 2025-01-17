import { Circle } from "../bases/Circle";
import { Game } from "./Game";

export class Bubble implements Circle {
  x: number;
  y: number;
  radius: number = 30;
  game: Game;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }
  }
}
