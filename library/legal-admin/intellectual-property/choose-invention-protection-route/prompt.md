---
schema: 1
id: choose-invention-protection-route
kind: prompt
title: Choose how to protect an invention
description: Compares patent, trade secret, design protection, publishing defensively or simply moving fast for a specific invention and business, and lists the decisions and questions for a patent attorney.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, researcher, individual]
subject: [law]
requires: [none]
inputs: [text]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [patent-strategy, trade-secrets, defensive-publication, design-rights, protection-options]
pairs_with:
  prompts: [prepare-invention-disclosure, plan-prior-art-search, audit-small-business-ip]
args:
  - name: invention_and_business
    description: What the invention is, whether it can be reverse-engineered from the product, how you will make money from it (sell products, license, raise investment), your budget, the markets that matter, competitors, and any public disclosure so far.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The key facts, Options compared, Preliminary fit, Decisions to make, Questions for a patent attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an inventor or small company think through how to protect an invention before spending on a patent. Experienced advisers ask a few questions first: can a competitor learn the invention by buying and taking apart the product (if yes, secrecy will not hold); will the business license it or raise investment (investors and licensees often value granted or pending patents); is the commercial life longer than the time to grant; can the business afford to file in the markets that matter and to enforce; and is the value in how the product looks (design protection) rather than how it works. A patent trades public disclosure for a time-limited right that costs money in each country and is only as useful as the owner's ability to enforce it. Trade secrets last as long as secrecy holds but give no protection against independent invention or reverse engineering. Defensive publication stops others patenting the idea but gives the publisher no exclusivity.
</context>

<task>
<facts>
{{invention_and_business}}
</facts>

1. The key facts: summarise the facts that decide the choice (reverse-engineerability, business model, budget, markets, commercial life, disclosures). Ask about any missing fact that would change the outcome.
2. Options compared: patent, trade secret, registered or unregistered design protection where the appearance matters, defensive publication, and speed to market without formal protection. For each: what it protects, what it does not, cost drivers (described, not quoted), time, enforcement realities, and fit with these facts.
3. Preliminary fit: which option or combination looks strongest for this business and why, labelled as a preliminary view for an attorney to test. Combinations are common (patent the mechanism, keep the process secret).
4. Decisions to make: the choices the founder must take and by when, including stopping further public disclosure until advised.
5. Questions for a patent attorney specific to this invention and budget.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend filing or not filing as a final answer; give a preliminary fit and the decisive questions.
- Do not quote filing fees, attorney costs or terms of protection as fact; describe cost drivers and say to get quotes.
- Do not state country-specific rules (grace periods, eligibility) as fact; flag them to verify.
- If any disclosure has happened or is imminent, flag it at the top.
{{> output/uncertainty}}
</constraints>

<output_format>
## The key facts
Bullets, with any disclosure flag first, then open questions.

## Options compared
Table: option | protects | does not protect | cost drivers | time | enforcement | fit.

## Preliminary fit
Short paragraph.

## Decisions to make
Numbered with timing.

## Questions for a patent attorney
Numbered.
</output_format>
