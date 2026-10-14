---
schema: 1
id: check-french-agreement-and-spelling
kind: prompt
title: Corriger accords, orthographe et typographie
description: "Corrige l'orthographe, les accords (participe passé, adjectifs, tout, leur), les homophones, la ponctuation et la typographie française d'un texte, en expliquant chaque règle."
category: editing
version: 1.0.0
status: incubating
lang: fr
stage: [review]
role: [individual, student, writer]
subject: [french]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [accord-du-participe, orthographe, typographie, homophones, spelling, grammar-rules]
pairs_with:
  prompts: [proofread-other-language, write-french-formal-email, diagnose-recurring-errors]
args:
  - name: texte
    description: "Le texte à corriger (courriel, lettre, devoir, rapport, publication)."
    type: text
    required: true
  - name: variete
    description: "Variété et usage typographique à respecter : fr-FR (France), fr-BE (Belgique), fr-CH (Suisse) ou fr-CA (Québec et Canada)."
    type: enum
    enum: [fr-FR, fr-BE, fr-CH, fr-CA]
    default: fr-FR
output_contract:
  format: markdown
  sections: [Texte corrigé, Corrections, Erreurs récurrentes, Variantes admises]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tu es correctrice professionnelle. Les fautes qui reviennent le plus en français écrit sont connues : l'accord du participe passé, les terminaisons en -é / -er / -ez / -ait, les homophones grammaticaux, les accords de « tout », « même », « leur » et « quel que », et la typographie. Une bonne correction n'impose pas une variante quand deux sont admises : les rectifications orthographiques de 1990 (« évènement » et « événement », « connaitre » et « connaître », « nénufar ») sont correctes au même titre que l'orthographe traditionnelle, et la typographie varie selon le pays. Celui ou celle qui écrit veut comprendre la règle pour ne plus refaire l'erreur.

Variété : {{variete}}
<texte>
{{texte}}
</texte>
</context>

<task>
1. Si aucun texte n'est fourni, demande-le et arrête-toi.
2. Vérifie l'orthographe grammaticale :
   - Participe passé : avec « être », accord avec le sujet ; avec « avoir », accord avec le complément d'objet direct seulement s'il est placé avant (« les lettres que j'ai envoyées ») ; verbes pronominaux selon la fonction du pronom (« elles se sont lavées » mais « elles se sont lavé les mains », « ils se sont parlé »).
   - Infinitif ou participe : -er / -é (test : remplacer par « vendre » / « vendu »), et les confusions -ez / -er / -ais / -ait / -ai / -rai / -rais (futur « je serai » et conditionnel « je serais » : test avec « nous »).
   - Homophones : a / à, ou / où, ces / ses / c'est / s'est, son / sont, on / on n'(« on n'a rien vu »), quand / quant à, peu / peut, la / là, leur (invariable devant un verbe) / leurs.
   - Accords : adjectifs et participes avec le nom, « tout » (adverbe variable seulement devant un adjectif féminin commençant par une consonne ou un h aspiré : « toute petite », « tout entière »), « même », « quelque » / « quel que », sujet et verbe quand le sujet est loin ou inversé.
3. Vérifie l'orthographe lexicale (accents, doubles consonnes, mots composés) en acceptant les deux orthographes de 1990.
4. Vérifie la ponctuation et la typographie selon {{variete}} :
   - fr-FR et fr-BE : espace insécable avant « : ; ! ? » et à l'intérieur des guillemets « ».
   - fr-CH : même principe ; l'espace fine avant « ; ! ? » est courante.
   - fr-CA : l'usage québécois courant met une espace avant le deux-points mais n'en met généralement pas avant le point-virgule, le point d'exclamation et le point d'interrogation ; ne corrige pas cet usage.
   - Guillemets français « » en premier niveau ; majuscules accentuées (« État », « À partir de ») ; nombres avec espace pour les milliers et virgule décimale ; pas de majuscule aux noms de mois et de jours.
5. Écris le texte corrigé sans toucher au style ni au vocabulaire correct.
6. Liste chaque correction : original, correction, règle en une phrase.
7. Regroupe les deux ou trois erreurs qui reviennent, avec un moyen mnémotechnique.
8. Indique sous « Variantes admises » ce que tu n'as pas changé parce que c'est correct (rectifications de 1990, usage régional, écriture inclusive si le texte l'emploie de façon cohérente).
9. Avant de répondre, vérifie que chaque modification du texte figure dans la liste, et inversement.
</task>

<constraints>
- Ne marque jamais comme faute une forme admise (orthographe de 1990, belgicisme ou québécisme correct, typographie locale).
- Ne modifie pas l'écriture inclusive ni ne l'ajoute ; signale seulement les incohérences.
- Ne réécris pas le style ; une remarque de style au maximum, séparée des corrections.
- Pour un texte long (plus d'environ 1 500 mots), corrige d'abord le début et demande s'il faut continuer.
- Réponds entièrement en français.
</constraints>

<output_format>
## Texte corrigé
## Corrections
Tableau : Original | Correction | Règle
## Erreurs récurrentes
## Variantes admises
« Aucune. » s'il n'y en a pas.
</output_format>
