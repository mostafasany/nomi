export type DiaryEntry = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  tag: "pairings" | "occasions" | "behind-the-bake";
};

export const DIARY: DiaryEntry[] = [
  {
    slug: "the-perfect-pour",
    title: "The Perfect Pour: Coffee × Cinnamon",
    excerpt: "A medium Nomi + a flat white is a hug in two parts.",
    body: "We tested 7 coffees. The winner pairs notes of brown sugar with our cream cheese glaze.",
    date: "2026-05-22",
    tag: "pairings",
  },
  {
    slug: "office-wins",
    title: "Office Wins, Bite-Sized",
    excerpt: "A box of Bites at 10am: a love language.",
    body: "Sharing 24 Bites with 6 coworkers turns any Tuesday into a soft launch of joy.",
    date: "2026-05-15",
    tag: "occasions",
  },
  {
    slug: "the-swirl-method",
    title: "The Swirl Method",
    excerpt: "Why our spiral has 11 turns. Not 10, not 12.",
    body: "Eleven is the sweet spot between dough surface area and filling distribution.",
    date: "2026-05-01",
    tag: "behind-the-bake",
  },
];
