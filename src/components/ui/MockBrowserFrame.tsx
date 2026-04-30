import { cn } from "@/lib/utils";

interface MockBrowserFrameProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
}

export function MockBrowserFrame({ children, className, url = "velora.app" }: MockBrowserFrameProps) {
  return (
    <div className={cn("glass rounded-xl overflow-hidden", className)}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/[0.12]" />
          <span className="w-3 h-3 rounded-full bg-white/[0.12]" />
          <span className="w-3 h-3 rounded-full bg-white/[0.12]" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white/[0.06] rounded-md px-3 py-1 text-xs font-mono text-text-mute text-center max-w-xs mx-auto">
            {url}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="relative aspect-video bg-bg/50">
        {children}
      </div>
    </div>
  );
}
