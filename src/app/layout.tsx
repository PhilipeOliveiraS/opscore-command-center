import type { Metadata } from "next";
import "@/app/globals.css"; // Garante que o Tailwind CSS continue carregando normalmente

// ============================================================================
// METADADOS OTIMIZADOS COM BRANDING ENTERPRISE E PARCERIA ÁGUA NOVA
// ============================================================================
export const metadata: Metadata = {
  title: "Água Nova | OpsCore Command Center",
  description: "Plataforma de Inteligência Operacional e Telemetria Preditiva com suporte a IA da PH3 Digital para a operação Água Nova.",

  openGraph: {
    title: "Água Nova — OpsCore Command Center",
    description: "Plataforma de Inteligência Operacional e Telemetria Preditiva com suporte a IA da PH3 Digital para a operação Água Nova.",
    url: "https://opscore.ph3digital.com.br",
    siteName: "OpsCore Operational Intelligence",
    images: [
      {
        url: "https://opscore.ph3digital.com.br/docs/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Painel de Controle Tático OpsCore Inteligência Operacional — Operação Água Nova",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Água Nova — OpsCore Command Center",
    description: "Plataforma de Inteligência Operacional e Telemetria Preditiva com suporte a IA da PH3 Digital.",
    images: ["https://opscore.ph3digital.com.br/docs/assets/og-image.png"],
  },
};

// ============================================================================
// COMPONENTE ROOT LAYOUT COMPATÍVEL COM APP ROUTER (O Default Export Obrigatório)
// ============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}