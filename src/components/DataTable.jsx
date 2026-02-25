import { ROW_DEFS } from "../config/rowDefinitions";
import { buildAgg, formatMonth, parseDate, getDayLabel, shortDate } from "../utils/dataProcessor";

// Formattage Affichage
const fmt = (val, type) => {
  if (val === null || val === undefined || isNaN(val)) return <span className="text-text-muted opacity-50">—</span>;
  if (type === 'percent') return Math.round(val * 100) + '%';
  return Math.round(val).toLocaleString('fr-FR');
};

// Gestion Couleurs KPI
// Dans src/components/DataTable.jsx

const getCellClass = (val, row) => {
  // 1. Si pas de configuration couleur ou valeur vide, on renvoie rien
  if (!row.colorMode || val === null || val === undefined) return '';

  const { refMin, refMax, colorMode } = row;

  // 2. Mode RANGE (Ex: TRP entre 90% et 110%)
  if (colorMode === 'range') {
    // Si dans la cible [Min, Max] -> VERT
    if (val >= refMin && val <= refMax) return 'bg-green-bg text-green';
    // Si légèrement en dessous (marge de 10%) -> ORANGE
    if (val < refMin && val >= refMin - 0.10) return 'bg-orange-bg text-orange';
    // Sinon -> ROUGE
    return 'bg-red-bg text-red';
  } 
  
  // 3. Mode MIN (Ex: QS doit être > 90%)
  else if (colorMode === 'min') {
    // Si au dessus du Min -> VERT
    if (val >= refMin) return 'bg-green-bg text-green';
    // Si légèrement en dessous (marge de 5%) -> ORANGE
    if (val >= refMin - 0.05) return 'bg-orange-bg text-orange';
    // Sinon -> ROUGE
    return 'bg-red-bg text-red';
  }
  
  // 4. Mode MAX_INV (Ex: Raccroché doit être < 5%)
  // Note: Pour 'max_inv', "Bon" c'est être PETIT
  else if (colorMode === 'max_inv') {
    if (val <= refMax) return 'bg-green-bg text-green';
    if (val <= refMax + 0.05) return 'bg-orange-bg text-orange';
    return 'bg-red-bg text-red';
  }

  return '';
};

