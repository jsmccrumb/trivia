import React, {useState, useContext, createContext, useEffect,} from 'react';

// Using tailwind css, each value gets a color and the shade, optionally a number to adjust shade by for borders etc
// produces classes such as .bg-{color}-{shade} and .bg-{color}-{shade + adjustment}
const THEMES = {
  dark: {
    background: {
      color: 'gray',
      shade: 800,
      adjustment: -200,
    },
    text: {
      color: 'yellow',
      shade: 200,
      adjustment: 200,
    },
    info: {
      color: 'blue',
      shade: 600,
      adjustment: 200,
    },
  },
  light: {
    background: {
      color: 'gray',
      shade: 200,
      adjustment: 100,
    },
    text: {
      color: 'gray',
      shade: 900,
      adjustment: -100,
    },
    info: {
      color: 'blue',
      shade: 400,
      adjustment: 200,
    },
  },
};

// context for switching theme with placeholder toggle method
const ToggleThemeContext = createContext({
  themes: Object.keys(THEMES),
  setCurrentTheme: () => {}
});
// context for getting current theme
const ThemeContext = createContext(() => {});
// export methods to use contexts for consumers
export const useToggleThemeContext = () => useContext(ToggleThemeContext);
export const useThemeContext = () => useContext(ThemeContext);

const ThemeContextProvider = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [calculateColor, setCalculateColor] = useState();
  useEffect(() => {
    const theme = THEMES[currentTheme];
    setCalculateColor(() => (themeItem, useAdjustment = false) => {
      const {color, shade, adjustment = 200} = theme[themeItem];
      if (color == null) {
        throw new Error('Unrecognized theme item, available keys are:', Object.keys(theme));
      }
      return useAdjustment ?
          `${color}-${shade + adjustment}` :
          `${color}-${shade}`;
    });
  }, [currentTheme]);
  return (
    <ThemeContext.Provider value={calculateColor}>
      <ToggleThemeContext.Provider 
          value={{themes: Object.keys(THEMES), setCurrentTheme}}>
        {calculateColor && children}
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
