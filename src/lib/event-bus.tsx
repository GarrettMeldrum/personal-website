import { EventEmitter } from "events";

export interface NowPlaying {
  track: string;
  artist: string;
  album?: string;
}

const GLOBAL_KEY = "__NOW_PLAYING_BUS__";

const bus: EventEmitter =
  (globalThis as any)[GLOBAL_KEY] || new EventEmitter();

bus.setMaxListeners(0);

if (!(globalThis as any)[GLOBAL_KEY]) {
  (globalThis as any)[GLOBAL_KEY] = bus;
}

export { bus };