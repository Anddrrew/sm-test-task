import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import PlayerCard from './PlayerCard';
import { useEffect, useState } from 'react';

export default function BoardCard() {
  const { game, takeMatches, resetGame } = useGame();
  const [take, setTake] = useState(0);

  useEffect(() => {
    if (game) {
      setTake(take <= game.maxTake ? take : game.maxTake);
    }
  }, [game]);

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
          <Card h='100%' align='center'>
            <CardHeader>
              <Heading size='md'>Info</Heading>
            </CardHeader>
            <CardBody>
              <pre>{JSON.stringify(game, null, 2)}</pre>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem rowSpan={3}>
          <PlayerCard matches={game?.botMatches} hasTurn={!game.isUserTurn} />
        </GridItem>
        <GridItem rowSpan={1}>
          <Card h='100%' align='center' size='sm'>
            <CardBody w='full'>
              <FormControl>
                <FormLabel>Match quantity</FormLabel>
                <NumberInput value={take} min={0} max={game.maxTake} onChange={(v) => setTake(Number(v))}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </CardBody>
            <CardFooter>
              <Button colorScheme='blue' onClick={() => takeMatches(take)} isDisabled={!game.isUserTurn}>
                Take
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
