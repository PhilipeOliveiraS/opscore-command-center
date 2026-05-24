"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActivitySquare, Droplet, Wrench, ChevronRight } from "lucide-react";

const efficiencyData = [
  { name: "SEG", value: 85 },
  { name: "TER", value: 88 },
  { name: "QUA", value: 82 },
  { name: "QUI", value: 94 },
  { name: "SEX", value: 90 },
  { name: "SAB", value: 75 },
  { name: "DOM", value: 70 },
];

const topDrivers = [
  { rank: "01", name: "Carlos S.", route: "SEC-REC", efficiency: "98.2%", margin: "+12.4%" },
  { rank: "02", name: "Roberto M.", route: "SEC-SUAPE", efficiency: "96.5%", margin: "+10.1%" },
  { rank: "03", name: "Felipe T.", route: "SEC-CABO", efficiency: "94.8%", margin: "+8.9%" },
  { rank: "04", name: "Marcos V.", route: "SEC-JAB", efficiency: "93.1%", margin: "+7.2%" },
];

export function BottomSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
      <Card className="bg-card border-border/50 shadow-none rounded-sm">
        <CardHeader className="border-b border-border/40 pb-3 pt-4 px-4 bg-secondary/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2">
              <ActivitySquare className="w-3.5 h-3.5 text-muted-foreground" />
              Índice de Eficiência de Operadores
            </CardTitle>
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider hover:text-foreground cursor-pointer transition-colors flex items-center">Ver Todos <ChevronRight className="w-3 h-3 ml-0.5"/></span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent bg-background/20">
                <TableHead className="w-[40px] text-[9px] uppercase tracking-widest text-muted-foreground/70 h-8 font-semibold">Rank</TableHead>
                <TableHead className="text-[9px] uppercase tracking-widest text-muted-foreground/70 h-8 font-semibold">Operador</TableHead>
                <TableHead className="text-right text-[9px] uppercase tracking-widest text-muted-foreground/70 h-8 font-semibold">Yield (Margem)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDrivers.map((driver) => (
                <TableRow key={driver.rank} className="border-border/30 hover:bg-secondary/20 transition-colors cursor-pointer group">
                  <TableCell className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors py-2.5">
                    {driver.rank}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="font-semibold text-xs text-foreground/90 group-hover:text-foreground transition-colors">{driver.name}</div>
                    <div className="text-[9px] font-mono text-muted-foreground/80">{driver.route} • {driver.efficiency} EFF</div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-efficiency text-[11px] font-medium py-2.5">
                    {driver.margin}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/50 shadow-none rounded-sm">
        <CardHeader className="border-b border-border/40 pb-3 pt-4 px-4 bg-secondary/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2">
              <Droplet className="w-3.5 h-3.5 text-muted-foreground" />
              Correlação: Queima de Combustível
            </CardTitle>
            <span className="text-[9px] font-mono text-muted-foreground">T-7 DIAS</span>
          </div>
        </CardHeader>
        {/* added min-h-0 to fix recharts aspect issue */}
        <CardContent className="h-[210px] min-h-0 w-full pt-4 pb-2 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={efficiencyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis 
                dataKey="name" 
                fontSize={9} 
                fontFamily="monospace"
                tickLine={false} 
                axisLine={false} 
                stroke="hsl(var(--muted-foreground))" 
                dy={10}
              />
              <YAxis 
                fontSize={9} 
                fontFamily="monospace"
                tickLine={false} 
                axisLine={false} 
                stroke="hsl(var(--muted-foreground))" 
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))', 
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  fontSize: '11px',
                  fontFamily: 'monospace'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`${value}%`, 'Eficiência']}
              />
              <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={30}>
                {efficiencyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.value > 85 ? 'hsl(var(--efficiency-green))' : 'hsl(var(--muted-foreground))'} 
                    fillOpacity={0.8}
                    className="hover:fill-opacity-100 transition-all duration-300 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/50 shadow-none rounded-sm">
        <CardHeader className="border-b border-border/40 pb-3 pt-4 px-4 bg-secondary/10">
          <CardTitle className="text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
            Ciclo de Vida de Ativos & Manutenção
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center h-[210px] gap-6 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-bold text-foreground leading-none">12</span>
                <span className="text-[9px] text-muted-foreground font-mono">ATIVOS</span>
              </div>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">Agendados (T-7)</span>
            </div>
            <div className="w-px h-10 bg-border/60" />
            <div className="flex flex-col gap-1.5 items-end">
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] text-critical/80 font-mono">ATIVOS</span>
                <span className="text-3xl font-mono font-bold text-critical leading-none">03</span>
              </div>
              <span className="text-[9px] text-critical/80 uppercase tracking-widest font-semibold">SLA Violado</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] text-foreground font-mono font-medium">
              <span>Índice de Saúde da Frota</span>
              <span>85%</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden flex relative">
              <div className="h-full bg-efficiency shadow-[0_0_8px_hsl(var(--efficiency-green))] transition-all duration-1000" style={{ width: '65%' }} />
              <div className="h-full bg-operational transition-all duration-1000" style={{ width: '25%' }} />
              <div className="h-full bg-critical transition-all duration-1000" style={{ width: '10%' }} />
            </div>
            <div className="flex justify-between text-[8px] text-muted-foreground uppercase tracking-widest font-semibold pt-1">
              <span>Ótimo</span>
              <span>Degradado</span>
              <span>Crítico</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
