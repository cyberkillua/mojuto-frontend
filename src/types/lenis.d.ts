interface LenisOptions {
  smooth?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  infinite?: boolean;
  // Add any other missing properties if they cause issues
}

declare class Lenis {
  constructor(options?: LenisOptions);
  // Add other Lenis methods you use, e.g.,
  raf(time: number): void;
  scrollTo(target: number | HTMLElement, options?: { offset?: number; duration?: number; easing?: (t: number) => number; immediate?: boolean; lock?: boolean; force?: boolean; }): void;
  destroy(): void;
  on(event: string, callback: (args: any) => void): void;
  off(event: string, callback: (args: any) => void): void;
  // ... other methods
}

declare module 'lenis' {
  export default Lenis;
}
