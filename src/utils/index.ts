import { Circle } from "../bases/Circle";

export function randomInIntange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function circleCollision(c1: Circle, c2: Circle) {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  const distance = Math.hypot(dx, dy);

  if (distance < c1.radius + c2.radius) return true;
  return false;
}
