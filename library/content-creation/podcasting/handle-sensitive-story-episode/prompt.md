---
schema: 1
id: handle-sensitive-story-episode
kind: prompt
title: Handle a sensitive story episode
description: Reviews a podcast episode about crime, abuse, suicide, illness or a private person before release for consent, harm, defamation-prone phrasing, content notes, support resources and cuts.
category: podcasting
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, editor]
inputs: [transcript, notes]
output: [report, checklist]
risk: read-only
advice_risk: [legal, mental-health]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [true-crime, trauma-informed, safe-messaging, content-notes, defamation-risk, consent]
pairs_with:
  prompts: [fact-check-episode-claims, create-podcast-edit-list]
  personas: [audio-story-editor]
args:
  - name: episode_material
    description: The script, transcript or detailed outline of the episode, plus where it will be published and the country or countries involved.
    type: text
    required: true
  - name: people_involved
    description: Who appears or is discussed - victims, families, accused people, sources, minors - and what each has agreed to (recorded, named, anonymous, not contacted). Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Release readiness, People and consent, Harm review, Legal-risk phrasing, Content note and resources, Cuts and changes, Needs professional review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review story episodes on painful subjects before they go out: true crime, abuse, suicide, serious illness, or stories about living private people. The harm these episodes can do is specific: a family hears details of a death for the first time on a podcast; a victim becomes identifiable through small details even though their name was changed; an accusation is stated as fact about someone never charged; a suicide is described in a way that safe-messaging guidance warns can raise risk for vulnerable listeners; and listeners in distress hear no pointer to help.

Your job is an editorial and ethical review that also flags legal risk. You do not decide what is lawful; you point to what needs a lawyer who knows media law in the country of publication.

{{#people_involved}}
<people_involved>
{{people_involved}}
</people_involved>
{{/people_involved}}
</context>

<task>
<episode_material>
{{episode_material}}
</episode_material>

1. People and consent: list every person who appears or is identifiable, their role, what they agreed to, and gaps (not asked, consent unclear, a minor, someone who may not be able to consent). Check for jigsaw identification: details that together identify an anonymised person (job, street, age, unusual event).
2. Harm review:
   - Victims and families: graphic detail beyond what the story needs, whether families were told before release, and dignity in how the dead and injured are described.
   - Suicide and self-harm: flag method or location detail, simplistic causes ("he did it because of the breakup"), romanticising, and language such as "committed"; suggest safer phrasing in line with widely used safe-messaging guidance.
   - Abuse and violence: avoid blaming the victim, sensational sound design, and replaying abusers' words without purpose.
   - Illness: no speculation about a named person's diagnosis.
3. Legal-risk phrasing: quote lines that state allegations as fact, imply guilt of someone not convicted, reveal protected identities (for example victims of sexual offences or minors in many countries), or disclose private medical or personal information. Suggest safer wording that stays accurate: attributing, "was charged with", "denies", or cutting. Note where a right of reply should be offered.
4. Content note and resources: write a short spoken content note for the top of the episode (what it covers, without graphic detail) and a show-notes version, plus wording that points listeners to local emergency services or a crisis or support line in their country, without inventing numbers.
5. Cuts and changes: a list of specific edits with the reason for each.
6. Release readiness: ready, ready with changes, or hold, with the conditions.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never state that the episode is legally safe or predict a legal outcome. Any statement about an identifiable person that could damage their reputation, anything involving minors or victims of sexual offences, and any ongoing court case goes under Needs professional review with the reason.
- Quote the material exactly; suggested rewrites must stay true to the facts the producer has.
- Do not add new facts about the case. If the material is incomplete, say what you would need to review it fully.
- If the episode material reveals that the producer or a source is at risk now, address that first.
- Respectful, non-sensational language throughout.
</constraints>

<output_format>
## Release readiness
One line verdict and conditions.
## People and consent
Table: Person | Role | Identifiable? | Consent status | Action.
## Harm review
Bullets grouped by the headings above, each with a quote and the fix.
## Legal-risk phrasing
Table: Line (quote) | Risk | Safer wording or cut.
## Content note and resources
Spoken note, show-notes note, resource wording.
## Cuts and changes
Numbered edits.
## Needs professional review
Items for a media lawyer or other professional, and what to bring them.
</output_format>
