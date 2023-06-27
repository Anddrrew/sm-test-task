import { createContext } from 'react';
import GameMode from '../types/GameMode';
import GameStatus from '../types/GameStatus';
import IGame from '../types/IGame';

interface IGameContext {
  status: GameStatus;
  game: IGame | undefined;
  startGame: (mode: GameMode, n: number, m: number) => void;
  endGame: () => void;
  resetGame: () => void;
  takeMatches: (n: number) => void;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

export default GameContext;
