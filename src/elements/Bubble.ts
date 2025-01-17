import { Circle } from "../bases/Circle";
import { circleCollision, randomIntInRange } from "../utils";
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
  maxXFrame = 2;
  maxYFrame = 1;
  fps = 46;
  frameInterval = 1000 / this.fps;
  frameTimer = 0;

  toBeDestroyed: boolean = false;
  inAnimation: boolean = false;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.speed = randomIntInRange(2, 4);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "blue";
      ctx.stroke();
      ctx.closePath();

      ctx.setLineDash([4]);
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.game.player.x, this.game.player.y);
      ctx.stroke();
      ctx.closePath();
      ctx.setLineDash([0]);
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

  update(deltaTime: number) {
    if (circleCollision(this, this.game.player)) {
      this.inAnimation = true;
    }

    if (this.inAnimation) {
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if (this.frameX < this.maxXFrame) {
          this.frameX++;
        } else {
          this.frameX = 0;
          if (this.frameY < this.maxYFrame) {
            this.frameY++;
          } else {
            this.frameY = 0;
            this.toBeDestroyed = true;
          }
        }
      } else {
        this.frameTimer += deltaTime;
      }

      return;
    }

    this.y -= this.speed;
  }
}
