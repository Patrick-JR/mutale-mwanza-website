import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "full" | "narrow";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  const sizes = {
    default: "max-w-7xl",
    full: "max-w-full",
    narrow: "max-w-5xl",
  };

  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}
