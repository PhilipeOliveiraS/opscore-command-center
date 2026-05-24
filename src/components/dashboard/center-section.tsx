"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Radio, AlertCircle, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simulated PE Nodes
const PE_NODES = [
  { id: "REC", name: "Recife Centro", x: "65%", y: "45%", type: "hub" },
  { id: "SUA", name: "Polo Suape", x: "55%", y: "75%", type: "hub" },
  { id: "JAB", name: "Jaboatão", x: "50%", y: "55%", type: "waypoint" },
  { id: "CAB", name: "Cabo de Sto Agostinho", x: "52%", y: "65%", type: "waypoint" },
  { id: "PAU", name: "Paulista", x: "62%", y: "30%", type: "waypoint" },
  { id: "IGA", name: "Igarassu", x: "60%", y: "20%", type: "waypoint" },
  { id: "GOI", name: "Goiana", x: "55%", y: "10%", type: "hub" },
  { id: "CAR", name: "Caruaru", x: "15%", y: "60%", type: "hub" },
];

const INITIAL_EVENTS = [
  { id: "EV-001", time: "Agora", msg: "Caminhão AN-204 iniciou entrega em Boa Viagem", type: "nominal" },
  { id: "EV-002", time: "T-2m", msg: "Margem operacional comprometida por tempo parado excessivo (AN-118)", type: "critical" },
  { id: "EV-003", time: "T-5m", msg: "Alta densidade operacional detectada na região de Suape", type: "operational" },
  { id: "EV-004", time: "T-12m", msg: "Entrega concluída com sucesso no polo industrial de Paulista", type: "nominal" },
];

const EVENT_POOL = [
  { msg: "Motorista José Carlos excedeu tempo ocioso em Jaboatão", type: "operational" },
  { msg: "Rota Recife Centro apresenta lentidão nível 3", type: "operational" },
  { msg: "AN-118 entrou em manutenção preventiva em Igarassu", type: "critical" },
  { msg: "Consumo de diesel acima da média detectado no AN-204", type: "critical" },
  { msg: "Abastecimento concluído: AN-305 retornando para base Suape", type: "nominal" },
  { msg: "Novo romaneio liberado para Caruaru (Carga Pesada)", type: "nominal" },
];

