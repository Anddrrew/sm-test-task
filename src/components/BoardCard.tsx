import { Box } from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';

export default function BoardCard() {
  const { game } = useGame();

  console.log(game);

  return (
    <Box>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </Box>
  );
}
