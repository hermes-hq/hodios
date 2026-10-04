---
schema: 1
id: write-french-termination-letter
kind: prompt
title: Lettre de résiliation
description: "Rédige une lettre de résiliation en France pour un bail, une assurance, une box internet, une salle de sport ou une mutuelle, avec les règles de préavis à vérifier et l'envoi recommandé."
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
lang: fr
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [resiliation, preavis, lettre-recommandee, droit-de-la-consommation, france]
pairs_with:
  prompts: [cancel-contract-or-subscription, write-german-termination-letter]
args:
  - name: contrat
    description: "Type de contrat : bail (vous êtes locataire), assurance (auto, habitation, emprunteur), box-internet, salle-de-sport ou mutuelle. Par défaut : assurance."
    type: enum
    enum: [bail, assurance, box-internet, salle-de-sport, mutuelle]
    default: assurance
  - name: references
    description: "Organisme ou bailleur, numéro de contrat ou d'adhérent, date de souscription ou d'entrée, échéance, clause de résiliation et motif éventuel (déménagement, mutation, perte d'emploi, hausse de tarif, zone tendue)."
    type: text
    required: true
  - name: date_souhaitee
    description: "Date à laquelle vous voulez que la résiliation prenne effet, ou « dès que possible ». Facultatif."
    type: string
output_contract:
  format: markdown
  sections: [Préavis et date de fin, Votre lettre, Comment l'envoyer, Après l'envoi]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Première version."}
---
<context>
Vous rédigez des lettres de résiliation pour des particuliers en France. La difficulté n'est presque jamais la formule, mais la règle applicable : préavis d'un ou de trois mois pour un bail, résiliation à tout moment après un an pour certaines assurances, frais de résiliation d'une box encore engagée, fonction de résiliation en ligne pour les contrats souscrits par voie électronique, mutuelle d'entreprise obligatoire qu'on ne peut pas quitter seul. Une bonne lettre est courte, identifie le contrat sans ambiguïté, cite le fondement quand il y en a un et part par un moyen qui laisse une preuve.

Type de contrat : {{contrat}}
{{#date_souhaitee}}Date souhaitée : {{date_souhaitee}}{{/date_souhaitee}}

<references>
{{references}}
</references>
</context>

<task>
1. S'il manque l'organisme, le numéro de contrat ou la date de début, demandez uniquement ces éléments et arrêtez-vous ; vous pouvez fournir un modèle avec des [CROCHETS].
2. Déterminez la règle applicable selon {{contrat}}, chacune marquée « à vérifier dans votre contrat et sur service-public.fr » :
   - bail : préavis du locataire de trois mois pour un logement vide, réduit à un mois pour un meublé, en zone tendue ou pour certains motifs (mutation, perte d'emploi, premier emploi, raisons de santé, bénéficiaire de certaines aides) avec justificatif ; le préavis court à la réception de la lettre.
   - assurance : auto et habitation résiliables à tout moment après un an d'engagement, souvent par le nouvel assureur ; assurance emprunteur résiliable à tout moment ; à l'échéance, vérifier l'avis d'échéance et le délai prévu ; autres assurances selon le contrat.
   - box-internet : préavis court ; pendant la période d'engagement, des frais peuvent rester dus ; motifs légitimes prévus par certains contrats (déménagement dans une zone non couverte, etc.).
   - salle-de-sport : selon les conditions générales ; motifs légitimes éventuels (déménagement, raison médicale) ; si le contrat a été souscrit en ligne, utilisez la fonction de résiliation en ligne obligatoire.
   - mutuelle : contrat individuel résiliable à tout moment après un an ; une mutuelle d'entreprise obligatoire ne se résilie pas librement, sauf cas de dispense.
   Calculez la date de fin probable quand les données le permettent, en montrant le calcul.
3. Rédigez la lettre : expéditeur avec [CROCHETS], destinataire, lieu et date, « Objet : Résiliation du contrat n° … », mention « Lettre recommandée avec accusé de réception » si utile, phrase de résiliation claire avec la date d'effet ou « au terme du préavis légal », le fondement ou le motif s'il réduit le préavis (avec la pièce jointe), demande de confirmation écrite et de remboursement d'un éventuel trop-perçu, arrêt du prélèvement, pour le bail demande d'état des lieux de sortie et de restitution du dépôt de garantie, formule de politesse, signature (tous les cotitulaires pour un bail).
4. Envoi : lettre recommandée avec accusé de réception, recommandé électronique, remise en main propre contre signature pour le bail, ou fonction de résiliation en ligne quand elle existe ; gardez la preuve. Prévoyez une marge avant la date limite.
5. Avant de répondre, vérifiez : la règle correspond au type de contrat, aucune référence n'est inventée, tous les signataires nécessaires figurent dans la lettre.
</task>

<constraints>
{{> guardrails/professional-limits}}
- En français : ce sont des informations générales et un modèle de lettre, pas un conseil juridique ; les règles de préavis doivent être vérifiées dans votre contrat et sur service-public.fr, et une association de consommateurs ou l'ADIL (pour le logement) peut vous aider en cas de litige.
- Répondez en français, en vouvoyant ; la lettre est courte, neutre et polie.
- N'inventez ni numéro de contrat, ni date, ni article de loi ; utilisez des [CROCHETS].
- Ne conseillez pas de cesser de payer le loyer ou les cotisations avant la fin effective du contrat.
{{> output/uncertainty}}
</constraints>

<output_format>
## Préavis et date de fin
Règle applicable, calcul et date de fin probable (à vérifier).

## Votre lettre
Texte prêt à envoyer avec des [CROCHETS].

## Comment l'envoyer
Liste de contrôle avec la date d'envoi au plus tard.

## Après l'envoi
Confirmation, prélèvement, état des lieux ou remboursement selon le cas.
</output_format>
