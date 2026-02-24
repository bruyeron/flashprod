export default function Legend() {
  return (
    <div className="h-8 flex items-center gap-6 px-6 border-t bg-white dark:bg-zinc-800 text-xs">
      <span className="font-medium text-slate-500">Performance :</span>
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
        ≥ Max
      </span>
      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
        ≥ Min
      </span>
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">
        &lt; Min
      </span>
    </div>
  )
}