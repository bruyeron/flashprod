// Helpers Dates
export const parseDate = (s) => {
  if (!s) return new Date(0);
  // Format attendu JJ/MM/AAAA ou Date JS
  const m = typeof s === 'string' ? s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : null;
  return m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(s);
};

export const getMois = (s) => {
  const d = parseDate(s);
  if (!d) return '?';
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
};

export const getDayLabel = (s) => {
  const d = parseDate(s);
  return ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'][d.getDay()];
};

export const shortDate = (s) => {
  const d = parseDate(s);
  return String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');
}

export const formatMonth = (m) => {
  try {
      const [y, mo] = m.split('-');
      const names = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
      return names[parseInt(mo) - 1] + ' ' + y;
  } catch (e) { return m; }
};

// Helpers Calculs
export const v = (d, src, attr) => d ? (d[src + '::' + attr] ?? null) : null;
export const pct = (n, den) => (n === null || den === null || den === 0) ? null : n / den;

// Construction de l'index
export function buildIndex(rows, group) {
  const filtered = group ? rows.filter(r => r.groupe_suivi === group) : rows;
  const dateIndex = {};
  const dateWeek = {};
  const dateMois = {};
  const allFiles = new Set();
  const allDates = new Set();

  filtered.forEach(r => {
      const date = r.date_appel;
      // Nettoyage valeur (remplace virgule par point)
      let valStr = String(r.valeur).replace(',', '.').replace(/\s/g, ''); 
      const val = parseFloat(valStr) || 0;
      const key = r.source + '::' + r.attribut;
      
      allDates.add(date);
      dateWeek[date] = r.semaine; 
      dateMois[date] = getMois(date);
      
      if (r.source === 'files') allFiles.add(r.attribut);
      
      if (!dateIndex[date]) dateIndex[date] = {};
      dateIndex[date][key] = (dateIndex[date][key] || 0) + val;
  });

  const monthWeekDay = {};
  allDates.forEach(d => {
      const w = dateWeek[d], m = dateMois[d];
      if (!monthWeekDay[m]) monthWeekDay[m] = {};
      if (!monthWeekDay[m][w]) monthWeekDay[m][w] = [];
      // On s'assure que les dates sont uniques dans le tableau
      if(!monthWeekDay[m][w].includes(d)) monthWeekDay[m][w].push(d);
  });

  const sortedDates = [...allDates].sort((a, b) => parseDate(a) - parseDate(b));
  const sortedMonths = Object.keys(monthWeekDay).sort();

  return { dateIndex, dateWeek, dateMois, allFiles: [...allFiles].sort(), sortedDates, sortedMonths, monthWeekDay };
}

// Agrégation
export function buildAgg(dates, dateIndex) {
  const agg = {};
  dates.forEach(d => {
      const dd = dateIndex[d] || {};
      Object.keys(dd).forEach(k => { agg[k] = (agg[k] || 0) + dd[k]; });
  });
  return agg;
}