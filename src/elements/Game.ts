import { Mouse } from "../controls/Mouse";
import { Player } from "./Player";

export class Game {
  width: number;
  height: number;
  player: Player;
  mouse: Mouse;

  // Settings
  debug: boolean = true;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.width = width;
    this.height = height;

    this.player = new Player(this, this.width / 2, this.height / 2);
    this.mouse = new Mouse(canvas);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Layer 0
    this.player.render(ctx);
  }

  update(deltaTime: number) {
    this.player.update(deltaTime);
  }
}
