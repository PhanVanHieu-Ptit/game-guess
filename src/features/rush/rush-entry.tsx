import {
  hasChallengeParams,
  parseRushChallenge,
} from '@/domain/share/rush-challenge';
import { RushGame } from './rush-game';

export interface RushPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function RushEntry({
  searchParams,
  daily = false,
}: RushPageProps & { daily?: boolean }) {
  const params = await searchParams;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) value.forEach((item) => search.append(key, item));
    else if (value !== undefined) search.set(key, value);
  }
  const query = search.toString();
  const challenge = parseRushChallenge(query, daily);
  return (
    <RushGame
      key={query}
      daily={daily}
      challenge={challenge}
      invalidChallenge={hasChallengeParams(query) && !challenge}
    />
  );
}
