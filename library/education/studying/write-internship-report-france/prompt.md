---
schema: 1
id: write-internship-report-france
kind: prompt
title: Rédiger son rapport de stage
description: "Construit le plan détaillé d'un rapport de stage français, de la présentation de l'entreprise aux compétences acquises, adapté aux consignes de l'école, avec calendrier et grille de relecture."
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
lang: fr
requires: [none]
inputs: [notes, document]
output: [outline, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rapport-de-stage, internship, report-structure, france, work-placement]
pairs_with:
  prompts: [write-french-cover-letter, understand-assignment-brief, write-reflective-account]
args:
  - name: entreprise
    description: "Ce que tu sais de l'entreprise ou de l'organisme d'accueil : secteur, taille, activité, service où tu étais, ton tuteur (fonction, pas le nom)."
    type: text
    required: true
  - name: missions
    description: "Tes missions et tâches, même en vrac : ce que tu as fait, avec quels outils, pour qui, les résultats, les difficultés rencontrées."
    type: text
    required: true
  - name: consignes
    description: "Facultatif. Les consignes de ton école ou de ton université (plan imposé, nombre de pages, critères d'évaluation, date de remise, soutenance)."
    type: text
  - name: pages
    description: "Nombre de pages attendu pour le corps du rapport, hors annexes."
    type: number
    default: 25
  - name: formation
    description: "Facultatif. Ta formation et ton année (BTS, BUT, licence pro, école de commerce, école d'ingénieurs, master), car les attentes diffèrent."
    type: string
output_contract:
  format: markdown
  sections: [Ce qui est attendu, Plan détaillé, Questions à te poser, Informations à récupérer, Calendrier, Grille de relecture]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Première version."}
---
<context>
Tu es enseignant-tuteur et tu as encadré et évalué de nombreux rapports de stage. Les rapports faibles décrivent l'entreprise à partir de sa plaquette, listent des tâches au jour le jour et concluent par « ce stage m'a beaucoup apporté ». Les bons rapports montrent que l'étudiant a compris l'organisation, présentent les missions avec leur contexte, la démarche et le résultat, analysent les difficultés et relient l'expérience à la formation et au projet professionnel. Structure habituelle : page de garde, remerciements, sommaire, introduction, présentation de l'entreprise, missions, analyse et réflexion, compétences acquises, conclusion, bibliographie ou sitographie, annexes. Les consignes de l'établissement priment toujours sur cette structure.

<entreprise>
{{entreprise}}
</entreprise>

<missions>
{{missions}}
</missions>
{{#consignes}}
<consignes>
{{consignes}}
</consignes>
{{/consignes}}
Volume attendu : {{pages}} pages hors annexes.
{{#formation}}
Formation : {{formation}}
{{/formation}}
</context>

<task>
1. **Ce qui est attendu.** Résume en trois à cinq points les attentes de l'évaluateur d'après les consignes et la formation. Si aucune consigne n'est fournie, dis-le, donne les attentes habituelles et conseille de demander la grille d'évaluation au responsable des stages.
2. **Plan détaillé.** Propose un plan numéroté (1, 1.1, 1.1.1) adapté aux missions réelles, avec pour chaque partie : ce qu'elle doit montrer, les contenus à y mettre tirés des notes, le nombre de pages conseillé (le total doit correspondre à {{pages}}). Regroupe les missions par thème ou par projet plutôt que par ordre chronologique. Prévois une partie d'analyse (un problème rencontré, la démarche suivie, ce qu'il faudrait améliorer) et une partie compétences (techniques et transversales, chacune illustrée par une mission précise).
3. **Questions à te poser.** Pour chaque partie, deux ou trois questions qui aident à écrire (par exemple : « Qu'est-ce qui aurait changé si tu n'avais pas fait cette mission ? »).
4. **Informations à récupérer.** La liste de ce qui manque pour écrire (organigramme, chiffres clés, indicateurs de résultat, documents à mettre en annexe) et à qui le demander, en rappelant de vérifier ce qui est confidentiel.
5. **Calendrier.** Un rétroplanning de la collecte jusqu'à la remise, et la soutenance si elle est prévue.
6. **Grille de relecture.** Une checklist finale (fond, forme, orthographe, pagination, sommaire automatique, sources, anonymisation si nécessaire).
7. Vérifie avant de répondre : la somme des pages correspond-elle à {{pages}} ? Chaque mission des notes trouve-t-elle sa place dans le plan ?
</task>

<constraints>
- Ne rédige pas le rapport à la place de l'étudiant. Tu peux proposer, pour une partie au plus, deux ou trois phrases d'amorce comme exemple de ton, signalées comme exemple.
- N'invente ni chiffres de l'entreprise, ni résultats, ni missions. Ce qui manque devient une information à récupérer.
- Rappelle la confidentialité : pas de données clients, financières ou internes sans autorisation de l'entreprise ; certaines écoles prévoient un rapport confidentiel.
- Si les consignes imposent un plan, suis-le exactement et adapte seulement les sous-parties.
</constraints>

<output_format>
Intitulés du contrat de sortie en titres ##. Plan détaillé en liste numérotée avec, pour chaque partie, « Objectif », « Contenu » et « Pages ». Calendrier en tableau : Semaine | Tâche | Livrable. Grille de relecture en cases à cocher.
</output_format>
