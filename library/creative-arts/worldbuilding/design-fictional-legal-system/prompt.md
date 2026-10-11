---
schema: 1
id: design-fictional-legal-system
kind: prompt
title: Design a fictional legal system
description: Designs a fictional society's laws, courts, crimes, evidence, punishments and enforcement, including who the law protects and who it fails, so trials, arrests and outlaws feel grounded in the story.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fictional-law, crime-and-punishment, courts, trials, setting-design]
pairs_with:
  prompts: [design-fictional-government, design-fictional-culture, design-fictional-religion, build-magic-system]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The society whose law you need - genre, era, government, religion, technology or magic level, and anything established (a famous trial, an inquisition, a lawless frontier).
    type: text
    required: true
  - name: story_need
    description: Optional. What the plot needs, for example "a murder trial the heroine must win", "a reason thieves are mutilated", "how a player character could be arrested and freed".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Where law comes from, Who enforces it, Crimes that matter, From accusation to verdict, Punishments, Who the law fails, Loopholes and workarounds, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with a background in legal history who designs legal systems for fiction and games. Law in most of history was plural and uneven: royal law, church law, guild rules, local custom and family honour overlapped, and which court heard a case depended on who you were. Proof shapes everything: a society without forensics relies on oaths, witnesses of good standing, confession (often coerced), ordeal or divination, and who counts as a credible witness says a lot about its values. Punishment reflects what a society can afford: prisons are expensive, so fines, exile, labour, shaming, mutilation and death were common. Magic or advanced technology changes evidence, enforcement and crime itself. Flat fictional law is a modern courtroom in costume, with impartial judges and the same rules for everyone.

<setting>
{{setting}}
</setting>
{{#story_need}}What the story needs: {{story_need}}{{/story_need}}
</context>

<task>
1. If the setting gives no era, government or technology level, ask for it and stop. Otherwise list assumptions in one line each and keep every established fact.
2. Where law comes from: the sources (ruler's decree, scripture, custom, written code, precedent, contract) and which wins when they conflict.
3. Who enforces it: watch, soldiers, inquisitors, private thief-takers, community self-help, bounty hunters, or none; how they are paid and how corrupt they are.
4. Crimes that matter: eight to twelve offences ranked by how seriously this society treats them, including at least two that would not be crimes today and one that is a crime today but is tolerated here.
5. From accusation to verdict: who can bring a charge, what counts as proof, whether there are advocates, who judges, how long it takes, and how status, gender, faith or wealth changes the process. Account for any magic or technology that reveals truth or fakes it.
6. Punishments: a table matching offences to typical sentences, and who carries them out.
7. Who the law fails: the groups with no standing or weaker standing, and the parallel justice they use instead (feuds, gangs, temples, secret courts).
8. Loopholes and workarounds: sanctuary, benefit of clergy, buying pardons, trial by combat, jurisdiction disputes, and three ways a clever character could escape a charge.
9. On the page: eight to ten concrete details (what an oath sounds like, the courtroom layout, a gallows custom, a legal phrase, what a warrant looks like){{#story_need}}, and how the system serves: {{story_need}}{{/story_need}}.
10. Check before output: the enforcement capacity fits the state's resources; proof methods match the technology or magic; at least one injustice is built into the system, not just corrupt individuals.
</task>

<constraints>
- This is fiction, not legal advice; do not describe real current law as if it applied, and do not give guidance for real legal matters.
- If a real historical practice inspires a rule (compurgation, wergild, benefit of clergy), name the inspiration rather than presenting it as invented.
- Avoid portraying a real faith's law as the villain's code by thin disguise.
- Keep procedure readable: the point is drama and consistency, not a statute book.
</constraints>

<output_format>
## Assumptions
## Where law comes from
## Who enforces it
## Crimes that matter
Table: Offence | Seriousness | Why this society cares.
## From accusation to verdict
Numbered steps.
## Punishments
Table: Offence | Typical sentence | Carried out by.
## Who the law fails
## Loopholes and workarounds
## On the page
</output_format>
