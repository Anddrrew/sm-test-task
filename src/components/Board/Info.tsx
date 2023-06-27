import { Box, Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react';

type Props = {
  matches: number;
};

export default function Info({ matches }: Props) {
  return (
    <Card h='100%'>
      <CardBody w='full'>
        <Stack align='center'>
          <Box fontSize='9xl'>🔥</Box>
          <Heading size='md'>Heap</Heading>
          <Text>{matches}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
