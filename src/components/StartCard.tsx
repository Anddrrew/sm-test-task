import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import { GameMode } from '../types';
import NumberInput from './common/NumberInput';

export default function StartCard() {
  const { startGame } = useGame();
  const [mode, setMode] = useState(GameMode.PLAYER);
  const [n, setN] = useState(12);
  const [m, setM] = useState(3);

  useEffect(() => setM(Math.min(2 * n + 1, m)), [n]);

  const handleStart = () => startGame(mode, n, m);

  return (
    <Card align='center'>
      <CardHeader paddingBottom={0}>
        <Heading size='md'>Matchsticks</Heading>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Center>
          <Box fontSize='9xl'>🔥</Box>
        </Center>
        <Stack gap={2}>
          <FormControl>
            <RadioGroup value={mode} onChange={(v) => setMode(v as GameMode)}>
              <FormLabel>Game Mode</FormLabel>
              <HStack>
                <Radio value={GameMode.PLAYER}>Player</Radio>
                <Radio value={GameMode.BOT}>Bot</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>n</FormLabel>
            <NumberInput value={n} min={1} onChange={setN} />
            <FormHelperText>Amount of matches = 2n + 1</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>m</FormLabel>
            <NumberInput value={m} min={1} max={2 * n + 1} onChange={setM} />
            <FormHelperText>Can take 1 to m matches at a time</FormHelperText>
          </FormControl>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue' onClick={handleStart}>
          Start
        </Button>
      </CardFooter>
    </Card>
  );
}
