import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';

export default function ResultCard() {
  const { game, resetGame } = useGame();

  if (!game) {
    resetGame();
    return <></>;
  }

  const isWon = game.playerMatches % 2 === 0;

  return (
    <Card align='center' w='72'>
      <CardBody w='full'>
        <Stack gap={3} align='center'>
          <Box fontSize='9xl'>{isWon ? '🏆' : '😞'}</Box>
          <Heading size='md'>{isWon ? 'You won!' : 'You lost!'}</Heading>
          <TableContainer>
            <Table variant='simple'>
              <Tbody>
                <Tr>
                  <Td>Game mode</Td>
                  <Td>{game.mode}</Td>
                </Tr>
                <Tr>
                  <Td>Player matches</Td>
                  <Td isNumeric>{game.playerMatches}</Td>
                </Tr>
                <Tr>
                  <Td>Bot matches</Td>
                  <Td isNumeric>{game.botMatches}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue' onClick={resetGame}>
          OK
        </Button>
      </CardFooter>
    </Card>
  );
}
