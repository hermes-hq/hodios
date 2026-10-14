---
schema: 1
id: present-usability-findings
kind: prompt
title: Present usability findings
description: Prepares a usability test readout for a team meeting with a storyline, severity-framed findings, clip selection, recommendations and prepared answers to pushback like "it was only five users".
category: ux-research
version: 1.0.0
status: incubating
stage: [review]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [notes, document, text]
output: [outline, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [research-readout, findings-presentation, video-clips, objection-handling, stakeholder-communication]
pairs_with:
  prompts: [synthesize-usability-findings, write-discovery-readout, brief-usability-test-observers]
  personas: [ux-researcher]
args:
  - name: findings
    description: The synthesised findings with severity and frequency, task results, and notable quotes or clip moments.
    type: text
    required: true
  - name: audience
    description: Who will be in the room, what they care about, how long you have, and any expected resistance.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Storyline, Slide outline, Clip plan, Recommendations, Answers to pushback, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Usability readouts often fail after good research. Presenters walk through method first and findings in task order, so the most serious problem lands in minute 25; they show every issue with equal weight; they play long clips or none; and they are caught off guard by the same few objections. A readout that leads to action opens with the two or three problems that block the most important tasks, frames each by impact on users and the business, shows a short clip (15 to 45 seconds) of more than one participant hitting it so nobody can dismiss it as one person, separates what was seen from what is recommended, and gives the team a decision to make in the meeting. The common objections have honest answers: small qualitative samples are designed to find problems, not measure their frequency, and a problem seen in several of five people is unlikely to be rare; participants were screened to match the target users; and "they would learn it" is testable, but first-use failures cost signups.
</context>

<task>
<findings>
{{findings}}
</findings>

<audience>
{{audience}}
</audience>

1. Storyline: the one-sentence headline and the 3 to 5 key messages in order of impact, tailored to what this audience cares about.
2. Slide outline fitted to the time: headline and decision needed, top findings each with evidence, task summary, lower-severity findings grouped, what worked well, recommendations, method and participants as a short slide near the end.
3. Clip plan: which moments to show for each top finding, ideally from different participants, target length, and what to say before and after each clip; consent check for showing recordings.
4. Recommendations: for each top finding, a direction (not a full design), its owner and the decision required, clearly separate from the evidence.
5. Answers to pushback: honest, short responses to likely objections (sample size, "they are not our real users", "they would learn it", "we already knew", "that is a one-off"), including where the objection has a point.
6. After the meeting: how to record decisions, owners and dates, and where the findings and clips live.
</task>

<constraints>
- Use only findings, numbers and quotes from the input; do not invent clips, quotes or severity.
- Never overstate small-sample counts as percentages of all users.
- Do not hide problems that the audience may not want to hear; order by severity, not comfort.
- Only show clips participants consented to share with this audience.
</constraints>

<output_format>
## Storyline
## Slide outline
| # | Slide | Key point | Evidence |
## Clip plan
| Finding | Clip moment | Participant | Length |
## Recommendations
## Answers to pushback
| Objection | Answer |
## After the meeting
</output_format>
