import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const InfoModal = () => (
  <Popup
    modal
    trigger={
      <button
        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md"
        title="How it works"
      >
        ?
      </button>
    }
    contentStyle={{
      background: "#000",
      color: "#fff",
      padding: "1.25rem",
      border: "1px solid #333",
      borderRadius: "0.75rem",
      maxWidth: "400px",
      width: "90vw",
      maxHeight: "80vh",
      overflowY: "auto",
    }}
    overlayStyle={{
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(2px)",
    }}
  >
    {/* Cast to any to bypass TS limitation */}
    {
      ((close: () => void) => (
        <div className="text-white text-sm space-y-4 top-right">
          <button
            onClick={close}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white text-lg"
          >
            ×
          </button>

          <h2 className="text-lg font-bold text-blue-400 text-center">
            🚀 Welcome to PeakToPen!
          </h2>

          <p>
            This isn’t just a timer. This is your{" "}
            <span className="text-yellow-300 font-semibold">focus engine</span>.
            Hit <strong>Start</strong>, dive deep into your task, and let the
            clock run.
          </p>
          <p>
            As the session wraps up, jot down{" "}
            <span className="text-green-300">what you actually did</span>.
            <br />
            <strong className="text-white">
              No fluff. Just pure accountability.
            </strong>
          </p>

          <div className="space-y-1">
            <p>📌 Every note = your proof of work.</p>
            <p>📉 Skip a day? You’ll feel it.</p>
            <p>📈 Show up? You’ll see the momentum build.</p>
          </div>

          <p className="text-purple-300 font-semibold text-center ">
            Daily logs • Focused effort • Explosive productivity
          </p>

          <div className="text-zinc-400 text-xs italic border-t border-zinc-700 pt-2">
            🕛 Notes reset every day,{" "}
            <strong>so show up & make today count!</strong> or it’s a clean slate.
          </div>
        </div>
      )) as unknown as React.ReactNode
    }
  </Popup>
);
