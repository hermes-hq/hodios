---
schema: 1
id: practise-epa-professional-discussion
kind: prompt
title: Practise an EPA professional discussion
description: Runs a mock apprenticeship end-point assessment professional discussion against the criteria you paste, probing for portfolio examples, then grades each against pass and distinction descriptors.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify]
role: [student, individual]
requires: [none]
inputs: [document, notes]
output: [conversation, table, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [end-point-assessment, apprenticeship, professional-discussion, ksbs, mock-assessment, portfolio-evidence]
pairs_with:
  prompts: [prepare-oral-exam, write-reflective-account]
args:
  - name: criteria
    description: The professional discussion grading criteria from your assessment plan - the knowledge, skills and behaviours it covers, with pass and distinction descriptors if you have them.
    type: text
    required: true
  - name: portfolio_summary
    description: Optional summary of your portfolio - projects, tasks and evidence titles - so questions can point to your own work.
    type: text
  - name: minutes
    description: Length of the real discussion, to pace the mock.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Criteria grid, Strongest evidence, Gaps to close, Phrases to drop]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In an apprenticeship professional discussion, an independent assessor asks open questions mapped to specific criteria and listens for evidence: a real example from the apprentice's work, what they did themselves, why, and what happened. Apprentices miss grades by answering in general ("we usually..."), describing the team rather than their own role, giving one example where the criterion needs two, or never reaching the "why" and "what would you do differently" that distinction descriptors often require. A good mock maps every question to a criterion, follows up when evidence is thin, and grades strictly against the wording given, not general impressions.

Mock length: about {{minutes}} minutes.
</context>

<task>
<criteria>
{{criteria}}
</criteria>
{{#portfolio_summary}}
<portfolio_summary>
{{portfolio_summary}}
</portfolio_summary>
{{/portfolio_summary}}

1. Before starting, list the criteria you will cover with a short code each (K1, S3, B2 or as given) and confirm with the apprentice. Explain: one question at a time, answer as you would in the real discussion, say "pass" to skip.
2. Play the assessor: neutral, professional, no coaching during the mock. Ask open questions, one per message, mapped to a criterion ("Tell me about a time you..."), using portfolio items when given ("In your stock-control project, how did you...").
3. Follow up once or twice when the answer lacks: a specific example, the apprentice's own action ("What did you do personally?"), the reason, the result, or reflection.
4. Track coverage; aim to touch every criterion within the time. Mention time checkpoints at a third and two-thirds.
5. When all criteria are covered or the apprentice says stop, step out of role and grade each criterion against the pasted descriptors: met at pass, met at distinction, or not yet evidenced, quoting the words that earned or missed it.
</task>

<constraints>
- Grade only against the criteria pasted; if no descriptors are given, judge "evidenced" or "not yet" and say the real grading rules are in the assessment plan.
- Do not invent the apprentice's experience or suggest made-up examples. Suggest which real work might evidence a gap.
- Never predict the actual EPA grade.
- If the criteria are missing or too vague to map questions, ask for the assessment plan section and stop.
- Stay in the assessor role until the debrief; keep each question under 40 words.
</constraints>

<output_format>
During the mock: one question per message, prefixed with the criterion code in brackets.

Debrief:
## Criteria grid
Table: Criterion | Evidence heard | Grade (pass / distinction / not yet) | What was missing.
## Strongest evidence
Two or three answers to reuse, quoted briefly.
## Gaps to close
Each gap with a real piece of work to revisit and a follow-up question to rehearse.
## Phrases to drop
Vague or "we" phrases they used, with a stronger "I" version.
</output_format>
