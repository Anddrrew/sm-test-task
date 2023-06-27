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

  const updateGame = (cb: (game: IGame) => IGame) => setGame((game) => (game ? cb(game) : game));

  const endGame = () => setStatus(GameStatus.FINISHED);

  const resetGame = () => setStatus(GameStatus.IDLE);

  const takeMatches = (take: number) => updateGame((game) => handleTake(game, take));

  const botTakeMatches = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    updateGame((game) => {
      const { availableMatches, playerMatches, botMatches, maxTake } = game;
      const take = getQuantityTake(availableMatches, playerMatches, botMatches, maxTake);

      return handleTake(game, take);
    });
  };

  const handleTake = (game: IGame, take: number) => {
    const { availableMatches, botMatches, playerMatches, maxTake, isUserTurn } = game;

    return {
      ...game,
      availableMatches: availableMatches - take,
      botMatches: !isUserTurn ? botMatches + take : botMatches,
      playerMatches: isUserTurn ? playerMatches + take : playerMatches,
      isUserTurn: !isUserTurn,
      maxTake: getNewMaxTake(availableMatches, take, maxTake),
    };
  };

  return (
    <GameContext.Provider value={{ status, game, takeMatches, startGame, endGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}
