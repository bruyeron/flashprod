export function formatNumber(v) {
  if (!v || isNaN(v)) return "—"
  return Math.round(v).toLocaleString("fr-FR")
}

export function formatPercent(v) {
  if (!v || isNaN(v)) return "—"
  return Math.round(v * 100) + "%"
}