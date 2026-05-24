import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, Zap, ActivitySquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RightSidebar() {
  const alerts = [
    {
      id: "EVT-8991",
      type: "critical",
      title: "Degradação de Margem: Rota 101",
      desc: "Nó logístico BR-101 (Paulista-Goiana) projeta desvio de -15% de margem. Queima de combustível 4.2% acima do modelo preditivo.",
      time: "T-2m",
      icon: AlertTriangle
    },
    {
      id: "EVT-8990",
      type: "operational",
      title: "Telemetria: Anomalia de RPM",
      desc: "Ativo AN-204 excedeu banda ideal de RPM em 12% durante trânsito na via Mangue (Recife).",
      time: "T-14m",
      icon: Info
    },
    {
      id: "EVT-8989",
      type: "efficiency",
      title: "Modelo de Otimização Dinâmica",
      desc: "O desvio de 3 ativos pesados para o polo de Suape projeta impacto de +R$4.2k no EBITDA semanal.",
      time: "T-1h",
      icon: Zap
    },
    {
      id: "EVT-8988",
      type: "critical",
      title: "Manutenção Preventiva Exigida",
      desc: "Limiar térmico do AN-118 excedido. SLA de manutenção preventiva violado em 400km.",
      time: "T-2h",
      icon: AlertTriangle
    },
    {
      id: "EVT-8987",
      type: "operational",
      title: "Gargalo no Nó Logístico",
      desc: "Tempo de carregamento no terminal de Igarassu 18% acima da mediana. Arraste operacional detectado.",
      time: "T-3h",
      icon: ActivitySquare
    }
  ];

  return (
    <Card className="h-full flex flex-col bg-card border-border/50 shadow-none rounded-sm">
      <CardHeader className="border-b border-border/40 pb-3 pt-4 px-4 bg-secondary/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-sm bg-operational animate-pulse" />
            Eventos Telemétricos IA
          </CardTitle>
          <span className="text-[9px] font-mono text-muted-foreground border border-border/50 px-1 rounded">LIVE</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="px-4 py-3.5 border-b border-border/30 hover:bg-secondary/20 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex gap-3">
                  <div className={`mt-0.5 p-1 rounded-sm h-fit border
                    ${alert.type === 'critical' ? 'bg-critical/5 text-critical border-critical/20' : ''}
                    ${alert.type === 'operational' ? 'bg-operational/5 text-operational border-operational/20' : ''}
                    ${alert.type === 'efficiency' ? 'bg-efficiency/5 text-efficiency border-efficiency/20' : ''}
                  `}>
                    <alert.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{alert.title}</span>
                      <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">{alert.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed line-clamp-2">
                      {alert.desc}
                    </p>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-[8px] font-mono text-muted-foreground/50">{alert.id}</span>
                      <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Analisar &rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
