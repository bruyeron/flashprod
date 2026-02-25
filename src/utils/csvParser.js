export function parseCSV(text) {
  const lines = text.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  if (lines.length < 2) return [];
  
  // Détection du séparateur
  const h0 = lines[0];
  const sep = (h0.split('\t').length > h0.split(',').length) ? '\t' : ',';
  
  const headers = h0.split(sep).map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim(); if (!line) continue;
    const parts = line.split(sep);
    const obj = {};
    headers.forEach((h, j) => { 
        obj[h] = (parts[j] || '').trim().replace(/^"|"$/g, ''); 
    });
    rows.push(obj);
  }
  return rows;
}