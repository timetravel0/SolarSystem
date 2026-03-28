# AGENTS.md

## Scopo
Fornire istruzioni operative specifiche per il progetto `SolarSystem`, una single-page app frontend che visualizza e simula il sistema solare in 3D.

## Identità del progetto
- Nome: `SolarSystem`
- Path root: `.`
- Tipo: frontend / single-page app
- Stack principale: `three`, `cannon`, `astronomia`, `@tweenjs/tween.js`, `webpack`

## Cartelle rilevanti
- `src/` - entrypoint applicativo e logica runtime
- `docs/` - documentazione tecnica, funzionale e roadmap
- `dist/` - output generato della build
- `webpack.config.js` - configurazione bundling

## Cartelle da ignorare
- `node_modules/`
- `dist/`
- `build/`
- `coverage/`
- `.git/`
- altre cartelle di output o cache non presenti nel codice sorgente

## Convenzioni osservate
- Applicazione imperativa in un singolo file `src/index.js`
- Uso di Three.js per scena, camera, renderer e post-processing
- Uso di VSOP87 tramite `astronomia` per le posizioni planetarie
- Overlay UI creato direttamente via DOM nel runtime
- Nessuna suite di test o lint script dichiarata nel manifest

## Comandi utili

### installazione
```bash
npm install
```

### avvio locale
```bash
npx webpack --watch
```
Nota: il repository non espone uno script `start`; il bundle va poi servito come asset statico insieme a `dist/index.html`.

### test
```bash
N/D - nessuna suite di test dichiarata nel repository
```

### lint / type-check
```bash
N/D - nessuno script lint o type-check dichiarato nel repository
```

### build
```bash
npm run build
```

## Guardrail
- leggi prima `README.md` e i file in `docs/`
- non trattare `dist/` come sorgente
- non introdurre assunzioni non supportate dal codice
- non cambiare il comportamento della scena senza aggiornare la documentazione correlata
- se modifichi i dati astronomici o la UI, verifica anche i riferimenti in `src/index.js`

## Output attesi da futuri coding agent
1. individuare i file coinvolti
2. proporre modifiche minime e coerenti
3. aggiornare eventuali test, se aggiunti in futuro
4. aggiornare la documentazione in `docs/`
