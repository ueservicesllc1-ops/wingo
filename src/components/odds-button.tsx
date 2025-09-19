"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { Match, Outcome, Bet } from "@/lib/types";
import { useBetSlip } from "@/context/bet-slip-context";

export function OddsButton({ match, outcome }: { match: Match, outcome: Outcome | null }) {
    const { addBet, bets } = useBetSlip();

    if (outcome === null) {
        return <div className="flex justify-center items-center h-8 w-full bg-gray-700 rounded-md">-</div>;
    }

    const isSelected = bets.some(b => b.matchId === match.eventID && b.outcomeName === outcome.name);

    const handleBet = () => {
        const bet: Bet = {
            matchId: match.eventID,
            sportKey: match.sport_key,
            sportTitle: match.sport_title,
            homeTeam: match.home_team,
            awayTeam: match.away_team,
            outcomeName: outcome.name,
            outcomePrice: outcome.price,
            commenceTime: match.commence_time,
        };
        addBet(bet);
    }
    
    return (
        <Button 
            variant="outline" 
            className={cn(
                "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white w-full text-xs h-8",
                isSelected && "bg-green-500 border-green-400 hover:bg-green-600"
            )}
            onClick={handleBet}
        >
            {outcome.price.toFixed(2)}
        </Button>
    );
}
