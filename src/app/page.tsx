import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { KpiHero } from "@/components/dashboard/kpi-hero";
import { CenterSection } from "@/components/dashboard/center-section";
import { RightSidebar } from "@/components/dashboard/right-sidebar";
import { BottomSection } from "@/components/dashboard/bottom-section";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground selection:bg-primary selection:text-primary-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto custom-scrollbar p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <KpiHero />
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-6">
                <CenterSection />
                <BottomSection />
              </div>
              <div className="xl:col-span-1 h-[824px]">
                <RightSidebar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
