import { Star } from 'lucide-react';
import { OddsButton } from './odds-button';
import type { Match } from '@/lib/types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';

function getTeamInitials(name: string) {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export function MatchRow({ match }: { match: Match }) {
    if (!match.home_team || !match.away_team) {
        return null;
    }

    const matchDate = new Date(match.commence_time);

    return (
        <div className="grid grid-cols-[80px_1fr_80px_80px_80px_100px] items-center gap-x-2 text-sm text-white px-4 py-3 border-t border-gray-700 hover:bg-gray-800">
            <div className={cn("text-center", match.status.live ? "text-red-500" : "text-gray-400")}>
                {match.status.live ? (
                     <p className="font-bold">{match.status.displayClock}</p>
                ) : (
                    <>
                        <p className="font-bold">{format(matchDate, 'HH:mm')}</p>
                        <p className="text-xs">{format(matchDate, 'dd/MM')}</p>
                    </>
                )}
            </div>

            <div>
                <p className="text-xs text-gray-400">{match.sport_title}</p>
                <div className="flex items-center space-x-2 mt-1">
                    <Avatar className='h-5 w-5'>
                        <AvatarFallback className='text-xs bg-gray-600 text-white'>{getTeamInitials(match.home_team)}</AvatarFallback>
                    </Avatar>
                    <span>{match.home_team}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                    <Avatar className='h-5 w-5'>
                        <AvatarFallback className='text-xs bg-gray-600 text-white'>{getTeamInitials(match.away_team)}</AvatarFallback>
                    </Avatar>
                    <span>{match.away_team}</span>
                </div>
            </div>

            <OddsButton match={match} outcome={match.home_odds} />
            <OddsButton match={match} outcome={match.draw_odds} />
            <OddsButton match={match} outcome={match.away_odds} />

            <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span>+...</span>
                <Star className="h-4 w-4" />
            </div>
        </div>
    );
}
