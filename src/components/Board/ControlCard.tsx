import { Button, Card, CardBody, CardFooter, FormLabel, HStack, Text } from '@chakra-ui/react';
import NumberInput from '../common/NumberInput';

type Props = {
  take: number;
  maxTake: number;
  isDisabled: boolean;
  onChange: (take: number) => void;
  onClick: (take: number) => void;
};

export default function ControlCard({ take, maxTake, isDisabled, onChange, onClick }: Props) {
  return (
    <Card align='center' size='sm'>
      <CardBody w='full'>
        <HStack justify='space-between' align='baseline'>
          <FormLabel>Match quantity</FormLabel>
          <Text>Max: {maxTake}</Text>
        </HStack>
        <NumberInput value={take} min={1} max={maxTake} onChange={onChange} />
      </CardBody>
      <CardFooter>
        <Button colorScheme='blue' onClick={() => onClick(take)} isDisabled={isDisabled}>
          Take
        </Button>
      </CardFooter>
    </Card>
  );
}
