import { Circle } from "../bases/Circle";
import { randomInIntange } from "../utils";
import { Game } from "./Game";

export class Bubble implements Circle {
  x: number;
  y: number;
  radius: number = 40;
  game: Game;
  speed: number;
  image: HTMLImageElement = document.getElementById(
    "bubble"
  ) as HTMLImageElement;

  width = 105;
  height = 105;
  frameX = 0;
  frameY = 0;
  frameWidth = 512;
  frameHeight = 512;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.speed = randomInIntange(2, 4);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "blue";
      ctx.stroke();
      ctx.closePath();
    }

    ctx.drawImage(
      this.image,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  update() {
    this.y -= this.speed;
  }
}
