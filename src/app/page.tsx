import { AppHeader } from "@/components/layout/app-header";
import { SportsSidebar } from "@/components/layout/sports-sidebar";
import { MainContent } from "@/components/layout/main-content";
import { BetSlip } from "@/components/layout/bet-slip";
import { AppFooter } from "@/components/layout/app-footer";
import { getLeagues } from "@/lib/sportsApi";
import { BetSlipProvider } from "@/context/bet-slip-context";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const defaultLeagueKey = 'EPL';
  const leagueKey = typeof searchParams?.league === 'string' ? searchParams.league : defaultLeagueKey;
  const leagues = await getLeagues();

  return (
    <BetSlipProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <div className="flex flex-1 w-full px-4 py-4 gap-4">
          <SportsSidebar leagues={leagues} />
          <MainContent leagueKey={leagueKey} />
          <BetSlip />
        </div>
        <AppFooter />
      </div>
    </BetSlipProvider>
  );
}
