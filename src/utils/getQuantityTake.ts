/* Quantity choosing algorithm.
 * It should be improved for a more intelligent version of the bot.
 * idea 1: try to count the number of player and bot matches when the availableMatches approach the maxTake intersection
 * idea 2: minimax
 */

export default function getQuantityTake(
  availableMatches: number,
  playerMatches: number,
  botMatches: number,
  maxTake: number
) {
  if (availableMatches === 1) return availableMatches;

  if (maxTake % 2 === 0) {
    return botMatches % 2 === 0 ? maxTake : maxTake - 1;
  }

  return botMatches % 2 === 0 ? maxTake - 1 : maxTake;
}
