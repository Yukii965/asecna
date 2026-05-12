import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import axios from 'axios';
import type { Terminal } from './data/types';

import {
  Plus,
  Search,
  Activity,
  Server,
  AlertCircle,
  X,
} from 'lucide-react';

const App: React.FC = () => {
  // =======================
  // STATE
  // =======================
  const [terminalsList, setTerminalsList] = useState<Terminal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [user, setUser] = useState<{
    name: string;
    role: 'admin' | 'client';
  } | null>(null);

  const [selectedTerminal, setSelectedTerminal] =
    useState<Terminal | null>(null);

  // ✅ MODE AJOUT
  const [isAddingMode, setIsAddingMode] = useState(false);

  // =======================
  // API FETCH
  // =======================
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/terminals')
      .then((res) => setTerminalsList(res.data))
      .catch((err) => console.error('Erreur API:', err));
  }, []);

  // =======================
  // LOGIN
  // =======================
  const handleLogin = (
    username: string,
    role: 'admin' | 'client'
  ) => {
    setUser({ name: username, role });
  };

  // =======================
  // ADD TERMINAL
  // =======================
  const handleAddTerminal = (newTerminal: Terminal) => {
    setTerminalsList((prev) => [...prev, newTerminal]);

    setIsAddingMode(false);

    // Plus tard :
    // axios.post('http://localhost:5000/api/terminals', newTerminal)
  };

  // =======================
  // DELETE TERMINAL
  // =======================
  const handleDeleteTerminal = (id: string) => {
    if (
      window.confirm(
        'Voulez-vous vraiment supprimer ce terminal ?'
      )
    ) {
      setTerminalsList((prev) =>
        prev.filter((t) => t.id !== id)
      );

      setSelectedTerminal(null);
    }
  };

  // =======================
  // FILTER
  // =======================
  const filteredTerminals = terminalsList.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =======================
  // LOGIN SCREEN
  // =======================
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden relative">

      {/* =======================
          SIDEBAR OVERLAY
      ======================= */}
      <div
        className={`fixed inset-y-0 left-0 z-[1001] transform transition-transform duration-300 ease-in-out ${
          selectedTerminal
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <Sidebar
          terminal={selectedTerminal}
          onClose={() => setSelectedTerminal(null)}
          userRole={user.role}
          onDelete={handleDeleteTerminal}
        />
      </div>

      {/* BACKDROP */}
      {selectedTerminal && (
        <div
          className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-[2px]"
          onClick={() => setSelectedTerminal(null)}
        />
      )}

      {/* =======================
          MAIN CONTENT
      ======================= */}
      <div className="flex-1 w-full h-full">
        <main className="h-full w-full relative">

          {/* =======================
              BANNER MODE AJOUT
          ======================= */}
          {isAddingMode && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[2000] bg-blue-600 text-white px-6 py-2 rounded-full shadow-2xl animate-bounce font-bold">
              Cliquez sur la carte pour placer le nouveau terminal
            </div>
          )}

          {/* =======================
              HEADER
          ======================= */}
          <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col md:flex-row gap-4 pointer-events-none">

            {/* SEARCH */}
            <div className="relative pointer-events-auto w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Rechercher un terminal..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white rounded-xl py-2.5 pl-10 pr-4 shadow-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* STATS */}
            <div className="hidden md:flex gap-4 pointer-events-auto">

              <StatCard
                icon={<Server size={14} />}
                label="Total"
                value={terminalsList.length}
                color="blue"
              />

              <StatCard
                icon={<Activity size={14} />}
                label="Actifs"
                value={filteredTerminals.length}
                color="green"
              />

              <StatCard
                icon={<AlertCircle size={14} />}
                label="Alertes"
                value={0}
                color="red"
              />
            </div>

            {/* USER */}
            <div className="ml-auto flex items-center gap-3 pointer-events-auto">

              <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/50 flex items-center gap-2">

                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-white text-xs font-bold uppercase tracking-tighter">
                  {user.name} ({user.role})
                </span>
              </div>

              <button
                onClick={() => setUser(null)}
                className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-2.5 rounded-xl border border-red-500/20 transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* =======================
              ADMIN BUTTON
          ======================= */}
          {user.role === 'admin' && (
            <button
              onClick={() =>
                setIsAddingMode(!isAddingMode)
              }
              className={`absolute bottom-10 right-10 z-[1000] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                isAddingMode
                  ? 'bg-red-500 rotate-45'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              <Plus size={30} />
            </button>
          )}

          {/* =======================
              MAP
          ======================= */}
          <MapView
            terminals={filteredTerminals}
            onSelectTerminal={setSelectedTerminal}

            // ✅ MODE AJOUT
            isAddingMode={isAddingMode}

            // ✅ CLICK SUR LA MAP
            onMapClick={(coords) => {
              if (isAddingMode) {

                const name = prompt(
                  'Nom du nouveau terminal ?'
                );

                if (name) {
                  const newT: Terminal = {
                    id: `T-${Date.now()}`,
                    name: name,

                    coordinates: coords,

                    sfa: {
                      amhs_rsfta: '-',
                      smt: '-',
                      atsds: '-',
                      aidc: '-',
                    },

                    sma: {
                      vhf: '-',
                      hf: '-',
                      cpdlc: '-',
                    },

                    srna: {
                      reseau: '-',
                      antenne: '-',
                      radiobalise: '-',
                      radioborne: '-',
                    },
                  };

                  handleAddTerminal(newT);
                }
              }
            }}
          />
        </main>
      </div>
    </div>
  );
};

// =======================
// STAT CARD
// =======================
type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'red';
};

const StatCard = ({
  icon,
  label,
  value,
  color,
}: StatCardProps) => {

  const colorClasses =
    color === 'blue'
      ? 'text-blue-400 bg-blue-400/10'
      : color === 'green'
      ? 'text-green-400 bg-green-400/10'
      : 'text-red-400 bg-red-400/10';

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg">

      <div className={`${colorClasses} p-1.5 rounded-lg`}>
        {icon}
      </div>

      <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          {label}
        </p>

        <p className="text-white font-black leading-none">
          {value}
        </p>
      </div>
    </div>
  );
};

export default App;