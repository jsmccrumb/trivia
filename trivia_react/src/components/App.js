import React from 'react';
import CreateGame from './pages/CreateGame';
import {useThemeContext} from './../hooks/useTheme';

function App() {
  const calculateColor = useThemeContext();
  const mainBG = calculateColor('background');
  const text = calculateColor('text');
  return (
    <div className={`bg-${mainBG} text-${text} w-screen h-screen`}>
      <CreateGame />
    </div>
  );
}

export default App;
