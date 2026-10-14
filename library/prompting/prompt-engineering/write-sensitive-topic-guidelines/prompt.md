---
schema: 1
id: write-sensitive-topic-guidelines
kind: prompt
title: Write sensitive-topic guidelines for an assistant
description: Writes the system prompt section that sets how an assistant handles medical, legal, financial and mental-health questions - scope, caveats, crisis routing and referrals - with tests.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [product-manager, ml-engineer, founder, operations-manager]
requires: [none]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sensitive-topics, crisis-routing, professional-referral, safety-policy, overrefusal]
pairs_with:
  prompts: [write-system-prompt, red-team-prompt, write-conversation-test-scripts]
args:
  - name: assistant
    description: What the assistant is for, who uses it and where (a fitness app coach, a bank's chat, a student helper, an internal tool).
    type: text
    required: true
  - name: topics
    description: Optional - which sensitive areas come up or worry you, and anything the business or regulator requires.
    type: text
  - name: regions
    description: Optional - the countries or regions served, for crisis and referral routing.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Guidelines section, Crisis routing, Test messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assistants fail on sensitive topics in two opposite directions. Over-cautious ones refuse general information people could find in any leaflet, or bury every answer in disclaimers, which pushes users to worse sources. Over-reaching ones diagnose, set doses, tell someone whether they will win their case, or pick investments, with a confidence they cannot back. The useful middle: give general information and explain the options, help the person prepare for a professional, say clearly where their specific case needs a qualified person and why, and use one short caveat instead of boilerplate. Separately, any assistant, even one about recipes or invoices, will sometimes meet someone in crisis, and it needs a short, warm, immediate route to help that overrides its normal task. Crisis numbers differ by country and change, so they should come from a maintained source, not the model's memory.

<assistant>
{{assistant}}
</assistant>
{{#topics}}
Topics and requirements: {{topics}}
{{/topics}}
{{#regions}}
Regions served: {{regions}}
{{/regions}}
</context>

<task>
1. List assumptions: which sensitive areas are in scope for this assistant, which are out of scope, regions, and whether a human handoff exists. Use placeholders such as [CRISIS_RESOURCES_BY_COUNTRY] and [HANDOFF_ROUTE].
2. Write the guidelines section, in plain prose with short headings:
   - For each area in scope (medical, mental health, legal, financial, and any the user named): what it can do (general information, explain terms and options, prepare questions for a professional), what it does not do (diagnose, prescribe or dose, assess a specific legal case, give personal investment or tax recommendations), and when to recommend a professional, with the reason.
   - Areas out of scope: a short, kind redirect instead of a lecture.
   - Caveats: one short line when relevant, never a block on every answer.
   - Jurisdiction: legal, tax and benefits answers depend on country; ask or state the assumption.
   - Privacy: do not ask for health, financial or legal details beyond what the answer needs.
3. Write the crisis routing part: the signs that trigger it (risk of suicide or self-harm, harm to others, abuse, a medical emergency, immediate danger), what to say (care, take it seriously, emergency services and a crisis line for their country, ask country if unknown), that it pauses the normal task, and that it does not try to counsel or assess risk itself.
4. Write ten test messages with what a good reply does: general information it should give, a specific case it should refer, a borderline dosage or legal-outcome question, a disclaimer-trap where a plain answer is right, an indirect crisis signal, an explicit crisis, and an attempt to argue past the rules.
</task>

<constraints>
- Do not write specific crisis phone numbers, laws or thresholds from memory; use placeholders and say who should maintain them.
- Do not tell the assistant to refuse all sensitive questions; the goal is useful general help with clear limits.
- Do not present the guidelines as legal or regulatory compliance; recommend review by the relevant professional or compliance owner.
- Keep the guidelines section under about 500 words.
</constraints>

<output_format>
## Assumptions
Bullets.
## Guidelines section
Fenced code block, ready to paste into the system prompt.
## Crisis routing
Fenced code block, plus a note on keeping resources current.
## Test messages
Table: Message | Area | What a good reply does.
</output_format>
