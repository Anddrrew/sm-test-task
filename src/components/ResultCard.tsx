import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import { FaceFrownIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function ResultCard() {
  const { game, resetGame } = useGame();

  if (!game) {
    resetGame();
    return <></>;
  }

  const isWon = game.playerMatches % 2 === 0;

  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'>{isWon ? 'You won!' : 'You lost!'}</Heading>
      </CardHeader>
      <CardBody>
        <Stack gap={3}>
          <Center>
            <Box w='60'>{isWon ? <TrophyIcon /> : <FaceFrownIcon />}</Box>
          </Center>
          <TableContainer>
            <Table variant='simple'>
              <Tbody>
                <Tr>
                  <Td>Game Mode</Td>
                  <Td>{game.mode}</Td>
                </Tr>
                <Tr>
                  <Td>Player Matches</Td>
                  <Td isNumeric>{game.playerMatches}</Td>
                </Tr>
                <Tr>
                  <Td>AI Matches</Td>
                  <Td isNumeric>{game.botMatches}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue' onClick={resetGame}>
          Ok
        </Button>
      </CardFooter>
    </Card>
  );
}
