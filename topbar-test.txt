export default function TopBar({ onUpload }) {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="h-14 flex items-center px-6 border-b bg-white dark:bg-zinc-800 shadow-sm">
      <div className="text-lg font-bold flex items-center gap-2">
        ⚡ Flash Production
      </div>

      <button
        onClick={toggleTheme}
        className="ml-auto px-3 py-1 rounded bg-slate-200 dark:bg-zinc-700"
      >
        🌙
      </button>

      <input
        type="file"
        accept=".csv"
        className="hidden"
        id="fileInput"
        onChange={onUpload}
      />

      <label
        htmlFor="fileInput"
        className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer text-sm font-semibold"
      >
        Charger CSV
      </label>
    </div>
  )
}