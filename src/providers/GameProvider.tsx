import { ReactNode, useContext, useEffect, useState } from 'react';
import GameContext from '../contexts/GameContext';
import { GameMode, GameStatus, IGame } from '../types';
import chooseMatches from '../utils/chooseMatches';

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

    if (!game?.isUserTurn) {
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
