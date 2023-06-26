import { ReactNode, createContext, useContext, useState } from 'react';
import GameStatus from '../types/GameStatus';
import GameMode from '../types/GameMode';

interface IGame {
  isUserTurn: boolean;
  maxTake: number;
  availableMatches: number;
  botMatches: number;
  playerMatches: number;
}

interface IGameContext {
  status: GameStatus;
  game: IGame | null;
  startGame: (mode: GameMode, n: number, m: number) => void;
  endGame: () => void;
  resetGame: () => void;
}

type Props = {
  children: ReactNode;
};

const GameContext = createContext<IGameContext | undefined>(undefined);

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return context;
}

export default function GameProvider({ children }: Props) {
  const [status, setStatus] = useState(GameStatus.IDLE);
  const [game, setGame] = useState<IGame | null>(null);

  const startGame = (mode: GameMode, n: number, m: number) => {
    setGame({
      isUserTurn: mode === GameMode.PLAYER,
      maxTake: m,
      availableMatches: 2 * n + 1,
      botMatches: 0,
      playerMatches: 0,
    });

    setStatus(GameStatus.RUNNING);
  };
  const endGame = () => setStatus(GameStatus.FINISHED);
  const resetGame = () => setStatus(GameStatus.IDLE);

  return (
    <GameContext.Provider value={{ status, game, startGame, endGame, resetGame }}>{children}</GameContext.Provider>
  );
}
