import type { Terminal } from '../data/types';

export const terminals: Terminal[] = [
  {
    id: 'TNR-01',
    name: 'Ivato International (TNR)',
    coordinates: [-18.7969, 47.4788],
    sfa: { amhs_rsfta: 'Opérationnel', smt: 'V.35', atsds: 'Actif', aidc: 'Version 2.0' },
    sma: { vhf: '121.5 MHz / 127.7 MHz', hf: '8879 kHz', cpdlc: 'FANS 1/A' },
    srna: { reseau: 'VSAT ASECNA', antenne: 'Parabolique 3.7m', radiobalise: 'VOR/DME', radioborne: 'ILS Cat II' }
  },
  {
    id: 'TMM-02',
    name: 'Tamatave (TMM)',
    coordinates: [-18.1096, 49.3925],
    sfa: { amhs_rsfta: 'Secours', smt: 'Ethernet', atsds: 'Actif', aidc: 'N/A' },
    sma: { vhf: '120.3 MHz', hf: '5484 kHz', cpdlc: 'N/A' },
    srna: { reseau: 'Terrestre', antenne: 'Omnidirectionnelle', radiobalise: 'NDB', radioborne: 'N/A' }
  }
];