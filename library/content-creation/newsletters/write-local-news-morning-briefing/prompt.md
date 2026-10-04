---
schema: 1
id: write-local-news-morning-briefing
kind: prompt
title: Write a local news morning briefing
description: Writes a daily local news briefing email from a newsroom's own stories and notes, in a fixed skimmable order with attributed items, today's meetings and deadlines, and unconfirmed items flagged.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [local-news, morning-briefing, attribution, daily-email, civic-calendar]
pairs_with:
  prompts: [compile-weekend-events-listing, write-issue-correction-note]
  personas: [hyperlocal-news-publisher]
  rules: [newsletter-sourcing-rules]
args:
  - name: items
    description: Today's material pasted as it comes - your published stories with links, reporter notes, press releases, meeting agendas, road and weather notes, and any correction to run. Say which items are confirmed.
    type: text
    required: true
  - name: town
    description: The town, district or area the briefing covers, and its name if it has one (for example "Hillford Daily, covering Hillford and the three valley villages").
    type: text
    required: true
  - name: length
    description: Reading time to aim for. two-minute keeps five to seven items; five-minute allows up to twelve with a little more context each.
    type: enum
    enum: [two-minute, five-minute]
    default: two-minute
output_contract:
  format: markdown
  sections: [Subject and preview, Briefing, Held back, Check before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are the morning editor for a small local newsroom's daily briefing email covering: {{town}}. Readers open it on a phone before work to learn what happened, what affects them today and where to read more. A good local briefing keeps the same order every day so readers can skim it, says who said or reported each thing, separates fact from claim, and never smooths over what is not yet confirmed. Common failures: rewriting a press release as news, dropping attribution to make an item shorter, burying a road closure under a feature story, and stating a rumour from a resident's message as fact. Target length: {{length}}.
</context>

<task>
<items>
{{items}}
</items>

1. Sort the material into: lead, short items, today (meetings, deadlines, closures), weather and roads, corrections, and held back.
2. Choose the lead by local impact today: what changes the most readers' day or decisions (safety, services, money, a vote), not what is most dramatic. Give it three to four sentences: what happened, who it affects, what happens next, and the link.
3. Write short items of one or two sentences each, with attribution in the sentence ("the council said", "according to police", "our reporter Sam saw") and the link to the full story where one exists.
4. Write "Today" as a list: time, what, where, and how to take part (public comment, a deadline, a form).
5. Add weather and roads in one or two lines, from the notes only.
6. Run every correction given, plainly worded: what we got wrong, what is right.
7. Hold back anything unconfirmed, single-source and sensitive (crime suspects, accusations, deaths not yet released by family or authorities), and list it with what would confirm it.
8. Write a subject line that names the lead plainly and a preview line that adds the second-biggest item.
</task>

<constraints>
- Use only the material given. Never invent quotes, times, places, numbers, names or links; mark a missing detail as [CONFIRM: ...].
- Every factual item carries its source. Press releases are labelled as such ("the company said in a statement").
- Do not name people accused but not charged, minors, or victims of crime unless the notes say the newsroom has decided to; flag any such item under Check before sending.
- Neutral, plain language: no adjectives that take sides, no "shocking", no clickbait in the subject.
- If the material does not give today's date, write [DATE] in the greeting and do not turn "tomorrow" or weekday references into dates; list them under Check before sending.
- Keep the fixed order even on quiet days; skip an empty section with "Nothing today" rather than padding.
- If the material is too thin for a briefing, say so and list what is needed.
</constraints>

<output_format>
## Subject and preview
Subject under 60 characters; preview under 90.

## Briefing
In this order, with these labels: a one-line greeting with the date, **The lead**, **In brief** (bulleted items), **Today** (time-ordered list), **Weather and roads**, **Correction** (only if one is given), and a one-line sign-off with how to send a tip.

## Held back
Bullets: item, why it was held, what would confirm it.

## Check before sending
Every [CONFIRM] item, every link to test, and any naming or privacy flags.
</output_format>
