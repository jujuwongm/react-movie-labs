import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial',
    ].join(','),
  },
});

const TemplateActorPage = ({ children, actor }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>{actor.name}</h1>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default TemplateActorPage;
