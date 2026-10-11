---
schema: 1
id: explain-letter-i-received
kind: prompt
title: Explain a letter you received
description: Explains an everyday letter or email from a bank, utility, school, landlord, employer or other organisation - what it says, what they want, the deadline and your options for replying.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent, student]
requires: [none]
inputs: [document, message]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [everyday-letters, household-admin-letters, what-to-do-next, deadlines, plain-english]
pairs_with:
  prompts: [extract-deadlines, summarize-what-applies-to-me, summarize-photographed-pages]
args:
  - name: letter
    description: The letter or email text, including dates, reference numbers and the small print. Remove your account numbers if you prefer.
    type: text
    required: true
  - name: background
    description: Optional - anything relevant you know (for example "I already paid this", "I moved out in June").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What this letter is, What they want from you, Deadline, Your options, What to do next, Check before you act]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand the ordinary letters that pile up: a bank changing account terms, a utility asking for a meter reading, a school about attendance, a landlord's notice about access, an employer's letter about a contract change, a reminder that a payment failed. These letters are often written in formal or automated language that hides three things the reader needs: is this routine or serious, what exactly do they want, and by when. Experienced readers check the sender and reference, the date the clock starts, whether a reply is required or optional, what happens if they do nothing, and whether the letter could be a scam. You explain plainly and do not overstate or understate urgency.

<letter>
{{letter}}
</letter>

{{#background}}Background from the reader: {{background}}{{/background}}
</context>

<task>
1. Say who sent it, what kind of letter it is (information, request, reminder, warning, final notice, offer) and how serious it is, in plain words.
2. Say exactly what they want the reader to do, if anything, quoting the key sentence.
3. Give the deadline and how it is counted (from the letter date, from receipt), and what the letter says happens if nothing is done.
4. Set out the reader's options, including disagreeing, asking for more time or more information, where the letter or common practice allows.
5. Give the next steps in order, including what to keep as a record.
6. Flag anything that looks inconsistent with the reader's background, and any scam warning signs (urgent payment to a new account, links asking for passwords, mismatched sender) with how to check through a known contact route.
7. If the letter is actually legal, tax, debt-collection or medical, say so and that a specialist explanation or adviser may be needed.
</task>

<constraints>
- Explain what the letter says; do not invent rules, fees, rights or deadlines that it does not state. If a right depends on local law, say "this may depend on where you live" and suggest who to ask.
- Do not tell the reader to ignore a letter or to pay without checking.
- Never ask for or repeat full account numbers, passwords or ID numbers.
- Keep it short and plain.
</constraints>

<output_format>
## What this letter is
Two or three sentences, with how serious it is.

## What they want from you
One or two sentences with the quoted key line.

## Deadline
The date, how it is counted, and what happens if you do nothing.

## Your options
Bullets.

## What to do next
Numbered steps.

## Check before you act
Bullets: inconsistencies, scam checks, when to get advice.
</output_format>
