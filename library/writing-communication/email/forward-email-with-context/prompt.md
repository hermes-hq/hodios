---
schema: 1
id: forward-email-with-context
kind: prompt
title: Forward an email with context
description: Writes the note on top of a forwarded email or thread - why it matters to the recipient, the few facts they need, the specific ask and deadline - so they act without reading the whole thread.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, project-manager, operations-manager]
requires: [none]
inputs: [message, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [forwarding, hand-off, delegation, context, bottom-line-first]
pairs_with:
  prompts: [summarize-email-thread, write-escalation-email, rewrite-email-bottom-line-first]
args:
  - name: thread
    description: The email or thread you are forwarding, pasted.
    type: text
    required: true
  - name: recipient
    description: Who you are forwarding to and why them, for example "our lawyer, needs to check the clause" or "my manager, for a decision".
    type: string
    required: true
  - name: ask
    description: What you want the recipient to do, if you know. Leave empty and the prompt will propose one.
    type: string
output_contract:
  format: markdown
  sections: [Forwarding note, Check before forwarding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"FYI, see below" on top of a 30-message thread pushes the work onto the recipient, who must reconstruct the story, guess why they were sent it, and decide whether it needs action. The forwarding note that gets acted on is a mini-brief: one line on why this is with them now, the three or four facts they need (pulled from the thread, with dates and numbers), the decision or action wanted and by when, and pointers to the one or two messages worth reading in full. Forwarding also carries risk: threads often contain things the new reader should not see, such as frank comments about them or a third party, personal data, pricing meant for someone else, or legal advice whose privilege may be affected by wider circulation. A good forwarder checks before sending, and sometimes starts a fresh email instead.
</context>

<task>
Write a forwarding note to {{recipient}}.{{#ask}} The ask: {{ask}}.{{/ask}}

<thread>
{{thread}}
</thread>

1. Read the whole thread and identify: what it is about, where it stands now, the open question, and any deadline.
2. If no ask was given, propose the most likely one from the thread and the recipient's role, and mark it as a suggestion in Check before forwarding.
3. Write the note:
   - Suggested subject: keep the thread subject but prefix the ask ("Decision needed by Fri: FW: …"). Only suggest a change.
   - First line: why this is with them and the ask with a deadline.
   - "What you need to know": three or four bullets with facts from the thread (who wants what, numbers, dates, what has been agreed or refused).
   - Pointer to the key message(s) by sender and date if useful.
   - Close with what the user will do next or what they need back.
4. Under Check before forwarding, scan the thread and list anything sensitive: comments about the recipient or others, personal data, confidential prices, legal advice, or people who might be surprised their message was forwarded. Suggest trimming or starting a new email if needed.
</task>

<constraints>
- Note under about 120 words.
- Only facts from the thread; never fill gaps with guesses. If something important is unclear in the thread, say so in the note.
- Do not characterise people in the thread (no "they're being difficult"); describe positions.
- Do not copy long passages from the thread into the note.
</constraints>

<output_format>
## Forwarding note
Suggested subject, then the note.
## Check before forwarding
Bullets: sensitive items found, suggested trims, whether the ask was inferred. "Nothing sensitive found" if so.
</output_format>
