# SolarSystem Project README

## Scopo
Visualizzare e simulare il sistema solare in 3D nel browser, con controlli per esplorare pianeti, data e informazioni orbitali.

## Identità
- Nome: `SolarSystem`
- Path root: `.`
- Tipo: frontend / single-page app
- Stack principale: `three`, `@tweenjs/tween.js`, `cannon`, `astronomia`, `webpack`

## Funzionalità principali osservate
- Scena 3D con Sole, pianeti e Luna
- Sfondo stellato ad alta densità
- Effetto bloom su corpi selezionati
- Orbit controls per rotazione, zoom e pan
- Selettore pianeta e date picker
- Pannello informativo su massa, distanza, raggio e velocità orbitale
- Zoom animato sul corpo selezionato

## Struttura rilevante
- `src/index.js` - bootstrap, rendering, simulazione e UI
- `webpack.config.js` - bundling
- `dist/index.html` - host statico del bundle
- `docs/` - analisi funzionale, tecnica e roadmap

## Setup rapido

```bash
npm install
npm run build
```

## Comandi principali

- `npm run build` - genera `dist/bundle.js`
- `npx webpack --watch` - ricostruzione in watch mode durante lo sviluppo

## Limiti noti
- Non esiste uno script `start` o un dev server configurato.
- Non esiste una suite di test dichiarata nel manifest.
- Il codice referenzia asset `textures/*` non presenti nel workspace tracciato.

## Documenti correlati

- `docs/FUNCTIONAL_ANALYSIS.md`
- `docs/TECHNICAL_ANALYSIS.md`
- `docs/DEPLOYMENT.md`
- `docs/IMPROVEMENT_ROADMAP.md`
- `docs/TESTING_STRATEGY.md`
- `docs/SECURITY_NOTES.md`
