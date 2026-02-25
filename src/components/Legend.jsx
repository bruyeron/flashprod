export default function Legend() {
  return (
    <div className="h-8 flex items-center gap-4 px-5 border-t border-border bg-bg-2 text-xxs flex-shrink-0">
      <span className="font-medium text-text-muted">Performance :</span>
      <div className="flex items-center gap-1"><span className="bg-green-bg text-green px-2 py-0.5 rounded-full font-bold">≥ Max</span><span className="text-text-muted">Objectif atteint</span></div>
      <div className="flex items-center gap-1"><span className="bg-orange-bg text-orange px-2 py-0.5 rounded-full font-bold">≥ Min</span><span className="text-text-muted">Acceptable</span></div>
      <div className="flex items-center gap-1"><span className="bg-red-bg text-red px-2 py-0.5 rounded-full font-bold">&lt; Min</span><span className="text-text-muted">Hors cible</span></div>
      <div className="w-px h-4 bg-border mx-2"></div>
      <div className="flex items-center gap-2 text-text-muted">
        <div className="w-4 h-1 bg-border-strong rounded"></div> Total semaine
      </div>
      <div className="flex items-center gap-2 text-text-muted">
        <div className="w-4 h-1 bg-accent rounded"></div> Total mois
      </div>
    </div>
  )
}