import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import { useState } from 'react';
import GameMode from '../types/GameMode';

export default function StartCard() {
  const { startGame } = useGame();
  const [mode, setMode] = useState(GameMode.PLAYER);
  const [n, setN] = useState(12);
  const [m, setM] = useState(3);

  const handleStart = () => startGame(mode, n, m);

  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'>Matchsticks</Heading>
      </CardHeader>
      <CardBody>
        <Stack gap={3}>
          <FormControl>
            <FormLabel>First Move</FormLabel>
            <RadioGroup value={mode} onChange={(v) => setMode(v as GameMode)}>
              <HStack>
                <Radio value={GameMode.PLAYER}>Player</Radio>
                <Radio value={GameMode.AI}>AI</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>N</FormLabel>
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
            <FormLabel>M</FormLabel>
            <NumberInput value={m} min={1} onChange={(v) => setM(Number(v))} isRequired>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Can take 1 to M matches at a time</FormHelperText>
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
