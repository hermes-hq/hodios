---
schema: 1
id: write-linkedin-connection-request
kind: prompt
title: Write a LinkedIn connection request
description: Writes LinkedIn connection notes that fit the character limit plus a no-pitch first message to send after acceptance, built on the context you genuinely share with the prospect.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, consultant]
stack: [linkedin]
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
tags: [connection-note, social-selling, first-message, outbound]
pairs_with:
  prompts: [plan-social-selling, write-cold-outreach, write-outbound-sequence]
args:
  - name: prospect
    description: Who they are (role, company), what they post or comment about, and the real link between you (shared group, event, mutual connection, a post of theirs you read, same industry).
    type: text
    required: true
  - name: your_context
    description: Your role and what you sell, in a sentence, so the follow-up stays relevant without pitching.
    type: text
    required: true
  - name: account_type
    description: free (connection notes up to 200 characters) or premium (up to 300 characters).
    type: enum
    enum: [free, premium]
    default: free
output_contract:
  format: markdown
  sections: [Connection notes, After they accept, If they do not accept, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach sellers on LinkedIn prospecting. A connection request is not a sales message. People accept requests that give a clear, honest reason to connect and show no sign of an incoming pitch; they ignore or report requests that pitch in the note or read like a template. The most common pattern that burns goodwill is "connect, then pitch within minutes".

The working sequence is: a short note anchored in real shared context; after acceptance, a first message that continues the conversation with no ask beyond a light question; value or a relevant observation later; a business conversation only once there is interest. At the time of writing, free accounts allow 200 characters in a note (Premium 300) and LinkedIn caps how many personalised notes free users can send each month, so each note should count. LinkedIn changes these limits, so tell the user to check the counter in the invite box.
</context>

<task>
Write connection notes for this prospect.

<prospect>
{{prospect}}
</prospect>

<your_context>
{{your_context}}
</your_context>

Account type: {{account_type}}

1. Identify the strongest honest reason to connect from the prospect information. If there is no real shared context, say so and use a transparent reason (same industry, their public post on a topic you work on).
2. Write three connection notes within the character limit for the account type, each with a different reason, and give the character count for each.
3. Write a first message to send after acceptance: 30 to 70 words, no pitch, no meeting request, ending with one easy question about their work.
4. Write a short note on what to do if the request is not accepted within two weeks (for example engage with their posts, then withdraw and try once later).
</task>

<constraints>
- Stay within the character limit, counting spaces. Count honestly.
- No pitch, link, calendar link or product name in the connection note.
- Never invent a mutual connection, a meeting, an event or having read something not in the prospect information.
- No flattery formulas ("I'm impressed by your profile"), no "I'd love to add you to my network".
- Mention in Before sending that automation tools that mass-send requests can breach LinkedIn's terms and risk account restrictions.
</constraints>

<output_format>
## Connection notes
Three notes, each with its reason and character count.

## After they accept
The first message and its word count.

## If they do not accept
Two or three bullets.

## Before sending
Facts to verify and the automation note.
</output_format>
