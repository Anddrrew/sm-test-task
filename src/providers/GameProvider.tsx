import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
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
  game: IGame | undefined;
  startGame: (mode: GameMode, n: number, m: number) => void;
  endGame: () => void;
  resetGame: () => void;
  takeMatches: (n: number) => void;
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
  const [game, setGame] = useState<IGame | undefined>();

  useEffect(() => {
    if (status === GameStatus.RUNNING && !game?.isUserTurn) {
      const take = game?.maxTake ? 1 : 0;
      setGame((game) => {
        if (game) {
          return {
            ...game,
            availableMatches: game.availableMatches - take,
            botMatches: game.botMatches + take,
            isUserTurn: true,
            maxTake: Math.max(0, Math.min(game.availableMatches - take, game.maxTake)),
          };
        }
      });
    }
  }, [game]);

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

  const takeMatches = (take: number) => {
    setGame((game) => {
      if (game) {
        return {
          ...game,
          availableMatches: game.availableMatches - take,
          playerMatches: game.playerMatches + take,
          isUserTurn: false,
          maxTake: Math.max(0, Math.min(game.availableMatches - take, game.maxTake)),
        };
      }
    });
  };

  return (
    <GameContext.Provider value={{ status, game, takeMatches, startGame, endGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}
