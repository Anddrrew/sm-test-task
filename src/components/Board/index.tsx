import { Container, Grid, GridItem } from '@chakra-ui/react';
import { useGame } from '../../providers/GameProvider';
import { useEffect, useState } from 'react';
import Controls from './Controls';
import Info from './Info';
import Player from './Player';

export default function Board() {
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
          <Player matches={game.playerMatches} hasTurn={game.isUserTurn} isUser />
        </GridItem>
        <GridItem rowSpan={2}>
          <Info matches={game.availableMatches} />
        </GridItem>
        <GridItem rowSpan={2}>
          <Player matches={game?.botMatches} hasTurn={!game.isUserTurn} />
        </GridItem>
        <GridItem rowSpan={1} colStart={2}>
          <Controls
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
