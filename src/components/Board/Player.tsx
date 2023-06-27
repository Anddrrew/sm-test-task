import { Box, Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react';

type Props = {
  hasTurn: boolean;
  matches: number;
  isUser?: boolean;
};

export default function Player({ isUser, hasTurn, matches }: Props) {
  return (
    <Card h='100%' boxShadow={hasTurn ? 'outline' : 'base'}>
      <CardBody w='full'>
        <Stack align='center'>
          <Box fontSize='9xl'>{isUser ? '🧑' : '🤖'}</Box>
          <Heading size='md'>{isUser ? 'Player' : 'Bot'}</Heading>
          <Text>{matches}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
