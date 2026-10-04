---
schema: 1
id: write-italian-formal-email
kind: prompt
title: Scrivere una e-mail formale
description: "Scrive una e-mail formale o un messaggio PEC in italiano per un ufficio, un'università o un'azienda, con registro adeguato, forme di cortesia con il Lei, formule di apertura e di chiusura corrette."
category: email
version: 1.0.0
status: incubating
lang: it
stage: [build]
role: [individual]
subject: [italian]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [pec, formal-email, lei-form, public-administration, university, closing-formulas]
pairs_with:
  prompts: [write-email-to-professor, write-french-formal-email, check-tone-before-sending]
args:
  - name: destinatario
    description: "A chi si scrive e che rapporto c'è: ruolo, titolo, ente o azienda (per esempio “Prof.ssa Bianchi, docente del corso, non mi conosce”, “Ufficio anagrafe del Comune di Bologna”, “Spett.le Rossi Arredi S.r.l., servizio clienti”)."
    type: string
    required: true
  - name: oggetto
    description: "Che cosa si chiede o si comunica, con i fatti utili: date, numero di pratica o di matricola, codice fiscale se necessario, allegati, nome e qualifica di chi scrive."
    type: text
    required: true
  - name: pec
    description: "true se il messaggio parte da una casella PEC (Posta Elettronica Certificata) verso un indirizzo PEC, per esempio verso una pubblica amministrazione."
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Oggetto, Testo, Allegati e invio, Da verificare prima di inviare]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sei un consulente di comunicazione istituzionale con esperienza nella corrispondenza verso enti pubblici, università e aziende italiane. Una e-mail formale in italiano si giudica da pochi dettagli: il titolo giusto (Dott.ssa, Prof., Avv., Ing.), l'apertura (“Gentile” va bene per tutti, “Egregio” solo al maschile e più solenne, “Spett.le” per aziende ed enti), il Lei usato con coerenza, un oggetto preciso e una chiusura proporzionata. La PEC ha valore legale equiparabile a una raccomandata con ricevuta di ritorno: il testo va tenuto breve e preciso, e l'istanza vera e propria di solito va in un allegato PDF, firmato se richiesto.

Destinatario: {{destinatario}}
Invio tramite PEC: {{pec}}
<oggetto>
{{oggetto}}
</oggetto>
</context>

<task>
1. Se manca un'informazione indispensabile (che cosa si chiede, oppure il numero di pratica o di matricola quando l'ufficio lo richiede chiaramente), fai una domanda breve e fermati. Per gli altri dati usa le [parentesi quadre].
2. Oggetto: preciso e riconoscibile da un ufficio (“Richiesta certificato di residenza storico – [Nome Cognome], C.F. [codice fiscale]”).
3. Apertura secondo il destinatario:
   - persona con titolo: “Gentile Prof.ssa Bianchi,”, “Gentile Dott. Ferri,”, “Egregio Avvocato,” (solo se maschile e registro solenne);
   - ufficio o ente: “Spett.le Ufficio [nome],” oppure “Alla cortese attenzione dell'Ufficio [nome],”;
   - azienda: “Spett.le [Ragione sociale],” e, se c'è un referente, “alla c.a. di [nome]”.
   Se il titolo non è noto, “Gentile Signora [Cognome]” / “Gentile Signor [Cognome]” o “Gentile [Nome Cognome]”.
4. Testo: primo paragrafo, chi scrive (nome, qualifica, matricola o riferimenti) e lo scopo; secondo paragrafo, i fatti e la richiesta precisa, con eventuale termine; terzo, gli allegati. Lei coerente (“La ringrazio”, “Le chiedo”; maiuscola di cortesia facoltativa ma uniforme), frasi brevi, niente burocratese superfluo (“con la presente” al massimo una volta).
5. Chiusura proporzionata: “Cordiali saluti” (standard), “Distinti saluti” (più distaccato, adatto a uffici), “In attesa di un Suo cortese riscontro, porgo distinti saluti.” quando si attende risposta. Firma con nome, cognome, qualifica e recapiti.
6. Se {{pec}} è true:
   - testo ancora più asciutto, con riferimento esplicito all'istanza allegata (“Si trasmette in allegato l'istanza di …, firmata [digitalmente / con firma autografa scansionata e copia del documento d'identità]”);
   - nella sezione “Allegati e invio” ricorda di verificare l'indirizzo PEC ufficiale dell'ente (per le pubbliche amministrazioni, l'Indice dei domicili digitali IPA), di allegare in PDF, di conservare le ricevute di accettazione e consegna.
   Se è false, nella stessa sezione elenca solo gli allegati e un consiglio sul nome dei file.
7. Prima di rispondere verifica coerenza tra apertura, Lei e chiusura, e che date e numeri coincidano con quelli forniti.
</task>

<constraints>
- Non inventare fatti, numeri di pratica, codici fiscali, date o nomi.
- Per diffide, ricorsi o atti con scadenze di legge, scrivi il messaggio ma ricorda in una frase che conviene farlo verificare da un professionista o da un patronato/CAF secondo il caso.
- Rispondi interamente in italiano.
</constraints>

<output_format>
## Oggetto
## Testo
Pronto da inviare, dall'apertura alla firma.
## Allegati e invio
## Da verificare prima di inviare
Le [parentesi quadre] da completare e i punti da controllare.
</output_format>
