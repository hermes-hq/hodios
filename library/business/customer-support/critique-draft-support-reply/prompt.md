---
schema: 1
id: critique-draft-support-reply
kind: prompt
title: Critique a draft support reply
description: Reviews a support reply before it is sent - accuracy against the facts, unanswered questions, tone, over-promising, missing next step - and returns marked issues and a tightened rewrite.
category: customer-support
version: 1.0.0
status: incubating
stage: [review]
role: [support-agent, founder, operations-manager]
requires: [none]
inputs: [message, text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reply-review, tone-check, over-promising, pre-send-check, coaching]
pairs_with:
  prompts: [write-support-reply, build-support-qa-scorecard]
  rules: [support-tone-rules, support-commitment-rules]
args:
  - name: draft
    description: The reply you or an agent wrote and want checked before sending.
    type: text
    required: true
  - name: customer_message
    description: The customer's message (and earlier thread if relevant) that the draft answers.
    type: text
    required: true
  - name: facts
    description: Optional. What is actually true about the case - order details, what was done, what policy allows, what the agent may offer. Without it, accuracy can only be flagged as unverified.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Issues, Rewrite, Questions before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review a support reply before it goes to a customer, the way an experienced team lead does a quick quality check. The costly mistakes in support replies are rarely grammar: they are a question the customer asked that the reply skipped, a promise the business cannot keep (a date, a refund, "this won't happen again"), a fact stated that is not in the record, a tone that sounds defensive or scripted, and no clear next step. Feedback is useful when each point quotes the draft, says why it matters for this customer, and gives the fix.
</context>

<task>
<customer_message>
{{customer_message}}
</customer_message>

<draft>
{{draft}}
</draft>

{{#facts}}
<facts>
{{facts}}
</facts>
{{/facts}}

1. List every question and request in the customer message. Mark each as answered, partly answered or missed in the draft.
2. Check every factual claim and commitment in the draft against the facts. Label each: supported, not supported by the facts given, or contradicted. With no facts given, label factual claims "unverified" and say what to check.
3. Check commitments: dates, amounts, refunds, credits, call-backs and guarantees ("never again", "first thing tomorrow"). Flag any that go beyond the facts or need approval.
4. Check tone against the customer's state: opening (specific acknowledgement, not a generic line), apologies (one at most, only where the business is at fault), blame (customer, colleague, supplier), jargon and internal terms, sarcasm or defensiveness, and length for the channel.
5. Check the close: one clear next step with who does what by when.
6. Check privacy: no other customer's data, internal notes, or more personal data than needed.
7. Rewrite the reply, fixing every issue while keeping the agent's voice and any correct content. Where a fact is missing, insert [CHECK: ...] rather than inventing it.
</task>

<constraints>
- Quote the draft for every issue. No vague feedback such as "make it warmer" without the line and a fix.
- Do not add offers, compensation or facts the agent did not have.
- Rank issues by harm: wrong facts and over-promises first, missed questions next, then tone, then polish. Report at most eight issues.
- If the draft is already good, say so and keep the rewrite minimal.
</constraints>

<output_format>
## Verdict
One of: send as is, send with small edits, rewrite before sending. Then one line on why.

## Issues
Table: # | quote from draft | problem | type (accuracy, commitment, missed question, tone, next step, privacy) | fix.

## Rewrite
The improved reply, ready to send.

## Questions before sending
Bullets: facts to confirm and approvals needed, or "None".
</output_format>
