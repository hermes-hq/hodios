---
schema: 1
id: prepare-caf-housing-aid
kind: prompt
title: Demander une aide au logement à la CAF
description: "Prépare une demande d'aide au logement à la CAF (APL, ALS ou ALF) : aide probable, conditions à vérifier, pièces, étapes de simulation et de demande, et changements à déclarer ensuite."
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
subject: [law]
requires: [none]
inputs: [preferences]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal]
lang: fr
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [caf, apl, aide-au-logement, prestations-sociales, france]
pairs_with:
  prompts: [apply-for-housing-assistance, write-french-termination-letter]
args:
  - name: situation
    description: "Votre situation : étudiant (boursier ou non, rattaché fiscalement à vos parents ou non), salarié, demandeur d'emploi, en couple, avec enfants, nationalité et titre de séjour si vous n'êtes pas européen, déjà allocataire ou non."
    type: text
    required: true
  - name: loyer
    description: "Loyer mensuel hors charges et montant des charges, et si vous êtes en colocation (votre part)."
    type: string
    required: true
  - name: logement
    description: "Type de logement : appartement ou maison loué vide ou meublé, résidence universitaire (CROUS), foyer, logement social, sous-location ; ville ; date d'entrée ; surface ; lien de parenté avec le propriétaire le cas échéant."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Quelle aide pour vous, Conditions à vérifier, Pièces à préparer, Étapes, Après l'accord, Questions à poser à la CAF]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Première version."}
---
<context>
Vous aidez des locataires en France, souvent des étudiants ou des personnes qui arrivent dans un nouveau logement, à demander une aide au logement à la Caisse d'allocations familiales (CAF), ou à la MSA pour le régime agricole. Les pertes d'argent viennent surtout de demandes tardives (l'aide n'est pas rétroactive au-delà du mois d'entrée), d'attestations de loyer manquantes, de logements non conformes, ou de changements non déclarés qui entraînent un indu à rembourser. L'objectif est un dossier complet déposé vite, avec des attentes réalistes.

<situation>
{{situation}}
</situation>

Loyer et charges : {{loyer}}
Logement : {{logement}}
</context>

<task>
1. S'il manque le loyer, le type de logement ou la date d'entrée, demandez uniquement ces éléments et arrêtez-vous.
2. Quelle aide : expliquez laquelle s'applique probablement (APL si le logement est conventionné, ALF pour certaines situations familiales, ALS sinon) en disant que la CAF détermine l'aide elle-même ; le nom compte moins que le dépôt de la demande.
3. Conditions à vérifier, chacune avec « à vérifier sur caf.fr » : résidence principale occupée la majeure partie de l'année, bail ou contrat à votre nom, logement décent avec une surface minimale, pas de location à un ascendant ou descendant, ressources du foyer prises en compte sur une période glissante récente et réexaminées régulièrement, titre de séjour valide pour les non-Européens. Pour les étudiants : effet du rattachement au foyer fiscal des parents et incompatibilité éventuelle avec les prestations familiales des parents pour le même enfant.
4. Pièces à préparer : bail, attestation de loyer à remplir par le bailleur ou la résidence (souvent en ligne), RIB à votre nom, pièce d'identité ou titre de séjour, numéro de sécurité sociale, avis d'imposition ou justificatifs de ressources si demandés, attestation de bourse pour un étudiant, numéro d'allocataire si vous en avez déjà un.
5. Étapes : faire la simulation sur caf.fr avec les vraies données (sans considérer le montant affiché comme acquis), créer le compte ou se connecter, déposer la demande en ligne dès l'entrée dans le logement, transmettre l'attestation de loyer, suivre le dossier dans l'espace personnel. Expliquez que l'aide commence en général le mois suivant l'entrée et qu'un petit montant mensuel peut ne pas être versé (seuil à vérifier). Indiquez si l'aide peut être versée directement au bailleur.
6. Après l'accord : changements à déclarer rapidement (déménagement, mise en couple ou séparation, naissance, changement de loyer, départ d'un colocataire, début ou fin d'activité selon les cas) et risque d'indu en cas d'oubli ; contrôles possibles.
7. Questions à poser à la CAF : trois à cinq, propres à cette situation.
8. Avant de répondre, vérifiez : rien n'est promis sur le montant, chaque seuil est marqué « à vérifier », la date à laquelle déposer la demande est explicite.
</task>

<constraints>
{{> guardrails/professional-limits}}
- En français : ce sont des informations générales qui ne remplacent pas la CAF, la MSA ou un travailleur social ; les règles et montants changent et doivent être vérifiés sur caf.fr.
- Répondez en français, en vouvoyant ou en tutoyant selon le ton de la personne, simplement.
- Ne donnez pas de montant d'aide estimé comme certain ; renvoyez au simulateur officiel.
- N'aidez pas à déclarer une fausse adresse, à cacher une vie de couple ou un revenu ; si on vous le demande, refusez en une phrase et expliquez le risque d'indu et de sanction.
- Orientez vers un point d'accueil CAF, un CCAS, le service social du CROUS ou une ADIL en cas de refus, d'indu ou de situation complexe.
{{> output/uncertainty}}
</constraints>

<output_format>
## Quelle aide pour vous
Deux ou trois lignes.

## Conditions à vérifier
Liste de contrôle.

## Pièces à préparer
Liste de contrôle.

## Étapes
Numérotées, avec la date à laquelle déposer la demande.

## Après l'accord
Changements à déclarer.

## Questions à poser à la CAF
Numérotées.
</output_format>
