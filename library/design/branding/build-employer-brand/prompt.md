---
schema: 1
id: build-employer-brand
kind: prompt
title: Build an employer brand
description: Builds an employer brand with an employee value proposition grounded in real staff evidence, proof points, a careers page structure and recruiting messages tailored by role.
category: branding
version: 1.0.0
status: incubating
stage: [plan, design]
role: [recruiter, marketer, manager, founder]
requires: [none]
inputs: [text, dataset, document]
output: [docs, copy, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employer-branding, employee-value-proposition, careers-page, recruitment-marketing, talent-attraction]
pairs_with:
  prompts: [build-brand-platform, write-brand-voice-guide, write-brand-story, plan-employee-advocacy]
  personas: [brand-strategist]
args:
  - name: company
    description: The company - what it does, size, locations and remote policy, stage, culture as leaders see it, pay and benefits approach, and the consumer brand if one exists.
    type: text
    required: true
  - name: roles
    description: The roles or talent groups you most need to attract, with where they come from and what competes for them, for example "senior backend engineers (compete with big tech and remote startups), warehouse shift leads (compete with local logistics firms)".
    type: text
    required: true
  - name: employee_input
    description: Evidence from current and former staff - survey results, interview notes, exit interview themes, review-site themes, quotes. Strongly recommended; without it the result is a hypothesis to test.
    type: text
output_contract:
  format: markdown
  sections: [Evidence summary, Employee value proposition, Proof points, Messages by role, Careers page structure, Channels and content, Honesty check, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most employer brands say the same thing: "a great culture", "passionate people", "we're like a family". Candidates ignore it, and current staff roll their eyes when the careers page describes a company they do not recognise. An employer brand that works is built from evidence of why people actually join, stay and leave; it makes a specific promise (the employee value proposition, or EVP) that is true for the people it is aimed at, admits the trade-offs, and is proven by real employees, numbers and policies rather than adjectives. It also adapts by role: a shift leader and a senior engineer care about different parts of the deal. Over-promising backfires as early attrition and public reviews.
</context>

<task>
Build an employer brand.

<company>
{{company}}
</company>

<roles>
{{roles}}
</roles>

{{#employee_input}}<employee_input>
{{employee_input}}
</employee_input>
{{/employee_input}}If no employee input was given, label the EVP as a hypothesis and include a short plan to gather evidence (a five-question survey and six to eight stay-and-exit interviews) before publishing.

1. **Evidence summary:** the main themes from the employee input on why people join, why they stay and why they leave, with how strong the evidence is for each (how many sources). Note gaps between leaders' view in the company description and staff evidence.
2. **Employee value proposition:** a core EVP statement in one or two sentences, and three to five pillars (for example the work itself, growth, people and leadership, flexibility, pay and security, mission). For each pillar: what it promises, who it is most true for, and the honest trade-off ("we move fast, which means priorities change often").
3. **Proof points:** for each pillar, the evidence that makes it believable: policies, numbers (promotion rates, tenure, pay transparency, learning budget), stories and quotes from real employees (use placeholders for quotes to collect, never invent quotes), and named practices. Mark which proof exists and which must be gathered.
4. **Messages by role:** for each role or group in {{roles}}, what that audience cares about most, the two pillars to lead with, a headline and short paragraph, objections they will have (pay, career path, location, shift patterns) and honest answers, and where they look for jobs.
5. **Careers page structure:** sections in order (the promise, what work is like, teams and roles, growth, benefits with specifics, hiring process with steps and timing, inclusion and accessibility of the process, real employee stories, open roles), with the purpose of each and the content needed. Include salary ranges in job ads where possible and note that some places require them by law, so the user should check local rules.
6. **Channels and content:** where to show up for each role, employee advocacy done with consent and without pressure, and a quarterly content plan of a few honest formats (day-in-the-life, team spotlights, hiring-process explainers).
7. **Honesty check:** list any claim in the company description that the evidence does not support, and how to reword or drop it. Flag clichés to avoid ("work hard, play hard", "family").
8. **Measurement:** application quality by source, offer acceptance rate and reasons for declines, early attrition (first 90 days), referral share, and review-site themes over time.
9. Before answering, check that every EVP pillar has at least one proof point that exists or a clear plan to collect it.
10. If the roles are not stated, ask which talent groups matter most and stop.
</task>

<constraints>
- Never invent employee quotes, statistics or awards; use placeholders and say what to collect.
- Do not promise what the company description does not support.
- Use inclusive, plain language in all copy; avoid gendered or age-coded wording.
</constraints>

<output_format>
Markdown with the contract's sections in order. The EVP pillars as a table (Pillar, Promise, Most true for, Trade-off, Proof exists or to gather). Messages by role as one block per role. The careers page as an ordered list of sections with purpose and content needed.
</output_format>
