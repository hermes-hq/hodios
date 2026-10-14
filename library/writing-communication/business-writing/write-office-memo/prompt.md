---
schema: 1
id: write-office-memo
kind: prompt
title: Write an internal memo
description: Writes an internal memo in standard To, From, Date, Subject format that gives staff an instruction, confirms a procedure or records a decision, with what to do, by when and who to ask.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, executive, individual]
requires: [none]
inputs: [notes, text]
output: [docs, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [memo, staff-instructions, internal-communication, procedure, memo-format]
pairs_with:
  prompts: [write-internal-announcement, write-sop, write-decision-memo]
args:
  - name: message
    description: What staff need to know or do, the reason, dates, who it applies to, and any exceptions.
    type: text
    required: true
  - name: to_and_from
    description: Who the memo is to and from, for example "All warehouse staff, from the Operations Manager".
    type: string
    required: true
  - name: tone
    description: How the memo should read.
    type: enum
    enum: [neutral, firm, warm]
    default: neutral
output_contract:
  format: markdown
  sections: [Memo, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An internal memo is the workplace's standard way to give an instruction or put a decision on record. People skim it, so the subject line and first sentence must say what is changing and for whom, and the action must be impossible to miss. Memos go wrong when they open with history, bury the deadline, use vague verbs ("please be mindful of"), forget who it does not apply to, or scold everyone for what a few people did. A good memo is short, states the action, the date, the reason in one or two sentences, the exceptions, and who to ask, and it stays polite even when it is firm.
</context>

<task>
Write an internal memo.

To and from: {{to_and_from}}
Tone: {{tone}}

<message>
{{message}}
</message>

1. If you cannot tell what readers must know or do, ask in one short message and stop.
2. Write the memo header: To, From, Date (placeholder if not given), Subject. The subject names the change or action and the date ("Visitor sign-in at main reception only from 3 June").
3. First paragraph: what is happening or what readers must do, and from when, in no more than two sentences.
4. Reason: one or two sentences, factual and without blame.
5. Details: steps or rules as a short numbered list if there is more than one action; who it applies to and who it does not; exceptions and how to request one.
6. Contact: who to ask, by role or name if given.
7. Keep the tone as requested: firm means direct and clear about consequences that the input states, never threatening or sarcastic; warm adds a line of thanks or acknowledgement.
</task>

<constraints>
- Under about 250 words unless the procedure genuinely needs more steps.
- Use only facts given; mark missing dates or names `[NEEDED: …]`. Never invent consequences or disciplinary measures that the input does not state.
- No group scolding ("some of you have been ignoring…"); describe the rule and the reason.
- Plain words: "use", "send", "from Monday" rather than "utilise", "kindly forward", "with effect from".
</constraints>

<output_format>
## Memo
Header lines, then the body as above.
## Check before sending
Up to three checks, such as a missing date, whether managers need to be told first, or whether the memo should also go on the noticeboard for staff without email.
</output_format>
