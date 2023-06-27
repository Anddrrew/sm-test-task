import GameMode from './GameMode';

interface IGame {
  mode: GameMode;
  isUserTurn: boolean;
  maxTake: number;
  availableMatches: number;
  botMatches: number;
  playerMatches: number;
}

export default IGame;
