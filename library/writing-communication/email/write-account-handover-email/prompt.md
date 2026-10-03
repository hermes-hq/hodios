---
schema: 1
id: write-account-handover-email
kind: prompt
title: Write an account handover email
description: Introduces a new account owner to a client when responsibility changes, covering continuity, what stays the same, open items and a meeting offer. Use for account managers and freelancers.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, sales-rep, support-agent, manager]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [account-handover, client-transition, account-management, continuity, warm-handoff]
pairs_with:
  prompts: [write-handover-document, write-farewell-message, write-introduction-email]
args:
  - name: client
    description: The client and your main contact there, with anything relevant about the relationship, for example "Lena Fischer, Head of Marketing at Brightway, 3-year client, values fast turnaround".
    type: string
    required: true
  - name: outgoing_owner
    description: Who is handing over, and until when they stay reachable.
    type: string
    required: true
  - name: incoming_owner
    description: Who takes over, with their role, relevant experience and contact details as you want them stated.
    type: string
    required: true
  - name: open_items
    description: Work in progress, upcoming deadlines, pending decisions or issues, with status and dates.
    type: text
  - name: reason
    description: Why ownership is changing, as much as you are willing to share, for example "I'm moving to the new Berlin office" or "restructure of account teams". Private or sensitive reasons stay out of the email.
    type: text
output_contract:
  format: markdown
  sections: [Handover email, Incoming owner follow-up, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an account owner changes, the client's first worry is not the person but the risk: will deadlines slip, will they have to explain everything again, will pricing or service change. Clients churn after handovers that arrive as a surprise, from someone they have never heard of, with no date and no word about open work. The handovers that keep clients come from the outgoing owner as a warm introduction, say when the change happens and how long the outgoing owner overlaps, name what stays the same, show the incoming owner already knows the open items, and offer a short joint call. A separate first note from the incoming owner then starts the new relationship.
</context>

<task>
Write an account handover email for {{client}}, from {{outgoing_owner}} introducing {{incoming_owner}}.

{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}
{{#open_items}}
<open_items>
{{open_items}}
</open_items>
{{/open_items}}

1. If it is unclear who takes over, ask and stop. Missing dates or details become placeholders.
2. Write the handover email from the outgoing owner, with the incoming owner in copy:
   - Subject: "[Client/project]: introducing [incoming owner] as your new account lead".
   - First two sentences: the change, the effective date (or `[need: effective date]`), and that the outgoing owner remains reachable until a stated date if given.
   - Reason in one neutral sentence if it is shareable (a move, a promotion, a team change). Leave out anything sensitive such as a performance issue, a dispute, health or a departure the company has not announced, and say so under Notes.
   - Why the incoming owner is a good fit, using only the experience given. If none is given, leave `[need: one line on relevant experience]` rather than inventing praise.
   - What stays the same: contract, pricing, team, service levels, tools and contact routes, only as stated or as placeholders to confirm.
   - Open items as a short list with status and dates, showing the incoming owner has been briefed.
   - A joint call offer with two or three slot placeholders or proposed times, 20 to 30 minutes.
   - Sincere thanks to the client for the relationship in one or two lines, specific to it if the input allows.
3. Write a short first note from the incoming owner to send after the introduction: thanks, one line on what they will do first (review the open items, confirm the call), and their direct contact details.
4. Under Notes, list what to confirm internally before sending (pricing, notice, any commitments the outgoing owner made verbally) and whether to phone the client first if the relationship is long or sensitive.
</task>

<constraints>
- Handover email under about 200 words; incoming note under about 80 words.
- Use only facts given; never invent experience, dates, commitments, pricing or names. Use `[need: …]`.
- Do not promise that nothing will change if the input suggests changes; state what is known.
- Warm and confident, not apologetic. The tone says "you are in good hands", supported by facts, not adjectives.
- Never disclose internal reasons the client does not need, and never criticise the outgoing or incoming owner.
</constraints>

<output_format>
## Handover email
Subject line, To/Cc line, then the body.
## Incoming owner follow-up
Subject line, then the body.
## Notes
Placeholders, internal checks, and whether to call first. "None" if nothing.
</output_format>
