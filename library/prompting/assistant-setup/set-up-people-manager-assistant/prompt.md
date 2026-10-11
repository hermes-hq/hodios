---
schema: 1
id: set-up-people-manager-assistant
kind: prompt
title: Set up an AI assistant for a people manager
description: Sets up an assistant for a people manager with team context kept anonymous, your company's HR rules, and saved prompts for 1:1s, feedback, reviews and hard conversations.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, engineering-manager, operations-manager]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [one-on-ones, employee-privacy, performance-feedback, hr-escalation]
pairs_with:
  prompts: [build-project-instructions, plan-one-on-one, set-up-assistant-for-new-job]
  rules: [privacy-first-assistant-rules, candid-feedback-rules]
args:
  - name: team
    description: Your role, team size and kind of work, what you find hard as a manager, and the jobs you want help with (1:1 prep, feedback, reviews, goals, hiring, team updates).
    type: text
    required: true
  - name: company_rules
    description: "Optional: your company's rules on AI tools and employee data, the review process, and where HR guidance lives."
    type: text
  - name: country
    description: "Optional: the country or countries your team works in, since employment law and norms differ."
    type: string
output_contract:
  format: markdown
  sections: [Manager profile, Assistant instructions, Employee data rules, Saved prompts, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers use assistants to prepare 1:1s, phrase difficult feedback, write review summaries and plan team changes. The useful part is structure and wording: feedback built from specific behaviour and impact rather than personality, review text grounded in examples, conversations rehearsed before they happen. The risks are about people: pasting named employees' health, performance or personal details into a tool the company has not approved; letting the assistant make or justify decisions about pay, discipline or dismissal; writing review language that drifts into protected characteristics (age, pregnancy, disability, ethnicity); and acting on a situation that needs HR or legal advice. A good setup keeps people anonymous by default, grounds everything in observed behaviour, and knows when to stop and say "talk to HR".

<team>
{{team}}
</team>
{{#company_rules}}
<company_rules>
{{company_rules}}
</company_rules>
{{/company_rules}}
{{#country}}
Country: {{country}}
{{/country}}
</context>

<task>
1. Write a manager profile: role, team size and work, the manager's goals and weak spots, jobs to help with. Mark gaps [CONFIRM].
2. Write assistant instructions, ready to paste, that:
   - refer to people by role or initials only;
   - turn feedback into situation, behaviour and impact, with a specific request or next step;
   - ground review text in examples the manager supplies, and ask for examples when given only adjectives;
   - flag wording that touches protected characteristics, health or family circumstances;
   - help prepare and rehearse conversations, but leave decisions on pay, discipline, performance plans and dismissal to the manager and HR;
   - say "involve HR" for grievances, harassment, discrimination, health and absence issues, misconduct, redundancy and anything legal;
   - be candid with the manager about their own part in a problem.
3. Write employee data rules: what never to paste (health, medical notes, family details, grievance or investigation details, salaries with names, personal contact data), what is fine (anonymised behaviour examples, the manager's own notes with initials), and to follow company rules and approved tools. Quote the company rules if given; otherwise tell the manager to check with HR or IT.
4. Write saved prompts for each job named (default: 1:1 prep, feedback draft, review summary, hard conversation rehearsal): the prompt, what to paste in, and a check before use.
5. Give four tests, including a named employee's medical leave and "help me build a case to fire someone".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state employment law for any country; mark legal questions for HR or an employment adviser.
- Do not write content that evaluates someone on protected characteristics.
- Keep the instructions under about 2,000 characters.
</constraints>

<output_format>
## Manager profile
Bullets with [CONFIRM] gaps.
## Assistant instructions
One fenced block, ready to paste.
## Employee data rules
Two short lists: never paste, fine to paste.
## Saved prompts
One short subsection per job.
## Tests
Four bullets: prompt and pass condition.
</output_format>
