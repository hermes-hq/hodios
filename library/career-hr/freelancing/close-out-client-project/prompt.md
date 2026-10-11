---
schema: 1
id: close-out-client-project
kind: prompt
title: Close out a client project
description: Closes a finished freelance project properly - sign-off request, final files and handover notes, final invoice, access cleanup, a feedback ask and a follow-up date for future work.
category: freelancing
version: 1.0.0
status: incubating
stage: [ship]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, notes]
output: [checklist, message, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [project-handover, sign-off, final-invoice, client-feedback, repeat-business]
pairs_with:
  prompts: [request-customer-testimonials, pitch-retainer-to-client, write-invoice]
args:
  - name: project
    description: What the project was, what was agreed (scope, deliverables, number of revision rounds), what was delivered, anything still open, how payment stands, and which accounts or tools you have access to.
    type: text
    required: true
  - name: relationship_goal
    description: What you want next from this client, for example "ongoing retainer", "referrals", "nothing, one-off".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Close-out checklist, Sign-off message, Handover notes, Feedback and next steps, Follow-up plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer finish a project so it actually ends. Projects that drift without a formal close cause the usual problems: endless "one more small change" requests after delivery, final invoices sent weeks late, the freelancer still holding admin access to a client's systems, and no testimonial or next project because nobody asked while the client was happy. A good close-out names what was delivered against what was agreed, asks for written sign-off, hands over files and know-how so the client does not depend on you, invoices the same day, and sets one dated follow-up.

What the freelancer wants next: {{relationship_goal}}
</context>

<task>
<project>
{{project}}
</project>

1. Compare delivered against agreed. List anything open and decide with the freelancer whether it is in scope (finish it), out of scope (quote it separately) or dropped (note it in writing). If the scope is unclear from the notes, ask.
2. Build the close-out checklist: sign-off, final files in agreed formats, source files if the contract includes them, handover notes, final invoice, access to remove or transfer, subscriptions or accounts in the freelancer's name, backups and what the freelancer keeps for their records.
3. Write the sign-off message: what was delivered, a request to confirm the project is complete by a date, how later changes will be handled (quoted as new work), and the final invoice.
4. Draft handover notes the client can use without the freelancer: where things are, how to do the common tasks, known limits, and who to contact for what.
5. Write the feedback ask suited to the relationship goal: a short question set for a testimonial with permission to quote, and, if wanted, a light opening for future work or referrals.
6. Follow-up plan: one or two dated touchpoints (for example 30 and 90 days) with what to say.
</task>

<constraints>
- Never invent deliverables, figures or results. Use [X] for anything not given.
- Do not promise free post-launch support unless the freelancer says it was agreed; offer a paid support option instead.
- Respect what the contract says about source files and rights; if it is unclear, flag it rather than deciding.
- Keep client messages under 150 words each and free of jargon.
{{> output/uncertainty}}
</constraints>

<output_format>
## Close-out checklist
Checkboxes grouped by: deliver, admin, access, records.

## Sign-off message
Ready to send.

## Handover notes
Short sections the client can keep.

## Feedback and next steps
The feedback ask, plus any next-work line.

## Follow-up plan
Dated touchpoints with a one-line message each.
</output_format>
