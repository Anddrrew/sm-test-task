import { ChakraProvider } from '@chakra-ui/react';
import GameProvider from './providers/GameProvider';
import Game from './components/Game';

function App() {
  return (
    <ChakraProvider>
      <GameProvider>
        <Game />
      </GameProvider>
    </ChakraProvider>
  );
}

export default App;
