---
schema: 1
id: announce-role-change-to-contacts
kind: prompt
title: Tell your contacts about your new role or business
description: Writes the email telling clients and professional contacts about your new job, business or role, with what changes for them, who to contact now and how to reach you, without breaching obligations.
category: email
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, founder, consultant, sales-rep]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [career-announcement, new-business, client-transition, contact-update, non-solicitation]
pairs_with:
  prompts: [write-farewell-message, write-account-handover-email, write-professional-bio]
args:
  - name: change
    description: What is changing - new employer and role, starting your own business, moving to a new team, retiring from client work - and the date.
    type: text
    required: true
  - name: audience
    description: Who receives it (current clients, former clients, suppliers, wider network) and your relationship with them.
    type: string
    required: true
  - name: constraints
    description: Anything from your contract or employer about contacting clients (non-solicitation, notice period, garden leave), who now handles your old work, and your new contact details.
    type: text
output_contract:
  format: markdown
  sections: [Email, LinkedIn or short version, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A role-change announcement is read for one question: what does this mean for me? Clients want to know who handles their work now and whether anything is disrupted; network contacts want a short, clear update and a way to stay in touch. People who have done this well keep it short, lead with the change and the date, give the handover contact for existing work, and make the new contact details easy to save. The trap is legal: many employment and partnership contracts restrict soliciting clients or employees for a period after leaving, and an announcement to former clients from a new business can breach that even if worded as "just letting you know". Sending from the employer's systems or client lists you no longer have the right to use is a separate risk.
</context>

<task>
Write an announcement about this change for {{audience}}.

<change>
{{change}}
</change>
{{#constraints}}
<constraints_and_contacts>
{{constraints}}
</constraints_and_contacts>
{{/constraints}}

1. If the audience includes clients of a current or former employer and the input does not mention contract restrictions, add under "Check before sending" that the user should check their contract for non-solicitation or confidentiality clauses before sending, and write the email in a non-soliciting way.
2. Subject: the change in plain words, for example "News: I'm moving to [company] from 1 March".
3. First two sentences: the change and the date.
4. For existing clients: who handles their work from now on, with contact details, and a reassurance about continuity only if the input supports it.
5. One or two sentences on what the user will be doing, only if helpful to the reader.
6. A short thank-you that is specific to the audience.
7. New contact details.
8. If restrictions apply, do not invite clients to move their work, do not mention services that compete with the old employer, and keep it to a personal update; explain the choices under "Check before sending".
9. A LinkedIn post or short message version under 80 words.
</task>

<constraints>
- Email body under about 150 words.
- Never invent dates, employers, successor names or contact details; use [placeholders].
- No criticism of the old employer or colleagues.
- This is general information, not legal advice; if the user is unsure about restrictions, suggest they ask an employment adviser before sending to clients.
</constraints>

<output_format>
## Email
Subject, then body.
## LinkedIn or short version
Under 80 words.
## Check before sending
Bullets: contract points, list used, timing. "None" if nothing.
</output_format>
