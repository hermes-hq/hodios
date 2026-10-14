---
schema: 1
id: ask-for-offer-deadline-extension
kind: prompt
title: Ask for an offer deadline extension
description: Writes a request for more time to decide on a job offer while other processes finish or questions are answered, with an honest reason, a specific new date and a fallback.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [job-offer, exploding-offer, offer-deadline, decision-time, competing-offers]
pairs_with:
  prompts: [expedite-other-interviews-with-offer, evaluate-job-offer, handle-verbal-offer-call]
args:
  - name: offer
    description: The company and role, the deadline they gave, who you are dealing with, and how firm they made it sound.
    type: text
    required: true
  - name: reason
    description: The real reason you need more time (another final round on a date, waiting for answers to questions, family decision, relocation check) and the date by which you could honestly decide.
    type: text
    required: true
  - name: interest_level
    description: How likely you are to accept this offer (top choice, strong option, backup), which shapes the tone and how hard to push.
    type: enum
    enum: [top-choice, strong-option, backup]
    default: strong-option
output_contract:
  format: markdown
  sections: [Read the deadline, Email, Call version, If they say no, Use the time well]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has handled many extension requests. Short offer deadlines are often set to close a candidate before competitors can move, but many employers have more room than they first say, especially for strong candidates and when asked respectfully with a specific date. Requests that work show commitment to the role, give a true reason without unnecessary detail, ask for a specific new date (often a few days to a week), and show what the time will be used for. Requests that fail are vague ("I need more time"), open-ended, or read as shopping the offer around. Some deadlines are genuinely fixed (graduate schemes, a second-choice candidate waiting), so the candidate needs a plan for a no.

<offer>
{{offer}}
</offer>
<reason>
{{reason}}
</reason>
Interest level: {{interest_level}}
</context>

<task>
1. Read the deadline: given the details, say how much extension is reasonable to ask for, whether a call or email is better (a call first for a top choice or a very short deadline), and the likely flexibility, framed as a judgement, not a certainty.
2. Email: subject and a message under 130 words: thanks and genuine enthusiasm (honest to the interest level), the reason in one line (for another process, saying "I am finishing another process I committed to" is enough, no company names), a specific new date, and an offer to keep things moving (questions answered, references, paperwork) in the meantime.
3. Call version: four to six lines covering the same points, ready to say aloud.
4. If they say no: options (a shorter extension, asking the other company to speed up, deciding now with the information available) and a short framework for that decision based on the interest level.
5. Use the time well: what to do with the extra days so the new date is met: contact the other company, get outstanding questions answered, run the numbers, and set a personal decision date one day before the deadline.
</task>

<constraints>
- Use only the reason given. Do not invent another offer, a family emergency or a fake deadline.
- Ask for a specific date that the user can meet; do not request open-ended time.
- Do not overstate enthusiasm for a backup option; keep it sincere and professional.
- Use [Name] placeholders for unknown names.
</constraints>

<output_format>
## Read the deadline
## Email
Subject and body, ready to send.
## Call version
## If they say no
## Use the time well
Checklist.
</output_format>
