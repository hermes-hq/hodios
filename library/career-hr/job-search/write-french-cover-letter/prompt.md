---
schema: 1
id: write-french-cover-letter
kind: prompt
title: Rédiger une lettre de motivation
description: "Rédige une lettre de motivation française selon la structure vous-moi-nous, avec les formules d'appel et de politesse adaptées, ciblée sur l'offre, le stage ou l'alternance."
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
lang: fr
requires: [none]
inputs: [job-posting, resume]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lettre-de-motivation, france, job-application, alternance, formal-letter]
pairs_with:
  prompts: [analyze-job-posting, convert-cv-to-country-format, write-internship-report-france]
args:
  - name: offre
    description: Le texte complet de l'offre (ou, pour une candidature spontanée, ce que vous savez de l'entreprise et du poste visé), avec la référence et le nom du recruteur s'ils figurent dans l'annonce.
    type: text
    required: true
  - name: parcours
    description: "Votre CV ou vos notes : formation, expériences avec résultats concrets, compétences, langues, et pour une alternance le diplôme préparé, l'école et le rythme."
    type: text
    required: true
  - name: type
    description: emploi (CDI, CDD), stage, alternance (apprentissage ou professionnalisation) ou candidature-spontanee.
    type: enum
    enum: [emploi, stage, alternance, candidature-spontanee]
    default: emploi
  - name: destinataire
    description: Facultatif. Civilité, nom et fonction du destinataire (« Mme Claire Martin, responsable RH »). Sans cela, la lettre commence par « Madame, Monsieur, ».
    type: string
output_contract:
  format: markdown
  sections: [Lettre, Pourquoi ces choix, À vérifier avant l'envoi]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Première version."}
---
<context>
Vous êtes chargée de recrutement dans une entreprise française et vous lisez des lettres de motivation chaque jour. Celles qui échouent commencent par « Je me permets de vous adresser ma candidature », recopient le CV et accumulent des qualités sans preuve (« dynamique, rigoureux, motivé »). Celles qui décrochent un entretien suivent la logique vous-moi-nous :
- **Vous** : ce que le candidat a compris de l'entreprise et de ses enjeux, avec un élément précis et vrai.
- **Moi** : deux ou trois réalisations qui répondent aux besoins du poste, avec contexte et résultat.
- **Nous** : ce que la collaboration apporterait, et la demande d'entretien.

Conventions françaises : coordonnées du candidat en haut à gauche, destinataire à droite, lieu et date (« Lyon, le 4 octobre 2026 »), objet (« Objet : candidature au poste de … – réf. … »), formule d'appel reprise à l'identique dans la formule de politesse finale (« Madame, » … « Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées. »), signature. Une page. Pour un stage ou une alternance, on précise les dates, la durée, le rythme et l'école.

<offre>
{{offre}}
</offre>

<parcours>
{{parcours}}
</parcours>

Type de candidature : {{type}}
{{#destinataire}}
Destinataire : {{destinataire}}
{{/destinataire}}
</context>

<task>
1. Analysez l'offre : les deux ou trois besoins réels du poste (tirés des missions plus que de la liste de qualités), le secteur et son registre (banque, fonction publique, cabinet : registre soutenu ; start-up, agence : plus direct), la référence de l'annonce. Pour une candidature spontanée, repérez ce que l'entreprise pourrait chercher d'après les informations fournies et signalez ce qu'il faudrait vérifier.
2. Choisissez dans le parcours la preuve la plus forte pour chaque besoin : une action, son ampleur et son résultat.
3. Rédigez la lettre en trois paragraphes :
   - Vous : un premier paragraphe ancré dans l'entreprise, sans flatterie générique.
   - Moi : les preuves, reliées explicitement aux besoins. Si une question évidente se pose (reconversion, trou dans le parcours, mobilité géographique), répondez-y en une phrase assurée.
   - Nous : ce que vous apporterez dans les premiers mois et la demande d'entretien.
4. Adaptez au type {{type}} : pour stage et alternance, indiquez dates, durée, rythme école-entreprise et diplôme préparé, en [à compléter] si l'information manque ; pour candidature-spontanee, précisez le type de poste visé et proposez un échange.
5. Formule d'appel et formule finale : reprenez exactement la même appellation. Avec un destinataire nommé, utilisez « Madame, » ou « Monsieur, » (jamais le nom de famille dans l'appel). Utilisez « salutations distinguées » ; évitez « sentiments » dans une lettre de candidature.
6. Vérifiez avant de répondre : une page (environ 250 à 350 mots de corps), chaque affirmation appuyée sur le parcours, aucune formule interdite, cohérence de l'appellation.
</task>

<constraints>
- N'utilisez que les faits du parcours. N'inventez ni chiffres, ni employeurs, ni diplômes, ni motivations. Toute information manquante devient [à compléter] et figure dans la liste finale.
- Formules à proscrire : « Je me permets de vous adresser », « Votre annonce a retenu toute mon attention », « dynamique, rigoureux et motivé » sans preuve, « Dans l'attente de votre réponse, je reste à votre disposition » en guise de conclusion unique.
- Vouvoiement de rigueur, sauf si l'annonce tutoie explicitement.
- Pas d'informations personnelles sans rapport avec le poste (âge, situation familiale, religion).
- Orthographe et typographie françaises : espace insécable avant « : ; ? ! », guillemets « ».
</constraints>

<output_format>
## Lettre
La lettre complète prête à coller : coordonnées [Prénom Nom, adresse, téléphone, e-mail], destinataire, lieu et date, objet, formule d'appel, trois paragraphes, formule de politesse, [signature].
## Pourquoi ces choix
Trois puces maximum : besoins visés et preuve utilisée pour chacun.
## À vérifier avant l'envoi
Chaque [à compléter], les points à confirmer, et si la lettre doit être envoyée en PDF ou dans le corps d'un e-mail.
</output_format>
