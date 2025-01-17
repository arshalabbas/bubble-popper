import { Mouse } from "../controls/Mouse";
import { randomIntInRange } from "../utils";
import { Background } from "./Background";
import { Ball } from "./Ball";
import { Bubble } from "./Bubble";
import { Player } from "./Player";

export class Game {
  width: number;
  height: number;
  mouse: Mouse;

  // Settings
  debug: boolean = false; // DEBUG
  bubbleSpawnInterval = 1000;

  // elements
  background: Background;
  player: Player;
  bubbles: Bubble[] = [];
  balls: Ball[] = [];

  // States
  bubbleSpawnTimer = 0;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.width = width;
    this.height = height;

    this.background = new Background(this);
    this.player = new Player(this, this.width / 2, this.height / 2);
    this.mouse = new Mouse(canvas);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Layer 0
    this.background.render(ctx);

    // Layer 1
    this.balls.forEach((ball) => {
      ball.render(ctx);
    });

    // Layer 2
    this.player.render(ctx);

    // Layer 3
    this.bubbles.forEach((bubble) => {
      bubble.render(ctx);
    });
  }

  update(deltaTime: number) {
    this.player.update(deltaTime);

    this.generateBubble(deltaTime);

    this.bubbles.forEach((bubble, index) => {
      bubble.update(deltaTime);
      if (bubble.toBeDestroyed || bubble.y < -bubble.radius) {
        this.bubbles.splice(index, 1);
        index++;
      }
    });

    this.balls.forEach((ball, index) => {
      ball.update();
      if (ball.y < -ball.radius) {
        this.balls.splice(index, 1);
        index++;
      }
    });
  }

  generateBubble(deltaTime: number) {
    if (this.bubbleSpawnTimer > this.bubbleSpawnInterval) {
      this.bubbleSpawnTimer = 0;

      const bubbleX = randomIntInRange(0, this.width);
      this.bubbles.push(new Bubble(this, bubbleX, this.height + 100));

      if (Math.random() > 0.5) {
        this.balls.push(new Ball(this));
      }
    } else {
      this.bubbleSpawnTimer += deltaTime;
    }
  }
}
