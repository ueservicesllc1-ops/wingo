// lib/types.ts

export interface League {
  leagueID: string;
  name: string;
  sportID: string;
}

export interface Outcome {
  name: string;
  price: number;
}

export interface MatchStatus {
  live: boolean;
  displayClock: string;
}

export interface Match {
  eventID: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  home_odds: Outcome | null;
  away_odds: Outcome | null;
  draw_odds: Outcome | null;
  status: MatchStatus;
}

export interface Bet {
  matchId: string;
  sportKey: string;
  sportTitle: string;
  homeTeam: string;
  awayTeam: string;
  outcomeName: string;
  outcomePrice: number;
  commenceTime: string;
}
