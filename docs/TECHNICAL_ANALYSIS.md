# Technical Analysis

## Stack tecnologico
- Browser frontend JavaScript
- Three.js per scena, camera, renderer, geometrie e post-processing
- `@tweenjs/tween.js` per le animazioni di camera
- `astronomia` con dataset VSOP87 per le posizioni planetarie
- `cannon` come world fisico inizializzato
- Webpack come bundler

## Entry point applicativi
- `src/index.js` contiene tutto il bootstrap runtime.
- `webpack.config.js` punta a `./src/index.js` e genera `dist/bundle.js`.
- `dist/index.html` ospita il bundle nel browser.

## Moduli principali osservati
- Setup scena Three.js, camera, renderer e OrbitControls
- Starfield generato proceduralmente
- Bloom post-processing con `EffectComposer`, `RenderPass`, `UnrealBloomPass` e `ShaderPass`
- Dati planetari hardcoded e dataset VSOP87
- Funzioni di calcolo posizione, distanza e Julian Date
- Creazione corpi celesti, etichette e orbite
- Gestione eventi DOM per resize, click, dropdown e date picker

## Pattern architetturali osservati
- Applicazione monolitica e imperativa in un singolo file
- Nessuna separazione formale tra model, view e controller
- UI costruita direttamente nel DOM durante il bootstrap
- Logica di rendering e logica di dominio mescolate nello stesso modulo

## Flussi interni principali
1. Inizializzazione scena e post-processing.
2. Creazione dei corpi celesti con texture e geometrie sferiche.
3. Calcolo delle posizioni tramite VSOP87.
4. Aggiornamento continuo delle posizioni e delle etichette nel loop di animazione.
5. Gestione interazioni utente con raycasting, tween camera e pannello info.

## Integrazioni esterne
- `astronomia` fornisce i dati orbitale/planetari.
- `three/examples/jsm/*` fornisce controlli e pass di post-processing.
- Nessuna API remota o backend è presente nel repository analizzato.

## Configurazione
- `webpack.config.js` è minimale: entry, output e `mode: 'development'`.
- Non risultano loader, plugin HTML, asset pipeline o variabili d'ambiente.
- `package.json` definisce solo `build`.

## Stato qualità del codice

### Evidenze certe
- Non esiste una suite di test.
- Non esiste un lint script.
- La UI e la simulazione sono accoppiate nello stesso file.
- Alcune variabili e import sembrano non necessari al flusso corrente, ad esempio la coppia `raycaster`/`mouse` globale e le dipendenze tween multiple.

### Inferenze
- Il progetto è stato prototipato velocemente e poi esteso senza una rifattorizzazione strutturale.
- La manutenzione futura sarà più costosa finché il modulo principale resterà monolitico.

## Debito tecnico
- Asset referenziati ma non tracciati nel workspace, in particolare `textures/*`
- `CANNON.World` creato ma non stepping esplicito
- Duplicazione potenziale di responsabilità tra Three.js e Cannon.js
- Mancanza di separazione tra bootstrap, simulazione, UI e rendering
- Nessuna testabilità automatizzata

## Criticità tecniche
- Lo starfield usa un milione di punti e può essere costoso al caricamento.
- La simulazione utilizza una semplificazione gravitaria limitata, non un modello fisico generale.
- `updatePositionsForDate` aggiorna solo alcuni corpi e lascia invariata la Luna.
- `innerHTML` nel pannello info va trattato con cautela se in futuro i dati diventano non fidati.

## Scalabilità e manutenibilità
- Il progetto è oggi adatto a una singola pagina dimostrativa.
- La scalabilità funzionale richiederà modularizzazione, separazione dei dati e un layer di asset management.
- Per evoluzioni future, il primo passo consigliato è estrarre un bootstrap tecnico e isolare la logica astronomica.
