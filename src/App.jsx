import { useState } from "react"
import TopBar from "./components/TopBar"
import DataTable from "./components/DataTable"
import Legend from "./components/Legend"
import EmptyState from "./components/EmptyState"
import { parseCSV } from "./utils/csvParser"

export default function App() {
  const [data, setData] = useState(null)

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const rows = parseCSV(ev.target.result)
      setData(rows)
    }
    reader.readAsText(file)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-slate-200">
      <TopBar onUpload={handleFileUpload} />
      {data ? (
        <>
          <DataTable data={data} />
          <Legend />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}