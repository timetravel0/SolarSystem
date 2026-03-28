# Improvement Roadmap

## SOL-ARCH-01 - Spezzare il monolite `src/index.js`
- Descrizione: separare bootstrap scena, simulazione, UI e helper matematici in moduli distinti.
- Problema osservato: tutto il comportamento vive in un solo file.
- Beneficio atteso: manutenibilità, testabilità e leggibilità migliori.
- Priorità: Alta
- Effort: XL
- Impatto: Alto
- Area: architettura
- File o cartelle coinvolte: `src/index.js`, eventuali nuovi moduli in `src/`
- Dipendenze: nessuna
- Rischi: refactor ampio con regressioni di rendering o interazione
- Criterio di completamento: bootstrap, rendering, dati e UI sono separati senza cambiare il comportamento visibile
- Istruzioni per futuri coding agent: estrarre prima gli helper puri, poi il bootstrap grafico, poi gli handler UI

## SOL-ARCH-02 - Formalizzare l'asset pipeline
- Descrizione: introdurre un meccanismo verificabile per gli asset texture e per le risorse statiche.
- Problema osservato: il codice carica `textures/*` ma nel workspace tracciato non esistono asset corrispondenti.
- Beneficio atteso: deploy più affidabile e meno errori di runtime.
- Priorità: Alta
- Effort: M
- Impatto: Alto
- Area: architettura / deployment
- File o cartelle coinvolte: `src/index.js`, `dist/index.html`, eventuale cartella asset
- Dipendenze: nessuna
- Rischi: rompere i path relativi esistenti
- Criterio di completamento: gli asset richiesti sono versionati o verificati in build
- Istruzioni per futuri coding agent: inventariare gli asset usati nel codice prima di cambiare i path

## SOL-FUNC-01 - Chiarire il ruolo di Cannon.js
- Descrizione: decidere se il motore fisico deve simulare davvero il sistema o se va rimosso.
- Problema osservato: `CANNON.World` è creato, ma non viene fatto stepping della simulazione.
- Beneficio atteso: meno codice morto e modello fisico più coerente.
- Priorità: Alta
- Effort: M
- Impatto: Alto
- Area: funzionalità / architettura
- File o cartelle coinvolte: `src/index.js`
- Dipendenze: SOL-ARCH-01
- Rischi: alterare il comportamento visivo delle orbite
- Criterio di completamento: la simulazione usa davvero Cannon.js oppure la dipendenza viene rimossa
- Istruzioni per futuri coding agent: prima misurare se il comportamento attuale dipende davvero da Cannon.js

## SOL-FUNC-02 - Migliorare i controlli di interazione
- Descrizione: aggiungere supporto esplicito a touch/mobile e stati di UI più chiari.
- Problema osservato: l'interazione è centrata su mouse e click desktop.
- Beneficio atteso: accessibilità e usabilità migliori.
- Priorità: Media
- Effort: M
- Impatto: Medio
- Area: funzionalità
- File o cartelle coinvolte: `src/index.js`
- Dipendenze: nessuna
- Rischi: gestione input sovrapposta tra OrbitControls e UI
- Criterio di completamento: la scena è usabile anche da dispositivi touch
- Istruzioni per futuri coding agent: verificare come OrbitControls gestisce gli eventi prima di aggiungere nuovi handler

## SOL-TEST-01 - Aggiungere test sulle funzioni pure
- Descrizione: coprire con test unitari i calcoli di Julian date, distanza e lookup delle posizioni.
- Problema osservato: nessuna suite di test esiste nel repo.
- Beneficio atteso: regressioni matematiche più facili da intercettare.
- Priorità: Media
- Effort: M
- Impatto: Medio
- Area: test
- File o cartelle coinvolte: `src/index.js`, eventuali file `tests/`
- Dipendenze: SOL-ARCH-01 consigliata
- Rischi: estrazione incompleta della logica pura
- Criterio di completamento: i calcoli principali sono testabili senza browser
- Istruzioni per futuri coding agent: isolare prima le funzioni pure, poi scrivere i test

## SOL-UX-01 - Raffinare HUD e leggibilità
- Descrizione: spostare la UI da elementi creati inline a una struttura più coerente e responsive.
- Problema osservato: layout e stile sono definiti in modo ad hoc e minimalista.
- Beneficio atteso: migliore fruizione su diverse risoluzioni.
- Priorità: Media
- Effort: M
- Impatto: Medio
- Area: DX / funzionalità
- File o cartelle coinvolte: `src/index.js`, `dist/index.html`
- Dipendenze: nessuna
- Rischi: sovrapposizione con la scena 3D
- Criterio di completamento: HUD leggibile su desktop e ridimensionamento ragionevole su schermi piccoli
- Istruzioni per futuri coding agent: conservare il comportamento esistente e intervenire prima sugli stili, poi sulla struttura

## SOL-PERF-01 - Ridurre il costo di bootstrap
- Descrizione: rendere più leggero il caricamento iniziale della scena.
- Problema osservato: lo starfield crea un milione di punti e le texture vengono caricate tutte all'avvio.
- Beneficio atteso: startup più rapido e minore pressione sulla GPU/CPU.
- Priorità: Bassa
- Effort: M
- Impatto: Medio
- Area: performance
- File o cartelle coinvolte: `src/index.js`
- Dipendenze: nessuna
- Rischi: degradare l'effetto visivo
- Criterio di completamento: tempo di bootstrap ridotto senza perdita visiva significativa
- Istruzioni per futuri coding agent: misurare prima l'impatto reale, poi ottimizzare il numero di punti e il caricamento texture

## SOL-DOC-01 - Tenere allineata la documentazione
- Descrizione: mantenere README e documenti in sync con codice e asset reali.
- Problema osservato: il README precedente descriveva uno scenario non perfettamente allineato al repository.
- Beneficio atteso: onboarding più affidabile per agenti e umani.
- Priorità: Bassa
- Effort: S
- Impatto: Medio
- Area: documentazione
- File o cartelle coinvolte: `README.md`, `docs/`, `AGENTS.md`
- Dipendenze: nessuna
- Rischi: duplicare contenuti se non coordinato
- Criterio di completamento: i documenti principali riflettono il codice reale e i limiti noti
- Istruzioni per futuri coding agent: aggiornare sempre la documentazione quando cambia il comportamento osservabile

## Note per il Prossimo Coding Agent
- Ordine suggerito di esecuzione: `SOL-ARCH-02`, `SOL-FUNC-01`, `SOL-ARCH-01`, `SOL-TEST-01`, `SOL-FUNC-02`, `SOL-PERF-01`, `SOL-DOC-01`.
- Prerequisiti: leggere `README.md`, `AGENTS.md`, `docs/TECHNICAL_ANALYSIS.md`, `docs/FUNCTIONAL_ANALYSIS.md`.
- Documenti da leggere prima di intervenire: `docs/WORKSPACE_OVERVIEW.md`, `docs/DEPLOYMENT.md`, `docs/SECURITY_NOTES.md`.
- Aree da non toccare senza validazione: path degli asset statici, layout `dist/index.html`, comportamento iniziale della camera.
- Quick wins: inventario asset, aggiunta test sulle funzioni pure, pulizia delle dipendenze tween ridondanti.
- Attività ad alto rischio: refactor monolitico di `src/index.js`, riscrittura del modello di simulazione, modifica del pipeline di build.
