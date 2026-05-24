import { Search, ChevronRight, ActivitySquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-14 border-b border-border/60 bg-background/95 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Breadcrumbs - Technical Format */}
      <div className="flex items-center text-xs text-muted-foreground font-mono tracking-tight">
        <span className="font-semibold text-foreground tracking-normal uppercase">Água Nova</span>
        <ChevronRight className="w-3 h-3 mx-2 text-border" />
        <span className="uppercase tracking-widest text-[10px] font-semibold text-muted-foreground">Ops Logística</span>
        <ChevronRight className="w-3 h-3 mx-2 text-border" />
        <span className="text-foreground font-medium uppercase tracking-widest text-[10px]">Centro de Comando</span>
      </div>

      {/* Center - Technical Search */}
      <div className="hidden md:flex relative max-w-lg w-full mx-8 group">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          type="text"
          placeholder="Consultar telemetria, rotas ou ID de ativos..."
          className="w-full bg-secondary/30 border border-border/50 rounded pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-primary/30 focus:bg-secondary/50 transition-all placeholder:text-muted-foreground/70 font-mono"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden lg:inline-flex h-4 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground opacity-100">
            <span className="text-[9px]">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right - Telemetry Status */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <ActivitySquare className="w-3.5 h-3.5 text-efficiency" />
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold leading-none mb-0.5">Telemetria</span>
            <span className="text-xs font-mono font-medium text-foreground leading-none">99.98%</span>
          </div>
        </div>

        <div className="w-px h-6 bg-border/60" />

        <div className="flex items-center gap-2.5">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold leading-none mb-0.5">Frota Ativa</span>
            <span className="text-xs font-mono font-medium text-foreground leading-none">7<span className="text-muted-foreground">/14</span></span>
          </div>
          <Badge variant="outline" className="bg-efficiency/5 text-efficiency border-efficiency/20 flex gap-1.5 px-1.5 py-0 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-sm bg-efficiency animate-pulse opacity-80" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Live</span>
          </Badge>
        </div>
      </div>
    </header>
  );
}
