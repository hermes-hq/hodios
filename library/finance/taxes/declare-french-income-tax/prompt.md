---
schema: 1
id: declare-french-income-tax
kind: prompt
title: Préparer sa déclaration de revenus
description: "Prépare la déclaration de revenus d'un foyer en France : points à vérifier sur la déclaration préremplie, cases courantes, charges et crédits d'impôt à envisager, parts et calendrier."
category: taxes
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [preferences, document]
output: [checklist, table, explanation, questions]
risk: read-only
advice_risk: [financial]
lang: fr
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [impot-sur-le-revenu, declaration-preremplie, prelevement-a-la-source, quotient-familial, france]
pairs_with:
  prompts: [explain-tax-notice, organize-tax-documents]
args:
  - name: situation
    description: "Composition du foyer et changements dans l'année : célibataire, marié ou pacsé (date), divorce, naissance, enfant majeur rattaché, garde alternée, déménagement, départ ou arrivée en France."
    type: text
    required: true
  - name: revenus
    description: "Types de revenus du foyer : salaires, chômage, pensions, revenus d'auto-entrepreneur, loyers (vide ou meublé), revenus de capitaux, revenus de l'étranger, plus-values. Montants approximatifs si possible."
    type: text
    required: true
  - name: parts
    description: "Nombre de parts de quotient familial que vous pensez avoir, s'il est connu (1 pour une personne seule sans enfant). Par défaut : 1."
    type: number
    default: 1
output_contract:
  format: markdown
  sections: [Votre foyer fiscal, Calendrier, À vérifier sur la déclaration préremplie, Cases et annexes à regarder, Charges et crédits à envisager, Après la déclaration, Questions pour votre centre des impôts]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Première version."}
---
<context>
Vous aidez des foyers en France à préparer leur déclaration de revenus annuelle sur impots.gouv.fr. Depuis le prélèvement à la source, beaucoup pensent qu'il n'y a plus rien à faire ; pourtant la déclaration reste le moment où se règlent les crédits d'impôt (emploi à domicile, garde d'enfants, dons), les revenus non préremplis (loyers, revenus étrangers, micro-entreprise) et le calcul du taux de prélèvement de l'année suivante. Les erreurs typiques : laisser une déclaration automatique alors que la situation a changé, oublier les comptes à l'étranger, mal déclarer une garde alternée, ne pas comparer abattement de 10 % et frais réels.

Parts annoncées : {{parts}}

<situation>
{{situation}}
</situation>

<revenus>
{{revenus}}
</revenus>
</context>

<task>
1. S'il manque la composition du foyer ou les types de revenus, demandez uniquement ce qui manque et arrêtez-vous.
2. Foyer fiscal et parts : déterminez qui déclare avec qui (année du mariage ou du PACS : choix entre déclaration commune et séparée), et vérifiez le nombre de parts selon les règles générales (demi-part par enfant pour les deux premiers, une part à partir du troisième, garde alternée partagée, parent isolé), en signalant tout écart avec {{parts}}. Marquez les règles « à vérifier pour l'année ».
3. Calendrier : ouverture du service en ligne, dates limites par zone de département, déclaration papier, avis d'impôt et régularisation du solde, tous marqués « à vérifier sur impots.gouv.fr ».
4. Déclaration préremplie : liste de contrôle pour chaque montant prérempli (salaires, chômage, pensions, revenus de capitaux) à comparer avec les bulletins et attestations ; points de vigilance (indemnités de rupture, heures supplémentaires exonérées, pension alimentaire reçue, changement d'employeur). Si la déclaration automatique est proposée, dites quand il faut quand même la corriger.
5. Cases et annexes à regarder selon {{revenus}} : frais réels contre abattement forfaitaire, revenus d'auto-entrepreneur (2042-C-PRO), loyers en micro-foncier ou au réel (2044), location meublée, revenus étrangers (2047) et comptes à l'étranger (3916), plus-values. Indiquez les numéros de case seulement en précisant « à vérifier dans la notice de l'année ».
6. Charges et crédits d'impôt à envisager, chacun avec le justificatif à garder : emploi d'un salarié à domicile, frais de garde des jeunes enfants, dons, pension alimentaire versée, versements sur un plan d'épargne retraite, frais de scolarité, travaux éligibles. Donnez les taux et plafonds uniquement marqués « à vérifier ».
7. Après la déclaration : avis d'impôt, mise à jour du taux de prélèvement, correction en ligne, réclamation, conservation des justificatifs.
8. Questions pour le centre des impôts ou un conseiller : trois à cinq, propres à cette situation.
9. Avant de répondre, vérifiez : chaque montant vient de la personne, chaque règle incertaine est marquée, aucun calcul d'impôt définitif n'est présenté.
</task>

<constraints>
{{> guardrails/professional-limits}}
- En français : il s'agit d'informations générales qui ne remplacent ni l'administration fiscale ni un expert-comptable ou un avocat fiscaliste ; barèmes, plafonds et dates changent chaque année et doivent être vérifiés sur impots.gouv.fr.
- Répondez en français, en vouvoyant, avec des phrases simples.
- Ne calculez pas l'impôt final et ne choisissez pas pour la personne entre deux options ; montrez ce qui change.
- N'aidez pas à omettre un revenu, à gonfler des frais ou à déclarer un enfant à tort ; si on vous le demande, refusez en une phrase et revenez à une déclaration exacte.
- Recommandez un professionnel ou le service des impôts des particuliers en cas de revenus étrangers importants, d'expatriation, de location meublée complexe, de plus-values immobilières ou d'années non déclarées.
{{> output/uncertainty}}
</constraints>

<output_format>
## Votre foyer fiscal
Qui déclare, parts estimées et justification.

## Calendrier
Tableau : étape | date (à vérifier).

## À vérifier sur la déclaration préremplie
Liste de contrôle.

## Cases et annexes à regarder
Tableau : situation | formulaire ou case (à vérifier) | justificatif.

## Charges et crédits à envisager
Puces avec le justificatif à garder.

## Après la déclaration
Courte liste.

## Questions pour votre centre des impôts
Numérotées.
</output_format>
