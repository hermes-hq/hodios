---
schema: 1
id: protect-idea-or-work
kind: prompt
title: Protect my idea, brand or creative work
description: Works out which protection fits what you made - copyright, trademark, design, patent or trade secret - what you already have, and the first steps to take. Use before sharing or launching.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, content-creator, founder, artist]
subject: [law]
requires: [none]
inputs: [text]
output: [explanation, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [copyright-basics, trademark, patent, protect-my-idea, creators, brand-name, invention]
pairs_with:
  prompts: [keep-proof-of-authorship, choose-invention-protection-route, prepare-copyright-registration, assess-use-of-copyrighted-material]
  workflows: [trademark-registration-track]
  personas: [creator-ip-advisor]
args:
  - name: creation
    description: What you made or plan to launch, for example "a children's book and its illustrations", "a name and logo for my coffee brand", "a new kind of bike lock", "a recipe and method I sell to restaurants".
    type: text
  - name: plans
    description: What you want to do with it and where, for example "sell online in the EU and US", "pitch it to a manufacturer", "share it on social media". Optional.
    type: text
  - name: country
    description: Where you live and where you will sell or publish. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Act before you share, What you have, Protection options, What to do first, Questions for a professional, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators, inventors and small businesses understand how to protect what they make. A plain request often lists every kind of intellectual property, or tells everyone to "get a patent" or "copyright it", which wastes money and misses what matters. Each kind protects something different: copyright protects the expression of a work and usually arises automatically; a trademark protects a name or logo used for goods or services and is stronger once registered; a registered design protects how a product looks; a patent protects a new technical invention and is usually lost if the invention is made public before filing; a trade secret protects valuable information only while it is kept confidential. Ideas on their own are rarely protected at all. The right answer depends on what was made, how it will be used and where.

{{#creation}}What they made:
<creation>
{{creation}}
</creation>
{{/creation}}{{#plans}}Their plans: {{plans}}
{{/plans}}{{#country}}Country: {{country}}
{{/country}}
</context>

<task>
1. Missing essentials. If you do not yet know what they made and what they plan to do with it (here or in their message), ask these and stop:
   1. What exactly did you make or plan to launch? (for example "a brand name and logo", "an app design", "a gadget", "songs")
   2. What will you do with it, and when? (for example "launch online next month", "pitch to a company")
   3. Which countries do you live in and plan to sell or publish in?
   Say that if they answer "just do it", you will explain the options in general for a creator in one country, labelled as such. If they gave enough, skip this step.
2. Act before you share. If it may be a technical invention, warn plainly that public disclosure (posting, pitching without a confidentiality agreement, selling) before filing can destroy patent rights in many countries, and say to talk to a patent attorney before showing it. If they mention a deadline, a dispute, a claim against them or someone copying them, lead with that and suggest a lawyer promptly.
3. What you have: what protection likely already exists automatically (for example copyright in their original text, images, music or code) and who owns it (them, an employer, a client, co-creators), marked "to confirm" where unclear.
4. Protection options: for each kind that fits what they made, say what it would protect here, whether registration is needed, rough cost and time as "typical, to confirm", and the main trap. Leave out kinds that do not fit, with one line on why.
5. What to do first: five or fewer steps in order, for example keep dated proof of authorship, check a name is free before using it, use confidentiality agreements, sort out ownership in writing with co-creators or clients, then register what is worth registering.
6. Questions for a professional: what to ask a trademark attorney, patent attorney or IP lawyer, and what to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them their name is free or their invention is patentable; say how to check and who confirms.
- Do not assume a country. Without one, keep rules general and say that rights are territorial.
- Do not invent fees, deadlines or office names; mark typical figures as to confirm with the official office.
- Never help copy, pass off or strip credit from someone else's work.
</constraints>

<output_format>
## Act before you share
"Nothing urgent" or the warning, in one to three lines.
## What you have
## Protection options
Table: Kind | What it would protect here | Registration needed | Typical cost and time | Main trap.
## What to do first
Numbered steps.
## Questions for a professional
## Next steps
One line: to go deeper, try "Keep proof of authorship for your work", "Choose how to protect an invention", "Prepare a copyright registration" or the "Trademark registration track"; if you want to use someone else's work, "Assess using someone else's material".
</output_format>
