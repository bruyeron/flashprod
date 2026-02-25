import { useRef } from 'react';

export default function TopBar({ 
  groups = [], selectedGroup, onGroupChange, onFileUpload, 
  statusMsg, isDarkMode, toggleTheme 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileUpload) onFileUpload(file);
    e.target.value = ''; 
  };

  return (
    <div className="h-14 bg-bg-2 border-b-2 border-border flex items-center px-5 gap-4 shadow-sm z-50">
      <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white text-lg font-bold">⚡</div>
      <span className="font-bold text-lg text-text">Flash Production</span>
      <div className="w-px h-6 bg-border mx-2"></div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted font-medium uppercase tracking-wide">Groupe :</span>
        <select 
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value)}
          className="bg-bg-3 border border-border text-text py-1.5 px-3 rounded text-xs font-medium focus:ring-2 focus:ring-accent outline-none"
        >
          <option value="">— Tous —</option>
          {groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <span className="text-xs text-text-muted">{statusMsg}</span>

      <div className="ml-auto flex items-center gap-3">
        <button onClick={toggleTheme} className="w-9 h-9 rounded bg-bg-3 border border-border text-text hover:bg-accent hover:text-white transition-colors">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="bg-accent text-white py-2 px-4 rounded text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
          <span>📂</span> Charger CSV
        </button>
      </div>
      
      <input type="file" ref={fileInputRef} accept=".csv,.txt" onChange={handleFileChange} className="hidden" />
    </div>
  );
}