---
schema: 1
id: plan-advance-care-planning-conversation
kind: prompt
title: Plan an advance care planning conversation
description: Prepares a nurse or doctor to lead an advance care planning conversation with a patient and family, with openers, questions about values, recording wishes and handling disagreement.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [healthcare, medicine]
requires: [none]
inputs: [notes, text]
output: [plan, script, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [advance-care-planning, serious-illness-conversations, palliative-care, goals-of-care, shared-decision-making, end-of-life]
pairs_with:
  prompts: [plan-breaking-bad-news, prepare-advance-care-plan-questions, rehearse-conversation-with-relatives]
args:
  - name: patient_context
    description: Only the facts that shape the conversation - condition and stage in general terms, recent changes or admissions, what the patient already knows and has said, who they want involved, communication needs (language, hearing, cognition) and any existing plans or documents. De-identified.
    type: text
    required: true
  - name: setting
    description: Where and how the conversation will happen, for example "GP home visit, 30 minutes", "oncology clinic with daughter present", "care home review with the resident and her son".
    type: string
    required: true
  - name: country
    description: The country, and the state or region if it matters, so the plan names the right kinds of documents and decision-maker roles to check.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you start, Conversation guide, Phrases for hard moments, Recording the conversation, After the conversation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help clinicians prepare advance care planning conversations: voluntary discussions in which a person thinks about what matters most to them, how they would want to be cared for if they became more unwell, and who should speak for them if they cannot. Research on serious illness conversations shows that patients value them, that they are usually started too late, and that the best ones ask about values and fears before asking about treatments, and use the person's own words in the record. Advance care planning is a process over several conversations, not a form to complete in one visit, and it is distinct from clinical decisions such as resuscitation orders, which the clinical team makes with the person.

<patient_context>
{{patient_context}}
</patient_context>
Setting: {{setting}}
Country: {{country}}
</context>

<task>
1. Before you start: readiness and timing (signs the person is ready, and that it is fine to plant a seed and return later), who they want present, interpreter or communication aids, enough uninterrupted time, what the clinician should check in the record beforehand, and a note that capacity is assumed unless there is reason to assess it under local law.
2. Conversation guide, in stages, with two or three example phrasings for each that fit this patient and setting:
   - Set up: ask permission and explain why now, without implying anything the context does not support.
   - Understanding: what the person knows about their illness and how much information they want.
   - Sharing information: a reminder to give a short, honest summary in the clinician's own words, with a pause, checking understanding; you do not supply prognosis.
   - What matters: goals, fears and worries, sources of strength, abilities so important they cannot imagine living without them, and trade-offs they would or would not accept.
   - Family: how much family know, and who the person wants to make decisions if they cannot.
   - Preferences: preferred place of care, and wishes about future treatments framed around their values, leaving specific treatment decisions to the clinical team.
   - Close: summarise in the person's words, check it is right, agree what to record and share, and plan the next conversation.
3. Phrases for hard moments: the person does not want to talk about it; "how long have I got?"; hope and preparing together ("hope for the best, plan for the worst"); a family member speaks over the patient; family disagree with the patient's wishes; requests for treatments the team does not think will help; tears and silence.
4. Recording: what to write (who was present, what matters in the person's words, preferences, nominated decision-maker, documents discussed, who it will be shared with, review date), and the kinds of documents and roles that commonly exist in {{country}}, each marked "check the current local form and law".
5. After the conversation: who to share the plan with (with consent), when to revisit, and support for the clinician.
6. Before answering, check the plan never states a prognosis, a treatment decision or legal requirement as fact, and that every phrase invites rather than pressures.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give a prognosis, recommend or rule out treatments, or decide resuscitation status. Leave placeholders such as "[your summary of the illness]" where clinical content is needed.
- Advance care planning is voluntary. Never script pressure, deadlines or persuasion toward any choice, including toward less treatment.
- Name document types for the country only as things to check, since names, legal status and witness rules differ and change. If you are unsure what exists in that country, say so and tell the clinician to check with their organisation's guidance.
- Keep the patient at the centre: family are asked what the patient would want, not what they want for the patient.
- Respect culture, faith and family decision-making styles; ask rather than assume, including how much the person wants to know.
- If the context suggests the patient is acutely unwell or dying now, say the urgent clinical decisions come first and adapt the plan to a shorter, focused conversation.
</constraints>

<output_format>
## Before you start
Checklist.
## Conversation guide
Stages as subheadings, each with purpose and example phrasings.
## Phrases for hard moments
Table: Moment | Try saying | Avoid.
## Recording the conversation
Bullets, then document types for the country marked "check locally".
## After the conversation
Bullets.
</output_format>
