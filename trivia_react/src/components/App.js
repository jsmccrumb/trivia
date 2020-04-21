import React from 'react';
import {useThemeContext} from './../hooks/useTheme';

function App() {
  const calculateColor = useThemeContext();
  const mainBG = calculateColor('background');
  const text = calculateColor('text');
  return (
    <div className={`bg-${mainBG} text-${text}`}>
      Well now.
    </div>
  );
}

export default App;
