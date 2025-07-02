import { ModeToggle } from "./components/mode-toggle";
import Button from "./components/Sound";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";
import Toast from "./components/Toast";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <ModeToggle />
        <Button/>
        <div className="flex items-center justify-center">
          <Timer />
        </div>
        <Toast/>
      </div>
    </ThemeProvider>
  );
}

export default App;
