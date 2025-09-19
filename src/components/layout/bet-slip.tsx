"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { useBetSlip } from "@/context/bet-slip-context";
import { Separator } from "../ui/separator";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function BetSlip() {
  const { bets, removeBet, clearBets } = useBetSlip();
  const [betAmounts, setBetAmounts] = useState<Record<string, number>>({});

  const handleAmountChange = (betId: string, amount: string) => {
    setBetAmounts(prev => ({...prev, [betId]: parseFloat(amount) || 0 }));
  };

  const getTotalStake = () => {
    return Object.values(betAmounts).reduce((total, amount) => total + amount, 0);
  };
  
  const getTotalWinnings = () => {
    return bets.reduce((total, bet) => {
      const betId = `${bet.matchId}-${bet.outcomeName}`;
      const amount = betAmounts[betId] || 0;
      return total + (amount * bet.outcomePrice);
    }, 0);
  }

  return (
    <aside className="w-80 flex-shrink-0 space-y-4">
      <Card className="bg-[#1A2C38] border-[#2C3A48] rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white font-bold">Boleto de Apuestas</h2>
          <Button variant="ghost" size="sm" onClick={clearBets} disabled={bets.length === 0}>Limpiar todo</Button>
        </div>
        
        {bets.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>Tu boleto de apuestas está vacío.</p>
            <p className="text-xs">Haz clic en una cuota para añadir una apuesta.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bets.map((bet) => {
               const betId = `${bet.matchId}-${bet.outcomeName}`;
               const potentialWinnings = ((betAmounts[betId] || 0) * bet.outcomePrice).toFixed(2);

              return(
              <div key={betId} className="bg-[#233543] p-3 rounded-md">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{bet.homeTeam} vs {bet.awayTeam}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeBet(bet.matchId, bet.outcomeName)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <p className="text-sm font-bold text-white mt-1">{bet.outcomeName}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-green-400">{bet.outcomePrice.toFixed(2)}</span>
                  <Input 
                    type="number" 
                    placeholder="Monto" 
                    className="w-24 h-8 bg-gray-700 border-gray-600 text-white"
                    value={betAmounts[betId] || ''}
                    onChange={(e) => handleAmountChange(betId, e.target.value)}
                  />
                </div>
                <p className="text-xs text-right mt-1 text-gray-400">Ganancia: ${potentialWinnings}</p>
              </div>
            )})}
            <Separator className="bg-gray-600" />
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">Total de Apuestas:</span>
                    <span className="text-white font-bold">{bets.length}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Importe Total:</span>
                    <span className="text-white font-bold">${getTotalStake().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Ganancia Potencial:</span>
                    <span className="text-green-400 font-bold">${getTotalWinnings().toFixed(2)}</span>
                </div>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
              HACER APUESTA
            </Button>
          </div>
        )}
      </Card>
    </aside>
  );
}
