---
schema: 1
id: set-up-youth-feedback-panel
kind: prompt
title: Set up a youth feedback panel
description: Sets up a standing panel of children or teens giving feedback on a product or youth service, with recruitment, consent and assent, safeguarding, age-fitting session formats and how to show impact.
category: user-feedback
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, ux-researcher, teacher, manager]
subject: [education-sector, nonprofit, public-sector]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [youth-voice, children-participation, safeguarding, parental-consent, child-assent, advisory-panel]
pairs_with:
  prompts: [set-up-offline-feedback-channels, plan-customer-advisory-board]
args:
  - name: product_or_service
    description: The product or service (toy, game, learning app, youth club, library service, children's ward), what decisions the panel should influence, and your organisation type.
    type: text
    required: true
  - name: age_range
    description: The ages you want on the panel (for example "8-11" or "13-17"), and any groups you especially need (disabled young people, young carers, different schools or areas).
    type: text
    required: true
  - name: setting
    description: Where the panel meets.
    type: enum
    enum: [school, club-or-centre, online, mixed]
    default: club-or-centre
output_contract:
  format: markdown
  sections: [Purpose and remit, Recruitment and mix, Consent and safeguarding, Session formats by age, Rewards and recognition, Data and privacy, Showing impact, Checks before launch, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an organisation set up a panel of children or teenagers who give feedback over months, not a one-off research session. A youth panel works when young people have a safe space, real ways to express views, an audience that listens, and visible influence on decisions (the Lundy model of children's participation). It fails when the panel is decorative, when only confident, articulate children are recruited, when children give the answers they think adults want, or when safeguarding and consent are an afterthought.

Setting: {{setting}}
</context>

<task>
<product_or_service>
{{product_or_service}}
</product_or_service>

Ages: {{age_range}}

1. Purpose and remit: the two to four decisions the panel will influence, what is out of scope, and a one-paragraph description in words the young people would use.
2. Recruitment and mix: panel size (8-12 per group is workable), how to reach beyond confident volunteers (through schools, clubs, youth workers, carers' groups), a mix by age, gender, background and needs, a term of about 12 months with rotation, and how to make it easy to leave.
3. Consent and safeguarding: written consent from a parent or guardian plus the child's own assent in age-appropriate words, renewed if the remit changes; the right to stop any time without explanation; at least two vetted adults present (background checks per local rules); never one adult alone with one child, online or offline; a named safeguarding lead and what to do if a child discloses harm; online sessions on organisation accounts, no private messaging, cameras optional.
4. Session formats by age band within the range: under 8 (play, drawing, smiley scales, objects to handle, 30-40 minutes); 8-11 (games, sticker voting, card sorts, role play, 45-60 minutes); 12-15 (small-group activities, ranking, quick anonymous polls, peer-led discussion); 16-18 (co-design sessions, reviewing real plans, chairing parts of meetings). Reduce please-the-adult answers: anonymous methods, peer facilitators, adults who built the product out of the room for part of the session, asking "what would your friends think" as well as "what do you think".
5. Rewards and recognition: proportionate thanks (vouchers, certificates, references for older members, travel and snacks covered), agreed with parents, and not tied to giving positive feedback.
6. Data and privacy: collect the minimum, no photos or recordings without separate consent, anonymise quotes, store securely and delete on a schedule. Note that the age at which a child can consent to data processing online differs by country.
7. Showing impact: after each session, a short child-friendly "what we heard and what we will do" note within two weeks, and once a term a session where the team shows what changed and what did not, and why.
8. Checks before launch: a checklist covering policies, approvals, accessibility, adjustments for disabled members, and a trial session.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Laws on consent, child data, background checks and safeguarding differ by country and sector. Do not state specific legal requirements; list what to confirm with the organisation's safeguarding lead and data protection adviser or a lawyer.
- Do not plan anything that puts a child alone with an adult, collects more data than needed, or uses children's images in marketing.
- If a panel member discloses harm or risk during a session, the plan must route it to the safeguarding lead the same day, not into product feedback.
- If the product, its decisions or the age range is missing, ask for it and stop.
</constraints>

<output_format>
## Purpose and remit
Decisions in scope, out of scope, and the description for young people.

## Recruitment and mix
Size, channels, mix targets, term and rotation.

## Consent and safeguarding
Checklist, plus the disclosure procedure in four or five steps.

## Session formats by age
Table: age band | methods | length | adults present | how to reduce please-the-adult answers.

## Rewards and recognition
Bullets.

## Data and privacy
Bullets.

## Showing impact
The feedback note format and the termly routine.

## Checks before launch
Checklist.

## Questions
What to confirm, including who to check legal points with.
</output_format>
