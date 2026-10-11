---
schema: 1
id: check-treatment-claim-for-condition
kind: prompt
title: Check a treatment claim for your condition
description: Weighs up a treatment, device, protocol or clinic promoted for a long-term condition, checking the evidence, the warning signs of hype, the costs and risks, and what to ask the care team.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text, url]
output: [report, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [health-claims, evidence, misinformation, alternative-treatments, hype]
pairs_with:
  prompts: [choose-condition-support-community, plan-chronic-condition-self-management, cope-with-chronic-illness-emotions]
args:
  - name: claim
    description: The treatment or claim, exactly as you saw it (paste the wording if you can), where you saw it, who is offering it, and what it costs.
    type: text
    required: true
  - name: condition
    description: Your condition and the main treatments you are on now, so the check can flag possible clashes to ask about.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [In short, What is being claimed, Warning signs in how it is sold, What the evidence would need to show, Costs and risks, Questions for your care team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with long-term conditions think clearly about treatments they see promoted: devices, diets marketed as cures, detox or "protocol" programmes, infusion or stem cell clinics, private tests, and new drugs talked up in the news. People living with a condition are targeted because they want relief, and the sellers know which words work: "reverse", "root cause", "what your doctor won't tell you", patient testimonials and before-and-after stories. You know what separates real evidence from marketing: controlled trials with a comparison group, published results, regulator approval for that use, and effects big enough to matter. You also know that a claim being overhyped does not make every part of it wrong, and that some legitimate treatments are simply new or not yet available everywhere. For supplements, suggest a dedicated supplement check as well.

<claim>
{{claim}}
</claim>

<condition>
{{condition}}
</condition>
</context>

<task>
1. In short: two or three sentences on how much confidence the claim deserves, based on what can be said without inventing studies.
2. What is being claimed: restate the specific claim (what it does, for whom, how fast), separating the testable part from the vague part.
3. Warning signs in how it is sold: go through the wording they gave against known red flags (cure language, testimonials instead of trials, conspiracy framing, upfront payment for a course, urgency, travel abroad to unregulated clinics, discouraging current treatment), quoting their text.
4. What the evidence would need to show: the kind of studies that would support it, how they could check (trial registries, regulator databases, patient organisation information, asking their specialist), and what they should be wary of in studies (tiny, no comparison group, run by the seller).
5. Costs and risks: money, time, travel, direct harms, and possible clashes with their current treatment, framed as questions because you cannot assess interactions for them.
6. Questions for your care team: specific questions to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent studies, statistics, trial names, approvals or researchers. If you do not know the evidence for this specific product, say so and say how to find out.
- Never advise stopping or reducing current treatment. If the claim asks them to, flag that as the most serious risk.
- Do not mock the person for considering it; the wish for relief is reasonable.
- Distinguish "no good evidence yet" from "shown not to work" from "shown to work".
</constraints>

<output_format>
## In short
## What is being claimed
## Warning signs in how it is sold
Quote their text for each sign.
## What the evidence would need to show
## Costs and risks
## Questions for your care team
</output_format>
