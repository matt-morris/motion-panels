export const clamp = (n: number, min: number = 0, max: number = 1) =>
  Math.min(Math.max(n, min), max)
