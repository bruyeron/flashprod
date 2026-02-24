export function parseCSV(text) {
  const lines = text.trim().split("\n")
  if (lines.length < 2) return []

  const headers = lines[0].split(",").map(h => h.trim())
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",")
    const obj = {}
    headers.forEach((h, j) => {
      obj[h] = values[j]?.trim()
    })
    rows.push(obj)
  }

  return rows
}