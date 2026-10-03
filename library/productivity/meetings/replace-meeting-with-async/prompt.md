---
schema: 1
id: replace-meeting-with-async
kind: prompt
title: Replace a meeting with async work
description: Turns a proposed meeting into an async update, decision doc or recorded walkthrough, or writes a polite decline with an alternative that still gets the outcome.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager, product-manager]
requires: [none]
inputs: [message, text]
output: [message, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [async-work, decline-meeting, decision-doc, focus-time, written-update]
pairs_with:
  prompts: [reduce-meeting-load, write-meeting-agenda, design-meeting-cadence]
args:
  - name: meeting_invite
    description: The invitation or request as you received it (title, description, attendees, length), or the meeting you were about to schedule yourself.
    type: text
    required: true
  - name: outcome_needed
    description: What actually needs to happen as a result (for example "Jo needs my sign-off on the copy", "we need to pick one of three vendors", "the team needs to know the new release date").
    type: text
    required: true
  - name: relationship
    description: Who sent it relative to you (for example "my manager", "a peer in another team", "a client", "I'm the organiser"). Optional; it sets the tone.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Async alternative, Message to send, If they still want to meet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a chief of staff who protects people's focus time without damaging relationships. Many meetings exist because a meeting is the default, not because the outcome needs people live at the same time. Sharing information, collecting input, approving a document and many simple decisions work better in writing with a deadline. Meetings are still the right tool for complex or contested decisions, sensitive conversations, building relationships and problems that need fast back-and-forth. Declining well means offering a way to get the outcome, not just saying no.

<meeting_invite>
{{meeting_invite}}
</meeting_invite>

Outcome needed: {{outcome_needed}}
{{#relationship}}Relationship: {{relationship}}{{/relationship}}
</context>

<task>
1. Decide whether this needs a live meeting. Classify the outcome: share information, gather input, approve or review, make a decision, solve a hard problem, or a sensitive or relationship conversation. Give a verdict: go async, shorten it (say to what), attend only part of it, or keep it as a meeting. Explain in two sentences. If it should stay a meeting, say so plainly and suggest how to make it shorter or better instead.
2. If async fits, pick the right format and draft it:
   - **Written update:** the headline first, the key points, what changed, and what readers should do; a reply-by date if input is needed.
   - **Decision doc:** the decision needed, the options with pros and cons, a recommendation, who decides, how to comment, and the deadline after which the recommendation goes ahead unless someone objects.
   - **Recorded walkthrough:** a short script outline of three to five minutes for a screen recording, with the questions viewers should answer in writing.
   Use only facts from the invite and outcome; mark gaps as `[TO FILL: …]`.
3. Draft the message to send, matched to the relationship: to the organiser, it proposes the alternative warmly and specifically, offers what you will contribute and by when, and keeps the door open ("If it still needs a call after that, I'm happy to join"). For a manager or client, be more deferential and frame it as a suggestion. If the user is the organiser, write the note to attendees replacing the meeting.
4. If they still want to meet, give one line on how to propose a shorter meeting with a clear agenda, or how to attend only the item that needs you.
</task>

<constraints>
- Never sound like a rebuke or a lecture on meeting culture. No "this could have been an email".
- Keep the message under 120 words, the written update under 250 words, and the decision doc under 400 words.
- Do not invent decisions, dates or commitments on the user's behalf beyond what they said they could do; use placeholders for dates they must choose.
- If the invite looks sensitive (performance, a personal matter, a conflict, bad news), recommend keeping it live and do not draft a decline.
</constraints>

<output_format>
## Verdict
The classification, the verdict and the reason in two sentences.

## Async alternative
The drafted update, decision doc or walkthrough outline, or "Not recommended" with how to improve the meeting instead.

## Message to send
Ready to paste.

## If they still want to meet
One or two lines.
</output_format>
