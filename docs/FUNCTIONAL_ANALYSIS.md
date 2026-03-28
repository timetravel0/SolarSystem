# Functional Analysis

## Scopo funzionale
L'applicazione permette di esplorare il sistema solare in un'interfaccia 3D browser-based. Il comportamento osservato è orientato alla visualizzazione e alla consultazione rapida di informazioni planetarie, non alla simulazione fisica completa.

## Attori principali
- Visitatore del sito
- Utente che esplora il sistema solare

## Casi d'uso identificabili
1. Osservare il sistema solare in 3D.
2. Ruotare, zoomare e traslare la vista.
3. Selezionare un pianeta dal menu a tendina.
4. Fare click su un corpo celeste per centrare la camera e aggiornare il pannello informativo.
5. Selezionare una data diversa per ricalcolare le posizioni planetarie.
6. Leggere dati sintetici su massa, distanza dal Sole, distanza dalla Terra, raggio e velocità orbitale.

## Flussi principali

### Visualizzazione iniziale
- La scena viene creata in `src/index.js`.
- La camera parte centrata e poi viene zoomata sul Sole.
- Il pannello informativo iniziale mostra i dati del Sole.

### Esplorazione dei corpi
- Il menu a tendina consente di selezionare un pianeta o il Sole.
- Il click su un corpo celeste attiva il raycasting e aggiorna il pannello.
- Lo zoom usa un tween di 2 secondi verso il corpo selezionato.

### Cambio data
- Il date picker aggiorna la variabile Julian Date.
- Le posizioni dei pianeti vengono ricalcolate con i dati VSOP87.
- La Luna resta legata alla Terra con una posizione semplificata e non viene ricalcolata con lo stesso flusso dei pianeti principali.

## Regole di business deducibili
- Il Sole è sempre il centro di riferimento per la maggior parte dei corpi.
- La Terra funge da centro di riferimento per la Luna.
- La distanza mostrata tra pianeta e Terra è calcolata al momento del rendering del pannello.
- Le informazioni mostrate all'utente derivano da dati hardcoded nel file applicativo.

## Funzionalità complete
- Scena 3D inizializzata e renderizzata
- Orbit controls funzionanti
- Selezione pianeta via dropdown
- Click selettivo sui corpi
- Pannello informativo dinamico
- Aggiornamento data/ora corrente in alto
- Etichette dei pianeti in overlay

## Funzionalità parziali o incomplete
- La fisica Cannon.js è inizializzata ma non viene sfruttata come motore di simulazione completo.
- L'aggiornamento dinamico delle posizioni usa una semplificazione centrata sul Sole e non un vero N-body.
- Non risulta alcun supporto esplicito a mobile/touch.
- Non esiste un flusso di pausa/ripresa o reset della simulazione.

## Punti oscuri da validare
- Gli asset `textures/` non risultano presenti nel workspace tracciato.
- Non è chiaro se la build sia eseguibile senza asset esterni aggiuntivi.
- Non esiste documentazione di prodotto separata dal codice corrente.
