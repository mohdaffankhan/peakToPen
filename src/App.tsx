import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <ModeToggle />
        <div className="flex items-center justify-center">
          <Timer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
