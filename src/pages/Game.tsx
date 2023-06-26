import BoardCard from '../components/BoardCard';
import StartCard from '../components/StartCard';
import { useGame } from '../providers/GameProvider';
import GameStatus from '../types/GameStatus';
import { Box, Button, ButtonGroup, Center } from '@chakra-ui/react';

export default function Game() {
  const { status } = useGame();

  return (
    <Box h='100vh' display='flex' flexFlow='column' justifyContent='center' backgroundColor='gray.100'>
      <Center>
        {status === GameStatus.IDLE && <StartCard />}
        {status === GameStatus.RUNNING && <BoardCard />}
        {status === GameStatus.FINISHED && <FinishedGameComponent />}
      </Center>
    </Box>
  );
}

const FinishedGameComponent: React.FC = () => {
  const { resetGame } = useGame();

  return (
    <>
      <div>Finished Game Component</div>
      <ButtonGroup>
        <Button colorScheme='blue' onClick={resetGame}>
          To menu
        </Button>
      </ButtonGroup>
    </>
  );
};
