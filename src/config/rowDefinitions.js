import { v, pct } from "../utils/dataProcessor";

export const ROW_DEFS = [
    { type: 'section', label: 'Prévisions' },
    { type: 'sub', label: 'Prévisions', code: 'prevision', formula: d => v(d, 'prev', 'prevision'), fmt: 'number' },
    { type: 'sub', label: 'Reforecast', code: 'reforecast', formula: d => v(d, 'prev', 'reforecast'), fmt: 'number' },

    { type: 'section', label: 'Volumétrie' },
    { type: 'sub', label: 'Reçus', code: 'recu', formula: d => v(d, 'incoming', 'recu'), fmt: 'number' },
    { type: 'kpi', label: '% TRP vs Prévisions', code: '%trp_prev', formula: d => pct(v(d, 'incoming', 'recu'), v(d, 'prev', 'prevision')), fmt: 'percent', refMin: .90, refMax: 1.10, colorMode: 'range' },
    { type: 'kpi', label: '% TRP vs Reforecast', code: '%trp_ref', formula: d => pct(v(d, 'incoming', 'recu'), v(d, 'prev', 'reforecast')), fmt: 'percent', refMin: .90, refMax: 1.10, colorMode: 'range' },
    { type: 'sub', label: 'Traités', code: 'traite', formula: d => v(d, 'incoming', 'traite'), fmt: 'number' },
    { type: 'kpi', label: '% QS', code: '%qs', formula: d => pct(v(d, 'incoming', 'traite'), v(d, 'incoming', 'recu')), fmt: 'percent', refMin: .90, colorMode: 'min' },
    { type: 'sub', label: 'Traité SL < 20 sec', code: 'traite_sl', formula: d => v(d, 'incoming', 'traite_sl'), fmt: 'number' },
    { type: 'kpi', label: '% SL', code: '%sl', formula: d => pct(v(d, 'incoming', 'traite_sl'), v(d, 'incoming', 'traite')), fmt: 'percent', refMin: .80, colorMode: 'min' },
    { type: 'sub', label: 'Appels transférés', code: 'transfert', formula: d => v(d, 'incoming', 'transfert'), fmt: 'number' },
    { type: 'kpi', label: '% Transfert', code: '%transfert', formula: d => pct(v(d, 'incoming', 'transfert'), v(d, 'incoming', 'recu')), fmt: 'percent', refMax: .05, colorMode: 'max_inv' },
    { type: 'sub', label: 'Raccrochés par agent', code: 'racc', formula: d => v(d, 'incoming', 'raccrochage'), fmt: 'number' },
    { type: 'kpi', label: '% Raccrochage', code: '%racc', formula: d => pct(v(d, 'incoming', 'raccrochage'), v(d, 'incoming', 'recu')), fmt: 'percent', refMax: .05, colorMode: 'max_inv' },

    { type: 'section', label: 'SL révisé à TRP 110% (par tranche de 30min)' },
    { type: 'sub', label: 'Traités (isolé)', code: 'traite_isol', formula: d => v(d, 'isol', 'traite_isol'), fmt: 'number' },
    { type: 'sub', label: 'Traité SL (isolé)', code: 'traite_sl_isol', formula: d => v(d, 'isol', 'traite_sl_isol'), fmt: 'number' },
    { type: 'kpi', label: '% SL révisé TRP 110%', code: '%sl_isol', formula: d => pct(v(d, 'isol', 'traite_sl_isol'), v(d, 'isol', 'traite_isol')), fmt: 'percent', refMin: .80, colorMode: 'min' },

    { type: 'section', label: 'Durée de traitement' },
    { type: 'sub', label: 'Durée totale de comm', code: 'duree_com', formula: d => v(d, 'incoming', 'duree_com'), fmt: 'duration' },
    { type: 'sub', label: 'Durée total post-travail', code: 'duree_acw', formula: d => v(d, 'incoming', 'duree_acw'), fmt: 'duration' },
    { type: 'sub', label: 'Durée de mise en attente', code: 'En attente', formula: d => v(d, 'rd', 'En attente'), fmt: 'duration' },
    { type: 'sub', label: 'DMC (sec)', code: 'DMC (sec)', formula: d => pct( v(d, 'incoming', 'duree_com'), v(d, 'incoming', 'traite')), fmt: 'number' , refMin: 160, refMax: 180, colorMode: 'range'},
    { type: 'sub', label: 'ACW (sec)', code: 'ACW (sec)', formula: d => pct( v(d, 'incoming', 'duree_acw'), v(d, 'incoming', 'traite')), fmt: 'number' , refMin: 5, refMax: 15, colorMode: 'range' },
    { type: 'sub', label: 'MEA (sec)', code: 'MEA (sec)', formula: d => pct( v(d, 'rd', 'En attente'), v(d, 'incoming', 'traite')), fmt: 'number' , refMin: 5, refMax: 15, colorMode: 'range'},

    { type: 'section', label: 'Appels courts' },
    { type: 'sub', label: 'Appels courts < 10 sec', code: 'appel_moins_10s', formula: d => v(d, 'incoming', 'appel_moins_10s'), fmt: 'number' },
    { type: 'kpi', label: '% Appels courts < 10 sec', code: '%appel_moins_10s', formula: d => pct(v(d, 'incoming', 'appel_moins_10s'), v(d, 'incoming', 'recu')), fmt: 'percent', refMin: .05, colorMode: 'min' },
    { type: 'sub', label: 'Appels courts < 15 sec', code: 'appel_moins_15s', formula: d => v(d, 'incoming', 'appel_moins_15s'), fmt: 'number' },
    { type: 'kpi', label: '% Appels courts < 15 sec', code: '%appel_moins_15s', formula: d => pct(v(d, 'incoming', 'appel_moins_15s'), v(d, 'incoming', 'recu')), fmt: 'percent', refMin: .08, colorMode: 'min' },
    { type: 'sub', label: 'Appels courts < 50 sec', code: 'appel_moins_50s', formula: d => v(d, 'incoming', 'appel_moins_50s'), fmt: 'number' },
    { type: 'kpi', label: '% Appels courts < 50 sec', code: '%appel_moins_50s', formula: d => pct(v(d, 'incoming', 'appel_moins_50s'), v(d, 'incoming', 'recu')), fmt: 'percent', refMax: .25, colorMode: 'min' },

    { type: 'section', label: 'Réitération même distinction' },
    { type: 'kpi', label: '% Réitération 1h', code: 'reit_typo_1h', formula: d => pct(v(d, 'incoming', 'reit_typo_1h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMin: .05, colorMode: 'min' },
    { type: 'kpi', label: '% Réitération 24h', code: 'reit_typo_24h', formula: d => pct(v(d, 'incoming', 'reit_typo_24h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMin: .10, colorMode: 'min' },
    { type: 'kpi', label: '% Réitération 72h', code: 'reit_typo_72h', formula: d => pct(v(d, 'incoming', 'reit_typo_72h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMax: .15, colorMode: 'min' },
    { type: 'kpi', label: '% Réitération_semaine', code: 'reit_typo_semaine', formula: d => pct(v(d, 'incoming', 'reit_typo_semaine'), v(d, 'incoming', 'traite')), fmt: 'percent', refMax: .25, colorMode: 'min' },

    { type: 'section', label: 'Réitération sans distinction typologie' },
    { type: 'kpi', label: '% Réitération 1h', code: 'reit_1h', formula: d => pct(v(d, 'incoming', 'reit_1h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMin: .05, colorMode: 'min' },
    { type: 'kpi', label: '% Réitération 24h', code: 'reit_24h', formula: d => pct(v(d, 'incoming', 'reit_24h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMin: .10, colorMode: 'min' },
    { type: 'kpi', label: '% Réitération 72h', code: 'reit_72h', formula: d => pct(v(d, 'incoming', 'reit_72h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMax: .15, colorMode: 'min' },
    { type: 'kpi', label: '% Réitération_semaine', code: 'reit_semaine', formula: d => pct(v(d, 'incoming', 'reit_semaine'), v(d, 'incoming', 'traite')), fmt: 'percent', refMax: .25, colorMode: 'min' },
    { type: 'kpi', label: 'FirstCall Resolution (%FCR)', code: 'reit_24h', formula: d => 1 - pct(v(d, 'incoming', 'reit_24h'), v(d, 'incoming', 'traite')), fmt: 'percent', refMin: .80, refMax: .90, colorMode: 'range'},

    { type: 'section', label: 'Répartition des appels reçus par file' },


];