import { useState, useMemo, useEffect } from "react"
import TopBar from "./components/TopBar"
import DataTable from "./components/DataTable"
import Legend from "./components/Legend"
import { parseCSV } from "./utils/csvParser"
import { buildIndex } from "./utils/dataProcessor"

export default function App() {
  // --- Gestion Thème ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // --- Gestion Données ---
  const [rawData, setRawData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [collapseState, setCollapseState] = useState({});

  const groups = useMemo(() => [...new Set(rawData.map(r => r.groupe_suivi).filter(Boolean))].sort(), [rawData]);

  const indexData = useMemo(() => {
    if (rawData.length === 0) return null;
    return buildIndex(rawData, selectedGroup);
  }, [rawData, selectedGroup]);

  function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rows = parseCSV(ev.target.result);
      setRawData(rows);
      if (rows.length > 0 && rows[0].groupe_suivi) setSelectedGroup(rows[0].groupe_suivi);
      setCollapseState({}); // Reset collapse on new file
    };
    reader.readAsText(file);
  }

  const toggleGroup = (key) => setCollapseState(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="h-screen flex flex-col bg-bg font-sans text-text overflow-hidden transition-colors duration-200">
      <TopBar 
        groups={groups} selectedGroup={selectedGroup} onGroupChange={setSelectedGroup}
        onFileUpload={handleFileUpload} statusMsg={rawData.length > 0 ? `${rawData.length} lignes chargées` : null}
        isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      {indexData ? (
        <>
          <DataTable indexData={indexData} collapseState={collapseState} toggleGroup={toggleGroup} />
          <Legend />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-text-muted opacity-50">
          <div className="text-6xl mb-4">📂</div>
          <p className="font-medium">Veuillez charger un fichier CSV pour commencer</p>
        </div>
      )}
    </div>
  )
}