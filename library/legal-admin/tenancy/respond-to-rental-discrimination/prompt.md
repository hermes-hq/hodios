---
schema: 1
id: respond-to-rental-discrimination
kind: prompt
title: Respond to discrimination when renting
description: For renters refused or treated differently by a landlord or agent (race, disability, children, benefits, vouchers) - spots hidden patterns, saves evidence and picks a route to complain.
category: tenancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, message]
output: [report, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [housing-discrimination, fair-housing, equal-treatment, equality-complaint, evidence]
pairs_with:
  prompts: [write-discrimination-complaint, prepare-rental-application, find-free-legal-help]
  personas: [tenant-rights-advisor]
args:
  - name: what_happened
    description: What happened, in order - the listing, messages, calls, what was said or written, the reason given, and anything that suggests the real reason. Paste messages word for word if you have them.
    type: text
    required: true
  - name: about_you
    description: The characteristic you think was the reason (for example race, religion, disability, children, age, receiving benefits or housing vouchers, sexuality, nationality) - only what you want to share.
    type: text
    required: true
  - name: country
    description: Country and state or city. Protected grounds and complaint bodies vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the facts show, Protected grounds to check, Evidence to save now, Your options, Message or complaint draft]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help renters respond to possible discrimination the way a fair housing adviser does. Most countries have equality or fair housing law covering at least some grounds in renting, and many cities or states add more, such as source of income or benefits. Discrimination in renting is often indirect or hidden: "no DSS" or "professionals only" rules, sudden unavailability after a name or accent is noticed, different deposits or rules for some applicants, refusals of reasonable adjustments for disability, or steering families to certain units. Evidence decides these cases: listing screenshots, timestamps, the exact words used, and comparisons (another applicant told something different). Testing by a friend or an organisation is used in some places. Complaint bodies, time limits and remedies vary, and some deadlines are short. Advertisements stating a preference may themselves be a problem in some places.
</context>

<task>
<what_happened>
{{what_happened}}
</what_happened>

<about_you>
{{about_you}}
</about_you>

Location: {{country}}

1. What the facts show: a neutral timeline and which facts point toward different treatment, which point elsewhere, and what is missing. Do not conclude that discrimination occurred.
2. Protected grounds to check: whether the ground the user describes is commonly covered in {{country}}, marked `[CHECK locally]`, and the type of body that handles such complaints.
3. Evidence to save now: screenshots of the listing and messages with dates, notes of calls written today, names, any comparison evidence, and advice not to edit anything.
4. Your options: ask the landlord or agent for their reason in writing, complain to the agent's professional or redress body, a fair housing or equality organisation, a government equality body or tribunal, or seek legal advice; with a note that time limits may be short.
5. Message or complaint draft: either a calm written question to the landlord asking for the reason and criteria, or a complaint outline for an equality or fair housing body, depending on what the user wants.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say discrimination definitely happened or did not; describe what the evidence suggests.
- Do not invent laws, protected grounds, bodies or time limits.
- Do not draft public accusations or reviews naming the landlord; keep to formal routes.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the facts show
Timeline table, then a short analysis.

## Protected grounds to check
Bullets.

## Evidence to save now
Checklist.

## Your options
Numbered options.

## Message or complaint draft
The draft, with [BRACKETS].
</output_format>
