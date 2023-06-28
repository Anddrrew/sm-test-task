import { useEffect, useState } from 'react';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { useGame } from '../../providers/GameProvider';
import ControlCard from './ControlCard';
import InfoCard from './InfoCard';

export default function Board() {
  const { game, takeMatches, resetGame } = useGame();
  const [take, setTake] = useState(game?.maxTake || 0);

  useEffect(() => {
    if (game) setTake(take <= game.maxTake ? take : game.maxTake);
  }, [game]);

  const handleChange = (n: number) => setTake(n);
  const handleClick = () => takeMatches(take);

  if (!game) {
    resetGame();
    return <></>;
  }

  const gameInfo = [
    { name: 'Player', symbol: '🧑', matches: game.playerMatches, isActive: game.isUserTurn },
    { name: 'Heap', symbol: '🔥', matches: game.availableMatches },
    { name: 'Bot', symbol: '🤖', matches: game.botMatches, isActive: !game.isUserTurn },
  ];

  return (
    <Container maxW='container.lg'>
      <Grid templateRows='repeat(3, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
        {gameInfo.map((info, idx) => (
          <GridItem key={idx} rowSpan={[1, 1, 2]} display='flex' flexDirection='column' justifyContent='flex-end'>
            <InfoCard {...info} />
          </GridItem>
        ))}
        <GridItem rowSpan={[1]} colStart={[1, 1, 2]} colSpan={[3, 3, 1]}>
          <ControlCard
            take={take}
            maxTake={game.maxTake}
            onChange={handleChange}
            onClick={handleClick}
            isDisabled={!game.isUserTurn}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}
