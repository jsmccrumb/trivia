import React from 'react';
import ThemeContextProvider from './../hooks/useTheme';

const AppContext = ({children}) => {
  return (
    <ThemeContextProvider>{children}</ThemeContextProvider>
  );
};

export default AppContext;
