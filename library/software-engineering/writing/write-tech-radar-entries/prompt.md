---
schema: 1
id: write-tech-radar-entries
kind: prompt
title: Write tech radar entries
description: Writes tech radar blips for an engineering organisation from team notes and experience reports, each with a ring (adopt, trial, assess, hold), the evidence, where it fits, risks and an owner.
category: writing
version: 1.0.0
status: incubating
stage: [review, plan]
role: [architect, tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [notes, text]
output: [table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
tags: [tech-radar, technology-adoption, architecture-governance, experience-reports]
pairs_with:
  prompts: [write-technical-roadmap]
args:
  - name: technologies_and_notes
    description: The technologies, tools, platforms or techniques to place, with what teams have done with them - experience reports, incidents, costs, who uses them, and any proposed ring.
    type: text
    required: true
  - name: organisation_context
    description: The organisation's size, main stack, constraints (regulated, on-premises, small platform team) and the previous radar's ring for each item, if any.
    type: text
output_contract:
  format: markdown
  sections: [Radar summary, Blips, Contested placements, Missing evidence]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A tech radar tells engineers in an organisation what to use by default, what to experiment with, what to keep an eye on and what to stop starting with. It loses credibility when rings follow hype or one enthusiast rather than evidence from production use here, when "hold" reads as a ban without saying what to use instead, when entries are vague ("great for scale"), and when nobody owns an entry. The usual meaning of the rings: Adopt (proven here in production, the sensible default), Trial (used successfully in at least one real project here, worth pursuing where it fits, with care), Assess (worth exploring to understand its effect; not for production yet), Hold (do not start new work with it; existing use may continue or migrate).
</context>

<task>
<technologies_and_notes>
{{technologies_and_notes}}
</technologies_and_notes>
{{#organisation_context}}
<organisation_context>
{{organisation_context}}
</organisation_context>
{{/organisation_context}}

1. For each item, choose the quadrant (techniques, tools, platforms, languages and frameworks) and the ring based on evidence in the notes: production use here, number of teams, incidents, operating cost, support and hiring, licence and vendor risk. Hype and external popularity alone never justify Adopt or Trial.
2. Apply ring rules: Adopt needs production use here by more than one team, or one team plus a clear support model; Trial needs at least one real project here; Assess needs only a credible reason to look; Hold needs a stated reason and an alternative. When a proposed ring is not supported, place it lower and explain.
3. Write each blip at about 80 to 150 words: what it is in one sentence, the decision and why, where it fits and where it does not, the risks or costs, the alternative (for Hold: what to use instead and the migration expectation), and the owner or contact.
4. Mark movement from the previous radar (new, moved in, moved out, no change) and give the reason for every move.
5. List contested placements where the notes show disagreement, with both arguments and the evidence that would settle it.
6. List items that cannot be placed honestly yet and what evidence is missing.
</task>

<constraints>
- Use only experiences and facts from the notes; do not import other organisations' radar placements as evidence.
- Do not state licence terms, prices or vendor roadmaps as fact unless given; mark them "to check".
- Keep the language neutral and specific: no "best", "modern" or "legacy" without a reason.
- If no owner is given for an entry, write [OWNER] rather than inventing one.
</constraints>

<output_format>
## Radar summary
Table: name, quadrant, ring, movement, owner.
## Blips
One subsection per item with the ring in the heading and the blip text.
## Contested placements
Bullets, or "None".
## Missing evidence
Bullets, or "None".
</output_format>
