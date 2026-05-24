"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Info,
  Zap,
  ActivitySquare,
  BrainCircuit,
  ShieldAlert,
  Truck,
  Activity,
  Crosshair
} from "lucide-react";

// ============================================================================
// DATA: Feed Operacional (Live)
// ============================================================================

const INITIAL_FEED = [
  { displayId: "OPS-204", asset: "AN-204", time: "Agora", msg: "Consumo de diesel acima da média detectado", type: "critical" },
  { displayId: "OPS-305", asset: "AN-305", time: "T-1m", msg: "Abastecimento concluído: retornando à base", type: "nominal" },
  { displayId: "OPS-118", asset: "AN-118", time: "T-2m", msg: "Margem operacional comprometida na rota", type: "operational" },
  { displayId: "OPS-551", asset: "AN-551", time: "T-5m", msg: "Predição de manutenção preventiva em 48h", type: "critical" },
];

const FEED_POOL = [
  { displayId: "OPS-104", asset: "AN-104", msg: "Rota Recife Centro apresenta lentidão severa", type: "operational" },
  { displayId: "OPS-220", asset: "AN-220", msg: "Novo romaneio liberado (Carga Pesada)", type: "nominal" },
  { displayId: "OPS-318", asset: "AN-318", msg: "IA detectou desvio fora do padrão histórico", type: "critical" },
  { displayId: "OPS-412", asset: "AN-412", msg: "Otimização de rota aplicada autonomamente", type: "efficiency" },
  { displayId: "OPS-772", asset: "AN-772", msg: "Sincronia de comboio reestabelecida", type: "nominal" },
];

// ============================================================================
// DATA: Eventos Telemétricos IA
// ============================================================================

