import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
};

export default function NumberInput({ value, min, max, onChange }: Props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    value,
    min,
    max,
    step: 1,
    onChange: (v) => onChange(Number(v)),
    focusInputOnChange: false,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack>
      <Button {...dec} variant='outline'>
        -
      </Button>
      <Input {...input} />
      <Button {...inc} variant='outline'>
        +
      </Button>
    </HStack>
  );
}
