---
schema: 1
id: handle-in-law-conflict
kind: prompt
title: Handle conflict with in-laws
description: Plans how to handle tension with in-laws by agreeing a shared line with your partner first, then deciding who says what to whom, with scripts and responses to pushback.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [in-laws, extended-family, couples, united-front, boundaries]
pairs_with:
  prompts: [set-boundary, navigate-family-gathering-tension, respond-to-unwanted-advice]
  personas: [communication-coach]
args:
  - name: situation
    description: What the in-law does or says, how often, how it affects you, and what has been said so far.
    type: text
    required: true
  - name: whose_family
    description: Whose parents or relatives this is about.
    type: enum
    enum: [my-partners, mine, both]
    default: my-partners
  - name: cultural_context
    description: Optional. Family or cultural expectations that matter, for example living together, respect for elders, religious practice, or very different family norms between you.
    type: text
output_contract:
  format: markdown
  sections: [Reading the situation, Agree with your partner first, Who says what, Scripts, If your partner is reluctant, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In-law conflict is rarely solved by the in-law and the spouse who married in fighting it out directly. What works in most families is a united front agreed in private by the couple first, after which each partner deals with their own family: a son can say to his mother what a daughter-in-law cannot without it becoming a feud. The partner whose family it is often feels torn and loyal to both; asking them to choose between their parent and their partner backfires, while asking them to back a specific, agreed line usually works. Many problems are well-meant (advice, unannounced visits, gifts, opinions about grandchildren) and need a light touch; others (undermining parenting, insults, interfering in finances) need a firmer one. Expectations differ widely between cultures and families, for example around elders living with the couple or deciding on holidays, so the right line is the couple's, not a universal rule.
</context>

<task>
Help me handle this with my in-laws. The family concerned: {{whose_family}}.

<situation>
{{situation}}
</situation>
{{#cultural_context}}
<cultural_context>
{{cultural_context}}
</cultural_context>
{{/cultural_context}}

1. If it is unclear what the in-law does or what I want to change, ask up to two short questions and stop.
2. Read the situation: well-meant or hostile, one-off or a pattern, and how serious. Say which level of response fits (let it go, a light redirect, a clear request, a firm boundary).
3. Plan the private conversation with my partner first: how to open it without attacking their family, what I need from them, a shared line we could both say, and what we will do if it happens again. Write it so my partner can agree without feeling they are betraying their parents.
4. Decide who says what to whom. Default to the partner whose family it is speaking to their own relatives, with the other partner backing them, unless the input or culture suggests otherwise. Say why.
5. Write scripts: for my partner to say to their parent or relative, for me to say in the moment if it happens in front of me, and a short message version if that fits.
6. Write calm responses to likely pushback (hurt feelings, "we're only trying to help", appeals to tradition, going around us to the other partner).
7. Plan for a partner who is reluctant to speak up or wants to keep the peace: what may be behind it, how to ask again for one small specific step, and what I can do myself meanwhile without going around them.
</task>

<constraints>
- Respect the cultural context I give. Do not assume a Western nuclear-family norm is the right one, and do not call a cultural expectation wrong.
- No ultimatums, cutting off contact or "they're toxic" framing unless I describe abuse or ask for it.
- Keep scripts warm toward the in-law where that is honest, and specific about the behaviour.
- If the in-law's behaviour involves threats, harm to children or abuse, say so plainly and prioritise safety over keeping the peace.
</constraints>

<output_format>
## Reading the situation
How serious it is and which level of response fits.
## Agree with your partner first
How to open the talk and the shared line to agree.
## Who says what
Who speaks to whom, and why.
## Scripts
For my partner, for me in the moment, and a message version.
## If your partner is reluctant
How to handle a partner who wants to keep the peace.
## Notes
Pushback responses (table: If they say… | You can say…) and anything else.
</output_format>
