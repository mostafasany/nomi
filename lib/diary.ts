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
    excerpt: "A Classic Nomi + a flat white is a hug in two parts.",
    body: "We tested 7 coffees. The winner pairs notes of brown sugar with our cream cheese glaze.",
    date: "2026-05-22",
    tag: "pairings",
  },
  {
    slug: "office-wins",
    title: "Office Wins, Classic-Sized",
    excerpt: "A box of Classics at 10am: a love language.",
    body: "Sharing 24 Classics with 6 coworkers turns any Tuesday into a soft launch of joy.",
    date: "2026-05-15",
    tag: "occasions",
  },
  {
    slug: "the-swirl-method",
    title: "The Swirl Method",
    excerpt: "How we get those soft, fluffy layers every time.",
    body: "Slow proving and a light hand on the roll give us layers that pull apart instead of squashing.",
    date: "2026-05-01",
    tag: "behind-the-bake",
  },
];
