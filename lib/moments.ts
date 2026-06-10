export type Moment = {
  id: string;
  handle: string;
  caption: string;
  // emoji acts as a stand-in for an image — swap to real <img src> later
  emoji: string;
  bg: string; // tailwind bg class
};

export const MOMENTS: Moment[] = [
  {
    id: "m1",
    handle: "@sara.eats",
    caption: "Friday started early.",
    emoji: "🥯",
    bg: "bg-caramel/30",
  },
  {
    id: "m2",
    handle: "@deskcoffee",
    caption: "Found my coworker's Nomi.",
    emoji: "☕",
    bg: "bg-accent/30",
  },
  {
    id: "m3",
    handle: "@latenightowl",
    caption: "1am. No regrets.",
    emoji: "🌙",
    bg: "bg-teal/30",
  },
  {
    id: "m4",
    handle: "@studio.kai",
    caption: "Sketchbook + Classics = work.",
    emoji: "✏️",
    bg: "bg-cinnamon/30",
  },
  {
    id: "m5",
    handle: "@mom.of.three",
    caption: "Four Classics. Three forks.",
    emoji: "🍴",
    bg: "bg-caramel/40",
  },
  {
    id: "m6",
    handle: "@runner.j",
    caption: "Earned it. Twice.",
    emoji: "🏃",
    bg: "bg-accent/40",
  },
];
