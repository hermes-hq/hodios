---
schema: 1
id: appeal-benefits-decision
kind: prompt
title: Appeal a benefits decision
description: Drafts an appeal or request for reconsideration of a government benefits decision by matching each stated reason to evidence, with the deadlines to confirm and free help to contact.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [discover, build]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [welfare-benefits, mandatory-reconsideration, disability-benefits, appeals]
pairs_with:
  prompts: [explain-legal-letter, prepare-government-form, appeal-insurance-denial]
  personas: [legal-information-guide]
args:
  - name: decision_letter
    description: The full decision letter - the benefit, the decision, the reasons given, any points or scores, the date, and the section on how to challenge it and by when. Remove your national insurance, social security or case number if you prefer.
    type: text
    required: true
  - name: evidence
    description: What you have or could get to show the decision is wrong - medical letters, care or support records, payslips, tenancy or caring evidence, diaries of daily difficulties, letters from people who know you - and what you think the decision got wrong. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The decision in plain words, Deadline, Reason-by-reason response, Evidence to gather, Appeal letter, Free help, What happens next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people challenge government benefit decisions, the way a welfare rights adviser at an advice charity does. Many decisions that are challenged with good evidence are changed, and many people never challenge because the letter is confusing or the deadline passes. Successful challenges answer the decision's own reasons one by one with specific evidence about the person's real circumstances (what happens on a bad day, how long things take, what help is needed), rather than repeating that the decision is unfair. Most systems require an internal review or reconsideration before an independent appeal, with strict time limits; the letter usually explains this, and you read it carefully rather than assuming.
</context>

<task>
Decision letter:

<decision>
{{decision_letter}}
</decision>
{{#evidence}}

The person's evidence and view:
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Explain the decision in plain words: which benefit, what was decided (refused, reduced, stopped, overpayment claimed, sanction), from when, and the money effect if stated.
2. Find the challenge route and deadline in the letter: reconsideration, review, appeal or complaint; who to send it to; how; and the time limit. Quote it. If the letter does not state one, say so and that the person should ask the benefits office that day. If the deadline may already have passed, say that late challenges are sometimes accepted with good reasons and to contact the office or an adviser urgently.
3. List every reason or finding the decision relies on (each descriptor, score, missed appointment, income figure, residence point). For each, note what the decision says, what the person says is wrong, the evidence that supports their account, and the gap if evidence is missing.
4. List evidence to gather, most useful first, and how to ask for it (for example a letter from a GP or support worker that addresses the specific activity, not just the diagnosis). Suggest asking for a copy of the evidence the decision maker used, if the system allows it.
5. Draft the challenge letter:
   - Heading with the benefit, decision date and reference [BRACKETS].
   - A clear request: reconsider or review the decision dated [date] and change it to [outcome].
   - Reason-by-reason paragraphs that quote the finding and answer it with specific facts and evidence, in the person's own experience.
   - A list of enclosed evidence and anything to follow, with a request for more time if evidence is pending.
   - A request for a copy of the evidence relied on, and for adjustments if the person needs them.
6. List free help to look for: welfare rights advisers, advice charities, disability or carers' organisations, law centres, legal aid, or an elected representative's office, phrased as types to search for locally.
7. Explain briefly what usually happens next and how an independent appeal typically follows if the review does not change the decision, marked as to confirm for the person's system.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts and evidence the person gives. Never invent symptoms, needs, income, dates or reference numbers, and never exaggerate. Use [BRACKETS] for gaps.
- Do not predict the outcome or cite benefit rules, scores or regulations that are not in the letter.
- If the person seems in financial crisis (no money for food, heating or rent), mention emergency support to ask about (hardship payments, food banks, local welfare assistance) before the rest.
- If anything suggests a risk to the person's safety or health, put emergency help first.
- Keep the letter clear, factual and respectful; decision makers respond to specifics, not anger.
{{> output/uncertainty}}
</constraints>

<output_format>
## The decision in plain words
Three to five lines.

## Deadline
The challenge route, where to send it and the time limit, quoted and in bold.

## Reason-by-reason response
Table: decision's reason (quoted) | what is wrong, in the person's words | evidence held | evidence still needed.

## Evidence to gather
Numbered, with who to ask and what the evidence should address.

## Appeal letter
Ready to send after filling [BRACKETS].

## Free help
Bullets of types of help to look up locally.

## What happens next
Three to five bullets, marked to confirm.
</output_format>
