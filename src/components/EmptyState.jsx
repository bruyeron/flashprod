export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
      <div className="text-5xl">📂</div>
      <div className="mt-4 text-lg font-semibold opacity-40">
        Aucune donnée chargée
      </div>
      <div className="text-sm">
        Cliquez sur « Charger CSV »
      </div>
    </div>
  )
}