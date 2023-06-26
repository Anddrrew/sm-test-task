import { useGame } from '../providers/GameProvider';
import GameStatus from '../types/GameStatus';
import { Button, ButtonGroup } from '@chakra-ui/react';

export default function Game() {
  const { status } = useGame();

  return (
    <div>
      {status === GameStatus.IDLE && <StartGameComponent />}
      {status === GameStatus.RUNNING && <RunningGameComponent />}
      {status === GameStatus.FINISHED && <FinishedGameComponent />}
    </div>
  );
}

const StartGameComponent: React.FC = () => {
  const { startGame } = useGame();
  return (
    <>
      <div>Start Game Component</div>
      <Button colorScheme='blue' onClick={startGame}>
        Start
      </Button>
    </>
  );
};

const RunningGameComponent: React.FC = () => {
  const { endGame } = useGame();

  return (
    <>
      <div>Running Game Component</div>
      <Button colorScheme='blue' onClick={endGame}>
        Finish
      </Button>
    </>
  );
};

const FinishedGameComponent: React.FC = () => {
  const { startGame, resetGame } = useGame();

  return (
    <>
      <div>Finished Game Component</div>
      <ButtonGroup>
        <Button colorScheme='blue' onClick={startGame}>
          Play again
        </Button>
        <Button colorScheme='blue' onClick={resetGame}>
          To menu
        </Button>
      </ButtonGroup>
    </>
  );
};
