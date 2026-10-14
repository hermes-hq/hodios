---
schema: 1
id: respond-to-patent-infringement-letter
kind: prompt
title: Respond to a patent infringement letter
description: Explains a letter accusing your product of infringing a patent, separates a licensing pitch from a real threat, lists what to check and preserve, and drafts a short holding reply for counsel review.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review]
role: [founder, software-engineer, product-manager]
subject: [law]
requires: [none]
inputs: [document, text]
output: [explanation, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [patent-assertion, demand-letter, infringement-claim, patent-counsel]
pairs_with:
  prompts: [explain-patent-claims, respond-to-cease-and-desist, plan-freedom-to-operate-check]
args:
  - name: letter
    description: The letter or email, pasted in full, including the patent numbers named, the sender, any deadline and any licence offer.
    type: text
    required: true
  - name: your_product
    description: What your product or feature does, when you launched it, where you sell it, rough revenue from it, and any supplier or platform that provides the part being accused.
    type: text
    required: true
  - name: country
    description: Where your business is and where the patent is said to apply. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the letter says, What kind of letter this looks like, Do now, What to check with counsel, Holding reply, Do not]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small company read a patent infringement letter calmly, the way an in-house generalist prepares a file for patent counsel. These letters range from an invitation to take a licence, through a notice drawing attention to a patent, to a formal demand with a deadline before a lawsuit; some come from operating competitors, others from entities whose business is licensing patents. What novices miss: patents are territorial and expire, so the country and status matter; infringement is judged claim by claim against what the product does, not against the patent's title or abstract; the accused feature may come from a supplier or platform whose terms include an indemnity; and replying with admissions, arguments or a quick payment can make things worse. In some countries, even an aggressive reply or public statement about the sender has consequences. Your job is to make the letter understandable, get evidence and deadlines under control, and prepare the right questions, not to decide infringement or validity.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<letter>
{{letter}}
</letter>

<product>
{{your_product}}
</product>

1. What the letter says: sender, patents named, territory, what is accused, what is demanded, any deadline, quoted exactly where it matters.
2. What kind of letter this looks like: licensing invitation, notice, or demand, and signs of each in the wording. Say it is a reading of tone, not a legal view.
3. Do now: diarise the deadline, preserve documents and code history as they are, limit internal discussion to facts, collect product launch dates and design documents, check supplier and platform contracts for an indemnity and notify them, check insurance cover, and look up each patent's status, owner, expiry and claims on an official patent register.
4. What to check with counsel: whether the patent is in force where you sell, claim-by-claim comparison, prior art and validity, the sender's history, whether the accused part is supplied, cost of options (licence, design-around, challenge, ignore), and the risk of each. List them as questions.
5. Holding reply: a short, neutral acknowledgment that the letter was received and is being reviewed, with no admission and no technical argument, for counsel to approve before sending. Say when not sending anything yet may be better.
6. Do not: a short list of common mistakes (admitting infringement, paying quickly, deleting anything, posting about it, contacting the inventor directly).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say the product infringes or does not infringe, or that a patent is valid or invalid.
- Do not invent patent details, claim language, expiry dates or the sender's history. If the letter does not include them, list them as things to look up.
- If a lawsuit has been filed or a court document is attached, say first, in bold, to contact a patent litigator now.
- Keep the holding reply under 120 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the letter says
Bullets.

## What kind of letter this looks like
Two or three lines.

## Do now
Checklist with dates.

## What to check with counsel
Numbered questions.

## Holding reply
The draft, with [BRACKETS].

## Do not
Bullets.
</output_format>
