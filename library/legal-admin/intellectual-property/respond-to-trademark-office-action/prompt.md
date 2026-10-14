---
schema: 1
id: respond-to-trademark-office-action
kind: prompt
title: Respond to a trademark office objection
description: Explains a trademark examiner's objection or refusal in plain words, sets out the response options and deadline, and prepares the facts and draft points for you or your attorney to file.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review, build]
role: [founder, marketer, individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [explanation, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trademark, office-action, examiner-objection, likelihood-of-confusion, descriptiveness]
pairs_with:
  prompts: [apply-for-trademark, evaluate-trademark-opposition]
args:
  - name: objection
    description: The examiner's letter or office action pasted in full (remove personal data you do not want to share), plus the application details - mark, classes, goods and services, filing date and office.
    type: text
    required: true
  - name: business_facts
    description: How you use the mark, since when, sales and marketing evidence you have, how your goods differ from any cited mark's, and how important the mark is to the business.
    type: text
output_contract:
  format: markdown
  sections: [Deadline first, What the examiner is saying, Response options, Evidence to gather, Draft response points, Questions for a trademark attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an applicant understand and prepare a reply to a trademark examiner's objection. Objections usually fall into two families. Absolute grounds: the mark describes the goods or a characteristic, is generic or customary, lacks distinctive character, is deceptive, or is a surname or geographic term in some systems. Relative grounds (examined by the office in some countries, left to oppositions in others): a likelihood of confusion with an earlier mark, judged on similarity of the marks and of the goods and services. Typical responses: argue against the objection with reasons and evidence, narrow or delete goods and services to move away from the conflict, add a disclaimer where the office allows, submit evidence of acquired distinctiveness from use, obtain consent or a coexistence agreement from the earlier owner, or let the application go and refile differently. Missing the response deadline usually means the application is refused or abandoned, so the date comes first.
</context>

<task>
<objection>
{{objection}}
</objection>
{{#business_facts}}

<business_facts>
{{business_facts}}
</business_facts>
{{/business_facts}}

1. Deadline first: the response date stated in the letter, whether extensions may be available (to verify with the office), and a recommendation to diarise it and contact an attorney well before. If no date is visible, say so prominently.
2. What the examiner is saying: each ground in plain words, which family it belongs to, the cited earlier marks if any, and the goods or services affected.
3. Response options: for each ground, the realistic options (argue, amend the specification, disclaim, acquired distinctiveness evidence, consent or coexistence, abandon and refile), with what each costs the business in scope and how strong it looks on the facts given. Label strength as a preliminary view.
4. Evidence to gather: what would support the chosen options (use dates, sales, advertising, customer recognition, differences in trade channels and buyers), and how to organise it.
5. Draft response points: the outline of arguments and any proposed amended wording of goods and services, written for the user or attorney to adapt, not filed as is.
6. Questions for a trademark attorney specific to this objection.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict that the objection will be overcome or the mark registered.
- Do not invent case law, office guidelines, earlier marks or deadlines; if the letter cites them, quote them as cited.
- Do not advise ignoring the letter or misrepresenting use or dates.
- Recommend an attorney where the mark is central to the business, the objection is on relative grounds with a strong earlier mark, or acquired distinctiveness evidence is needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadline first
One or two lines.

## What the examiner is saying
Table: ground | family | plain meaning | goods affected.

## Response options
Table per ground: option | what it means for you | preliminary strength.

## Evidence to gather
Checklist.

## Draft response points
Numbered points, plus amended specification wording if proposed.

## Questions for a trademark attorney
Numbered.
</output_format>
