import { Card } from "@/components/ui/card";
import type { League } from "@/lib/types";
import { Orbit, Zap, Gamepad2, Shield, PersonStanding, Volleyball, Users, Dices, Tv } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const SportItem = ({ name, icon: Icon, leagueKey }: { name: string, icon: LucideIcon, leagueKey: string }) => (
  <Link href={`/?league=${leagueKey}`} className="flex items-center justify-between text-white p-2 rounded-md hover:bg-gray-700">
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5 text-gray-400" />
      <span>{name}</span>
    </div>
  </Link>
);

const sportIconMap: Record<string, LucideIcon> = {
  'soccer': Orbit,
  'basketball': PersonStanding,
  'baseball': Orbit,
  'american-football': Shield,
  'ice-hockey': Shield,
  'tennis': Orbit,
  'volleyball': Volleyball,
  'esports': Gamepad2,
  'futsal': Users,
  'virtual-sports': Zap,
  'casino': Dices,
  'live-tv': Tv,
};

const getSportIcon = (sportGroup: string): LucideIcon => {
  if (!sportGroup) {
    return Orbit;
  }
  const key = sportGroup.toLowerCase().replace(/ /g, '-');
  return sportIconMap[key] || Orbit;
};


export function SportsSidebar({ leagues }: { leagues: League[] }) {
  return (
    <aside className="w-64 flex-shrink-0">
      <Card className="bg-[#1A2C38] border-[#2C3A48] p-2 rounded-lg">
        <nav className="space-y-1">
          {leagues.map((league) => (
            <SportItem key={league.leagueID} name={league.name} icon={getSportIcon(league.sportID)} leagueKey={league.leagueID} />
          ))}
        </nav>
      </Card>
    </aside>
  );
}
