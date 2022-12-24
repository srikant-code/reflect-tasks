import React, { useState } from "react";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <div style={{ background: theme.background, color: theme.text }}>
      <button
        style={{ background: theme.toggleBackground, color: theme.toggleText }}
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
      <p>
        This is some text that will change color based on the selected theme.
      </p>
    </div>
  );
}

export default App;
