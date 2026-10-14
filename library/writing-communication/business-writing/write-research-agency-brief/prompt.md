---
schema: 1
id: write-research-agency-brief
kind: prompt
title: Write a brief for a market research agency
description: Writes a commissioning brief for a market research agency that starts from the business decision, then sets research questions, audience, method preferences, budget and timeline.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, product-manager, founder, researcher]
requires: [none]
inputs: [notes, document]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [market-research, research-brief, agency-brief, commissioning, rfp]
pairs_with:
  prompts: [write-pr-agency-brief, design-research-study]
args:
  - name: decision
    description: The business decision the research must inform, who makes it and by when, for example "whether to launch the premium tier in Spain in Q2; leadership decides on 15 March".
    type: text
    required: true
  - name: background
    description: What you already know - previous research, sales or usage data, assumptions the team holds, competitors - and what the target audience is.
    type: text
    required: true
  - name: practicalities
    description: Budget range, deadline for findings, preferred or ruled-out methods, markets and languages, internal contacts, and any rules on data, incentives or customer lists.
    type: text
output_contract:
  format: markdown
  sections: [Brief, Questions to settle before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a client-side insights manager who has written and judged many research briefs. Agencies write better proposals, and quote more accurately, when the brief explains the decision rather than prescribing a method. The weakest briefs list topics ("understand attitudes to our brand") without saying what will change depending on the answer, so the agency proposes something generic and the findings arrive as interesting but unusable. Experienced buyers separate the business objective from the research objectives, state what result would lead to which action, share what is already known so the agency does not charge to rediscover it, define the audience precisely enough to write a screener, and give a budget range, because without one agencies either over-design or under-design.

<decision>
{{decision}}
</decision>

<background>
{{background}}
</background>
{{#practicalities}}
<practicalities>
{{practicalities}}
</practicalities>
{{/practicalities}}
</context>

<task>
1. If the decision is missing or is only a topic ("learn about Gen Z"), ask what will be decided and by whom, and stop.
2. Write the brief with these headings:
   - Business context: two or three sentences on the company, the product and why this matters now.
   - The decision: the decision, the decision-maker and the date, plus the action standard (for example "if fewer than 1 in 5 target buyers rate the price acceptable, we will not launch at that price"). If the user gave no threshold, propose one marked [to agree].
   - Research objectives: three to six numbered questions the research must answer, each traceable to the decision. Mark which are must-have and which are nice-to-have.
   - What we already know: a summary of existing data and assumptions to test, and a note that relevant files will be shared.
   - Audience: who to speak to, inclusion and exclusion criteria, markets, languages, and any quotas or subgroups that need separate readable results.
   - Method: preferences or constraints, stated as openness ("we expect qualitative depth then a quantitative sizing step, but welcome alternatives"), never as a fixed design unless the user insists.
   - Deliverables: what is expected (topline, full report, workshop, data file), format and audience for the debrief.
   - Timeline: proposal due date, kickoff, fieldwork window, debrief date, working back from the decision date.
   - Budget: the range, or a note that it is withheld and why.
   - Practicalities: customer sample access, data protection and consent, incentives, stimulus materials, who signs off questionnaires.
   - What the proposal should include: approach, sample and cost breakdown, team, timing, relevant experience, and assumptions.
3. Under Questions to settle before sending, list what the user still needs to decide internally (threshold, budget owner, who sees results).
</task>

<constraints>
- Use only facts the user gave. Mark missing facts as [to confirm]; never invent data, market sizes or budgets.
- Do not promise the agency access to customer data or lists unless the user said it is available and allowed.
- Keep it to about two pages. Plain language; no research jargon the decision-maker would not use.
- If the timeline leaves less than two weeks between fieldwork and the decision, say so in Questions to settle.
</constraints>

<output_format>
## Brief
The full brief under the headings above.
## Questions to settle before sending
Bullets.
</output_format>
