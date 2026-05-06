import { X, Radio, Signal, Database, Save, Trash2 } from 'lucide-react';
import type { Terminal } from '../data/types';

interface SidebarProps {
  terminal: Terminal | null;
  onClose: () => void;
  userRole: 'admin' | 'client';
  onDelete: (id: string) => void;
}

const Sidebar = ({ terminal, onClose, userRole, onDelete }: SidebarProps) => {
  if (!terminal) return null;

  const isAdmin = userRole === 'admin';

  return (
    <div className="absolute left-0 top-0 h-full w-96 bg-slate-900 text-white z-[1000] shadow-2xl border-r border-slate-800 p-6 overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-400">{terminal.name}</h2>
          <span
            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              isAdmin
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            Accès {userRole}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* ACTION ADMIN : SUPPRIMER */}
      {isAdmin && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => onDelete(terminal.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 py-2 rounded-lg text-sm font-bold transition-all"
          >
            <Trash2 size={16} />
            Supprimer le terminal
          </button>
        </div>
      )}

      <Section title="SFA - Service Fixe" icon={<Database size={20} />}>
        <EditableParam
          label="AMHS / RSFTA"
          value={terminal.sfa.amhs_rsfta}
          isAdmin={isAdmin}
        />
        <EditableParam
          label="SMT"
          value={terminal.sfa.smt}
          isAdmin={isAdmin}
        />
      </Section>

      <Section title="SMA - Service Mobile" icon={<Radio size={20} />}>
        <EditableParam
          label="VHF"
          value={terminal.sma.vhf}
          isAdmin={isAdmin}
        />
        <EditableParam
          label="HF"
          value={terminal.sma.hf}
          isAdmin={isAdmin}
        />
      </Section>

      <Section title="SRNA - Radionavigation" icon={<Signal size={20} />}>
        <EditableParam
          label="Réseau"
          value={terminal.srna.reseau}
          isAdmin={isAdmin}
        />
        <EditableParam
          label="Antenne"
          value={terminal.srna.antenne}
          isAdmin={isAdmin}
        />
      </Section>

      {/* ACTION ADMIN : ENREGISTRER */}
      {isAdmin && (
        <button className="w-full mt-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all">
          <Save size={20} />
          Enregistrer les modifications
        </button>
      )}
    </div>
  );
};

// Paramètre éditable
const EditableParam = ({
  label,
  value,
  isAdmin,
}: {
  label: string;
  value: string;
  isAdmin: boolean;
}) => (
  <div className="flex flex-col gap-1 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
    <span className="text-[10px] uppercase font-bold text-slate-500">
      {label}
    </span>

    {isAdmin ? (
      <input
        type="text"
        defaultValue={value}
        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-blue-300 focus:border-blue-500 outline-none"
      />
    ) : (
      <span className="text-sm text-white">{value}</span>
    )}
  </div>
);

const Section = ({ title, icon, children }: any) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 text-slate-300 font-bold border-b border-slate-800 pb-2 uppercase text-xs tracking-widest">
      {icon}
      {title}
    </div>

    <div className="space-y-3">{children}</div>
  </div>
);

export default Sidebar;