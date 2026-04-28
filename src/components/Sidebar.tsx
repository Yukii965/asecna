import { X, Radio, Signal, Database } from 'lucide-react';
import type { Terminal } from '../data/types';

interface SidebarProps {
  terminal: Terminal | null;
  onClose: () => void;
}

const Sidebar = ({ terminal, onClose }: SidebarProps) => {
  if (!terminal) return null;

  return (
    <div className="absolute left-0 top-0 h-full w-96 bg-slate-900 text-white z-[1000] shadow-2xl border-r border-slate-700 p-6 overflow-y-auto transition-all">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-400">{terminal.name}</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full">
          <X size={24} />
        </button>
      </div>

      <Section title="SFA - Service Fixe" icon={<Database size={20}/>}>
        <Param label="AMHS / RSFTA" value={terminal.sfa.amhs_rsfta} />
        <Param label="SMT" value={terminal.sfa.smt} />
        <Param label="ATSDS" value={terminal.sfa.atsds} />
        <Param label="AIDC" value={terminal.sfa.aidc} />
      </Section>

      <Section title="SMA - Service Mobile" icon={<Radio size={20}/>}>
        <Param label="VHF" value={terminal.sma.vhf} />
        <Param label="HF" value={terminal.sma.hf} />
        <Param label="CPDLC" value={terminal.sma.cpdlc} />
      </Section>

      <Section title="SRNA - Radionavigation" icon={<Signal size={20}/>}>
        <Param label="Réseau" value={terminal.srna.reseau} />
        <Param label="Antenne" value={terminal.srna.antenne} />
        <Param label="Radiobalise" value={terminal.srna.radiobalise} />
      </Section>
    </div>
  );
};

// Sous-composants pour la lisibilité
const Section = ({ title, icon, children }: any) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3 text-slate-400 font-semibold border-b border-slate-700 pb-2">
      {icon} <span>{title}</span>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const Param = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between bg-slate-800/50 p-3 rounded-lg hover:bg-slate-800 transition-colors">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm font-medium text-white">{value}</span>
  </div>
);

export default Sidebar;