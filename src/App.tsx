import React, { useState } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { terminals } from './data/mockData'; // On créera ce fichier après
import type { Terminal } from './data/types';

const App: React.FC = () => {
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);

  return (
    <div className="flex h-screen w-full bg-slate-900 overflow-hidden">
      {/* Sidebar - Largeur fixe, scrollable */}
      <Sidebar 
        terminal={selectedTerminal} 
        onClose={() => setSelectedTerminal(null)} 
      />

      {/* Carte - Prend tout l'espace restant */}
      <main className="flex-1 relative">
        <MapView 
          terminals={terminals} 
          onSelectTerminal={setSelectedTerminal} 
        />
      </main>
    </div>
  );
};

export default App;