# Testing Strategy

## Stato attuale
- Non risultano test automatizzati nel repository.
- Non risultano script di test in `package.json`.

## Livelli di test osservabili
- Nessuno nel workspace corrente.

## Copertura percepita
- Bassa: la logica di simulazione, le trasformazioni matematiche e l'inizializzazione DOM non hanno copertura automatizzata.

## Gap principali
- Nessun test su `toJulianDate`
- Nessun test su `getPlanetPosition`
- Nessun test su `updatePositionsForDate`
- Nessun smoke test per la build webpack
- Nessun controllo automatico sulla presenza degli asset texture

## Suggerimenti di miglioramento
- Aggiungere unit test per le funzioni di calcolo temporale e di distanza.
- Introdurre un smoke test che verifichi il bootstrap del bundle in ambiente headless.
- Validare almeno la presenza del pannello info e del container etichette nel DOM.
- Aggiungere un controllo di build che segnali asset mancanti prima del deploy.
