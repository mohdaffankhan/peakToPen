import { useState } from "react";
import { NoteSidebar } from "./components/NoteSidebar";
import { ThemeProvider } from "./components/theme-provider";
import Timer from "./components/Timer";
import { InfoModal } from "./components/InfoModal";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed inset-0 bg-[#0d0d0f] text-white font-sans flex flex-col">
        {/* Info Button - top left */}
        <div className="absolute top-4 left-4 z-50">
          <InfoModal />
        </div>

        {/* Header section */}
        <header className="pt-10 pb-4 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-lg">
            PeakToPen
          </h1>
          <p className="mt-2 text-base text-zinc-400 max-w-xl mx-auto px-4">
            From peak focus to pen and paper — log your real work, build your
            real self.
          </p>
          <p className="mt-1 text-lg text-purple-400 italic">
            Show up daily. Build momentum. Compound your productivity.
          </p>
        </header>

        {/* Centered Timer */}
        <main className="flex-1 flex items-start justify-center pt-16">
          <Timer />
        </main>

        {/* Notes Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-neutral-800 hover:bg-gray-600 text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300"
          title="Open Notes"
        >
          📝 Notes
        </button>

        {/* Notes Sidebar */}
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
