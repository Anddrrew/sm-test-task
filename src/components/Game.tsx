import { Box, Center } from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import { GameStatus } from '../types';
import Board from './Board';
import ResultCard from './ResultCard';
import StartCard from './StartCard';

export default function Game() {
  const { status } = useGame();

  return (
    <Box h='100vh' display='flex' flexFlow='column' justifyContent='center' backgroundColor='gray.100'>
      <Center>
        {status === GameStatus.IDLE && <StartCard />}
        {status === GameStatus.RUNNING && <Board />}
        {status === GameStatus.FINISHED && <ResultCard />}
      </Center>
    </Box>
  );
}
