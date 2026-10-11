---
schema: 1
id: write-meeting-recap-email
kind: prompt
title: Write a meeting recap email
description: Turns the organiser's rough notes into a recap email ready to send - decisions, actions with owners and dates, open items, next meeting - with a reply-by date for corrections.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, project-manager, product-manager, individual]
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
tags: [follow-up, action-items, recap, meeting-notes]
pairs_with:
  prompts: [summarize-meeting-transcript, write-meeting-agenda, chase-overdue-action-items]
args:
  - name: notes
    description: Your rough notes from the meeting - bullets, half sentences and shorthand are fine. Include who attended if you know.
    type: text
    required: true
  - name: recipients
    description: Who gets the email (for example "attendees plus two people who missed it", "the client team"). Optional; attendees are assumed.
    type: string
  - name: tone
    description: How formal to be (for example "friendly internal", "formal with a client"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Subject line, Email, Items to check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the recap email a good organiser sends within a few hours of a meeting. You know why recaps matter: memories of the same meeting diverge within a day, and the written recap becomes the record people act on. A useful recap is skimmable on a phone, leads with what changed, puts every action next to one named owner and a date, and invites corrections by a set date so silence means agreement. You also know the traps: notes in shorthand hide who agreed to what, "we" owns nothing, and a recap sent to people who were not there needs one line of context per item.

<notes>
{{notes}}
</notes>
{{#recipients}}Recipients: {{recipients}}{{/recipients}}
{{#tone}}Tone: {{tone}}{{/tone}}
</context>

<task>
1. Read the notes and sort every line into decision, action, open question, information or noise.
2. Write a subject line that names the meeting and the date or the main outcome, not just "Recap".
3. Open with one or two sentences: thanks if the tone suits, and the single most important outcome.
4. List decisions as plain statements of what will now happen.
5. List actions as a short table or list: action, owner, due date. Use only owners and dates in the notes; where missing, write "owner to confirm" or "date to confirm" and ask in the email who will take it.
6. List open questions and parked items, with who will bring them back if the notes say.
7. Add the next meeting date or "no follow-up meeting planned", whichever the notes support.
8. Close with a correction line: "If I have missed or misstated anything, reply by [day]" with a sensible day you leave as a placeholder if no date context exists.
9. If some recipients missed the meeting, add one line of context to items they would not understand.
10. After the email, list anything you were unsure about in the notes so the sender can fix it before sending.
</task>

<constraints>
- Never invent decisions, owners, dates, figures or attendees. Shorthand you cannot decode goes to "Items to check before sending", not into the email as a guess.
- Do not turn a suggestion into a decision. "Maybe we should..." with no agreement is an open question.
- Keep the email under about 250 words for a one-hour meeting; link or attach detail instead of pasting it.
- Leave out internal remarks, jokes or criticism of people that appear in the notes, and say you left them out.
- If the recipients include an outside party, flag any line that looks internal-only.
</constraints>

<output_format>
## Subject line
One line.

## Email
The full email, ready to paste, with decisions, an actions list (action, owner, due), open items, next meeting and the correction line.

## Items to check before sending
Bullets: unclear shorthand, missing owners or dates, lines that may be internal-only. "None" if clean.
</output_format>
