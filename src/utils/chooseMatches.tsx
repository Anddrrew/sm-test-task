/* Quantity choosing algorithm.
 * I have an opinion that it can be improved for a more intelligent version of the bot.
 * Perhaps should try to count the number of player matches when the availableMatches approach the maxTake intersection
 */

export default function chooseMatches(
  availableMatches: number,
  playerMatches: number,
  botMatches: number,
  maxTake: number
) {
  if (availableMatches === 1) return availableMatches;

  if (availableMatches <= maxTake) {
    if (availableMatches % 2 === 0) {
      return botMatches % 2 === 0 ? availableMatches : availableMatches - 1;
    }
    return botMatches % 2 === 0 ? availableMatches - 1 : availableMatches;
  }

  if (maxTake % 2 === 0) {
    return botMatches % 2 === 0 ? maxTake : maxTake - 1;
  }

  return botMatches % 2 === 0 ? maxTake - 1 : maxTake;
}
