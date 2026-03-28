# SolarSystem Workspace

Workspace contenente un solo progetto frontend 3D per la simulazione del sistema solare.

## Progetto incluso

| Progetto | Path | Tipo | Stack principale |
|---|---|---|---|
| SolarSystem | `.` | frontend / single-page app | Three.js, Cannon.js, Astronomia, TWEEN.js, Webpack |

## Come orientarsi

- `src/index.js` contiene tutto il bootstrap applicativo, la scena 3D, l'overlay DOM e la logica di simulazione.
- `webpack.config.js` definisce l'entrypoint e l'output del bundle.
- `dist/index.html` è il file HTML statico che ospita il bundle generato.
- `docs/` contiene la documentazione operativa e di analisi generata per questo workspace.

## Documentazione principale

- `docs/WORKSPACE_OVERVIEW.md`
- `docs/README_PROJECT.md`
- `docs/FUNCTIONAL_ANALYSIS.md`
- `docs/TECHNICAL_ANALYSIS.md`
- `docs/DEPLOYMENT.md`
- `docs/IMPROVEMENT_ROADMAP.md`
- `docs/TESTING_STRATEGY.md`
- `docs/SECURITY_NOTES.md`
- `AGENTS.md`

## Avvio rapido

```bash
npm install
npm run build
```

Il repository non definisce uno script dedicato per il server locale. La build produce `dist/bundle.js` e il frontend va servito come contenuto statico insieme a `dist/index.html`.

## Confini del workspace

- `node_modules/`, `dist/`, `build/`, `coverage/` e cartelle simili sono output o dipendenze e non vanno trattati come sorgente applicativa.
- Non risultano altri progetti software nel workspace corrente.

## Stato dell'analisi

La documentazione in `docs/` riflette il codice reale presente nel repository. Alcuni asset referenziati dal codice, in particolare la cartella `textures/`, non risultano tracciati nel workspace e sono quindi da considerare dipendenza esterna o assente da validare.
