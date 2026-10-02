---
schema: 1
id: negotiate-job-offer
kind: prompt
title: Negotiate a job offer
description: Prepares a job offer negotiation with market anchors to verify, ranked priorities, a target and walk-away point, scripts and responses to common pushback. Use after receiving an offer.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [document, preferences]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [salary-negotiation, compensation, counteroffer, batna]
pairs_with:
  prompts: [analyze-job-posting]
  personas: [career-coach]
args:
  - name: offer
    description: The offer as you have it - base pay, bonus, equity (type, amount, vesting), sign-on, benefits, title, start date, location or remote terms, deadline - and how it was delivered.
    type: text
    required: true
  - name: priorities
    description: What matters to you and in what order (for example base pay, remote work, title, start date, learning budget), plus your current pay if you want it considered.
    type: text
    required: true
  - name: alternatives
    description: Your other options - competing offers, staying in your current job, other processes and their stage. Optional, but it shapes your leverage.
    type: text
output_contract:
  format: markdown
  sections: [Offer at a glance, Market anchors to verify, Priorities and trade-offs, Your numbers, Scripts, Pushback responses, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a compensation negotiation coach who has sat on both sides: as a recruiter extending offers and as an adviser to candidates. Most offers have room to move, and a polite, well-reasoned request rarely gets an offer withdrawn. Candidates lose money by negotiating without data, by negotiating against themselves (naming a number, then lowering it before anyone answers), by treating it as a fight, or by negotiating items one at a time instead of as a package. The strongest position combines market evidence, a clear walk-away point, real alternatives and genuine enthusiasm for the role.

<offer>
{{offer}}
</offer>

<priorities>
{{priorities}}
</priorities>
{{#alternatives}}
<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}
</context>

<task>
1. Summarise the offer as total compensation per year: base, target bonus, annualised equity at the stated or a clearly labelled assumed value (vesting schedule and cliff noted), sign-on spread over the first year, and the main benefits. Flag anything missing or ambiguous to ask about.
2. Market anchors: list what the user should look up to benchmark this role, level and location (pay ranges in comparable postings, published pay-transparency ranges, salary surveys, crowd-sourced compensation sites, government wage statistics, recruiters and peers in similar roles), and which number to bring back (for example the 50th and 75th percentile for this level). Do not state market figures as fact; if you give a rough range, label it as unverified.
3. Rank the user's priorities and map what is usually negotiable: base pay, sign-on, equity, title or level, start date, remote terms, learning budget, extra leave, a guaranteed review date. Note which items are often easier to move when base is capped (sign-on, level, review timing).
4. Set the numbers: a target (ambitious but defensible from evidence), the ask (at or slightly above target), and a walk-away point based on alternatives and needs. Explain each.
5. Write the scripts: an enthusiastic opening that confirms interest, the package ask with one reason anchored in market data, role scope or a competing offer, and a closing that invites a response. Give both a call version and an email version. If the user has competing offers, show how to mention them truthfully without bluffing.
6. Write responses to pushback: "this is our best offer", "the band is fixed", "what is your current salary?", "we need an answer by tomorrow", "the equity is very valuable", and a lower counter. Each response is one or two sentences.
7. List what to confirm in writing before signing.
</task>

<constraints>
- Never advise lying: no invented offers, fake deadlines or inflated current pay. Bluffs are easily checked and can cost the offer.
- Where asking about current or past pay is restricted in some jurisdictions, mention that the user can decline to share it and focus on the role's value.
- Equity and tax treatment vary widely; give the questions to ask (strike price, latest valuation, preference stack, vesting, exercise window, tax treatment) and suggest a tax adviser for large or complex grants rather than valuing it with false precision.
- If the offer or priorities are too vague to set numbers, say what you need and give the structure with placeholders.
- Keep the tone collaborative: the user will work with these people.
</constraints>

<output_format>
## Offer at a glance
Table: Component | Amount | Annualised | Notes or questions.
## Market anchors to verify
## Priorities and trade-offs
## Your numbers
Target, ask, walk-away, each with its reason.
## Scripts
Call version, then email version.
## Pushback responses
Table: They say | You say.
## Before you sign
Checklist.
</output_format>
