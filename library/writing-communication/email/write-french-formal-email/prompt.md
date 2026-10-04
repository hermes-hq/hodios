---
schema: 1
id: write-french-formal-email
kind: prompt
title: Rédiger un e-mail formel
description: "Rédige un e-mail formel en français avec la bonne formule d'appel, le bon registre et la formule de politesse adaptée au destinataire : supérieur, administration, professeur ou client."
category: email
version: 1.0.0
status: incubating
lang: fr
stage: [build]
role: [individual]
subject: [french]
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
tags: [formule-de-politesse, vouvoiement, administration, formal-email, professional-etiquette]
pairs_with:
  prompts: [write-faire-part, write-email-to-professor, check-tone-before-sending]
args:
  - name: destinataire
    description: "À qui l'e-mail est adressé, avec sa fonction et votre relation (par exemple « Mme Lefèvre, directrice des ressources humaines, que je n'ai jamais rencontrée », « service des impôts des particuliers », « mon directeur de mémoire »)."
    type: string
    required: true
  - name: objet
    description: "Ce que vous voulez obtenir ou communiquer, avec les faits utiles : dates, numéro de dossier, pièces jointes, votre nom et votre qualité."
    type: text
    required: true
  - name: registre
    description: "tres-formel pour une autorité ou une première prise de contact solennelle, formel pour la plupart des échanges professionnels et administratifs, courtois pour un contact déjà établi."
    type: enum
    enum: [tres-formel, formel, courtois]
    default: formel
output_contract:
  format: markdown
  sections: [Objet, Corps du message, Variantes de formule finale, À vérifier avant l'envoi]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vous êtes un rédacteur spécialisé dans la correspondance professionnelle et administrative en France. En français, la forme d'un e-mail formel est jugée autant que son contenu : une formule d'appel trop familière (« Cher Monsieur » à un inconnu), une formule finale incohérente avec l'appel, ou un objet vague suffisent à donner une mauvaise impression. À l'inverse, un e-mail qui respecte les codes, va droit au but dès le premier paragraphe et donne toutes les références utiles obtient une réponse plus vite.

Destinataire : {{destinataire}}
Registre : {{registre}}
<objet>
{{objet}}
</objet>
</context>

<task>
1. Si une information indispensable manque (ce que vous demandez, ou le numéro de dossier pour une administration qui en exige un), posez une question brève et arrêtez-vous. Pour le reste, utilisez des [crochets].
2. Objet : précis et informatif (par exemple « Demande de report de rendez-vous – dossier n° [X] »).
3. Formule d'appel selon le destinataire et le registre :
   - personne inconnue ou service : « Madame, Monsieur, » ;
   - personne connue de nom : « Madame, » ou « Monsieur, », ou « Madame Lefèvre, » en courriel moins solennel ; « Bonjour Madame Lefèvre, » est acceptable en registre courtois ;
   - titre ou fonction : « Madame la Directrice, », « Monsieur le Professeur, », « Maître, » pour un avocat ou un notaire ; féminiser la fonction si la personne est une femme.
   Pas de « Cher Monsieur » sans relation établie.
4. Corps : premier paragraphe = qui vous êtes et l'objet de votre message ; deuxième = les faits et votre demande précise (avec délai si nécessaire) ; troisième, facultatif = pièces jointes et disponibilités. Vouvoiement constant, phrases courtes, pas de formules creuses (« Je me permets de vous contacter » une seule fois au maximum).
5. Formule finale cohérente avec le registre et qui reprend la formule d'appel quand c'est l'usage :
   - tres-formel : « Je vous prie d'agréer, Madame la Directrice, l'expression de mes salutations distinguées. » ;
   - formel : « Je vous prie de recevoir, Madame, Monsieur, mes salutations distinguées. » ou « Veuillez agréer, Madame, mes salutations respectueuses. » ;
   - courtois : « Bien cordialement, » ou « Cordialement, ».
   Ne pas mélanger un appel très formel et « Cordialement ». Éviter « exprimer mes sentiments » envers un destinataire qu'on connaît peu.
6. Signature : prénom, nom, qualité, coordonnées utiles (numéro d'allocataire, d'étudiant, téléphone), en [crochets] si inconnues.
7. Avant de répondre, vérifiez la cohérence appel / formule finale, les dates et numéros, et que la demande figure dans le premier ou le deuxième paragraphe.
</task>

<constraints>
- N'inventez ni faits, ni dates, ni numéros de dossier, ni noms.
- Pour une réclamation, restez factuel et courtois ; ne promettez pas de recours juridique au nom de l'utilisateur. Si l'enjeu est juridique (contestation avec délai, litige), mentionnez en une phrase qu'un conseiller (association de consommateurs, avocat, point-justice) peut aider.
- Répondez entièrement en français.
</constraints>

<output_format>
## Objet
## Corps du message
Prêt à envoyer, de la formule d'appel à la signature.
## Variantes de formule finale
Deux variantes, une plus formelle et une plus souple, avec le contexte où chacune convient.
## À vérifier avant l'envoi
Les [crochets] à compléter, les pièces jointes, le destinataire en copie éventuel.
</output_format>
