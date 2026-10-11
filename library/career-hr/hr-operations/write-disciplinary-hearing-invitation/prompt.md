---
schema: 1
id: write-disciplinary-hearing-invitation
kind: prompt
title: Write a disciplinary hearing invitation
description: Writes the invitation for an employee to a disciplinary hearing - specific allegations, evidence enclosed, possible outcomes, the right to be accompanied and how to prepare, plus a pre-send check.
category: hr-operations
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document, text]
output: [message, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [disciplinary-hearing, misconduct, fair-process, right-to-be-accompanied, hr-letter]
pairs_with:
  prompts: [conduct-workplace-investigation, write-written-warning, write-grievance-outcome-letter]
  personas: [hr-business-partner]
args:
  - name: case
    description: The allegations as found by the investigation, with dates and specifics, the evidence gathered, and whether the employee is suspended (role, not name).
    type: text
    required: true
  - name: arrangements
    description: Proposed hearing date, time, place or video link, who will chair and who takes notes, and any adjustments the employee has asked for.
    type: text
    required: true
  - name: policy
    description: The disciplinary policy's rules on notice, companions, possible sanctions, and the country or state. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Pre-send check, Letter, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write disciplinary hearing invitations the way an experienced employee relations adviser does. The invitation is where many disciplinary processes become unfair: allegations too vague for the employee to answer ("poor attitude"), evidence not shared in advance, too little notice to prepare, no mention that dismissal is a possible outcome when it is, or a tone that suggests the decision is already made. A fair letter states each allegation specifically (what, when, where), encloses the evidence to be relied on, says what outcomes are possible under the policy, explains the right to be accompanied where it exists, and invites the employee to bring their own evidence or witnesses. Local rules on notice, companions and representation differ, and some workers are covered by collective agreements.

<case>
{{case}}
</case>

<arrangements>
{{arrangements}}
</arrangements>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
</context>

<task>
1. Pre-send check: is each allegation specific enough to answer; is there an investigation behind it; is the chair independent of the investigation where the company's size allows; is the evidence ready to enclose; is the notice period reasonable and in line with the policy; are possible outcomes stated, including dismissal if it is a possibility; are requested adjustments addressed. List gaps.
2. Letter: neutral heading and opening; the purpose of the hearing; each allegation numbered with specifics; the evidence enclosed, listed; possible outcomes under the policy; date, time, place, chair and note-taker; the right to be accompanied and by whom, as the policy and law allow; how to submit their own evidence or ask for witnesses; how to request a change of date or adjustments; suspension status if relevant and that it is not a sanction; a contact for questions and support.
3. Questions for an employment lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not write any wording that suggests guilt or a decided outcome.
- Use only allegations and evidence in the input; mark gaps [DETAILS NEEDED] instead of inventing.
- Do not state statutory notice or companion rights as fact; follow the policy or mark "confirm locally".
- Use the role, not the person's name.
{{> output/uncertainty}}
</constraints>

<output_format>
## Pre-send check
Checklist with gaps.
## Letter
Full letter with placeholders in square brackets.
## Questions for an employment lawyer
Numbered.
</output_format>
