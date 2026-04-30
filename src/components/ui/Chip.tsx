import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
  icon?: React.ReactNode;
}

export function Chip({ children, className, pulse, icon }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs font-mono text-text-mute",
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
      )}
      {icon}
      {children}
    </span>
  );
}
