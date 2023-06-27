export default function getNewMaxTake(availableMatches: number, take: number, maxTake: number) {
  return Math.max(0, Math.min(availableMatches - take, maxTake));
}
