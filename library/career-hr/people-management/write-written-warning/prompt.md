---
schema: 1
id: write-written-warning
kind: prompt
title: Write a formal written warning
description: Drafts a formal written warning stating the issue, prior conversations, expectations, support, appeal rights and consequences, in line with your policy. Use after a disciplinary meeting.
category: people-management
version: 1.0.0
status: incubating
stage: [build]
role: [manager, recruiter, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document, text]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [disciplinary, written-warning, misconduct, conduct-policy, record-keeping]
pairs_with:
  prompts: [conduct-workplace-investigation, write-performance-improvement-plan, address-underperformance-early]
  personas: [hr-business-partner]
args:
  - name: issue
    description: The conduct or performance issue, with dates, specific incidents and their impact, and the findings of any investigation or disciplinary meeting.
    type: text
    required: true
  - name: prior_steps
    description: What has already happened - informal conversations, earlier warnings and their dates, the disciplinary meeting (date, who attended, whether the employee was accompanied) and what the employee said.
    type: text
    required: true
  - name: policy
    description: The relevant disciplinary policy - warning levels, how long a warning stays live, appeal process and deadlines, required wording. Optional but strongly recommended.
    type: text
  - name: country
    description: Country (and state or region) of employment, since disciplinary process rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Process check, Warning letter, Delivery notes, Questions for HR or counsel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers write formal written warnings that are clear, fair and consistent with the employer's policy. A written warning is usually one step in a staged process, issued after the employee has heard the specific concerns and had a chance to respond, often at a disciplinary meeting. A good letter states the specific issue with dates, records what happened before, sets out the expected standard and the improvement needed, describes support, explains how long the warning stays on file and what happens if the issue recurs, and gives the right of appeal. Letters cause problems when they are issued without a fair hearing, introduce new allegations, use emotional or character-based language, set expectations the employee never knew about, or skip the appeal right.

<issue>
{{issue}}
</issue>

<prior_steps>
{{prior_steps}}
</prior_steps>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
Country: {{country}}
</context>

<task>
1. Process check: before drafting, assess and report whether the employee was told the specific allegations in advance; whether there was a meeting where they could respond, and whether they could be accompanied where policy or law allows; whether an investigation was proportionate to the issue; whether the sanction matches the policy's level for this issue and how similar cases were treated; whether any earlier warnings referenced are still live; and whether anything suggests health, disability, pregnancy, a recent complaint or grievance, protected leave or other sensitive context. If a serious gap exists (no notice of the allegations, no chance to respond, or a sanction above the policy's level), put it first, say the letter should not be issued until the gap is fixed, and give the steps to fix it. In that case, give the letter only as a template headed "Draft - do not issue until the process gaps above are closed".
2. Warning letter: draft it with
   - a header (private and confidential, date, employee and role placeholders) and the level of warning per policy;
   - a reference to the disciplinary meeting (date, attendees, whether accompanied) and a fair summary of the employee's response;
   - the specific issue with dates and impact, limited to what was put to the employee;
   - the expected standard and the specific improvement required, by when;
   - the support offered;
   - how long the warning stays live on the record, per policy, and the review date;
   - the possible consequence of further issues, stated neutrally per policy (for example, a further stage of the disciplinary process, which may include a final warning or dismissal);
   - the right of appeal, how to appeal, to whom, and the deadline;
   - a signature block and an acknowledgment line that confirms receipt, not agreement.
3. Delivery notes: how and when to deliver the letter (usually confirming an outcome already communicated in person), what to say, how to handle disagreement, where the record is kept and who can see it, and follow-up check-ins.
4. Questions for HR or counsel: the specific points to confirm for this case in {{country}}.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for review by HR or employment counsel. Do not state legal requirements for {{country}} as fact.
- Use only facts in the input. Never add incidents, dates or prior warnings; mark gaps as [X] with a question.
- Do not include allegations the employee has not had the chance to respond to.
- Neutral, factual tone: describe behaviour and impact, not character. No sarcasm, threats or moralising.
- Do not mention health, pregnancy, family, age or other protected characteristics in the letter. If the input raises them, address them only in the process check.
</constraints>

<output_format>
## Process check
Table: Check | Status | Action needed. Serious gaps first.
## Warning letter
The full letter with [placeholders].
## Delivery notes
## Questions for HR or counsel
</output_format>
