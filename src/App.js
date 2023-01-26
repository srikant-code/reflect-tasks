import "./App.css";
import { VideoScreenshotGenerator } from "./ChatGPT/DBAsGoogleSheets/reArrange/videoScreenshotZip";
import Home from "./views/home";

function App() {
  return (
    <div className="App">
      <Home />
      <VideoScreenshotGenerator />
    </div>
  );
}

export default App;
