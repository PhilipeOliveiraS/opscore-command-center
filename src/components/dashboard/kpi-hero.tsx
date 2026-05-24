import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, ActivitySquare, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  {
    title: "Yield de Margem / KM",
    value: "R$ 4.82",
    trend: "+5.2%",
    trendUp: true,
    comparison: "vs ciclo anterior",
    insight: "Otimização Suape bem-sucedida",
    id: "KPI-01"
  },
  {
    title: "Impacto Projetado EBITDA",
    value: "R$ 284.5k",
    trend: "+12.4%",
    trendUp: true,
    comparison: "projeção de 30 dias",
    insight: "Alta rentabilidade no Litoral Sul",
    id: "KPI-02"
  },
  {
    title: "Utilização de Ativos",
    value: "94.6%",
    trend: "-1.2%",
    trendUp: false,
    comparison: "telemetria em tempo real",
    insight: "2 ativos pesados inoperantes",
    id: "KPI-03"
  },
  {
    title: "Índice de Ociosidade (KM)",
    value: "8.4%",
    trend: "-1.2%",
    trendUp: true, // down is good for unproductive KM
    comparison: "últimos 7 dias",
    insight: "Malha logística de Jaboatão ajustada",
    invertTrendColor: true,
    id: "KPI-04"
  },
  {
    title: "Queima de Diesel vs Rec.",
    value: "28.1%",
    trend: "+0.8%",
    trendUp: false, // up is bad for cost
    comparison: "vs limite base estabelecido",
    insight: "Variação índice macro de combustível",
    invertTrendColor: true,
    id: "KPI-05"
  }
];

export function KpiHero() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
      {kpis.map((kpi, idx) => {
        const isPositive = kpi.invertTrendColor ? !kpi.trendUp : kpi.trendUp;
        return (
          <Card key={idx} className="bg-card border-border/50 hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shadow-none">
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="p-3.5 lg:p-4 flex flex-col gap-2 relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{kpi.title}</span>
                <span className="text-[8px] font-mono text-muted-foreground/50">{kpi.id}</span>
              </div>
              
              <div className="flex items-end gap-2 mt-1">
                <span className="text-2xl font-mono font-bold tracking-tight text-foreground leading-none">{kpi.value}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs mt-0.5">
                <div className={cn(
                  "flex items-center font-mono font-medium text-[11px]",
                  isPositive ? "text-efficiency" : "text-critical"
                )}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {kpi.trend}
                  <span className="text-muted-foreground ml-1.5 font-sans font-normal tracking-tight">{kpi.comparison}</span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-border/40">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center leading-tight">
                  {isPositive ? (
                    <ActivitySquare className="w-3 h-3 mr-1.5 text-primary/50" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 mr-1.5 text-operational/50" />
                  )}
                  <span className="truncate">{kpi.insight}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
