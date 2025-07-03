import { useState } from "react";
import { NoteSidebar } from "./components/NoteSidebar";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed inset-0 bg-[#0d0d0f] text-white font-sans">
        <header className="w-full p-4 text-center text-3xl font-bold text-white tracking-wide">
          PeakToPen
        </header>
        <div className="absolute top-4 left-4 z-50">

        </div>

        <main className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Timer />
        </main>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-neutral-800 hover:bg-gray-600 text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300"
          title="Open Notes"
        >
          📝 Notes
        </button>

        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-20"
              onClick={() => setIsSidebarOpen(false)}
            />

            <div className="fixed right-0 top-0 h-full w-full max-w-md z-30 bg-[#1c1c1e] border-l border-[#333] shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col">
              <NoteSidebar />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-[#aaa] hover:text-white text-2xl"
                title="Close Notes"
              >
                ×
              </button>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
