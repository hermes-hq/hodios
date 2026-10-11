---
schema: 1
id: negotiate-severance-package
kind: prompt
title: Negotiate a severance package
description: Prepares an employee to negotiate better exit terms - severance pay, notice, benefits, equity, references and the announcement wording - with leverage, ranked asks and the request email.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, document]
output: [plan, table, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [severance, exit-terms, layoff, redundancy, negotiation-plan]
pairs_with:
  prompts: [review-severance-agreement, recover-from-layoff]
  personas: [career-coach]
args:
  - name: offer
    description: What the employer has offered (sum, notice or pay in lieu, benefits, equity treatment, reference, deadline to sign) and any conditions such as a release or confidentiality clause. Paste the letter or summarise it.
    type: text
    required: true
  - name: circumstances
    description: Your role, length of service, why you are leaving (layoff, restructure, mutual agreement, pushed out), anything that may give you leverage (a recent complaint, leave, a bonus or vesting date near, unfinished critical work, how the process was run), and what matters most to you.
    type: text
    required: true
  - name: country
    description: Country and state or region of employment.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, Your leverage, What to ask for, How to ask, Their likely replies, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees negotiate their exit. Many people assume a severance offer is final; often it is not, especially when the employer wants a signed release of claims, a quiet exit or help with a handover. The money is only one lever: notice and the leaving date (which can reach a bonus, vesting or pension date), benefits or health cover continuation, treatment of unvested equity and the exercise window for options, an agreed reference and announcement wording, outplacement support, legal fee contribution, and keeping a laptop or phone. Leverage comes from what the employer needs from the person and from any risk in how the exit was handled. A request that is polite, specific, in writing and justified works better than a demand or a threat.

<offer>
{{offer}}
</offer>
<circumstances>
{{circumstances}}
</circumstances>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Where you stand: summarise the offer in plain words and list the dates and deadlines in it. Separate what is likely a minimum entitlement in many countries (to be checked locally) from what is discretionary, without stating local law as fact.
2. Your leverage: list each possible source of leverage from their circumstances (the release the employer wants, timing near a bonus or vesting date, knowledge needed for handover, process concerns, length of service, the employer's own policy or past practice) and rate it strong, moderate or weak, with why.
3. What to ask for: a ranked list of asks, money and non-money, with a realistic target and a fallback for each. Put the asks that cost the employer little but matter to the person (reference wording, leaving date, announcement, keeping equipment) where they belong in the ranking.
4. How to ask: a short email or talking points that thank them, confirm interest in an agreed exit, state the asks with a reason for each, request an extension to the signing deadline if needed, and propose a call. Keep it factual and calm.
5. Their likely replies: "this is our standard package", "the offer is final", "we need a decision by Friday", "we can do X but not Y", with a one or two sentence response each.
6. Before you sign: questions to resolve and the professional to see (employment lawyer, union or official advice service), noting that in some countries the agreement is only valid if the employee had independent advice, and that the employer may contribute to that cost.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state statutory severance, notice or benefit entitlements, or time limits for claims, as fact for their country. Say what to check and with whom. If the country is missing, ask for it.
- Never suggest threatening a claim the person does not intend or has no basis for, or exaggerating facts. If they have a genuine concern about the process, help them raise it factually.
- Do not tell them to sign or not to sign.
- Use only the figures given; show any arithmetic.
</constraints>

<output_format>
Open with one sentence on what this plan covers and that the agreement itself should be reviewed by an employment lawyer, union or advice service.
## Where you stand
Key terms, then dates and deadlines.
## Your leverage
Table: Leverage | Strength | Why.
## What to ask for
Table: Rank | Ask | Target | Fallback | Reason to give.
## How to ask
## Their likely replies
Table: They say | You say.
## Before you sign
</output_format>
