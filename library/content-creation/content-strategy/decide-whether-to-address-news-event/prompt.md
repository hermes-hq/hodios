---
schema: 1
id: decide-whether-to-address-news-event
kind: prompt
title: Decide whether to address a news event
description: Helps a creator, brand or nonprofit decide whether to post about a tragedy, disaster, election or controversy, weighing connection and standing, what to pause and what a useful response contains.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan, review]
role: [content-creator, marketer, founder, manager]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [newsjacking, brand-voice, sensitive-topics, scheduled-posts, public-statements, crisis-response]
pairs_with:
  prompts: [find-timely-content-angles, write-editorial-guidelines]
  personas: [content-strategist]
args:
  - name: event
    description: What has happened, as far as is confirmed, when, and where you heard it. Include whether it affects your area, staff or customers directly.
    type: text
    required: true
  - name: organisation
    description: Who you are, what you do, your audience, your past public positions, and whether you have ever spoken about this kind of topic before.
    type: text
    required: true
  - name: scheduled_content
    description: Posts, emails, ads or videos already scheduled for the next week or so.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Why, Pause now, If you respond, If you stay quiet, Check before posting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, small business or nonprofit decide, often within hours, whether to say anything publicly about a tragedy, disaster, attack, death, election result or public controversy. There is no rule that every account must comment, and silence is not always wrong; but cheerful scheduled content running during a local tragedy, or a vague statement from an account with no connection to the issue, both damage trust. The decision rests on: how directly the event touches the audience, staff or community; whether the organisation has standing (expertise, history, its mission) to speak; whether it can add something useful (practical information, services, a fundraiser it actually runs) rather than performative words; what it has said before (inconsistency is noticed); and whether facts are still unclear. Using a tragedy to promote anything is the fastest way to lose trust.

{{#scheduled_content}}
<scheduled_content>
{{scheduled_content}}
</scheduled_content>
{{/scheduled_content}}
</context>

<task>
<event>
{{event}}
</event>

<organisation>
{{organisation}}
</organisation>

1. Triage the clock first: if anything scheduled goes out within the next few hours (an email, an ad, a timed post), the first line of the answer tells them to pause it now, before any analysis. Then separate confirmed facts from unconfirmed ones; if key facts are unclear, the default is to wait and pause.
2. Assess five factors, each low, medium or high with one line of reasoning: proximity (does it affect our people or place), standing (mission or expertise link), usefulness (something concrete to offer), consistency (past positions and silences), and risk (to people affected, staff, the organisation).
3. Recommend one: respond now, pause and wait, respond privately (to staff, members or affected customers) only, or carry on as normal. Explain why.
4. Pause now: list scheduled pieces to hold or rewrite (promotions, humour, anything tone-deaf, anything that could look linked to the event) and for how long. Include what people forget: running paid ads, automated emails and autoresponders, and posts queued in scheduling tools.
5. If responding: what a useful response contains (acknowledgment in plain words, a concrete action or resource, what the organisation is doing for its own people), what it leaves out (opinions beyond its standing, speculation, logos on tragedy imagery, links to sales), the channel, and who signs off. Give a short outline, not a polished statement.
6. If staying quiet: how to handle questions in comments or messages, and when to resume normal posting.
7. Check before posting: a short checklist (facts verified from reliable sources, names of victims only if public and with care, no graphic images, comments plan, timing). If the event involves a suicide, follow safe-messaging practice: no method or location detail, no simple single cause, no glamorising, and a pointer to local support services; check the safe-messaging guidance used in their country.
</task>

<constraints>
- Do not take a political side for the user or tell them what to believe; help them decide based on their own mission, audience and history.
- Never speculate on causes, culprits or casualties; mark anything unconfirmed.
- Do not suggest promotional tie-ins, discounts or hashtags that ride on the event.
- If staff, volunteers or audience members are directly affected, put their support and privacy before any public post and suggest checking on them first.
- If the user describes a situation with people in immediate danger, tell them to follow emergency services' guidance and prioritise safety over content.
{{> guardrails/crisis-safety}}
- If the event or organisation details are too thin to judge, ask for them; meanwhile recommend pausing scheduled content.
</constraints>

<output_format>
## Recommendation
If something goes out within hours, a first line "Pause now: [item]". Then the recommendation in one bold line, then the five-factor table: factor | rating | reason.

## Why
Two to four sentences.

## Pause now
Bullets with how long, including ads, autoresponders and scheduled emails.

## If you respond
Outline bullets, channel and sign-off, or "Not recommended now".

## If you stay quiet
Bullets.

## Check before posting
Checklist.
</output_format>
