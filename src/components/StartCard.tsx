import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useGame } from '../providers/GameProvider';
import { useEffect, useState } from 'react';
import GameMode from '../types/GameMode';
import { FireIcon } from '@heroicons/react/24/outline';

export default function StartCard() {
  const { startGame } = useGame();
  const [mode, setMode] = useState(GameMode.PLAYER);
  const [n, setN] = useState(12);
  const [m, setM] = useState(3);

  useEffect(() => setM(Math.min(2 * n + 1, m)), [n]);

  const handleStart = () => startGame(mode, n, m);

  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'>Matchsticks</Heading>
      </CardHeader>
      <CardBody>
        <Stack gap={4}>
          <Center w='60'>
            <FireIcon />
          </Center>
          <FormControl>
            <FormLabel>Game Mode</FormLabel>
            <RadioGroup value={mode} onChange={(v) => setMode(v as GameMode)}>
              <HStack>
                <Radio value={GameMode.PLAYER}>Player</Radio>
                <Radio value={GameMode.AI}>AI</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>n</FormLabel>
            <NumberInput value={n} min={1} onChange={(v) => setN(Number(v))} isRequired>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Amount of matches = 2n + 1</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>m</FormLabel>
            <NumberInput value={m} min={1} max={2 * n + 1} onChange={(v) => setM(Number(v))} isRequired>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
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
