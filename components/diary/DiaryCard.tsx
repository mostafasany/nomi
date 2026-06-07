import { DiaryEntry } from "@/lib/diary";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function DiaryCard({ entry }: { entry: DiaryEntry }) {
  return (
    <Card as="article" className="h-full flex flex-col">
      <Badge>{entry.tag}</Badge>
      <h3 className="mt-3 font-display text-2xl font-bold text-cinnamon">{entry.title}</h3>
      <p className="mt-2 text-cocoa/70 flex-1">{entry.excerpt}</p>
      <p className="mt-4 text-xs text-cocoa/50">{entry.date}</p>
    </Card>
  );
}
