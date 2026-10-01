import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  gold?: boolean;
}

export function Divider({ className, gold }: DividerProps) {
  return (
    <div
      className={cn(
        "w-20 h-[2px] my-6",
        gold ? "bg-gold-500" : "bg-white/20",
        className
      )}
    />
  );
}
