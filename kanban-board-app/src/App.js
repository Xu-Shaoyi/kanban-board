import React, { useState } from "react";
import MainPage from "./components/MainPage";
import BoardPage from "./components/BoardPage";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

function App() {
  const [showBoard, setShowBoard] = useState(false);
  const [boardName, setBoardName] = useState(null);

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {showBoard ? (
        <BoardPage setShowBoard={setShowBoard} boardName={boardName} />
      ) : (
        <MainPage setShowBoard={setShowBoard} setBoardName={setBoardName} />
      )}
    </ThemeProvider>
  );
}

export default App;
