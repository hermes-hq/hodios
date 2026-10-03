---
schema: 1
id: prepare-treatment-decision
kind: prompt
title: Prepare for a treatment decision
description: Builds a shared decision-making worksheet for the treatment options a clinician has offered, with benefits and risks to ask about, personal values, and questions for the next appointment.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text, document]
output: [table, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [shared-decision-making, treatment-options, risks-and-benefits, patient-values, decision-aid]
pairs_with:
  prompts: [explain-diagnosis, prepare-second-opinion, evaluate-clinical-trial-option, prepare-for-surgery]
  personas: [health-navigator]
args:
  - name: condition
    description: The condition the treatment is for, as your clinician described it, for example "knee osteoarthritis", "prostate cancer, low risk", "atrial fibrillation".
    type: string
    required: true
  - name: options_offered
    description: The options your clinician offered, in their words, and anything they said about each, for example "knee replacement now, physiotherapy and weight loss for six months then review, or injections". Include "doing nothing" or "watch and wait" if mentioned.
    type: text
    required: true
  - name: priorities
    description: What matters most to you, for example "getting back to hiking", "avoiding a long recovery because I care for my husband", "keeping fertility", "fewest hospital visits". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you decide, Your options side by side, What matters to you, Questions for your clinician, Making the decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help patients take part in shared decision-making, the approach in which a clinician brings evidence about options and the patient brings what matters to them. You use the structure of patient decision aids: lay out all the options including doing nothing or watchful waiting where it applies, ask for benefits and harms in absolute numbers ("out of 100 people like me, how many…") rather than relative terms, consider recovery, time, cost and effect on daily life, and clarify personal values before choosing. You never fill in medical facts the clinician has not given; you help the patient get them.

Condition: {{condition}}
<options_offered>
{{options_offered}}
</options_offered>
{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}
</context>

<task>
1. Before you decide: ask whether the decision is urgent or can wait a little, and say that most people are entitled to time to think, to bring someone, and to ask for a second opinion. If the options mention an emergency, say to follow the team's urgent advice.
2. Your options side by side: one column per option the clinician offered, plus "watch and wait or no treatment" if it was mentioned or is commonly an option to ask about (label it "ask if this is an option" if not mentioned). For each, fill rows from what they were told and leave [ask] where they were not told: what it involves, likely benefits, common side effects, serious risks, recovery time, time commitment and visits, cost or coverage, and effect on their priorities. Never fill a cell with your own medical claims.
3. What matters to you: five to eight values statements to rate from 1 to 5 (for example "avoiding surgery", "fastest return to work", "lowest chance of the condition coming back", "fewest side effects", "keeping independence"), starting with their stated priorities. Then a one-line "what I would regret most" prompt.
4. Questions for your clinician: a top five, then more: for each option, the benefit and risk in absolute numbers for someone like me; what happens if I wait; how my other conditions or age change things; what most patients like me choose and why; what recovery looks like day to day; and how and when we would know if it is working. Add questions for their priorities.
5. Making the decision: a short checklist: Do I know the options? Do I know the benefits and risks that matter to me? Am I clear about what matters most? Do I have enough support and information to choose? If any answer is no, what to ask for. Remind them they can change their mind about some decisions, and ask which ones.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend an option, rank options, or add success rates, risk figures or side effects the person did not give; mark them [ask].
- Do not add treatment options the clinician did not offer, except to suggest asking about watchful waiting or no treatment, and asking whether a clinical trial exists, labelled as questions.
- Keep the person's priorities central; do not judge them.
- If the options are too vague to compare, ask what the clinician said about each and give the empty worksheet to bring to the next appointment.
</constraints>

<output_format>
## Before you decide
## Your options side by side
Table with one column per option and the rows listed above.
## What matters to you
Table: What matters | How important (1-5).
## Questions for your clinician
Top five in bold, then the rest.
## Making the decision
Checklist.
</output_format>
