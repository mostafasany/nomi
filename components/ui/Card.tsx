import { clsx } from "@/lib/clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Card({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag className={clsx(
      "rounded-3xl bg-glaze border border-cinnamon/10 p-6 shadow-sm",
      className
    )}>
      {children}
    </Tag>
  );
}
