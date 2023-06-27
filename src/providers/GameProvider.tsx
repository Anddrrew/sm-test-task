import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import GameStatus from '../types/GameStatus';
import GameMode from '../types/GameMode';
import chooseMatches from '../utils/chooseMatches';

interface IGame {
  mode: GameMode;
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
    if (status === GameStatus.RUNNING && !game?.availableMatches) {
      endGame();
    }
  }, [game]);

  useEffect(() => {
    if (status === GameStatus.RUNNING && !game?.isUserTurn) {
      setGame((game) => {
        if (game) {
          const { availableMatches, playerMatches, botMatches, maxTake } = game;
          const take = chooseMatches(availableMatches, playerMatches, botMatches, maxTake);
          return {
            ...game,
            availableMatches: availableMatches - take,
            botMatches: botMatches + take,
            isUserTurn: true,
            maxTake: Math.max(0, Math.min(availableMatches - take, maxTake)),
          };
        }
      });
    }
  }, [game]);

  const startGame = (mode: GameMode, n: number, m: number) => {
    setGame({
      mode,
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
        const { availableMatches, playerMatches, maxTake } = game;
        return {
          ...game,
          availableMatches: availableMatches - take,
          playerMatches: playerMatches + take,
          isUserTurn: false,
          maxTake: Math.max(0, Math.min(availableMatches - take, maxTake)),
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