export function CenterSection() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      if (Math.random() > 0.6) {
        const newEvent = {
          id: `EV-${Math.floor(Math.random() * 1000)}`,
          time: "Agora",
          ...EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)]
        };
        setEvents(prev => [newEvent, ...prev.map(e => ({...e, time: e.time === "Agora" ? "T-1m" : e.time}))].slice(0, 5));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeDeliveries = [
    { id: "AN-204", route: "Suape -> Boa Viagem", status: "Em Rota", eta: "14:30", type: "efficiency", dev: "-2%" },
    { id: "AN-104", route: "Goiana -> Recife", status: "Atraso", eta: "16:45", type: "operational", dev: "+12%" },
    { id: "AN-551", route: "Caruaru -> Cabo", status: "Ocioso", eta: "--:--", type: "critical", dev: "+40%" },
    { id: "AN-220", route: "Paulista -> Igarassu", status: "Abastecimento", eta: "11:20", type: "operational", dev: "0%" },
    { id: "AN-318", route: "Jaboatão -> Suape", status: "Nominal", eta: "09:15", type: "efficiency", dev: "0%" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 h-[450px]">
      <Card className="col-span-1 lg:col-span-2 bg-card border-border/50 flex flex-col overflow-hidden relative group shadow-none rounded-sm">
        <CardHeader className="absolute top-0 left-0 z-20 w-full bg-gradient-to-b from-background/95 to-transparent pb-10 pt-4 px-4 border-b border-border/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[11px] font-semibold tracking-widest uppercase text-foreground flex items-center gap-2">
              <Radio className={`w-3.5 h-3.5 ${pulse ? 'text-efficiency' : 'text-muted-foreground'} transition-colors duration-500`} />
              Torre de Controle - Regional Pernambuco
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[8px] border-border/60 bg-background/50 font-mono text-muted-foreground">SETOR: NORDESTE-PE</Badge>
              <Badge variant="outline" className="text-[8px] border-efficiency/40 text-efficiency bg-efficiency/10 font-mono flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-efficiency animate-pulse" />
                SYNC 34ms
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 relative bg-background/50">
          {/* Deep technical map grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background opacity-90" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground)) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px', opacity: 0.1 }} />
          
          {/* Nodes Rendering */}
          {PE_NODES.map((node) => (
            <div key={node.id} className="absolute transition-transform hover:scale-125 z-10 group/node" style={{ left: node.x, top: node.y }}>
              <div className={`w-1.5 h-1.5 rounded-full ${node.type === 'hub' ? 'bg-primary shadow-[0_0_10px_hsl(var(--primary))]' : 'bg-muted-foreground'} relative`}>
                {node.type === 'hub' && <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-ping opacity-30" style={{ animationDuration: '3s' }} />}
              </div>
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[7px] font-mono text-muted-foreground whitespace-nowrap bg-background/80 px-1 border border-border/40 rounded opacity-50 group-hover/node:opacity-100 transition-opacity">
                {node.name}
              </span>
            </div>
          ))}

          {/* Simulated Active Trucks (Moving) */}
          <motion.div 
            animate={{ left: ["55%", "65%"], top: ["75%", "45%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute z-20"
          >
            <div className="w-2 h-2 rounded-sm bg-efficiency shadow-[0_0_12px_hsl(var(--efficiency-green))]" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-efficiency whitespace-nowrap bg-background/90 px-1 border border-efficiency/20 rounded">AN-204</span>
          </motion.div>

          <motion.div 
            animate={{ left: ["15%", "52%"], top: ["60%", "65%"] }}
            transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute z-20"
          >
            <div className="w-2 h-2 rounded-sm bg-operational shadow-[0_0_12px_hsl(var(--operational-orange))]" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-operational whitespace-nowrap bg-background/90 px-1 border border-operational/20 rounded">AN-104</span>
          </motion.div>

          <motion.div 
            className="absolute z-20 left-[62%] top-[30%]"
          >
            <div className="w-2 h-2 rounded-sm bg-critical shadow-[0_0_12px_hsl(var(--critical-red))] animate-pulse" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-critical whitespace-nowrap bg-background/90 px-1 border border-critical/20 rounded z-30">AN-551 (PARADO)</span>
          </motion.div>

          {/* Spatial scanning line effect */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
             <div className="w-full h-[1px] bg-primary/40 shadow-[0_0_8px_hsl(var(--primary))] animate-[scan_6s_linear_infinite] absolute top-0" />
          </div>
          
          {/* Static Route Trajectories */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none">
            {/* Suape to Recife */}
            <path d="M 55% 75% Q 60% 60% 65% 45%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeDasharray="2 4" />
            {/* Caruaru to Cabo */}
            <path d="M 15% 60% Q 35% 62% 52% 65%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeDasharray="2 4" />
            {/* Recife to Goiana */}
            <path d="M 65% 45% Q 62% 30% 55% 10%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeDasharray="2 4" />
          </svg>
        </CardContent>
      </Card>

      <div className="col-span-1 flex flex-col gap-3 h-[450px]">
        {/* Active Deliveries Widget */}
        <Card className="bg-card border-border/50 flex flex-col shadow-none rounded-sm flex-1 overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-2 pt-3 px-3 bg-secondary/10">
            <CardTitle className="text-[10px] font-semibold tracking-widest uppercase flex items-center gap-2">
              <Truck className="w-3 h-3 text-muted-foreground" />
              Manifestos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0 custom-scrollbar">
            <div className="flex flex-col">
              {activeDeliveries.map((delivery, i) => (
                <div key={i} className="flex flex-col gap-1.5 px-3 py-2 border-b border-border/30 hover:bg-secondary/20 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-bold text-foreground">{delivery.id}</span>
                    <Badge variant="outline" className={`text-[8px] uppercase tracking-wider px-1 py-0 rounded-[2px] font-semibold
                      ${delivery.type === 'efficiency' ? 'text-efficiency border-efficiency/20 bg-efficiency/5' : ''}
                      ${delivery.type === 'operational' ? 'text-operational border-operational/20 bg-operational/5' : ''}
                      ${delivery.type === 'critical' ? 'text-critical border-critical/20 bg-critical/5' : ''}
                    `}>
                      {delivery.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-muted-foreground">
                    <span className="flex items-center gap-1 font-mono">
                      <MapPin className="w-2 h-2 opacity-50" />
                      {delivery.route}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono bg-secondary/50 px-1 rounded">ETA {delivery.eta}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Event Feed Widget */}
        <Card className="bg-card border-border/50 flex flex-col shadow-none rounded-sm h-[180px] overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-2 pt-3 px-3 bg-secondary/10">
            <CardTitle className="text-[10px] font-semibold tracking-widest uppercase flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-muted-foreground" />
              Feed Operacional (Live)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 relative bg-background/30">
            <div className="flex flex-col absolute inset-0 overflow-hidden py-1">
              <AnimatePresence>
                {events.map((evt) => (
                  <motion.div 
                    key={evt.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col px-3 py-1.5 border-l-2 border-transparent hover:bg-secondary/20 transition-colors"
                    style={{
                      borderLeftColor: evt.type === 'critical' ? 'hsl(var(--critical-red))' : evt.type === 'operational' ? 'hsl(var(--operational-orange))' : 'hsl(var(--efficiency-green))'
                    }}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-mono text-[8px] text-muted-foreground">{evt.id}</span>
                      <span className="font-mono text-[8px] font-medium text-muted-foreground/70">{evt.time}</span>
                    </div>
                    <span className={`text-[10px] leading-tight font-medium
                      ${evt.type === 'critical' ? 'text-critical' : ''}
                      ${evt.type === 'operational' ? 'text-operational' : ''}
                      ${evt.type === 'nominal' ? 'text-foreground/90' : ''}
                    `}>
                      {evt.msg}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Adding a global style block for the map animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.8; }
          50% { opacity: 0.8; }
          90% { opacity: 0; }
          100% { transform: translateY(450px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
