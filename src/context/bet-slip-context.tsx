"use client";

import type { Bet } from "@/lib/types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface BetSlipContextType {
    bets: Bet[];
    addBet: (bet: Bet) => void;
    removeBet: (matchId: string, outcomeName: string) => void;
    clearBets: () => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export function BetSlipProvider({ children }: { children: ReactNode }) {
    const [bets, setBets] = useState<Bet[]>([]);

    const addBet = (bet: Bet) => {
        setBets(prevBets => {
            const existingBetIndex = prevBets.findIndex(b => b.matchId === bet.matchId);
            if (existingBetIndex !== -1) {
                // Same match, different outcome, replace it
                if (prevBets[existingBetIndex].outcomeName !== bet.outcomeName) {
                    const newBets = [...prevBets];
                    newBets[existingBetIndex] = bet;
                    return newBets;
                }
                // Same match, same outcome, remove it (toggle)
                return prevBets.filter(b => b.matchId !== bet.matchId);

            } else {
                // New bet
                return [...prevBets, bet];
            }
        });
    };

    const removeBet = (matchId: string, outcomeName: string) => {
        setBets(prevBets => prevBets.filter(b => !(b.matchId === matchId && b.outcomeName === outcomeName)));
    };

    const clearBets = () => {
        setBets([]);
    };

    return (
        <BetSlipContext.Provider value={{ bets, addBet, removeBet, clearBets }}>
            {children}
        </BetSlipContext.Provider>
    )
}

export function useBetSlip() {
    const context = useContext(BetSlipContext);
    if (context === undefined) {
        throw new Error('useBetSlip must be used within a BetSlipProvider');
    }
    return context;
}
