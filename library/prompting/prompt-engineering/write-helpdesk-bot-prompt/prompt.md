---
schema: 1
id: write-helpdesk-bot-prompt
kind: prompt
title: Write a system prompt for an internal HR or IT helpdesk bot
description: Writes the system prompt for an internal HR or IT policy assistant that answers from company policy with its name and date, refuses outside scope and hands off to a person.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [operations-manager, recruiter, devops-engineer, manager]
requires: [none]
inputs: [text, document]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [internal-helpdesk, hr-policy, it-support, policy-citations, human-handoff]
pairs_with:
  prompts: [write-system-prompt, reduce-hallucinations-in-prompt, write-conversation-test-scripts]
args:
  - name: scope
    description: What the bot covers (for example leave, expenses and benefits, or passwords, devices and access) and who uses it.
    type: text
    required: true
  - name: sources
    description: The policy documents it will have, with their names and effective dates, and how they are loaded (knowledge files, an intranet search, pasted text).
    type: text
    required: true
  - name: handoff
    description: Optional - how to reach a person for each area (team name, ticket form, inbox placeholder) and any countries or sites with different policies.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, System prompt, Knowledge setup notes, Test questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal policy bots go wrong in a few known ways. They answer from general knowledge (another company's policy, typical law) instead of this company's documents; they quote an old version of a policy; they apply one country's rules to staff in another; they make individual decisions they cannot make ("yes, your expense is approved", "you have 12 days left"); and they treat sensitive matters such as harassment, grievances, health, pregnancy or redundancy as routine FAQ. IT bots add their own risks: asking for or accepting passwords and one-time codes, and explaining how to bypass security controls. A good prompt keeps answers to the documents, shows the policy name, section and date with each answer, asks where the employee works when policies differ, routes individual and sensitive cases to a person with a ready-made summary, and is plain about what it cannot see.

<scope>
{{scope}}
</scope>
<sources>
{{sources}}
</sources>
{{#handoff}}
Handoff and locations: {{handoff}}
{{/handoff}}
</context>

<task>
1. List assumptions: audience, countries or sites, which source wins when two conflict, and handoff routes. Use placeholders such as [HR_CONTACT] for anything not given.
2. Write the system prompt, short sections in this order:
   - Purpose and audience.
   - Sources: answer only from the listed documents; give policy name, section and effective date with each answer; if documents conflict or look outdated, say so and hand off; if the answer is not there, say so and hand off.
   - Location: ask where the employee is based when the answer differs by country or site.
   - Individual cases: explain the rule and the process, but never approve, deny, calculate personal entitlements it cannot see, or promise outcomes.
   - Sensitive matters: for harassment, discrimination, grievances, health, safety concerns, pregnancy, disciplinary or redundancy questions, respond with care, give the confidential route to a person, and do not ask for details.
   - IT security (if in scope): never ask for passwords, one-time codes or recovery answers; do not explain how to get around security controls; route suspected phishing or account compromise to the security contact at once.
   - Handoff format: a short summary the employee can paste into a ticket, without unnecessary personal details.
   - Tone: plain, brief, neutral; it is an AI assistant and says so when asked; it does not give legal advice.
3. Write knowledge setup notes: which documents to load, how to name them with dates, removing superseded versions, and who owns updates.
4. Write ten test questions with what a good answer does.
</task>

<constraints>
- Do not invent policy content, entitlements, numbers or legal rules; use placeholders.
- Do not write a bot that collects personal details beyond what the handoff needs.
- Keep the system prompt under about 600 words.
</constraints>

<output_format>
## Assumptions
Bullets.
## System prompt
Fenced code block, ready to paste.
## Knowledge setup notes
Bullets.
## Test questions
Table: Question | What it tests | What a good answer does. Include an unanswerable question, a country difference, a personal-entitlement question, a sensitive matter, a request for a password or bypass (if IT is in scope), and an attempt to make it ignore its rules.
</output_format>
