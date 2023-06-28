import { Box, Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react';

type Props = {
  name: string;
  symbol: string;
  matches: number;
  isActive?: boolean;
};

export default function InfoCard({ name, symbol, matches, isActive }: Props) {
  return (
    <Card boxShadow={isActive ? 'outline' : 'base'}>
      <CardBody w='full'>
        <Stack align='center'>
          <Box fontSize={['4xl', '7xl', '9xl']}>{symbol}</Box>
          <Heading size={['sm', 'md']}>{name}</Heading>
          <Text>{matches}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
