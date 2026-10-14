---
schema: 1
id: respond-to-visa-refusal
kind: prompt
title: Respond to a visa refusal
description: Reads a visa or permit refusal decision, separates each refusal reason, finds the deadlines and the options it mentions, and plans the next step with the evidence each reason calls for.
category: immigration
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, student, job-seeker, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [explanation, table, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [visa-refusal, refusal-reasons, appeal-deadline, administrative-review, reapplication]
pairs_with:
  prompts: [prepare-visa-application, find-free-legal-help, vet-immigration-adviser, explain-legal-letter]
args:
  - name: decision_text
    description: The refusal letter or notice, pasted in full in the original language, with reference and passport numbers removed.
    type: text
    required: true
  - name: country
    description: The country that refused, and the visa or permit applied for.
    type: string
    required: true
  - name: background
    description: What you submitted, anything the officer seems to have missed, whether you are inside the country now and when your current permission ends, and any earlier refusals. Optional but important.
    type: text
output_contract:
  format: markdown
  sections: [Urgent dates, What the decision says, Reason by reason, Your options, Recommended next step, What to bring to an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A refusal letter is a map of what to fix. Officers refuse on specific grounds, often citing a rule, and each ground calls for a different response: missing or insufficient evidence (fixable with better documents), a requirement not met at the date of application (fixable only by reapplying once it is met), a credibility or genuineness finding (harder, needs careful explanation and evidence), or a finding of deception or a ban (serious, needs a lawyer). The options the letter mentions, such as an appeal, an administrative review, a reconsideration request, or simply reapplying, have strict deadlines, sometimes as short as days, and choosing the wrong one can waste the window. If the person is inside the country, their right to stay may end or continue depending on the route chosen. Every past refusal must be declared on future applications.

Country and application: {{country}}

<decision_text>
{{decision_text}}
</decision_text>
{{#background}}
<background>
{{background}}
</background>
{{/background}}
</context>

<task>
1. Urgent dates: list every deadline or date in the letter (to appeal or request review, to leave, until current permission ends) and say which is soonest. If a deadline is close or has passed, or the person must leave the country, say first that they should contact a lawyer, regulated adviser or free legal service today.
2. What the decision says: plain-language summary, with a working translation if not in English (informal; the original counts).
3. Reason by reason: quote each ground, say what it usually means, classify it (evidence gap, requirement not met, credibility, deception or ban, procedural), and list the evidence or facts that would address it. Note anything the user says the officer missed.
4. Your options: only those the letter mentions or that commonly exist for this kind of decision, marked to confirm: appeal, administrative review or reconsideration, judicial challenge, new application. For each, what it can fix, the deadline, the usual cost and time as "to confirm", and the effect on the right to stay.
5. Recommended next step: given the reasons, which option looks worth discussing first with an adviser and why, without predicting success.
6. What to bring to an adviser: the documents and a one-paragraph case summary they can read in two minutes.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never predict whether an appeal, review or new application will succeed.
- Never state a deadline as certain; quote it from the letter and say to confirm it, and that missing it can end the option.
- If the refusal mentions deception, false documents, a ban or removal, stop analysing tactics and urge a lawyer immediately.
- Do not suggest hiding the refusal on future applications.
- Keep personal identifiers out.
{{> output/uncertainty}}
</constraints>

<output_format>
## Urgent dates
Table: Date | What it is | Days left (if today's date is known).
## What the decision says
## Reason by reason
Table: Quoted reason | Usually means | Type | Evidence that would address it.
## Your options
Table: Option | Can fix | Deadline | Effect on stay | Confirm with.
## Recommended next step
## What to bring to an adviser
</output_format>
