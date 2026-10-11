---
schema: 1
id: choose-mvp-build-approach
kind: prompt
title: Choose how to build your MVP
description: Chooses how a founder should build an MVP - concierge or manual, no-code, AI coding tools, a freelancer, an agency or a technical cofounder - with cost, time, risk and lock-in for each.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder]
requires: [none]
inputs: [text, spec]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [mvp, no-code, build-vs-buy, technical-cofounder, concierge-mvp]
pairs_with:
  prompts: [define-mvp-scope, spec-app-idea-for-developers, review-dev-agency-proposal, find-cofounder]
args:
  - name: product
    description: What the MVP must do for its first users - the core flows, who uses it, roughly how many users at first, and any data, payments, integrations or devices involved.
    type: text
    required: true
  - name: founder_resources
    description: Your technical skills, budget, deadline, hours a week, and whether you are looking for a technical cofounder.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the MVP must prove, Options compared, Recommendation, Risks and how to limit them, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise non-technical and semi-technical founders on how to get a first version built. The most expensive mistake is building software before it is needed: many MVPs can be tested manually (a concierge service, a form plus a spreadsheet, a human doing what the software will later do). After that, the options trade cost, speed, control and later rework. No-code and AI coding tools are fast and cheap for standard flows but hit limits with complex logic, scale, data protection or unusual integrations, and someone still has to maintain what they build. Freelancers vary hugely in quality and need a clear brief. Agencies cost more and can be slower but bring a team. A technical cofounder costs equity and time to find, but is usually needed if the product itself is the company's edge.

<product>
{{product}}
</product>

<founder_resources>
{{founder_resources}}
</founder_resources>
</context>

<task>
1. Say what the MVP must prove (the riskiest assumption) and whether any part could be tested without building software first.
2. Compare the options that fit: manual or concierge, no-code platform, AI coding tools used by the founder, freelancer, agency, technical cofounder. For each: rough cost range as a label (low, medium, high) unless the founder gave figures, time to first users, quality and maintainability, what the founder must do, lock-in and the path to a rebuild, and fit with this product's technical risks.
3. Recommend one route, or a sequence (for example concierge for four weeks, then no-code, then a developer once paying users exist), with reasons tied to the budget, deadline and skills.
4. Name the risks of the chosen route and how to limit them: owning accounts, code and data from day one; a written scope; milestone payments; security and privacy basics for user data; avoiding platforms that cannot export data.
5. Next steps for the next two to four weeks.
</task>

<constraints>
- Do not quote specific prices or day rates unless the founder gave them; use relative labels and suggest getting two or three quotes.
- Do not recommend specific vendors or products by name as the answer; describe the type of tool and what to check when choosing one.
- If the product handles payments, health, financial or children's data, flag that this raises security and compliance needs that a quick build may not meet, as checks to make.
- If the founder has a very small budget and no skills, say so honestly and favour manual testing over building.
</constraints>

<output_format>
## What the MVP must prove
## Options compared
Table: Option | Cost | Time to first users | Quality and maintenance | Lock-in | Fit.
## Recommendation
## Risks and how to limit them
Bullets.
## Next steps
Numbered.
</output_format>
