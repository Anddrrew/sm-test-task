import { ReactNode, createContext, useContext, useState } from 'react';
import GameStatus from '../types/GameStatus';

interface IGameContext {
  status: GameStatus;
  startGame: () => void;
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
  const startGame = () => setStatus(GameStatus.RUNNING);
  const endGame = () => setStatus(GameStatus.FINISHED);
  const resetGame = () => setStatus(GameStatus.IDLE);

  return <GameContext.Provider value={{ status, startGame, endGame, resetGame }}>{children}</GameContext.Provider>;
}
