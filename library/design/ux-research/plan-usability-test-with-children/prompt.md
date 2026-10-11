---
schema: 1
id: plan-usability-test-with-children
kind: prompt
title: Plan a usability test with children
description: Plans usability sessions with children for a product they use, with parental consent and child assent, age-fitting tasks and methods, session length, safeguarding and how to read their feedback.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-with-children, assent, safeguarding, kids-products, age-appropriate-design]
pairs_with:
  prompts: [write-usability-test-plan, set-research-data-handling-rules, plan-inclusive-usability-study]
  personas: [ux-researcher]
args:
  - name: product
    description: The product or prototype, what children do with it, and the flows to test.
    type: text
    required: true
  - name: ages
    description: The age range of the children who use it.
    type: string
    required: true
  - name: setting
    description: Where sessions would happen (home, school, lab, remote), country, and any organisational ethics or safeguarding policy. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approvals and consent, Safeguarding, Session design by age, Tasks and activities, Moderator script, Reading the results, Data handling]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Children are not small adults in a test lab. Younger children struggle to think aloud, want to please the adult, say they like everything, and tire fast; teenagers may perform for peers or for a parent in the room. Methods that work include short sessions, observing play rather than asking opinions, pairs of friends talking to each other, smileyometer-style scales read with caution, and asking them to teach a toy or puppet. Parents or guardians consent, children give their own assent and can stop at any time, and safeguarding rules (never alone with a child, appropriate adults, how to respond to a disclosure) come from the organisation's policy and local law.
</context>

<task>
<product>
{{product}}
</product>

Ages: {{ages}}
{{#setting}}

<setting>
{{setting}}
</setting>
{{/setting}}

1. Approvals and consent: ethics or safeguarding review the organisation requires, parental consent covering recording and data use, child assent in age-appropriate language, and how a child says stop.
2. Safeguarding: two adults or a parent present, no one-to-one unobserved contact, checks required for researchers per local rules, handling distress or a disclosure (follow the organisation's policy and designated lead).
3. Session design by age band: length, format (solo, pairs, with parent), number of tasks, breaks, rewards that do not bias.
4. Tasks and activities: tasks framed as play or missions, observation-heavy, with simple questions; avoid yes/no "do you like it".
5. Moderator script: warm-up, assent check, tasks, closing, thanks, in child-friendly wording.
6. Reading the results: weigh behaviour over stated liking, account for parent influence, and treat rating scales cautiously.
7. Data handling: minimal personal data, recordings restricted, retention, no use of children's images outside the agreed scope.
</task>

<constraints>
- Do not state legal requirements as fact for a country; say which approvals and checks to confirm and with whom.
- Never design sessions where a researcher is alone and unobserved with a child.
- Assent is ongoing: any sign the child wants to stop ends that activity.
</constraints>

<output_format>
## Approvals and consent
## Safeguarding
## Session design by age
| Age band | Length | Format | Tasks | Notes |
## Tasks and activities
## Moderator script
## Reading the results
## Data handling
</output_format>
