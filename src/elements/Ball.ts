import { Circle } from "../bases/Circle";
import { circleCollision, randomIntInRange } from "../utils";
import { Game } from "./Game";
import { PlayerState } from "./Player";

const ballImages = [
  document.getElementById("ball1") as HTMLImageElement,
  document.getElementById("ball2") as HTMLImageElement,
];

export class Ball implements Circle {
  game: Game;
  x: number;
  y: number;
  radius: number = 50;
  speed: number;
  width = this.radius * 2;
  height = this.radius * 2;

  image: HTMLImageElement =
    ballImages[Math.floor(Math.random() * ballImages.length)];

  constructor(game: Game) {
    this.game = game;
    this.x = randomIntInRange(0, this.game.width);
    this.y = this.game.height + this.radius * 2;

    this.speed = randomIntInRange(4, 7);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );

    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "aqua";
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.setLineDash([4]);
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.game.player.x, this.game.player.y);
      ctx.strokeStyle = "red";
      ctx.stroke();
      ctx.closePath();
      ctx.setLineDash([0]);
    }
  }

  update() {
    if (
      this.game.player.state !== PlayerState.InPain &&
      circleCollision(this, this.game.player)
    ) {
      this.game.player.state = PlayerState.InPain;
      this.speed *= 3;
    }
    this.y -= this.speed;
  }
}
