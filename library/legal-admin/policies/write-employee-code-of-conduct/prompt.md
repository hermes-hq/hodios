---
schema: 1
id: write-employee-code-of-conduct
kind: prompt
title: Write an employee code of conduct
description: Drafts an employee code of conduct - respect, conflicts, gifts, confidentiality, company resources, social media, fair dealing, speaking up and consequences - with real examples staff recognise.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, operations-manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [code-of-conduct, workplace-ethics, employee-conduct, speak-up, conflicts-of-interest, company-values]
pairs_with:
  prompts: [write-employee-handbook, write-whistleblowing-policy, write-conflict-of-interest-policy, write-anti-bribery-policy]
args:
  - name: organisation
    description: What the organisation does, size, where staff work, the kinds of situations staff actually face (customer gifts, handling cash, client data, social media, side jobs, dealing with officials or competitors), any past problems, and existing policies to link to.
    type: text
    required: true
  - name: values
    description: The organisation's stated values or what leaders want the code to express, in their own words. Optional.
    type: text
  - name: jurisdiction
    description: Country or state where staff work, because some conduct rules are limited by employment law.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Introduction, Our standards, Real situations, Speaking up, Consequences, Acknowledgement, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft a code of conduct for employees. A code works when staff can use it to make a decision in a real moment, so the best ones are short, written in "we" and "you", organised by topic, and full of examples from the organisation's own work, with a simple test such as "would I be comfortable if this were reported to my manager or in the news?" and a clear place to ask. The usual topics: treating people with respect and no harassment, bullying or discrimination; safety; conflicts of interest and outside work; gifts and hospitality; bribery and dealings with officials; confidentiality and personal data; use of company equipment, systems and money; accurate records and no fraud; social media and speaking for the company; fair dealing with customers, suppliers and competitors, including not sharing prices or market plans with competitors; and speaking up, with protection from retaliation. The code points to detailed policies rather than repeating them. Legal limits matter: in the US, rules that could stop employees discussing pay and working conditions, or very broad confidentiality, social media or "no negativity" rules, can be unlawful; in many countries staff cannot be barred from reporting wrongdoing to regulators; and works councils or employee representatives may have to be consulted before conduct rules are introduced. Consequences should link to the disciplinary procedure, not threaten instant dismissal for everything.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>
{{#values}}

Values:
<values>
{{values}}
</values>
{{/values}}

1. Introduction: a short message from leadership, who the code applies to, and how to use it (the decision test and where to ask).
2. Our standards: a section for each relevant topic with what we expect in plain words and a link to the detailed policy [POLICY NAME] where one exists.
3. Real situations: at least six short scenarios drawn from the organisation's described work, each with the right action and why.
4. Speaking up: how to raise concerns (manager, named contact, confidential channel), what happens next, protection from retaliation, and that nothing stops anyone reporting to a regulator.
5. Consequences: link to the disciplinary procedure, proportionate responses, and that managers are held to the same standard.
6. Acknowledgement: a short statement staff sign or confirm, and when the code is reviewed.
7. Points to confirm, including consultation duties and any rule that may conflict with employment law in the jurisdiction.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not include rules that stop staff discussing pay or working conditions, reporting to regulators or law enforcement, or exercising other protected rights; if the user asks for them, explain why and offer a lawful version.
- Do not invent policies the organisation does not have; use [POLICY NAME] placeholders and list them in points to confirm.
- Keep the tone respectful and plain; avoid legal jargon and threats.
- Do not state legal requirements as fact for the jurisdiction unless confident; mark "confirm for {{jurisdiction}}".
{{> output/uncertainty}}
</constraints>

<output_format>
## Introduction
Short paragraphs.

## Our standards
One subsection per topic.

## Real situations
Table: situation | what to do | why.

## Speaking up
Numbered steps.

## Consequences
Short paragraph.

## Acknowledgement
Signature or confirmation text.

## Points to confirm
Numbered list.
</output_format>