const INITIAL_TELEMETRY = [
  {
    id: "EVT-8991",
    type: "critical",
    title: "Degradação de Margem: Rota 101",
    desc: "Nó logístico BR-101 projeta desvio de -15% de margem. Queima de combustível 4.2% acima do modelo preditivo.",
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

const TIMED_EVENTS = [
  {
    id: "EVT-8992",
    type: "efficiency",
    title: "Reescalonamento Autônomo Ativo",
    desc: "Motor IA redirecionou AN-412 evitando congestionamento. Economia projetada de 38min e 12L de diesel.",
    time: "Agora",
    icon: BrainCircuit
  },
  {
    id: "EVT-8993",
    type: "critical",
    title: "Risco de Violação de SLA",
    desc: "Carga perecível no AN-905 apresenta risco de 84% de perda de janela de entrega devido a condições climáticas.",
    time: "Agora",
    icon: Crosshair
  }
];

// ============================================================================
// Component
// ============================================================================

export function RightSidebar() {
  const [feedEvents, setFeedEvents] = useState(
    INITIAL_FEED.map((evt) => ({ ...evt, internalKey: `key-${evt.asset}-${Date.now()}` }))
  );

  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);

  // Injeção do Feed Operacional
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedEvents((prev) => {
        const lastMsg = prev[0]?.msg;
        const available = FEED_POOL.filter((evt) => evt.msg !== lastMsg);
        const randomEvent = available[Math.floor(Math.random() * available.length)];

        const newEvent = {
          ...randomEvent,
          internalKey: `key-${randomEvent.asset}-${Date.now()}-${Math.random()}`,
          time: "Agora",
        };

        const updatedPrev = prev.map((evt, idx) => ({
          ...evt,
          time: idx === 0 && evt.time === "Agora" ? "T-1m" :
            idx === 1 && evt.time === "T-1m" ? "T-2m" :
              idx === 2 && evt.time === "T-2m" ? "T-5m" : evt.time,
        }));

        return [newEvent, ...updatedPrev].slice(0, 4);
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Injeção da Telemetria (15s e 30s)
  useEffect(() => {
    const t1 = setTimeout(() => {
      setTelemetry((prev) => [TIMED_EVENTS[0], ...prev]);
    }, 15000);

    const t2 = setTimeout(() => {
      setTelemetry((prev) => [TIMED_EVENTS[1], ...prev]);
    }, 30000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    // h-full garante que ele expanda preenchendo os 824px exigidos pelo page.tsx
    // gap-6 alinha o espaçamento interno com o espaçamento do grid principal
    <div className="flex flex-col gap-6 h-full">

      {/* ================================================================== */}
      {/* CSS CUSTOMIZADO PARA HOVER-SCROLL                                  */}
      {/* ================================================================== */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-scroll-container {
          overflow-y: auto;
          overflow-x: hidden;
        }
        .hover-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .hover-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .hover-scroll-container::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 10px;
          transition: background-color 0.3s ease;
        }
        .hover-scroll-container:hover::-webkit-scrollbar-thumb {
          background-color: hsl(var(--border) / 0.8);
        }
      `}} />

      {/* ================================================================== */}
      {/* CARD 1: FEED OPERACIONAL (Altura aumentada para 320px)             */}
      {/* ================================================================== */}
      <Card className="h-[320px] shrink-0 flex flex-col bg-card border-border/50 shadow-none rounded-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-2 pt-3 px-3 bg-secondary/10 shrink-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[10px] font-semibold tracking-widest uppercase flex items-center gap-2">
              <BrainCircuit className="w-3 h-3 text-primary" />
              Feed Operacional (Live)
            </CardTitle>
            <Badge variant="outline" className="text-[8px] border-primary/30 text-primary bg-primary/5 font-mono">
              IA ACTIVE
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 min-h-0 overflow-hidden p-0 relative bg-background/30">
          <div className="flex flex-col overflow-hidden py-1">
            <AnimatePresence mode="popLayout">
              {feedEvents.map((evt) => (
                <motion.div
                  key={evt.internalKey}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col px-3 py-2 border-l-2 hover:bg-secondary/20 transition-colors"
                  style={{
                    borderLeftColor:
                      evt.type === "critical" ? "hsl(var(--critical-red))" :
                        evt.type === "operational" ? "hsl(var(--operational-orange))" : "hsl(var(--efficiency-green))",
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      {evt.type === "critical" && <ShieldAlert className="w-3 h-3 text-critical" />}
                      {evt.type === "operational" && <Activity className="w-3 h-3 text-operational" />}
                      {evt.type === "nominal" || evt.type === "efficiency" ? <Truck className="w-3 h-3 text-efficiency" /> : null}
                      <span className="font-mono text-[9px] font-semibold text-foreground">
                        {evt.displayId}
                      </span>
                      <span className="font-mono text-[8px] text-muted-foreground ml-1">
                        [{evt.asset}]
                      </span>
                    </div>
                    <span className="font-mono text-[8px] font-medium text-muted-foreground/70">{evt.time}</span>
                  </div>
                  <span className={`text-[10px] leading-tight font-medium
                    ${evt.type === "critical" ? "text-critical" : ""}
                    ${evt.type === "operational" ? "text-operational" : ""}
                    ${evt.type === "nominal" || evt.type === "efficiency" ? "text-foreground/90" : ""}
                  `}>
                    {evt.msg}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* CARD 2: EVENTOS TELEMÉTRICOS IA (Flex dinâmico até o fundo)        */}
      {/* ================================================================== */}
      <Card className="flex-1 min-h-0 flex flex-col bg-card border-border/50 shadow-none rounded-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-3 pt-4 px-4 bg-secondary/10 shrink-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-sm bg-operational animate-pulse" />
              Eventos Telemétricos IA
            </CardTitle>
            <span className="text-[9px] font-mono text-muted-foreground border border-border/50 px-1 rounded bg-background/50">
              {telemetry.length} REGISTROS
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 min-h-0 p-0 relative">
          <div className="absolute inset-0 hover-scroll-container">
            <div className="flex flex-col pb-2">
              <AnimatePresence>
                {telemetry.map((alert) => (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 py-3.5 border-b border-border/30 hover:bg-secondary/20 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex gap-3">
                      <div className={`mt-0.5 p-1 rounded-sm h-fit border shrink-0
                        ${alert.type === 'critical' ? 'bg-critical/5 text-critical border-critical/20' : ''}
                        ${alert.type === 'operational' ? 'bg-operational/5 text-operational border-operational/20' : ''}
                        ${alert.type === 'efficiency' ? 'bg-efficiency/5 text-efficiency border-efficiency/20' : ''}
                      `}>
                        <alert.icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {alert.title}
                          </span>
                          <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap shrink-0">
                            {alert.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground/80 leading-relaxed line-clamp-2">
                          {alert.desc}
                        </p>
                        <div className="mt-1 flex justify-between items-center">
                          <span className="text-[8px] font-mono text-muted-foreground/50">{alert.id}</span>
                          <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            Analisar &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}