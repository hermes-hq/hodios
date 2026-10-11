---
schema: 1
id: respond-to-liability-claim
kind: prompt
title: Respond to a claim made against you
description: Works out what to do when someone says you caused their injury or damage - which of your policies may respond, what to tell the insurer, what not to say to them, and when to get a lawyer.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [text, document]
output: [plan, checklist, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [third-party-claim, public-liability, admission-of-liability, notify-insurer, personal-liability]
pairs_with:
  prompts: [map-small-business-insurance-needs, review-insurance-coverage, explain-insurance-policy]
args:
  - name: claim
    description: What the other person says happened and what they want - an email, a letter, a solicitor's letter or court papers - with dates. Remove their personal details.
    type: text
    required: true
  - name: your_side
    description: Your account of what happened, and anything you have already said or written to them.
    type: text
    required: true
  - name: policies
    description: Insurance you hold that might respond - home, contents, car, renters, pet, business public or professional liability, an umbrella policy, cover through a card or membership. Say if you do not know.
    type: text
  - name: country
    description: Country and region. Court deadlines and how liability is decided vary.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Urgent deadlines, Policies that may respond, Telling your insurer, Replying to the claimant, Evidence to keep, When to get a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many people do not realise they are insured for claims against them: home and renters policies often include personal liability cover (a guest slips, a dog bites, a leak floods the flat below), car policies cover damage and injury to others, and business policies include public, product or professional liability. Almost all of them share two conditions that decide whether the cover works: tell the insurer promptly, often before replying to the claimant, and do not admit liability, offer payment or negotiate without the insurer's consent. Breaking either can leave the person paying alone. Saying sorry as a human matter is usually different from admitting legal fault, and some places protect apologies by law, but written statements like "it was my fault, I'll pay" are the risk. Court papers carry strict response deadlines, often short; missing one can lead to a judgment by default. When the insurer takes the claim on, it usually appoints and pays for the defence and deals with the claimant directly.
{{#country}}

Country: {{country}}
{{/country}}
{{#policies}}

<policies>
{{policies}}
</policies>
{{/policies}}

<your_side>
{{your_side}}
</your_side>
</context>

<task>
<claim>
{{claim}}
</claim>

1. Classify what has arrived: an informal complaint, a formal letter of claim, a solicitor's letter, or court papers. If court papers, put the response deadline at the top and say to get legal help now.
2. Urgent deadlines: any date in the papers, plus the insurer's notification condition (as written, or "check your policy").
3. Policies that may respond: go through each policy listed and say whether this kind of claim typically falls under its liability section and what exclusions commonly apply (business activities on a home policy, deliberate acts, injury to your own household, motor claims on a home policy). Suggest checking policies the person may not have listed.
4. Telling your insurer: what to send (the claim, your factual account, dates, photos, witness names), and to ask in writing whether they accept the claim under the policy and will handle it.
5. Replying to the claimant: if a reply is needed before the insurer responds, a short holding message that acknowledges receipt, says it has been passed to the insurer, and makes no admission or offer. Note anything the person has already said that could be read as an admission and tell them to mention it to the insurer.
6. Evidence to keep: photos, footage, maintenance records, messages, names of witnesses, and a dated written account made now.
7. When to get a lawyer: court papers, injury claims, sums beyond the policy limits, no insurance responding, or an insurer refusing the claim.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say whether the person is legally liable or predict the outcome.
- Do not draft any message that admits fault, offers payment or disputes the facts in detail before the insurer has been told, unless the person has confirmed no insurance applies.
- Do not invent court deadlines, limitation periods or laws; say to check the papers and get advice.
- Never suggest hiding facts from the insurer or the claimant, destroying evidence, or moving assets.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
What has arrived, the most urgent deadline, and the first action.

## Urgent deadlines
Table: date | what it is | action.

## Policies that may respond
Table: policy | may cover this? | exclusions to check.

## Telling your insurer
Checklist and a short draft notification.

## Replying to the claimant
A holding message, or "No reply needed yet".

## Evidence to keep
Bullets.

## When to get a lawyer
Bullets tied to this situation.
</output_format>
