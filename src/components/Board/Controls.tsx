import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

type Props = {
  take: number;
  maxTake: number;
  isDisabled: boolean;
  onChange: (take: number) => void;
  onClick: (take: number) => void;
};

export default function Controls({ take, maxTake, isDisabled, onChange, onClick }: Props) {
  return (
    <Card h='100%' align='center' size='sm'>
      <CardBody w='full'>
        <HStack justify='space-between' align='baseline'>
          <FormLabel>Match quantity</FormLabel>
          <Text>Max: {maxTake}</Text>
        </HStack>
        <NumberInput value={take} min={1} max={maxTake} onChange={(v) => onChange(Number(v))}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue' onClick={() => onClick(take)} isDisabled={isDisabled}>
          Take
        </Button>
      </CardFooter>
    </Card>
  );
}