export default function DataTable({ indexData, collapseState, toggleGroup }) {
  const { sortedMonths, monthWeekDay, dateIndex, sortedDates, dateMois, allFiles } = indexData;

  // Fusionner les définitions fixes + les fichiers dynamiques
  const rowsToRender = [
      ...ROW_DEFS, 
      ...allFiles.map(f => ({ type: 'sub', label: f, code: f, formula: d => d['files::'+f] ?? null, fmt: 'number' }))
  ];

  return (
    <div className="flex-1 overflow-auto relative bg-bg-2">
      <table className="border-collapse w-full text-xxs">
        
        {/* === HEADER === */}
        <thead className="sticky top-0 z-40 bg-bg-3 shadow-sm">
          
          {/* LIGNE 1 : MOIS */}
          <tr>
            <th rowSpan="3" className="sticky left-0 z-50 bg-bg-3 p-2 min-w-[200px] text-left border-r border-b border-border text-text-muted font-semibold tracking-wider">INDICATEUR</th>
            <th rowSpan="3" className="sticky left-[200px] z-50 bg-bg-3 p-2 min-w-[100px] border-r border-b border-border text-text-muted font-normal">CODE</th>
            {sortedMonths.map(m => {
               const isCollapsed = collapseState[`m:${m}`];
               let span = 1;
               if (!isCollapsed) {
                 Object.keys(monthWeekDay[m]).forEach(w => {
                    if (!collapseState[`w:${m}:${w}`]) span += monthWeekDay[m][w].length;
                    span += 1;
                 });
               }
               return (
                 <th key={m} colSpan={span} className="bg-accent text-white border-r border-b border-white/20 p-1">
                   <div className="flex items-center justify-center gap-1">
                     <button onClick={() => toggleGroup(`m:${m}`)} className="w-4 h-4 flex items-center justify-center bg-white/20 rounded hover:bg-white/30 font-bold">
                       {isCollapsed ? '+' : '−'}
                     </button>
                     {formatMonth(m)}
                   </div>
                 </th>
               );
            })}
          </tr>

          {/* LIGNE 2 : SEMAINES */}
          <tr>
             {sortedMonths.map(m => {
                 if (collapseState[`m:${m}`]) return <th key={`t-${m}`} rowSpan="2" className="bg-month-total border-r border-b border-border text-accent font-normal">Total<br/>{formatMonth(m)}</th>;
                 
                 return Object.keys(monthWeekDay[m]).sort().map(w => {
                     const isWCollapsed = collapseState[`w:${m}:${w}`];
                     const wLen = monthWeekDay[m][w].length;
                     return (
                        <>
                           <th key={w} colSpan={isWCollapsed ? 1 : wLen + 1} className="bg-bg-4 text-text border-r border-b border-border font-medium">
                             <div className="flex items-center justify-center gap-1">
                                <button onClick={() => toggleGroup(`w:${m}:${w}`)} className="w-4 h-4 flex items-center justify-center bg-bg-2 border border-border-strong rounded text-text-muted hover:text-accent">
                                   {isWCollapsed ? '+' : '−'}
                                </button>
                                {w}
                             </div>
                           </th>
                           {/* Colonne Total Mois affichée à la fin des semaines du mois */}
                        </>
                     );
                 }).concat(<th key={`end-${m}`} rowSpan="2" className="bg-month-total border-r-2 border-accent border-b border-border text-accent font-bold"><div className="flex flex-col"><span>Total</span><span className="font-normal">{formatMonth(m)}</span></div></th>);
             })}
          </tr>

          {/* LIGNE 3 : JOURS */}
          <tr>
            {sortedMonths.map(m => {
                if (collapseState[`m:${m}`]) return null;
                return Object.keys(monthWeekDay[m]).sort().map(w => {
                    const dates = monthWeekDay[m][w].slice().sort((a, b) => parseDate(a) - parseDate(b));
                    return (
                        <>
                        {!collapseState[`w:${m}:${w}`] && dates.map(d => (
                            <th key={d} className="bg-bg-3 border-r border-b border-border min-w-[70px]">
                                <div className="flex flex-col items-center py-1">
                                    <span className="font-semibold text-text">{getDayLabel(d)}</span>
                                    <span className="font-normal text-text-muted text-[9px]">{shortDate(d)}</span>
                                </div>
                            </th>
                        ))}
                        <th className="bg-total border-r border-b border-border-strong text-text font-bold min-w-[60px]">Tot.<br/>{w}</th>
                        </>
                    );
                });
            })}
          </tr>
        </thead>

        {/* === BODY === */}
        <tbody>
          {rowsToRender.map((row, i) => {
            if (row.type === "section") {
              return (
                <tr key={i} className="bg-section">
                  <td colSpan="100%" className="px-4 py-2 font-bold text-accent uppercase tracking-wider border-b border-accent-light sticky left-0 z-30 bg-section">
                    {row.label}
                  </td>
                </tr>
              )
            }

            return (
              <tr key={i} className="hover:bg-accent-light/20 transition-colors group">
                <td className="sticky left-0 bg-bg-2 group-hover:bg-accent-light/20 border-r border-b border-border px-4 py-1.5 font-medium text-text-muted text-left">
                  {row.label}
                </td>
                <td className="sticky left-[200px] bg-bg-2 group-hover:bg-accent-light/20 border-r-2 border-border-strong border-b border-border px-2 py-1 text-text-muted text-left font-mono text-[9px]">
                  {row.code}
                </td>

                {/* BOUCLE MOIS / SEMAINES / JOURS */}
                {sortedMonths.map(m => {
                   const mDates = sortedDates.filter(d => dateMois[d] === m);
                   const mVal = row.formula(buildAgg(mDates, dateIndex)); 

                   if (collapseState[`m:${m}`]) {
                       return <td key={m} className="bg-month-total border-r-2 border-accent border-b border-border text-center font-bold text-accent">{fmt(mVal, row.fmt)}</td>
                   }

                   return Object.keys(monthWeekDay[m]).sort().map(w => {
                       const wDates = monthWeekDay[m][w].slice().sort((a,b) => parseDate(a)-parseDate(b));
                       const wVal = row.formula(buildAgg(wDates, dateIndex)); 
                       
                       const cells = [];
                       if (!collapseState[`w:${m}:${w}`]) {
                           wDates.forEach(d => {
                               const dVal = row.formula(dateIndex[d] || {});
                               const chipColor = getCellClass(dVal, row);
                               cells.push(
                                   <td key={d} className="border-r border-b border-border text-center py-1">
                                       <span className={`px-2 py-0.5 rounded-full font-semibold ${chipColor}`}>
                                         {fmt(dVal, row.fmt)}
                                       </span>
                                   </td>
                               );
                           });
                       }
                       // Total Semaine
                       cells.push(
                           <td key={`tot-${w}`} className="bg-total border-r border-b border-border-strong font-bold text-text text-center">
                               {fmt(wVal, row.fmt)}
                           </td>
                       );
                       return cells;
                   });
                }).concat(
                    // Total Mois (fin de ligne)
                    sortedMonths.map(m => !collapseState[`m:${m}`] && (
                        <td key={`end-tot-${m}`} className="bg-month-total border-r-2 border-accent border-b border-border font-bold text-accent text-center">
                            {fmt(row.formula(buildAgg(sortedDates.filter(d => dateMois[d] === m), dateIndex)), row.fmt)}
                        </td>
                    ))
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}