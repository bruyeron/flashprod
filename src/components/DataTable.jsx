import { ROW_DEFS } from "../config/rowDefinitions"
import { formatNumber, formatPercent } from "../utils/helpers"

export default function DataTable({ data }) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="min-w-full border-collapse text-xs">
        <thead className="sticky top-0 bg-slate-100 dark:bg-zinc-800">
          <tr>
            <th className="sticky left-0 bg-slate-100 dark:bg-zinc-800 border px-4 py-2 text-left">
              Indicateur
            </th>
            <th className="border px-4 py-2">Code</th>
          </tr>
        </thead>
        <tbody>
          {ROW_DEFS.map((row, i) => {
            if (row.type === "section") {
              return (
                <tr key={i} className="bg-blue-50 dark:bg-zinc-700">
                  <td colSpan="2" className="px-4 py-2 font-bold text-blue-600">
                    {row.label}
                  </td>
                </tr>
              )
            }

            return (
              <tr
                key={i}
                className="hover:bg-blue-50 dark:hover:bg-zinc-700"
              >
                <td className="sticky left-0 bg-white dark:bg-zinc-900 border px-4 py-2">
                  {row.label}
                </td>
                <td className="border px-4 py-2 text-slate-500">
                  {row.code}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}