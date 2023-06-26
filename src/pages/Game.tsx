import BoardCard from '../components/BoardCard';
import ResultCard from '../components/ResultCard';
import StartCard from '../components/StartCard';
import { useGame } from '../providers/GameProvider';
import GameStatus from '../types/GameStatus';
import { Box, Center } from '@chakra-ui/react';

export default function Game() {
  const { status } = useGame();

  return (
    <Box h='100vh' display='flex' flexFlow='column' justifyContent='center' backgroundColor='gray.100'>
      <Center>
        {status === GameStatus.IDLE && <StartCard />}
        {status === GameStatus.RUNNING && <BoardCard />}
        {status === GameStatus.FINISHED && <ResultCard />}
      </Center>
    </Box>
  );
}
