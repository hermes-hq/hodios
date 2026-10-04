---
schema: 1
id: write-vinted-listing
kind: prompt
title: Annonce Vinted
description: "Rédige une annonce Vinted pour un vêtement de seconde main : titre honnête, taille et mesures à plat, état, matières, ton sympathique, plus conseils photo, logique de prix et réponses types."
category: copywriting
version: 1.0.0
status: incubating
lang: fr
stage: [build]
role: [individual]
subject: [ecommerce]
requires: [none]
inputs: [text, notes]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [vinted, secondhand, clothing-resale, france]
pairs_with:
  prompts: [write-mercari-listing, write-marketplace-listing]
args:
  - name: article
    description: Le vêtement ou l'accessoire, la taille indiquée sur l'étiquette, les mesures à plat si vous les avez, la composition, la couleur, combien de fois il a été porté, les défauts (bouloches, taches, accrocs) et leur emplacement, le prix d'achat si vous vous en souvenez.
    type: text
    required: true
  - name: etat
    description: L'état selon les catégories Vinted. neuf = neuf (avec ou sans étiquette, précisez-le dans l'article), tres-bon = très bon état, bon = bon état, satisfaisant = état satisfaisant.
    type: enum
    enum: [neuf, tres-bon, bon, satisfaisant]
    default: tres-bon
  - name: marque
    description: La marque telle qu'indiquée sur l'étiquette. Laissez vide si sans marque ou si l'étiquette est illisible.
    type: string
output_contract:
  format: markdown
  sections: [Titre, Description, Fiche, Photos à prendre, Prix, Réponses types, À vérifier]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Première version."}
---
<context>
Vous aidez des particuliers à vendre leurs vêtements sur Vinted. Les acheteurs font défiler des dizaines d'annonces identiques sur leur téléphone : ils cliquent sur la photo et le titre, puis vérifient dans la description la taille réelle, l'état et les défauts. Une annonce floue génère des questions, des offres très basses et des litiges ("ne correspond pas à la description").

Ce qui marche sur Vinted :
- Titre court et cherchable : type de pièce + marque + taille + couleur ou matière clé (par exemple "Jean droit Levi's 501 W30 L32 bleu brut").
- Mesures à plat en centimètres : longueur, largeur d'aisselle à aisselle, longueur de manche pour un haut ; tour de taille, longueur, entrejambe pour un bas. Les tailles varient d'une marque à l'autre, les mesures évitent les retours.
- État honnête et défauts photographiés de près. Mieux vaut choisir l'état inférieur en cas de doute.
- Composition reprise de l'étiquette (100 % coton, laine mérinos...).
- Ton simple et sympathique ; le tutoiement est courant sur Vinted, le vouvoiement reste possible.
- Prix : regarder les articles similaires vendus, tenir compte de la marque, de l'état et de la saison. Les frais de protection sont payés par l'acheteur, le vendeur reçoit le prix affiché. Les offres et les réductions sur les lots aident à vendre.
- Les contrefaçons sont interdites ; "authentique" ne s'écrit que si on peut le prouver (facture, ticket, achat en boutique).
</context>

<task>
Rédigez l'annonce Vinted pour cet article.

<article>
{{article}}
</article>

État : {{etat}}
{{#marque}}Marque : {{marque}}{{/marque}}

1. S'il manque le type de pièce, la taille ou l'état des défauts, posez ces questions en un seul message et arrêtez-vous.
2. Proposez deux titres, avec le nombre de caractères.
3. Rédigez la description : une phrase d'accroche, taille et mesures à plat, coupe, composition, état et défauts précis, nombre de ports si connu, une phrase sur l'envoi soigné. Utilisez le tutoiement, sauf si l'article indique le contraire.
4. Remplissez la fiche (catégorie, marque, taille, état, couleur, matière) uniquement avec les informations fournies ; mettez "à compléter" sinon.
5. Listez les photos à prendre, dans l'ordre.
6. Expliquez comment fixer le prix en trois ou quatre lignes, à partir des articles similaires vendus. Ne donnez pas de chiffre de marché inventé ; si un prix d'achat est connu, proposez une fourchette indicative en disant sur quoi elle repose.
7. Écrivez trois réponses types : offre trop basse, demande de mesures, "toujours dispo ?".
8. Vérifiez avant de répondre : l'état choisi correspond aux défauts décrits, aucune mention "authentique" sans preuve, aucune mesure inventée.
</task>

<constraints>
- Ne cachez ni n'adoucissez aucun défaut.
- N'inventez pas de mesures, de composition ou de nombre de ports ; les manques vont dans "À vérifier".
- Pas de majuscules en série, pas d'avalanche d'émojis (deux au maximum), pas de "prix ferme" agressif.
- N'écrivez pas "authentique" ou "original" pour une marque de luxe sans preuve d'achat.
</constraints>

<output_format>
## Titre
Deux propositions avec leur nombre de caractères.

## Description
Le texte prêt à coller.

## Fiche
Tableau : Champ | Valeur.

## Photos à prendre
Liste numérotée.

## Prix
La logique de prix et, si possible, une fourchette justifiée.

## Réponses types
Trois réponses prêtes à envoyer.

## À vérifier
Les informations à compléter. "Rien" si tout est complet.
</output_format>
