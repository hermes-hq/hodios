---
schema: 1
id: write-participant-debriefing
kind: prompt
title: Write a participant debriefing
description: Writes a participant debriefing for a study that used deception, withheld its aim or covered sensitive topics, explaining the real purpose, the right to withdraw data and where to get support.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [copy, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [debriefing, research-ethics, deception, participant-wellbeing, irb]
pairs_with:
  prompts: [write-informed-consent-form, write-ethics-application, design-behavioral-experiment]
  personas: [research-methodologist]
args:
  - name: study
    description: What participants were told, what really happened (including any deception or withheld information), the topics covered, the setting (online, lab, interview) and the population.
    type: text
    required: true
  - name: format
    description: How the debrief is delivered.
    type: enum
    enum: [written-online, written-paper, verbal-script]
    default: written-online
output_contract:
  format: markdown
  sections: [Debrief, Placeholders to fill, Notes for the ethics committee]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A debrief is the ethical counterpart to deception or withheld aims: it tells participants what the study was really about, why it could not be said earlier, and gives them back control over their data. Professional ethics codes for psychology and social research expect a debrief as soon as possible after participation when deception was used, and a good debrief for sensitive topics also checks how the participant feels and gives specific support routes. Experts know the details that committees check: the explanation is plain and non-defensive, it does not make participants feel foolish for being deceived, it offers withdrawal of data with a clear deadline and method, it asks participants not to reveal the purpose to others who may take part, and it lists contacts for the researcher, the supervisor and the ethics committee. False feedback (for example a fake test score) must be explicitly corrected, since effects can persist after a quick debrief.
</context>

<task>
Write a {{format}} debrief for:
<study>
{{study}}
</study>

1. Thank the participant and say what the study is actually about in plain language at the population's reading level.
2. If deception or withheld information was used, state exactly what was not true or not said, why it was necessary, and, for false feedback, state clearly that the feedback was not real and not about them.
3. Explain what the researchers expect to learn and why it matters, without technical jargon.
4. Offer withdrawal of their data with how to do it, by when, and what happens after that point, using their participant code if one exists.
5. Ask them not to share the study's purpose with possible future participants, and say why.
6. For sensitive topics, include a short check on how they feel and specific support routes as placeholders for local services.
7. Give contacts for the researcher, supervisor and ethics committee as placeholders, and how to get the results.
8. For a verbal script, add prompts for checking understanding and responding to upset.
9. Add notes for the ethics committee on how the debrief addresses the deception or sensitivity.
</task>

<constraints>
- Do not invent phone numbers, helplines, emails, committee names or reference numbers; use clearly marked placeholders.
- No defensive or minimising language about the deception; be honest and respectful.
- Do not promise withdrawal after anonymisation or publication if it will not be possible.
- If the deception described seems likely to cause harm that a debrief cannot undo, say so and suggest the ethics committee review it.
</constraints>

<output_format>
## Debrief
The full debrief text or script, with plain headings.
## Placeholders to fill
A list of every placeholder.
## Notes for the ethics committee
Bullets.
</output_format>
