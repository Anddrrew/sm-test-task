import { Container, Grid, GridItem } from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import PlayerCard from './PlayerCard';
import { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import ControlsCard from './ControlsCard';

export default function BoardCard() {
  const { game, takeMatches, resetGame } = useGame();
  const [take, setTake] = useState(game?.maxTake || 0);

  useEffect(() => {
    if (game) {
      setTake(take <= game.maxTake ? take : game.maxTake);
    }
  }, [game]);

  const handleChange = (n: number) => setTake(n);
  const handleClick = () => takeMatches(take);

  if (!game) {
    // TODO: REMOVE THIS BY REFACTORING
    resetGame();
    return <></>;
  }

  return (
    <Container maxW='container.lg'>
      <Grid templateRows='repeat(3, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
        <GridItem rowSpan={2}>
          <PlayerCard matches={game.playerMatches} hasTurn={game.isUserTurn} isUser />
        </GridItem>
        <GridItem rowSpan={2}>
          <InfoCard matches={game.availableMatches} />
        </GridItem>
        <GridItem rowSpan={2}>
          <PlayerCard matches={game?.botMatches} hasTurn={!game.isUserTurn} />
        </GridItem>
        <GridItem rowSpan={1} colStart={2}>
          <ControlsCard
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
