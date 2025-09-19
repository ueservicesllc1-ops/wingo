
import type { League, Match, Outcome } from './types';

const API_KEY = process.env.SPORTS_API_KEY;
const API_BASE_URL = 'https://api.sportsgameodds.com/v2';

interface ApiEvent {
  eventID: string;
  sportID: string;
  leagueID: string;
  teams: {
    home: { names: { long: string } };
    away: { names: { long: string } };
  };
  status: {
    live: boolean;
    displayClock: string;
    startsAt: string;
  };
  odds: {
    [key: string]: {
      marketName: string;
      sideID: 'home' | 'away' | 'draw';
      byBookmaker?: {
        [key: string]: {
          odds: string;
        }
      }
    }
  }
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchFromApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> {
  const allParams = { ...params, apiKey: API_KEY };
  const urlParams = new URLSearchParams(allParams as Record<string, string>);
  const url = `${API_BASE_URL}${endpoint}?${urlParams.toString()}`;
  
  const response = await fetch(url, { next: { revalidate: 60 } });
  
  if (!response.ok) {
    let errorData;
    try {
        errorData = await response.json();
    } catch {
        // Ignore JSON parse error
    }
    throw new Error(errorData?.error || `API request failed with status ${response.status}`);
  }

  return response.json();
}

function convertAmericanToDecimal(americanOdds: number): number {
    if (americanOdds > 0) {
        return (americanOdds / 100) + 1;
    } else {
        return (100 / Math.abs(americanOdds)) + 1;
    }
}

function extractOdds(oddsData: ApiEvent['odds']): { home_odds: Outcome | null, away_odds: Outcome | null, draw_odds: Outcome | null } {
    let home_odds: Outcome | null = null;
    let away_odds: Outcome | null = null;
    let draw_odds: Outcome | null = null;

    if (!oddsData) {
        return { home_odds, away_odds, draw_odds };
    }

    for (const key in oddsData) {
        const odd = oddsData[key];
        if (odd.marketName?.includes('Moneyline') && odd.byBookmaker) {
            const bookmakerKey = Object.keys(odd.byBookmaker)[0];
            if (!bookmakerKey) continue;

            const price = parseFloat(odd.byBookmaker[bookmakerKey].odds);
            if (isNaN(price)) continue;

            const decimalPrice = convertAmericanToDecimal(price);
            
            if (odd.sideID === 'home') home_odds = { name: 'Home', price: decimalPrice };
            else if (odd.sideID === 'away') away_odds = { name: 'Away', price: decimalPrice };
            else if (odd.sideID === 'draw') draw_odds = { name: 'Draw', price: decimalPrice };
        }
    }
    
    return { home_odds, away_odds, draw_odds };
}

export async function getMatches(leagueID: string, status: 'live' | 'upcoming'): Promise<Match[]> {
  try {
    const params: Record<string, string> = { leagueID };

    if (status === 'live') {
      params.live = 'true';
    } else if (status === 'upcoming') {
      params.startsAfter = new Date().toISOString();
    }

    const response = await fetchFromApi<ApiEvent[]>('/events/', params);

    if (response.success && Array.isArray(response.data)) {
        return response.data.map(event => {
            const { home_odds, away_odds, draw_odds } = extractOdds(event.odds);
            return {
                eventID: event.eventID,
                sport_key: event.sportID,
                sport_title: event.leagueID,
                commence_time: event.status.startsAt,
                home_team: event.teams.home?.names.long || 'TBD',
                away_team: event.teams.away?.names.long || 'TBD',
                home_odds,
                away_odds,
                draw_odds,
                status: {
                  live: event.status.live,
                  displayClock: event.status.displayClock,
                }
            };
        });
    }
    return [];
  } catch (error: any) {
    if (error.message.includes('No Events found')) {
      return [];
    }
    console.error(`Failed to fetch matches for leagueID=${leagueID} and status=${status}:`, error);
    throw error;
  }
}

export async function getLeagues(): Promise<League[]> {
  try {
    const response = await fetchFromApi<{ data: League[] }>('/leagues/');
    if (response.success && Array.isArray(response.data)) return response.data;
    return [];
  } catch (error) {
    console.error('Failed to fetch leagues:', error);
    return [];
  }
}
