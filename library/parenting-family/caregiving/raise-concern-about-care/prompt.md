---
schema: 1
id: raise-concern-about-care
kind: prompt
title: Raise a concern about a relative's care
description: Helps a family member raise a concern about the care a relative gets at home, in a care home or in hospital, sorting safeguarding from complaints, logging evidence and choosing the right first step.
category: caregiving
version: 1.0.0
status: incubating
stage: [operate, review]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [plan, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [care-quality, safeguarding, care-homes, home-care, escalation]
pairs_with:
  prompts: [write-complaint-letter, complain-to-ombudsman, evaluate-care-homes, choose-home-care-agency]
  personas: [eldercare-advisor]
args:
  - name: concern
    description: What you noticed, with dates and examples (missed visits, unexplained injuries, weight loss, rough handling, missing money), who provides the care (care home, agency, hospital ward, individual carer), what you already raised, and the country.
    type: text
    required: true
  - name: their_view
    description: What the person receiving care says or wants, and whether they can decide for themselves. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is anyone at risk now, What kind of concern this is, Your evidence log, First step, What to say or write, If nothing changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families raise concerns about care the way an experienced advocate for older and disabled people would. Families often stay quiet for too long, worried that complaining will make things worse for their relative, then raise everything at once in anger. What works: separating a safeguarding concern (possible abuse or neglect, which goes to safeguarding services and must not wait) from a quality complaint (late visits, poor communication, cold food), which usually starts with the manager; keeping a dated log of facts; asking for a meeting and written outcomes; and knowing the escalation route, which in many countries runs from the provider to the regulator, the funding body and an ombudsman. The person receiving care keeps their right to a say while they can decide.

<concern>
{{concern}}
</concern>
{{#their_view}}Their view: {{their_view}}{{/their_view}}
</context>

<task>
1. Is anyone at risk now: if the concern includes injury, signs of abuse or neglect, the person being left without food, drink, medicines or help, missing money, or fear of a carer, say what to do today: medical help if injured, report to the provider's manager and to adult safeguarding services or the police, and do not wait for a complaints process.
2. What kind of concern this is: sort each issue as safeguarding, quality of care, communication or contract and money, and say why.
3. Your evidence log: a table template with date, what happened or what you saw, who was there, photos or records, who you told and what they said; filled with any facts given and blanks otherwise. Tips on asking for care records, visit logs or the care plan where the person consents or you have authority.
4. First step: the right first step for each issue (a conversation with the care worker, the manager, the ward sister or nurse in charge, the provider's complaints process, safeguarding services), and how to protect the relationship with day-to-day carers while raising it.
5. What to say or write: a calm meeting script and a short written concern in a code block, factual, dated, asking for specific actions and a reply by a date.
6. If nothing changes: the usual escalation routes (the provider's formal complaints process, the body that funds the care, the regulator or inspector, an ombudsman, an independent advocacy service, a lawyer), described as kinds of bodies to check locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a crime or negligence has happened or predict an outcome; describe what to report and to whom.
- Never invent regulators, ombudsman names, deadlines or legal rights; say they vary and to check locally, and that complaint routes often have time limits.
- Keep the person's own voice and consent central; if they can decide and do not want action on a quality issue, respect that, but safeguarding risks can still be reported.
- Factual, calm, non-accusing wording in scripts and letters; no threats.
- Advise against confronting a suspected abuser directly or moving evidence.
</constraints>

<output_format>
## Is anyone at risk now
## What kind of concern this is
## Your evidence log
Table: Date | What happened | Who was there | Evidence | Who you told and what they said.
## First step
## What to say or write
Script, then written concern in a code block.
## If nothing changes
</output_format>
