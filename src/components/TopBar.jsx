import React from "react";
import { Upload, Moon } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full bg-[#F5F6F8] border-b border-gray-200 h-14 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">⚡</span>
            </div>
            <span className="font-semibold text-gray-800 text-lg">
              Flash Production
            </span>
          </div>

          {/* Groupe Select */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Groupe :</span>
            <select className="bg-white border border-gray-300 rounded-lg px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>— Tous —</option>
              <option>Groupe A</option>
              <option>Groupe B</option>
            </select>
          </div>

          {/* File status */}
          <span className="text-sm text-gray-500">
            Aucun fichier chargé
          </span>

          {/* Dark mode button */}
          <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 transition">
            <Moon size={16} className="text-gray-600" />
          </button>

        </div>

        {/* RIGHT SECTION */}
        <div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm transition text-sm font-medium">
            <Upload size={16} />
            Charger CSV
          </button>
        </div>

      </div>
    </header>
  );
}