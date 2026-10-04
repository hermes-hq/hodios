---
schema: 1
id: brief-frontline-staff-on-release
kind: prompt
title: Brief frontline staff on a release
description: Writes a one-off briefing for store, call centre, clinic or field staff on a product or service change - what changes, a one-line explanation, likely questions and what to do if it goes wrong.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, operations-manager, manager, support-agent]
requires: [none]
inputs: [text, notes, ticket]
output: [docs, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [staff-briefing, release-readiness, customer-questions, escalation-path, huddle]
pairs_with:
  prompts: [write-launch-faq, plan-internal-tool-rollout, plan-branch-by-branch-rollout]
args:
  - name: change_details
    description: What is changing, for which customers, from when, why, and anything known to go wrong. Paste real customer questions or support tickets from a pilot if you have them.
    type: text
    required: true
  - name: staff_roles
    description: Who will read it (shop assistants, call handlers, receptionists, engineers in the field), what they can and cannot do for customers, and who they escalate to.
    type: text
    required: true
  - name: format
    description: one-page = a printable sheet; huddle-script = a two to three minute spoken briefing for a shift start; faq = a question and answer sheet for quick lookup.
    type: enum
    enum: [one-page, huddle-script, faq]
    default: one-page
output_contract:
  format: markdown
  sections: [Briefing, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write release briefings for frontline staff: the people customers ask first when something changes. They read on a phone in a break, on a noticeboard, or hear it in a two-minute huddle at the start of a shift, and they need to answer customers confidently straight after. Briefings fail when they are written for head office (internal project names, the business rationale, long paragraphs), when they skip the awkward questions customers will actually ask, and when staff do not know what to do if something goes wrong. This is a one-off briefing for one release, not a recurring staff newsletter.

Format: {{format}}.
</context>

<task>
Change details:

<change_details>
{{change_details}}
</change_details>

Staff roles:

<staff_roles>
{{staff_roles}}
</staff_roles>

1. Write the change as before and after from the customer's side: what they will see, do or pay differently, and from when.
2. Write the one-sentence explanation staff can say to a customer, in plain words, honest about any downside.
3. List the questions customers are most likely to ask: start from any real questions or tickets given, then add the predictable ones (why, does it cost more, what about my existing booking, order or account, can I still do it the old way, who do I complain to). Give a short answer for each that staff can say aloud; mark any answer you could not find in the input as [confirm].
4. State what staff can and cannot do (refunds, exceptions, overrides), using only what the user gave.
5. Write "if something goes wrong": the likely failures, what to do, what to tell the customer, and who to contact, with the contact as given or [X].
6. Fit everything to the {{format}}:
   - one-page: fits on one printed side, headings and bullets, readable in two minutes.
   - huddle-script: spoken, about 300-400 words, short sentences, with a pause for questions and a quick check question at the end.
   - faq: eight to twelve questions, grouped, each answer under 40 words.
7. Test it: re-read every customer question from the input and confirm the briefing answers it; list any it does not.
</task>

<constraints>
- Plain language for a reading age of about 12; no internal project names, acronyms or business jargon.
- Never invent policies, prices, dates, refund rules or contacts. Missing ones become [X] or [confirm] and appear in Before you send.
- Be honest about downsides; staff lose trust in briefings that spin.
- Do not include staff or customer personal data.
- If the change or the staff roles are unclear, ask for the missing details and stop.
</constraints>

<output_format>
## Briefing
The briefing in the chosen format, starting with a title, the date it takes effect, and "What changes for customers".

## Before you send
- Every [X] or [confirm] to fill, with who can answer it.
- Customer questions from the input not yet answered.
- Suggested check: ask two staff members to read it and answer three customer questions from it.
</output_format>
