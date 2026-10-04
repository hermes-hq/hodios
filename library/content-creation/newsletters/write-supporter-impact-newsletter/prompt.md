---
schema: 1
id: write-supporter-impact-newsletter
kind: prompt
title: Write a supporter impact newsletter
description: Writes a charity or community group's newsletter to supporters that reports back first, with one consented story, honest numbers and what they mean, what donors made possible and a single ask.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, marketer, operations-manager]
subject: [nonprofit]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [supporter-update, impact-reporting, dignity-in-storytelling, volunteers, charity-comms]
pairs_with:
  prompts: [write-donor-appeal, write-donor-thank-you, write-impact-report]
args:
  - name: updates
    description: What happened since the last newsletter - activities, numbers with their source and period, milestones, setbacks, volunteer and donor contributions, upcoming dates.
    type: text
    required: true
  - name: story_notes
    description: Notes for the one story you will feature - who (first name or pseudonym), what changed for them, the quote if any, and what consent they gave (for name, photo, quote, where it may be used).
    type: text
    required: true
  - name: ask
    description: The one thing you want supporters to do this time (give, volunteer on a date, share, come to an event, reply). Leave empty to end with a reply invitation instead.
    type: string
output_contract:
  format: markdown
  sections: [Subject lines, Newsletter, Consent and accuracy check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the regular supporter newsletter for a charity or community group. Its job is reporting back: showing donors and volunteers what their support did, honestly, so they trust the organisation and stay. It differs from an appeal: the ask comes last and there is only one. Strong supporter updates feature one person or moment rather than a list, give numbers with what they mean ("312 meals, enough for every family on our list for a month"), credit supporters directly ("you" made it happen), and admit what did not go to plan. They avoid poverty-porn framing (pity, helplessness, "saving" people), saviour language, invented outcomes and quotes the person did not approve.
</context>

<task>
Updates:
<updates>
{{updates}}
</updates>

Story notes:
<story_notes>
{{story_notes}}
</story_notes>

1. Check consent in the story notes first. Use a name, photo reference, quote or identifying detail only if consent for it is stated. If consent is unclear, write the story anonymised (pseudonym, no identifying details) and flag it.
2. Pick the two or three updates that most clearly show supporters' contribution, plus one honest setback or lesson if there is one. Leave the rest for a short "Also this month" list.
3. Write the story in 120-200 words with the person as the actor in their own life: what they wanted, what got in the way, what changed and their words if approved. The organisation and supporters enabled; they did not rescue.
4. Turn each number into meaning: what it is, over what period, and what it compares to or makes possible. Use only the numbers given.
5. Thank volunteers and donors specifically: what they did, not just "thanks to all".
6. End with the one ask below, made concrete (what, by when, how long it takes, the link or contact). If no ask is given, end with an invitation to reply with a question or memory instead, and no donation ask.
{{#ask}}Ask: {{ask}}{{/ask}}
7. Write three subject lines that report back (what you made happen), not urgent appeals.
</task>

<constraints>
- Never invent stories, quotes, outcomes, numbers or consent. Mark gaps as [CONFIRM: ...].
- No pity framing, no "the poor", "victims", "voiceless" or "you saved"; describe people by their situation, not as their situation.
- Do not imply that a specific gift funded a specific outcome unless the updates say so; use "support like yours".
- Keep it to about 400-600 words so it reads on a phone, with short paragraphs and descriptive link text.
- One ask only; no second ask in the PS.
</constraints>

<output_format>
## Subject lines
Three options, each under 55 characters, plus one preview line.

## Newsletter
Opening line, the story, "What you made happen" (numbers with meaning), "What we learned" if any, "Also this month" (bullets), thank-you, the ask or reply invitation, sign-off from a named role.

## Consent and accuracy check
Bullets: what consent was assumed and must be confirmed, every [CONFIRM], and any number whose source or period is unclear.
</output_format>
