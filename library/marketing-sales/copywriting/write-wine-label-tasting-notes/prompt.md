---
schema: 1
id: write-wine-label-tasting-notes
kind: prompt
title: Retroetichetta e note di degustazione
description: "Scrive la retroetichetta di un vino italiano e la scheda di degustazione: territorio, vitigno, vinificazione, assaggio e abbinamenti, nello spazio disponibile, segnalando i termini regolamentati."
category: copywriting
version: 1.0.0
status: incubating
lang: it
stage: [build]
role: [founder]
subject: [hospitality]
requires: [none]
inputs: [spec, notes]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [wine-label, tasting-notes, regulated-terms, italy]
pairs_with:
  prompts: [write-packaging-copy, pair-wine-with-food]
args:
  - name: vino
    description: "Il vino: nome, annata, vitigni e percentuali, vigneto (altitudine, suolo, esposizione), vendemmia, vinificazione e affinamento, gradazione, note di assaggio dell'enologo, temperatura di servizio, certificazioni e storia della cantina."
    type: text
    required: true
  - name: denominazione
    description: La denominazione o indicazione geografica e le menzioni (per esempio "Chianti Classico DOCG Riserva", "Etna Rosso DOC", "Toscana IGT", "Vino Rosso"). Facoltativo; senza, il testo non usa alcuna menzione regolamentata.
    type: string
  - name: spazio_caratteri
    description: Caratteri disponibili per il testo narrativo della retroetichetta, spazi inclusi, al netto delle indicazioni obbligatorie.
    type: number
    default: 400
output_contract:
  format: markdown
  sections: [Retroetichetta, Versione breve, Scheda di degustazione, Abbinamenti e servizio, Termini regolamentati da verificare, Indicazioni obbligatorie da non dimenticare, Informazioni mancanti]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Prima versione."}
---
<context>
Scrivi testi per cantine italiane, soprattutto piccole e medie. La retroetichetta è letta in pochi secondi, sullo scaffale dell'enoteca o al tavolo: deve far capire da dove viene il vino, com'è fatto e con che cosa berlo, con una voce che sia della cantina e non di un catalogo. La scheda di degustazione serve invece a ristoratori, enoteche e sito, e può essere più tecnica.

Cosa tenere presente:
- Spazio: la retroetichetta ha pochissimo posto, già occupato dalle indicazioni obbligatorie. Il testo narrativo deve stare nei caratteri disponibili, contando gli spazi.
- Struttura che funziona: territorio e vigneto, vitigno, come è fatto (vendemmia, vinificazione, affinamento), al naso e in bocca in poche parole, abbinamento e temperatura di servizio.
- Note di degustazione: esame visivo, olfattivo e gustativo con descrittori concreti (ciliegia, viola, pepe, macchia mediterranea) invece di aggettivi vaghi; coerenza con vitigno e affinamento.
- Termini regolamentati: denominazioni (DOCG, DOC, IGP/IGT), menzioni come "Riserva", "Superiore", "Classico", "Vigna" con il nome del vigneto, "metodo classico", "biologico", nomi di unità geografiche aggiuntive; possono essere usati solo se previsti dal disciplinare di produzione o dalla normativa e se il vino li possiede davvero. "Vecchie vigne", "selezione", "cru" non sempre sono regolati ma devono essere veritieri.
- Indicazioni obbligatorie (denominazione, titolo alcolometrico, volume, allergeni come "contiene solfiti", imbottigliatore, lotto, provenienza, e dal 2023 ingredienti e dichiarazione nutrizionale anche tramite etichetta elettronica) sono regolate dalla normativa europea e nazionale: non le scrivi, ma ricordi di controllarle. Le regole cambiano; il riferimento è il disciplinare e la normativa vigente, con il consorzio o un consulente di etichettatura.
</context>

<task>
Scrivi la retroetichetta e la scheda di questo vino.

<vino>
{{vino}}
</vino>

{{#denominazione}}Denominazione e menzioni: {{denominazione}}{{/denominazione}}
Caratteri disponibili per la retroetichetta: {{spazio_caratteri}}

1. Se mancano i vitigni, la zona di provenienza o qualunque informazione su vinificazione e assaggio, chiedili in un solo messaggio e fermati.
2. Scrivi la retroetichetta entro {{spazio_caratteri}} caratteri spazi inclusi, indicando il conteggio. Usa solo i fatti forniti.
3. Scrivi una versione breve, circa la metà dei caratteri, per etichette più piccole o formati diversi.
4. Scrivi la scheda di degustazione: dati tecnici, vista, naso, bocca, potenziale di invecchiamento solo se indicato dal produttore.
5. Proponi due o tre abbinamenti coerenti con struttura, acidità e tannino, e la temperatura di servizio (quella indicata o, se manca, un intervallo tipico segnalato come suggerimento).
6. Elenca ogni termine regolamentato presente nei testi o nella richiesta, con cosa verificare nel disciplinare o nella normativa.
7. Elenca le indicazioni obbligatorie da controllare sull'etichetta.
8. Prima di consegnare, verifica: conteggio caratteri entro il limite, nessuna menzione che il vino non possiede, nessun punteggio, premio o dato inventato.
</task>

<constraints>
- Non inventare premi, punteggi di guide, età delle vigne, rese o tempi di affinamento.
- Non usare "Riserva", "Superiore", "Classico", "Vigna", "biologico" o altre menzioni se non sono nelle informazioni o nella denominazione.
- Niente salute: nessun riferimento a benefici per la salute del vino.
- Italiano curato, frasi brevi, senza retorica ("nettare degli dei", "emozione nel bicchiere").
</constraints>

<output_format>
## Retroetichetta
Il testo, poi "(N caratteri)".

## Versione breve
Il testo, poi "(N caratteri)".

## Scheda di degustazione
Dati tecnici in tabella, poi vista, naso, bocca.

## Abbinamenti e servizio
Abbinamenti e temperatura.

## Termini regolamentati da verificare
Termine | Dove compare | Cosa verificare.

## Indicazioni obbligatorie da non dimenticare
Elenco di controllo.

## Informazioni mancanti
Cosa serve ancora. "Nessuna" se completo.
</output_format>
