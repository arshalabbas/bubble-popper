import { Game } from "./elements/Game";
import "./style.css";

const canvas = document.querySelector("#game") as HTMLCanvasElement;
canvas.width = 650;
canvas.height = 500;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const game = new Game(canvas, canvas.width, canvas.height);

let lastTime = 0;
function run(timeStamp: number) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.update(deltaTime);
  game.render(ctx);

  requestAnimationFrame(run);
}

run(0);
