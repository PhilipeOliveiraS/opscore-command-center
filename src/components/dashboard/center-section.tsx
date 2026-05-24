"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Radio, Truck } from "lucide-react";
import { motion } from "framer-motion";

// ============================================================================
// 14 NÓS LOGÍSTICOS (Mapeados milimetricamente para a imagem fornecida)
// ============================================================================

const PE_NODES = [
  { id: "REC", name: "Recife", x: "89%", y: "42%", type: "hub" },
  { id: "JAB", name: "Jaboatão", x: "85%", y: "53%", type: "hub" },
  { id: "CAB", name: "Cabo de Sto Agostinho", x: "82%", y: "70%", type: "hub" },
  { id: "IGA", name: "Igarassu", x: "91%", y: "14%", type: "waypoint" },
  { id: "PAU", name: "Paulista", x: "93%", y: "24%", type: "waypoint" },
  { id: "OLI", name: "Olinda", x: "94%", y: "34%", type: "waypoint" },
  { id: "S-LOU", name: "São Lourenço", x: "82%", y: "34%", type: "waypoint" },
  { id: "MOR", name: "Moreno", x: "78%", y: "47%", type: "waypoint" },
  { id: "VIT", name: "Vitória de S. Antão", x: "68%", y: "47%", type: "hub" },
  { id: "POM", name: "Pombos", x: "62%", y: "51%", type: "waypoint" },
  { id: "GRA", name: "Gravatá", x: "51%", y: "58%", type: "waypoint" },
  { id: "BEZ", name: "Bezerros", x: "41%", y: "62%", type: "waypoint" },
  { id: "CAR", name: "Caruaru", x: "28%", y: "68%", type: "hub" },
  { id: "ESC", name: "Escada", x: "74%", y: "78%", type: "waypoint" },
];

// ============================================================================
// Active Deliveries (Lateral)
// ============================================================================

const ACTIVE_DELIVERIES = [
  { id: "AN-204", route: "Recife → Caruaru", status: "Em Rota", eta: "14:30", type: "efficiency", deviation: "-2%" },
  { id: "AN-104", route: "Igarassu → Cabo", status: "Atrasado", eta: "16:45", type: "operational", deviation: "+12%" },
  { id: "AN-551", route: "Caruaru → Recife", status: "Monitorado", eta: "18:20", type: "critical", deviation: "+40%" },
  { id: "AN-220", route: "São Lourenço → Escada", status: "Abastecendo", eta: "11:20", type: "operational", deviation: "0%" },
  { id: "AN-318", route: "Vitória → Gravatá", status: "Nominal", eta: "09:15", type: "efficiency", deviation: "0%" },
  { id: "AN-412", route: "Cabo → Paulista", status: "Em Rota", eta: "10:00", type: "efficiency", deviation: "-1%" },
  { id: "AN-772", route: "Jaboatão → Escada", status: "Crítico", eta: "--:--", type: "critical", deviation: "+22%" },
];

// ============================================================================
// Component
// ============================================================================

