# Deployment

## Prerequisiti
- Node.js e npm
- Un browser moderno con supporto WebGL

## Variabili d'ambiente
- Non risultano variabili d'ambiente dichiarate o richieste dal repository analizzato.

## Build

```bash
npm install
npm run build
```

La build webpack genera `dist/bundle.js` nella cartella `dist/`.

## Run

Il repository non definisce un server locale. Per avviare l'app:
- eseguire la build
- servire `dist/index.html` e `dist/bundle.js` come asset statici

## Deployment
- Il progetto è adatto a hosting statico.
- Non risultano backend, database, migrazioni o rollback applicativi.
- `dist/index.html` è un file statico già presente nel repository e va mantenuto coerente con il bundle generato.

## Note operative
- Se gli asset `textures/` non sono disponibili nel pacchetto di deploy, la scena potrebbe non renderizzarsi correttamente.
- Il pacchetto di deploy deve includere tutto ciò che il codice carica da path relativi.
