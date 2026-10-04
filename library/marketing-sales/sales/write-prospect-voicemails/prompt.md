---
schema: 1
id: write-prospect-voicemails
kind: prompt
title: Write prospect voicemails
description: Writes first, second and last voicemail scripts under 25 seconds with a matching text or email, each with a specific reason, the name once, a slow callback number and no fake urgency.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder]
requires: [none]
inputs: [text]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: "off"
level: beginner
tags: [voicemail, callback-rate, call-attempts, prospecting-touches, missed-calls]
pairs_with:
  prompts: [write-cold-call-script, write-outbound-sequence, practise-cold-call]
args:
  - name: reason_for_calling
    description: Why you are calling this person - the trigger, referral, enquiry they made, or problem you help with - plus your name, company and callback number (use a placeholder if you prefer).
    type: text
    required: true
  - name: prospect_type
    description: Who you are calling and how warm they are (for example "homeowner who requested a boiler quote online", "operations director, cold", "seller who filled in a valuation form").
    type: string
    required: true
  - name: follow_up_channel
    description: The written message that goes with each voicemail.
    type: enum
    enum: [text, email, both]
    default: text
output_contract:
  format: markdown
  sections: [Attempt plan, Voicemails, Matching messages, Delivery tips]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write voicemails for people who make outbound calls: B2B reps, tradespeople returning enquiries, and real estate agents. Most voicemails are deleted in the first five seconds because they start with a long company introduction, ramble, give the number too fast to write down, or invent urgency. A voicemail that gets a callback is under 25 seconds (about 60 spoken words), says who you are and the specific reason in the first sentence, gives the number slowly and twice only on the first attempt, and pairs with a written message so the person can reply without calling. Each attempt has a different reason; the last one closes the loop politely.

Prospect: {{prospect_type}}
Written follow-up: {{follow_up_channel}}
</context>

<task>
<reason_for_calling>
{{reason_for_calling}}
</reason_for_calling>

1. Decide the warmth: inbound (they asked for contact), warm (referral, existing relationship, event), or cold. Set the attempt plan: inbound gets attempts on day 0, day 1 and day 3; warm and cold on day 0, day 3 to 4 and day 8 to 10. Suggest call times that suit the prospect type.
2. Write three voicemails, each under 60 words, with a word count:
   - First: name and company, the specific reason, one benefit or question, the number said slowly ("oh-seven-seven, one-two-three...") and repeated, and "I'll also send a text".
   - Second: a new reason or useful detail (availability, an answer to a likely question, a relevant insight), the number once.
   - Last: a friendly close ("I won't keep calling"), what they can do if timing changes, the number once.
3. Write the matching written message for each attempt in the chosen channel: text under 300 characters, email under 90 words with a plain subject line. The message should allow a one-word reply.
4. Give delivery tips.
</task>

<constraints>
- Use only the facts given. Callback numbers and names not provided are [NUMBER] and [NAME].
- No fake urgency ("call me back today or lose the slot"), no pretending to know them, no "returning your call" unless they really called.
- The prospect's name appears once in each voicemail.
- No jargon or feature lists; spoken, natural sentences.
- Remind the user to respect opt-outs and local calling rules (do-not-call registers, calling hours); stop after the last attempt.
- If the reason for calling is missing, ask for it and stop.
</constraints>

<output_format>
## Attempt plan
Table: Attempt | Day | Suggested time | Voicemail reason | Message channel.

## Voicemails
Three blocks (First, Second, Last), each with the script and its word count.

## Matching messages
The text or email for each attempt.

## Delivery tips
Five bullets: pace, smiling, standing up, writing the number as you say it, and logging attempts.
</output_format>
