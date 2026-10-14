---
schema: 1
id: reply-to-letter-before-claim
kind: prompt
title: Reply to a letter before claim
description: Drafts a reply to a demand or letter before claim you received, disputing, partly admitting or asking for documents, without admitting more than you mean to and with the deadline handled.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [letter-before-action, demand-response, pre-action, debt-dispute, holding-reply]
pairs_with:
  prompts: [explain-legal-letter, write-settlement-offer-letter, defend-small-claim, respond-to-cease-and-desist]
args:
  - name: letter
    description: The demand or letter before claim you received, pasted in full or summarised, with the date you received it and any deadline it sets. Remove account numbers you do not need to share.
    type: text
    required: true
  - name: your_position
    description: What you say about it - whether you owe nothing, part, or all of it, why, what you agreed, what went wrong, and the documents you hold.
    type: text
    required: true
  - name: goal
    description: What you want the reply to do - dispute, partly-admit (accept part and dispute the rest), request-documents (ask for evidence before answering), or holding-reply (ask for more time while you get advice).
    type: enum
    enum: [dispute, partly-admit, request-documents, holding-reply]
    default: dispute
  - name: country
    description: Country and region, if known. Pre-action rules and time limits differ a lot. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What they claim, Deadline, Reply letter, Words to avoid, Before you send, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a person answer a formal demand or letter before claim (also called a letter before action or pre-action letter) from a company, a former business partner, a landlord, a debt buyer or their lawyer. Many people either ignore these, which can lead to a default judgment and costs, or reply emotionally and admit liability in writing. In several countries courts expect the recipient to answer within a stated period, to say which parts are disputed and why, and to ask for any documents they need; a clear, short reply also becomes useful evidence if the matter reaches court. A reply should answer the claim point by point, admit only what the person really accepts, and never volunteer harmful extras. Debt claims deserve particular care: asking for the agreement, a statement of account and proof that the sender owns the debt is normal, and very old debts may be time-barred (a written acknowledgment can restart the clock in some places).

Goal: {{goal}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The letter received:

<letter>
{{letter}}
</letter>

The person's position:

<position>
{{your_position}}
</position>

1. Summarise what the sender claims: who they are, the legal basis they rely on (contract, debt, damage, unpaid invoice), the amount and how it is made up, and what they threaten to do next.
2. Extract the deadline. Convert it to a calendar date if the start is clear; otherwise say what to check. If the deadline is under 7 days away or passed, put that first.
3. Check for scam signs (payment to a personal account, gift cards, threats of arrest over a civil debt, sender details that do not match) and say how to verify the sender independently if any appear.
4. Draft the reply letter for the chosen goal:
   - Reference their reference number and date. State the purpose in one sentence.
   - Respond to each allegation in numbered paragraphs: accepted, disputed (with the reason and the evidence held), or not known.
   - For a debt, ask for the signed agreement, a statement of account and, for a debt buyer, proof of assignment, and say the debt is disputed while they are provided.
   - For partly-admit, state the admitted amount precisely and how it is calculated, and whether it is offered in settlement.
   - For a holding reply, ask for a specific extension (often 14 to 28 days) with a reason, and say the person is seeking advice.
   - Close by asking them to direct further correspondence in writing to the stated address.
5. List words and phrases to avoid in this case (for example "I know I owe", "sorry for the damage I caused") and offer neutral alternatives.
6. Write a pre-send checklist and the cases where the person should get advice before sending.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not invent laws, rule names, limitation periods, case references or amounts; use [BRACKETS] and mark anything time-related "verify locally".
- Never write an admission the person has not clearly made. If their position is unclear, write the paragraph as disputed or "not known" and list the question.
- Do not mark a letter "without prejudice" unless it contains a settlement offer; explain that settlement offers belong in a separate letter.
- Do not include threats, insults or counter-allegations not supported by facts.
- Do not predict the outcome. If the claim is large, a court claim form has already arrived, the matter involves employment, personal injury, housing possession or a business partner, or the person may have a counterclaim, say clearly that they should get advice from a lawyer, legal aid or an advice service before replying substantively, and that a holding reply can buy time.
- Advise sending by a method that proves delivery and keeping a copy.
{{> output/uncertainty}}
</constraints>

<output_format>
## What they claim
Bullets: sender, basis, amount and breakdown, threatened next step, any scam signs.

## Deadline
Date with calculation, or what to check.

## Reply letter
The complete letter with [BRACKETS] for missing details.

## Words to avoid
Table: avoid | use instead.

## Before you send
Checklist.

## Get advice if
Bullets tied to this case.
</output_format>
