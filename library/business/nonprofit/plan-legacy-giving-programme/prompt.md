---
schema: 1
id: plan-legacy-giving-programme
kind: prompt
title: Plan a legacy giving programme
description: Plans a nonprofit programme for gifts in wills, with who to talk to, sensitive messages, a stewardship journey for pledgers, how to handle notifications and estates, and realistic expectations.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive]
requires: [none]
inputs: [text]
output: [plan, copy, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [gifts-in-wills, planned-giving, donor-stewardship, bequests, long-term-income]
pairs_with:
  prompts: [plan-major-donor-cultivation, write-gift-acceptance-policy, write-donor-thank-you]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: What the organisation does, how long it has existed, its supporters (numbers, age profile if known, long-standing donors, volunteers), any legacies received so far, country, and who would run the programme.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is this worth doing now, Who to talk to, The message, Ways people can tell us, Stewardship journey, When a legacy is notified, Measures, Questions for a legal adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit start or improve legacy fundraising: gifts left in supporters' wills. It is often the largest source of voluntary income for established charities and the most neglected, because the payoff can be years away and staff feel awkward raising death. Experienced legacy fundraisers know that the best prospects are loyal long-term supporters and volunteers, not the wealthiest donors; that the message is about values and what the supporter's life has stood for, not death; that most legacies come from people who never told the charity, so making it easy to mention a gift "in passing" matters more than formal pledge forms; and that the organisation must never pressure anyone, especially older or vulnerable people, or get involved in writing someone's will.

Organisation: {{organisation}}
</context>

<task>
1. Is this worth doing now: a frank view of the potential given the organisation's age, supporter base and capacity, and the minimum viable version if resources are thin.
2. Who to talk to: segments in priority order (long-standing donors, regular givers, volunteers, former service users and families, people who have given in memory), and how to find them in the data.
3. The message: three or four message lines in the organisation's voice that connect a gift in a will to the supporter's values and the future of the cause; one short paragraph for a newsletter and a line for the website; explain why residuary gifts (a share of what is left) tend to keep their value better than fixed sums without pushing either.
4. Ways people can tell us: a simple, optional way to say they have left or are considering a gift, with no obligation, and how the organisation will use that information.
5. Stewardship journey: how to thank and keep in touch with people who have told you, without being morbid or frequent, for example an annual update, an event, a personal note.
6. When a legacy is notified: a checklist for a respectful response to the family or executor, recording, the gift acceptance check, and when to seek professional help with an estate.
7. Measures: leading indicators (people who told us, conversations held, enquiries) as well as income, which may take years to arrive.
8. Questions to put to a legal adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft or advise on the content of a supporter's will. Always point supporters to an independent solicitor, lawyer or notary, and never suggest the organisation's staff witness a will or recommend a particular adviser in a way that creates a conflict.
- Do not target people because they are old, ill or bereaved, and never pressure; include a clear line on protecting people who may be vulnerable.
- Inheritance, tax relief and will-making rules differ widely by country. Do not state tax benefits or legal formalities as fact; say to check locally.
- Do not invent legacy income projections; if you give a range, label it as an assumption.
</constraints>

<output_format>
## Is this worth doing now
## Who to talk to
## The message
## Ways people can tell us
## Stewardship journey
Table: When | What | Channel.
## When a legacy is notified
Checklist.
## Measures
## Questions for a legal adviser
</output_format>
