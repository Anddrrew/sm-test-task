import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { UserCircleIcon, CpuChipIcon } from '@heroicons/react/24/outline';

type Props = {
  hasTurn: boolean;
  matches: number;
  isUser?: boolean;
};

export default function PlayerCard({ isUser, hasTurn, matches }: Props) {
  return (
    <Card h='100%' align='center' boxShadow={hasTurn ? 'outline' : 'none'}>
      <CardHeader>
        <Heading size='md'>{isUser ? 'Player' : 'AI'}</Heading>
      </CardHeader>
      <CardBody w='full'>
        {isUser ? <UserCircleIcon /> : <CpuChipIcon />}
        <pre>{JSON.stringify({ isUser: !!isUser, hasTurn, matches }, null, 2)}</pre>
      </CardBody>
    </Card>
  );
}
