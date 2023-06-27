import { ChakraProvider } from '@chakra-ui/react';
import Game from './components/Game';
import GameProvider from './providers/GameProvider';

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
