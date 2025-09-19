
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { MatchRow } from "../match-row";
import { getMatches } from "@/lib/sportsApi";
import { AlertCircle } from "lucide-react";

const JackpotCard = ({ title, amount, minBet, currency, logoUrl }: { title: string, amount: string, minBet: number, currency: string, logoUrl: string }) => (
    <Card className="bg-[#233543] border-[#2C3A48] text-white p-4 flex-1">
        <div className="flex items-center space-x-3">
            <Image src={logoUrl} alt={`${title} logo`} width={40} height={40} className="rounded-full" data-ai-hint="coin jackpot" />
            <div>
                <div className="flex items-center space-x-2">
                    <h3 className="font-bold">{title}</h3>
                    <span className="text-xs text-gray-400">Apuesta min.: {minBet} {currency}</span>
                </div>
                <p className="text-xl font-bold text-yellow-400">{amount} <span className="text-sm">{currency}</span></p>
            </div>
        </div>
    </Card>
);

export async function MainContent({ leagueKey }: { leagueKey: string }) {
  let liveMatches, upcomingMatches;
  let liveError, upcomingError;

  try {
    liveMatches = await getMatches(leagueKey, 'live');
  } catch (error) {
    liveError = "No se pudieron cargar los eventos en vivo.";
    console.error(error);
  }

  try {
    upcomingMatches = await getMatches(leagueKey, 'upcoming');
  } catch (error) {
    upcomingError = "No se pudieron cargar los próximos eventos.";
    console.error(error);
  }


  return (
    <main className="flex-1 space-y-4">
      <div className="flex space-x-4">
        <JackpotCard title="GRANPANA" amount="508.26" minBet={100} currency="USD" logoUrl="https://picsum.photos/seed/granpana/40/40" />
        <JackpotCard title="PANITA" amount="95.79" minBet={50} currency="USD" logoUrl="https://picsum.photos/seed/panita/40/40" />
        <JackpotCard title="PANA" amount="211.22" minBet={15} currency="USD" logoUrl="https://picsum.photos/seed/pana/40/40" />
        <JackpotCard title="MINIPANA" amount="19.22" minBet={5} currency="USD" logoUrl="https://picsum.photos/seed/minipana/40/40" />
      </div>

      <Card className="bg-[#1A2C38] border-[#2C3A48] rounded-lg">
        <CardContent className="p-0">
          <div className="p-4">
            <h2 className="text-white font-bold text-lg">Eventos en vivo</h2>
          </div>
          {liveError ? (
             <div className="text-center text-red-500 p-8 flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>{liveError}</span>
             </div>
          ) : liveMatches && liveMatches.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="min-w-max">
                  <div className="grid grid-cols-[80px_1fr_80px_80px_80px_100px] gap-x-2 text-xs text-gray-400 px-4 pb-2">
                      <div>Hora</div>
                      <div>Evento</div>
                      <div className="text-center">1</div>
                      <div className="text-center">X</div>
                      <div className="text-center">2</div>
                      <div className="text-center">Más</div>
                  </div>
                   {liveMatches.map((match) => (
                      <MatchRow key={match.eventID} match={match} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 p-8">
              No hay eventos en vivo disponibles para esta liga en este momento.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#1A2C38] border-[#2C3A48] rounded-lg">
        <CardContent className="p-0">
          <div className="p-4">
            <h2 className="text-white font-bold text-lg">Próximos Eventos</h2>
          </div>
          {upcomingError ? (
            <div className="text-center text-red-500 p-8 flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>{upcomingError}</span>
            </div>
          ) : upcomingMatches && upcomingMatches.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="min-w-max">
                  <div className="grid grid-cols-[80px_1fr_80px_80px_80px_100px] gap-x-2 text-xs text-gray-400 px-4 pb-2">
                      <div>Hora</div>
                      <div>Evento</div>
                      <div className="text-center">1</div>
                      <div className="text-center">X</div>
                      <div className="text-center">2</div>
                      <div className="text-center">Más</div>
                  </div>
                   {upcomingMatches.map((match) => (
                      <MatchRow key={match.eventID} match={match} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 p-8">
              No hay próximos eventos disponibles para esta liga en este momento.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
