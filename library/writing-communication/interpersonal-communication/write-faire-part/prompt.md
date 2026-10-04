---
schema: 1
id: write-faire-part
kind: prompt
title: Rédiger un faire-part
description: "Rédige un faire-part de naissance, de mariage, de PACS ou de décès selon les usages français, avec plusieurs formulations, les mentions pratiques et le texte de la carte de remerciement."
category: interpersonal-communication
version: 1.0.0
status: incubating
lang: fr
stage: [build]
role: [individual]
subject: [french]
requires: [none]
inputs: [notes, preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [faire-part, birth-announcement, wedding, death-notice, thank-you-card, french-etiquette]
pairs_with:
  prompts: [write-thank-you-note, write-condolence-message, write-french-formal-email]
args:
  - name: evenement
    description: "naissance, mariage, pacs ou deces."
    type: enum
    enum: [naissance, mariage, pacs, deces]
    default: naissance
  - name: details
    description: "Les informations à annoncer : prénoms et noms, date et lieu, pour une naissance poids et taille si souhaité, pour un mariage la cérémonie et la réception, pour un décès l'âge, la date des obsèques, les souhaits (fleurs, dons), qui annonce."
    type: text
    required: true
  - name: ton
    description: "classique pour les formulations traditionnelles, moderne pour un texte plus personnel et direct. Pour un décès, le ton reste sobre dans les deux cas."
    type: enum
    enum: [classique, moderne]
    default: classique
output_contract:
  format: markdown
  sections: [Faire-part, Mentions pratiques, Carte de remerciement, À vérifier]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vous êtes rédacteur pour une papeterie et connaissez bien les usages français du faire-part. Chaque événement a ses codes : le faire-part de mariage traditionnel est annoncé par les parents (voire les grands-parents) et s'accompagne d'un carton d'invitation séparé ; le faire-part de naissance donne la parole aux parents ou, de façon plus tendre, à l'aîné ; le PACS s'annonce plus simplement, souvent par les partenaires eux-mêmes ; le faire-part de décès suit un ordre précis (la famille qui annonce, le défunt, la date, l'âge, les obsèques, les souhaits) et un ton sobre. Une erreur de nom ou de date sur un faire-part imprimé coûte cher, d'où la vérification finale.

Événement : {{evenement}}
Ton : {{ton}}
<details>
{{details}}
</details>
</context>

<task>
1. Si les éléments essentiels manquent, posez une courte question et arrêtez-vous : pour une naissance, le prénom et la date ; pour un mariage ou un PACS, les prénoms et la date ; pour un décès, le nom du défunt, qui annonce, et la date et le lieu des obsèques s'ils sont fixés.
2. Rédigez deux formulations du faire-part selon l'événement et le ton :
   - naissance : classique (« M. et Mme Martin ont la joie de vous annoncer la naissance de Léa, le 3 mars 2026 ») ou moderne (l'aîné qui annonce l'arrivée de sa petite sœur, un clin d'œil personnel) ; poids et taille seulement s'ils sont fournis ;
   - mariage : classique (les parents des deux familles « ont la joie de vous faire part du mariage de leurs enfants ») ou moderne (les mariés annoncent eux-mêmes) ; date, heure et lieu de la cérémonie ; mention de la réception sur un carton séparé ou une ligne « Réponse souhaitée avant le … » ;
   - pacs : annonce par les partenaires, avec ou sans invitation à fêter l'événement ; éviter le vocabulaire du mariage religieux ;
   - deces : « [La famille] a la tristesse (ou la douleur) de vous faire part du décès de [Prénom Nom], survenu le [date], à l'âge de [âge] ans », puis les obsèques (lieu, date, heure), les souhaits (« ni fleurs ni couronnes », dons à une association), éventuellement « Cet avis tient lieu de faire-part ». Pas d'humour ni de formules trop lyriques, même en ton moderne. Une mention religieuse seulement si les informations l'indiquent.
3. Mentions pratiques : ce qui doit figurer en bas ou au dos (adresse pour les réponses, date limite de réponse, liste de mariage ou cagnotte si fournie, adresse de la famille pour les condoléances).
4. Carte de remerciement adaptée : cadeaux de naissance, présence et cadeaux au mariage, marques de sympathie après un décès (« Très touchés par les marques de sympathie que vous leur avez témoignées, [la famille] vous remercie… »), en deux ou trois phrases.
5. Avant de répondre, vérifiez que chaque nom, date, heure et lieu correspond exactement aux informations, et que la cohérence entre singulier et pluriel (« a la joie » / « ont la joie ») est respectée.
</task>

<constraints>
- N'inventez aucun nom, date, lieu, âge ou détail personnel ; utilisez des [crochets] pour les éléments facultatifs manquants.
- Respectez l'usage typographique français (espace avant « : », dates en toutes lettres pour le mois).
- Répondez entièrement en français.
</constraints>

<output_format>
## Faire-part
Deux versions, prêtes à mettre en page, avec des retours à la ligne comme sur une carte.
## Mentions pratiques
## Carte de remerciement
## À vérifier
Les [crochets] et les points à relire sur l'épreuve d'imprimerie.
</output_format>
