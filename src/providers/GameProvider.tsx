import { ReactNode, useContext, useEffect, useState } from 'react';
import GameContext from '../contexts/GameContext';
import { GameMode, GameStatus, IGame } from '../types';
import { getNewMaxTake, getQuantityTake } from '../utils';

type Props = {
  children: ReactNode;
};

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
    if (!game?.availableMatches) endGame();
    if (!game?.isUserTurn) botTakeMatches();
  }, [game]);

  const botTakeMatches = () => {
    setGame((game) => {
      if (game) {
        const { availableMatches, playerMatches, botMatches, maxTake } = game;

        const take = getQuantityTake(availableMatches, playerMatches, botMatches, maxTake);

        return {
          ...game,
          availableMatches: availableMatches - take,
          botMatches: botMatches + take,
          isUserTurn: true,
          maxTake: getNewMaxTake(availableMatches, take, maxTake),
        };
      }
    });
  };

  const takeMatches = (take: number) => {
    setGame((game) => {
      if (game) {
        const { availableMatches, playerMatches, maxTake } = game;

        return {
          ...game,
          availableMatches: availableMatches - take,
          playerMatches: playerMatches + take,
          isUserTurn: false,
          maxTake: getNewMaxTake(availableMatches, take, maxTake),
        };
      }
    });
  };

  const startGame = (mode: GameMode, n: number, m: number) => {
    setGame({
      mode,
      availableMatches: 2 * n + 1,
      playerMatches: 0,
      botMatches: 0,
      isUserTurn: mode === GameMode.PLAYER,
      maxTake: m,
    });

    setStatus(GameStatus.RUNNING);
  };

  const endGame = () => setStatus(GameStatus.FINISHED);

  const resetGame = () => setStatus(GameStatus.IDLE);

  return (
    <GameContext.Provider value={{ status, game, takeMatches, startGame, endGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}
