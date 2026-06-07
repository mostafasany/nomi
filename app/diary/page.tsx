import { PageShell } from "@/components/layout/PageShell";
import { DIARY } from "@/lib/diary";
import { DiaryCard } from "@/components/diary/DiaryCard";

export default function DiaryPage() {
  return (
    <PageShell
      eyebrow="The Roll Diary"
      title="Pairings, occasions, and bakery confessions."
      subtitle="Short reads on what to eat with a Nomi, when, and why."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {DIARY.map(entry => <DiaryCard key={entry.slug} entry={entry} />)}
      </div>
    </PageShell>
  );
}