export function CenterSection() {
  const [pulse, setPulse] = useState(false);

  // Heartbeat do Radar
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[620px]">
      {/* ================================================================= */}
      {/* LEFT - CONTROL TOWER MAP (O Palco Principal) */}
      {/* ================================================================= */}

      <Card className="col-span-1 lg:col-span-2 bg-card border-border/50 flex flex-col overflow-hidden relative group shadow-none rounded-sm">

        {/* HEADER FLUTUANTE */}
        <CardHeader className="absolute top-0 left-0 z-30 w-full bg-gradient-to-b from-background/95 via-background/70 to-transparent pb-12 pt-4 px-4 border-b border-border/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground flex items-center gap-2">
              <Radio className={`w-3.5 h-3.5 ${pulse ? "text-efficiency" : "text-muted-foreground"} transition-colors duration-500`} />
              Torre de Controle Inteligente — Regional Pernambuco
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[8px] border-border/60 bg-background/50 font-mono text-muted-foreground">
                SETOR: NORDESTE-PE
              </Badge>
              <Badge variant="outline" className="text-[8px] border-efficiency/40 text-efficiency bg-efficiency/10 font-mono flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-efficiency animate-pulse" />
                SYNC 12ms
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 relative overflow-hidden bg-background">

          {/* ================================================================= */}
          {/* 1. CAMADA DE IMAGEM REAL DO MAPA */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-screen transition-all duration-1000"
            style={{ backgroundImage: "url('/docs/assets/mapa-pe-noc.png')" }}
          />

          {/* Overlay de contraste para garantir que UI fique legível */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />

          {/* ================================================================= */}
          {/* 2. NÓS LOGÍSTICOS (Cidades) */}
          {/* ================================================================= */}
          {PE_NODES.map((node) => (
            <div
              key={node.id}
              className="absolute transition-transform hover:scale-125 z-10 group/node"
              style={{ left: node.x, top: node.y }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${node.type === "hub" ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))]" : "bg-muted-foreground/80"} relative`}>
                {node.type === "hub" && (
                  <div className="absolute inset-[-4px] border border-primary/30 rounded-full animate-ping opacity-40" style={{ animationDuration: "3s" }} />
                )}
              </div>
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-muted-foreground whitespace-nowrap bg-background/90 px-1 py-[1px] border border-border/40 rounded opacity-60 group-hover/node:opacity-100 transition-opacity">
                {node.name}
              </span>
            </div>
          ))}

          {/* ================================================================= */}
          {/* 3. SIMULAÇÃO DE 7 ROTAS DE TELEMETRIA (Velocidade Reduzida/Majestosa) */}
          {/* ================================================================= */}

          {/* Rota 1: Recife -> Caruaru (BR-232 Oeste) - Nominal */}
          <motion.div
            animate={{ left: ["89%", "78%", "68%", "62%", "51%", "41%", "28%"], top: ["42%", "47%", "47%", "51%", "58%", "62%", "68%"] }}
            transition={{ duration: 60, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-efficiency shadow-[0_0_12px_hsl(var(--efficiency-green))]" />
              <div className="absolute w-4 h-4 rounded-full border border-efficiency/50 animate-ping" style={{ animationDuration: "1.5s" }} />
            </div>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-efficiency bg-background/95 px-1 border border-efficiency/20 rounded">
              AN-204
            </span>
          </motion.div>

          {/* Rota 2: Igarassu -> Cabo (BR-101 Sul) - Operacional */}
          <motion.div
            animate={{ left: ["91%", "93%", "94%", "89%", "85%", "82%"], top: ["14%", "24%", "34%", "42%", "53%", "70%"] }}
            transition={{ duration: 55, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="w-2 h-2 rounded-sm bg-operational shadow-[0_0_12px_hsl(var(--operational-orange))]" />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-operational bg-background/95 px-1 border border-operational/20 rounded">
              AN-104
            </span>
          </motion.div>

          {/* Rota 3: Caruaru -> Recife (BR-232 Leste) - Crítico / Atrasado */}
          <motion.div
            animate={{ left: ["28%", "41%", "51%", "62%", "68%", "89%"], top: ["68%", "62%", "58%", "51%", "47%", "42%"] }}
            transition={{ duration: 90, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-critical shadow-[0_0_12px_hsl(var(--critical-red))]" />
              <div className="absolute w-5 h-5 rounded-full border border-critical/50 animate-ping" style={{ animationDuration: "1s" }} />
            </div>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[7.5px] font-mono text-critical bg-background/95 px-1 border border-critical/20 rounded">
              AN-551 (ALERT)
            </span>
          </motion.div>

          {/* Rota 4: São Lourenço -> Escada (Cruzamento interiorano) */}
          <motion.div
            animate={{ left: ["82%", "78%", "82%", "74%"], top: ["34%", "47%", "70%", "78%"] }}
            transition={{ duration: 45, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="w-1.5 h-1.5 rounded-sm bg-operational shadow-[0_0_8px_hsl(var(--operational-orange))]" />
          </motion.div>

          {/* Rota 5: Vitória -> Gravatá (Trecho da Serra) */}
          <motion.div
            animate={{ left: ["68%", "62%", "51%"], top: ["47%", "51%", "58%"] }}
            transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="w-1.5 h-1.5 rounded-sm bg-efficiency shadow-[0_0_8px_hsl(var(--efficiency-green))]" />
          </motion.div>

          {/* Rota 6: Cabo -> Paulista (BR-101 Norte) */}
          <motion.div
            animate={{ left: ["82%", "85%", "89%", "94%", "93%"], top: ["70%", "53%", "42%", "34%", "24%"] }}
            transition={{ duration: 65, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="w-1.5 h-1.5 rounded-sm bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          </motion.div>

          {/* Rota 7: Jaboatão -> Escada */}
          <motion.div
            animate={{ left: ["85%", "82%", "74%"], top: ["53%", "70%", "78%"] }}
            transition={{ duration: 50, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute z-20"
          >
            <div className="w-1.5 h-1.5 rounded-sm bg-critical shadow-[0_0_8px_hsl(var(--critical-red))]" />
          </motion.div>

          {/* ================================================================= */}
          {/* Scan Line & Overlay Tático */}
          {/* ================================================================= */}

          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-20">
            <div className="w-full h-[1px] bg-primary/40 shadow-[0_0_8px_hsl(var(--primary))] animate-[scan_6s_linear_infinite] absolute top-0" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-4 px-4 border-t border-border/10">
            <div className="grid grid-cols-4 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground">Frota (Pip)</span>
                <span className="text-lg font-mono font-bold text-foreground">142</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground">Rotas (BR)</span>
                <span className="text-lg font-mono font-bold text-primary">07</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground">SLA Médio</span>
                <span className="text-lg font-mono font-bold text-efficiency">96.4%</span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground">Alertas IA</span>
                <span className="text-lg font-mono font-bold text-critical">02</span>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* ================================================================= */}
      {/* RIGHT COLUMN - MANIFESTOS */}
      {/* ================================================================= */}

      <div className="col-span-1 flex flex-col gap-6 h-[620px]">
        <Card className="bg-card border-border/50 flex flex-col shadow-none rounded-sm h-full overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-2 pt-3 px-3 bg-secondary/10 shrink-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[10px] font-semibold tracking-widest uppercase flex items-center gap-2">
                <Truck className="w-3 h-3 text-muted-foreground" />
                Manifestos de Telemetria
              </CardTitle>
              <Badge variant="outline" className="text-[8px] border-primary/20 text-primary bg-primary/5 font-mono">
                07 TRACKING
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-0 custom-scrollbar bg-background/20">
            <div className="flex flex-col">
              {ACTIVE_DELIVERIES.map((delivery) => (
                <div key={delivery.id} className="flex flex-col gap-1.5 px-3 py-3 border-b border-border/30 hover:bg-secondary/20 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                          ${delivery.type === "efficiency" ? "bg-efficiency" : ""}
                          ${delivery.type === "operational" ? "bg-operational" : ""}
                          ${delivery.type === "critical" ? "bg-critical" : ""}
                        `}
                      />
                      <span className="font-mono text-[10px] font-bold text-foreground">{delivery.id}</span>
                    </div>
                    <Badge variant="outline" className={`text-[8px] uppercase tracking-wider px-1.5 py-0 rounded-[2px] font-semibold
                        ${delivery.type === "efficiency" ? "text-efficiency border-efficiency/20 bg-efficiency/5" : ""}
                        ${delivery.type === "operational" ? "text-operational border-operational/20 bg-operational/5" : ""}
                        ${delivery.type === "critical" ? "text-critical border-critical/20 bg-critical/5" : ""}
                      `}>
                      {delivery.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-muted-foreground mt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <MapPin className="w-2 h-2 opacity-50" />
                      {delivery.route}
                    </span>
                    <span className="font-mono bg-secondary/50 px-1 rounded border border-border/30">
                      ETA {delivery.eta}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-[7.5px] uppercase tracking-wider text-muted-foreground/70">
                      Desvio de Eficiência IA
                    </span>
                    <span className={`text-[9px] font-mono font-semibold
                        ${delivery.type === "critical" ? "text-critical" : ""}
                        ${delivery.type === "operational" ? "text-operational" : ""}
                        ${delivery.type === "efficiency" ? "text-efficiency" : ""}
                      `}>
                      {delivery.deviation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 0.8; }
            50% { opacity: 0.8; }
            90% { opacity: 0; }
            100% { transform: translateY(620px); opacity: 0; }
          }
        `}}
      />
    </div>
  );
}