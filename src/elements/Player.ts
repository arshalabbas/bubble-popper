import { Circle } from "../bases/Circle";
import { Game } from "./Game";

export class Player implements Circle {
  game: Game;
  x: number;
  y: number;
  radius: number = 30;
  imageLeft: HTMLImageElement = document.getElementById(
    "fish-left"
  ) as HTMLImageElement;
  imageRight: HTMLImageElement = document.getElementById(
    "fish-right"
  ) as HTMLImageElement;
  frameWidth: number = 498;
  frameHeight: number = 327;
  width: number = 83;
  height: number = 54.5;
  frameX: number = 0;
  frameY: number = 0;
  maxFrameX: number = 3;
  maxFrameY: number = 2;
  fps = 15;
  frameInterval = 1000 / this.fps;
  frameTimer = 0;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "red";
      ctx.stroke();
      ctx.closePath();
    }

    const mouse = this.game.mouse;

    ctx.drawImage(
      mouse.x < this.x ? this.imageLeft : this.imageRight,
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
    const dx = this.x - this.game.mouse.x;
    const dy = this.y - this.game.mouse.y;

    if (this.game.mouse.x !== this.x) {
      this.x -= dx / 30;
    }

    if (this.game.mouse.y !== this.y) {
      this.y -= dy / 30;
    }

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrameX) {
        this.frameX++;
      } else {
        this.frameX = 0;
        if (this.frameY < this.maxFrameY) {
          this.frameY++;
        } else this.frameY = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }
}
