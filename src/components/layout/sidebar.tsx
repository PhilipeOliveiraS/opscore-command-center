import Link from "next/link";
import { 
  LayoutDashboard, 
  Map, 
  Truck, 
  LineChart, 
  Network, 
  Settings, 
  BellRing
} from "lucide-react";

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Comando", active: true },
    { icon: Network, label: "Rede Telemétrica" },
    { icon: Truck, label: "Ativos e Frota" },
    { icon: LineChart, label: "Ops Financeira" },
    { icon: Map, label: "Inteligência Espacial" },
  ];

  return (
    <aside className="w-16 lg:w-20 hidden md:flex flex-col bg-background border-r border-border/60 h-screen py-4 items-center justify-between z-20">
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Brand / Logo placeholder */}
        <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          ÁN
        </div>

        <nav className="flex flex-col gap-2 w-full px-3">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              href="#" 
              className={`w-full aspect-square rounded-md flex flex-col items-center justify-center gap-1.5 transition-all duration-200 group relative ${
                item.active 
                ? "bg-secondary/60 text-foreground border border-border/50" 
                : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground border border-transparent"
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-1/2 bg-foreground rounded-r-full" />
              )}
              <item.icon className={`w-4 h-4 ${item.active ? 'text-foreground' : 'group-hover:text-foreground/80 transition-colors'}`} strokeWidth={item.active ? 2.5 : 2} />
              <span className="text-[8px] font-semibold tracking-wider uppercase text-center leading-tight hidden lg:block opacity-80 group-hover:opacity-100">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 w-full px-3">
        <button className="w-full aspect-square rounded-md flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:bg-secondary/30 hover:text-foreground border border-transparent transition-all relative group">
          <BellRing className="w-4 h-4 group-hover:text-foreground/80 transition-colors" />
          <span className="text-[8px] font-semibold tracking-wider uppercase hidden lg:block opacity-80 group-hover:opacity-100">Alertas</span>
          <span className="absolute top-2 right-2 lg:right-3 w-1.5 h-1.5 rounded-sm bg-critical animate-pulse" />
        </button>
        <button className="w-full aspect-square rounded-md flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:bg-secondary/30 hover:text-foreground border border-transparent transition-all group">
          <Settings className="w-4 h-4 group-hover:text-foreground/80 transition-colors" />
          <span className="text-[8px] font-semibold tracking-wider uppercase hidden lg:block opacity-80 group-hover:opacity-100">Config</span>
        </button>
      </div>
    </aside>
  );
}
