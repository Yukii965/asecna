export interface Terminal {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  sfa: {
    amhs_rsfta: string;
    smt: string;
    atsds: string;
    aidc: string;
  };
  sma: {
    vhf: string;
    hf: string;
    cpdlc: string;
  };
  srna: {
    reseau: string;
    antenne: string;
    radiobalise: string;
    radioborne: string;
  };
}