import { Card, CardBody, Container, Grid, GridItem } from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import PlayerCard from './PlayerCard';

export default function BoardCard() {
  const { game, resetGame } = useGame();

  if (!game) {
    // TODO: REMOVE THIS BY REFACTORING
    resetGame();
    return <></>;
  }

  return (
    <Container maxW='container.lg'>
      <Grid h='50vh' templateRows='repeat(3, 1fr)' templateColumns='repeat(3, 1fr)' gap={4}>
        <GridItem rowSpan={3}>
          <PlayerCard matches={game?.playerMatches} hasTurn={game.isUserTurn} isUser />
        </GridItem>
        <GridItem rowSpan={2}>
          <Card h='100%'>
            <CardBody>Info</CardBody>
          </Card>
        </GridItem>
        <GridItem rowSpan={3}>
          <PlayerCard matches={game?.botMatches} hasTurn={!game.isUserTurn} />
        </GridItem>
        <GridItem rowSpan={1}>
          <Card h='100%'>
            <CardBody>Button</CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
