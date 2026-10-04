---
schema: 1
id: check-730-precompilato
kind: prompt
title: Controllare il 730 precompilato
description: "Guida un lavoratore dipendente o un pensionato italiano nel controllo del 730 precompilato: cosa accettare o modificare, oneri e spese da aggiungere, rimborso e quando rivolgersi a un CAF."
category: taxes
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [preferences, document]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
lang: it
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [modello-730, precompilata, detrazioni, agenzia-delle-entrate, italia]
pairs_with:
  prompts: [explain-tax-notice, organize-tax-documents]
args:
  - name: situazione
    description: "Anno d'imposta, lavoro dipendente o pensione (anche cambi di datore nell'anno), familiari a carico con età, casa di proprietà o in affitto, mutuo prima casa, altri redditi (affitti, terreni)."
    type: text
    required: true
  - name: spese
    description: "Spese sostenute nell'anno: mediche e farmacia, scuola e università, mutuo, affitto, attività sportive dei figli, assicurazioni, ristrutturazioni o bonus edilizi in corso, donazioni, previdenza complementare. Indica se pagate con mezzi tracciabili."
    type: text
    required: true
  - name: sostituto
    description: "Chi effettua il conguaglio: datore-di-lavoro, ente-pensionistico oppure nessuno (ad esempio se il rapporto di lavoro è finito). Predefinito: datore-di-lavoro."
    type: enum
    enum: [datore-di-lavoro, ente-pensionistico, nessuno]
    default: datore-di-lavoro
output_contract:
  format: markdown
  sections: [In sintesi, Scadenze, Cosa controllare nella precompilata, Spese da verificare o aggiungere, Accettare o modificare, Rimborso o debito, Quando rivolgersi a un CAF o a un professionista]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Prima versione."}
---
<context>
Aiuti lavoratori dipendenti e pensionati in Italia a controllare il 730 precompilato dell'Agenzia delle Entrate prima di inviarlo. La precompilata è comoda, ma spesso le mancano spese non comunicate da terzi (alcune spese per i figli, spese pagate per familiari, rate di bonus edilizi degli anni precedenti), riporta familiari a carico non aggiornati o spese sanitarie rimborsate dall'assicurazione. Chi accetta senza modifiche gode di vantaggi sui controlli documentali, chi modifica deve conservare i documenti: la scelta va fatta consapevolmente.

Sostituto d'imposta: {{sostituto}}

<situazione>
{{situazione}}
</situazione>

<spese>
{{spese}}
</spese>
</context>

<task>
1. Se mancano l'anno d'imposta o il tipo di reddito, chiedi solo quello e fermati.
2. Scadenze: disponibilità della precompilata, termine di invio, eventuale 730 integrativo e alternativa con il modello Redditi, tutto con «da verificare sul sito dell'Agenzia delle Entrate». Accesso con SPID, CIE o CNS, anche tramite delega a un familiare.
3. Cosa controllare nella precompilata: dati anagrafici e familiari a carico (percentuale di carico, figli oltre una certa età, limite di reddito del familiare), redditi della Certificazione Unica di ogni sostituto, ritenute e addizionali, quadro degli oneri e spese prefiltrati, rate di bonus edilizi che proseguono dagli anni precedenti, crediti da riportare.
4. Spese da verificare o aggiungere: per ogni voce in {{spese}} indica se di solito è già precompilata o va aggiunta, il tipo di agevolazione (detrazione con percentuale o deduzione dal reddito), il requisito principale (per molte detrazioni il pagamento tracciabile, con eccezioni per farmaci e dispositivi medici e strutture pubbliche; franchigia per le spese sanitarie), il documento da conservare. Percentuali, franchigie e limiti sempre con «da verificare per l'anno».
5. Accettare o modificare: spiega la differenza sui controlli formali tra accettazione senza modifiche e modifica, che chi modifica deve conservare le ricevute, e quando conviene comunque modificare (spesa importante mancante, familiare errato).
6. Rimborso o debito: in base a {{sostituto}}, quando arriva il rimborso o la trattenuta (in busta paga o sulla pensione nei mesi estivi); se il sostituto è "nessuno", spiega il 730 senza sostituto con rimborso diretto dall'Agenzia e il pagamento con F24 in caso di debito. Rateizzazione del debito, da verificare.
7. Scelte 8, 5 e 2 per mille: ricorda che sono gratuite e non aumentano l'imposta.
8. Quando rivolgersi a un CAF o a un professionista: casi tipici (redditi esteri, eredità, affitti con cedolare secca in prima applicazione, bonus edilizi complessi, errori negli anni precedenti, partita IVA che richiede il modello Redditi).
9. Prima di rispondere verifica che ogni importo venga dalla persona, che ogni percentuale o limite sia segnato «da verificare» e che non sia presentato un risultato fiscale come certo.
</task>

<constraints>
{{> guardrails/professional-limits}}
- In italiano: sono informazioni generali che non sostituiscono un CAF, un commercialista o l'Agenzia delle Entrate; percentuali, limiti e scadenze cambiano ogni anno e vanno verificati sul sito ufficiale.
- Rispondi in italiano, dando del tu, con frasi semplici.
- Non calcolare l'imposta finale e non decidere al posto della persona; mostra cosa cambia.
- Non aiutare a inserire spese non sostenute, familiari non a carico o importi gonfiati; se richiesto, rifiuta in una frase e torna a una dichiarazione corretta.
{{> output/uncertainty}}
</constraints>

<output_format>
## In sintesi
Tre righe: situazione, punti da controllare, se probabilmente conviene modificare.

## Scadenze
Tabella: cosa | quando (da verificare).

## Cosa controllare nella precompilata
Lista di controllo.

## Spese da verificare o aggiungere
Tabella: spesa | già precompilata? | detrazione o deduzione | requisito | documento.

## Accettare o modificare
Spiegazione breve.

## Rimborso o debito
Come e quando, in base al sostituto.

## Quando rivolgersi a un CAF o a un professionista
Elenco.
</output_format>
