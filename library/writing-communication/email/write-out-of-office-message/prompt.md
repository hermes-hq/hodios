---
schema: 1
id: write-out-of-office-message
kind: prompt
title: Write an out-of-office message
description: Writes out-of-office auto-replies for leave, travel or parental leave with the return date, who to contact for what, and what happens to messages meanwhile. Use before going away.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, consultant, founder]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [out-of-office, auto-reply, annual-leave, parental-leave, email-routing]
pairs_with:
  prompts: [write-handover-document, triage-inbox, write-professional-email]
args:
  - name: reason
    description: Why you are away, for example "annual leave", "conference", "parental leave" or "medical leave". It is used to set the tone; private reasons are never disclosed in the reply.
    type: string
    required: true
  - name: return_date
    description: Your first day back, ideally as a full date (for example "Monday 17 November"). If it is uncertain, say so and give the best known month or "until further notice".
    type: string
    required: true
  - name: backup_contacts
    description: Who covers what while you are away, for example "Invoices - Priya, finance@...; urgent production issues - Tom, +44...; everything else waits". Leave empty if nobody covers.
    type: text
  - name: audience
    description: Who will receive the auto-reply. Internal means colleagues only; external means clients, suppliers and the public; both writes one version for each.
    type: enum
    enum: [internal, external, both]
    default: both
  - name: tone
    description: Formal suits banks, law, government and new clients; friendly suits most teams and long-standing contacts.
    type: enum
    enum: [formal, friendly]
    default: friendly
output_contract:
  format: markdown
  sections: [Auto-replies, Chat status, Settings checklist, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An out-of-office reply is read by someone who wanted something from you and now has to decide what to do. It works when it answers three questions in the first lines: when you are back, who can help with what in the meantime, and whether their message will be read or should be resent. It fails when it says "back Monday" with no date, routes everything to one overloaded colleague, or overshares. Auto-replies go to strangers, mailing lists and scammers too, so the external version should not reveal where you are, that a home is empty, private reasons such as health, or internal phone numbers and org details that help social engineering. The internal version can carry more detail: project links, channels and named owners.
</context>

<task>
Write out-of-office auto-replies for a {{audience}} audience in a {{tone}} tone.

Reason for absence (private context, not to be disclosed): {{reason}}
First day back: {{return_date}}
{{#backup_contacts}}
<backup_contacts>
{{backup_contacts}}
</backup_contacts>
{{/backup_contacts}}

1. Decide how much of the reason to say. Default to a neutral "I am out of the office". Mention a reason only when it helps the reader and is not private: a conference or business trip may be named without the location for external readers; parental leave may be mentioned if the reason says so; medical, family, bereavement or other personal reasons are never named.
2. State the return date as a full date with weekday. If the return date is vague ("next week", "Monday"), use it but add `[confirm: full date]`. If it is uncertain, say "until [month]" or "for an extended period" and lean harder on the contacts.
3. Route by topic, not just by name: "For invoices, contact…; for urgent issues with live orders, contact…". Use only the contacts given. If none are given, say messages will be answered after the return date and suggest the reader resend anything urgent then; do not invent a colleague or a shared inbox.
4. Say what happens to messages: read on return, or (for absences of three weeks or more) not read and to be resent after the return date. Pick the one that fits the length of absence and say which you chose under Notes.
5. Write the external version (if needed) first, then the internal one (if needed). The internal version may add links, channels and the people covering specific projects, if given.
6. Write a one-line chat status (for Slack, Teams or similar) with the return date.
7. Write a short settings checklist for the absence: schedule start and end, separate internal and external replies, reply once per sender, avoid replying to mailing lists where the client allows it, decline or hand over meetings in the calendar, and tell the backup contacts before switching it on.
</task>

<constraints>
- Body under about 80 words per version; the first two lines must carry the return date and where to go instead.
- Never reveal private reasons, the travel destination, personal phone numbers or a home address in the external version. If the backup contacts include a personal mobile, keep it out of the external version and say why under Notes.
- Never promise a reply time you cannot keep ("I will reply within 24 hours of my return") unless the input says so.
- No jokes or emojis in the formal tone; in the friendly tone, warmth is fine but no puns about the beach.
- Use only the names, addresses and numbers given; never invent them.
</constraints>

<output_format>
## Auto-replies
For each audience: a subject line (for clients that allow one, such as "Out of office until Mon 17 Nov"), then the body.
## Chat status
One line.
## Settings checklist
Four to six bullets.
## Notes
Placeholders to fill, what you left out on purpose and why. "None" if nothing.
</output_format>

<examples>
Weak: "I'm currently out of the office with limited access to email. I'll respond as soon as possible upon my return."
Strong: "Thanks for your email. I'm away until Monday 17 November and won't be reading messages. For invoices, please contact Priya at finance@example.com; for anything else, I'll reply when I'm back."
</examples>
