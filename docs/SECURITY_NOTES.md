# Security Notes

## Superficie di rischio
- Applicazione browser-side senza autenticazione o autorizzazione.
- Rendering DOM tramite `innerHTML` nel pannello informativo.
- Dipendenza da pacchetti npm di terze parti.
- Caricamento di asset tramite path relativi.

## Evidenze osservate
- Non esistono endpoint HTTP, quindi non c'è una superficie API tradizionale.
- I dati mostrati nel pannello derivano da oggetti hardcoded nel file applicativo.
- Non risultano segreti, token o configurazioni sensibili nel repository.

## Rischi potenziali
- Se in futuro i dati del pannello diventano esterni o user-controlled, `innerHTML` può introdurre rischio XSS.
- Asset mancanti o manipolati possono compromettere il rendering, ma non emergono rischi server-side.
- Le dipendenze esterne non sono bloccate da policy aggiuntive di sicurezza nel repo corrente.

## Mitigazioni consigliate
- Preferire rendering DOM sicuro con `textContent` o sanitizzazione quando i dati non sono interamente fidati.
- Introdurre una Content Security Policy se il progetto verrà servito su un dominio controllato.
- Validare la presenza degli asset prima della build o del deploy.
