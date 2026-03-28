# Workspace Overview

## Sintesi
Il workspace contiene un solo progetto reale: una frontend web app 3D per la simulazione del sistema solare.

## Mappa dei progetti

| Progetto | Path | Categoria | Stack reale osservato | Relazioni |
|---|---|---|---|---|
| SolarSystem | `.` | frontend | Three.js, Cannon.js, Astronomia, TWEEN.js, Webpack | Nessuna relazione con altri progetti nel workspace |

## Confini del workspace

### Evidenza certa
- Il codice applicativo è concentrato in `src/index.js`.
- La build è configurata in `webpack.config.js`.
- L'HTML host è `dist/index.html`.

### Inferenza ragionevole
- `dist/` è un output statico della build, non una sorgente applicativa.
- Il progetto è una single-page app senza backend locale nel repository corrente.

### Ipotesi da validare
- La cartella `textures/` citata nel codice potrebbe essere fornita fuori repo o essere stata omessa dal workspace.

## Cartelle escluse dall'analisi come sorgente

- `node_modules/`
- `dist/`
- `build/`
- `coverage/`
- `.git/`
- altre directory di cache o output equivalenti se presenti in futuro

## Documenti collegati

- `README.md`
- `AGENTS.md`
- `docs/README_PROJECT.md`
- `docs/FUNCTIONAL_ANALYSIS.md`
- `docs/TECHNICAL_ANALYSIS.md`
- `docs/DEPLOYMENT.md`
- `docs/IMPROVEMENT_ROADMAP.md`
- `docs/TESTING_STRATEGY.md`
- `docs/SECURITY_NOTES.md`
