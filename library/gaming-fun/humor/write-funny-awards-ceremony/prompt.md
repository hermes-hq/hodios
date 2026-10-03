---
schema: 1
id: write-funny-awards-ceremony
kind: prompt
title: Write a funny awards ceremony
description: Writes light-hearted awards for a team, class or family with kind joke categories, short citations and presenter lines that celebrate people without punching down.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [manager, teacher, individual]
requires: [none]
inputs: [notes, preferences]
output: [script, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [awards, team-celebration, end-of-year, citations, kind-humour, party-planning]
pairs_with:
  prompts: [write-roast, write-icebreaker-games]
args:
  - name: group
    description: Who the awards are for and the occasion, for example "my 12-person design team's end-of-year party", "Year 6 leavers' assembly" or "our family reunion".
    type: string
    required: true
  - name: people
    description: Names with one fun, true fact each (a habit, a catchphrase, a moment from the year). Optional; without it you get award templates to fill.
    type: text
  - name: awards
    description: How many awards to write. With people listed, at least one per person.
    type: number
    default: 10
  - name: tone
    description: gentle = warm and safe for anyone in the room; cheeky = more teasing, still affectionate and never about anything people cannot change.
    type: enum
    enum: [gentle, cheeky]
    default: gentle
output_contract:
  format: markdown
  sections: [Running order, Awards, Host script, Safety check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write joke awards that people are glad to win. The best ones take a real, recognisable habit or moment and present it as a quirky strength, so the winner laughs first and the room laughs with them. The worst ones single someone out for something they are sensitive about. When in doubt you turn a tease into a compliment, and you make sure no one in the room gets a weaker award than the others.

Group and occasion: {{group}}
{{#people}}People and facts:
{{people}}{{/people}}
Number of awards: {{awards}}
Tone: {{tone}}
</context>

<task>
1. If the group or occasion is unclear, ask who the audience is and stop. If people are listed but fewer facts than names, write warm generic awards for those without facts and list them under Safety check as needing a detail.
2. With people listed, give each person exactly one award built on their fact, then add group awards up to {{awards}}. Without people, write {{awards}} award templates with a placeholder name and a note on what kind of fact makes each one work, then ask for names and facts.
3. For each award write: a playful title (a pun or mock-grand name, such as "The Lifetime Achievement in Reply-All"), a citation of two or three sentences that tells the story and ends on a compliment, and a presenter line to read before opening the envelope.
4. Plan a running order: open with an award that is safe and very funny, spread the strongest through the middle, and close with a warm group award.
5. Write a short host script: a welcome of three or four lines, one link line between each award, and a closing toast.
6. Review every award before answering, using these rules:
   - Never about looks, weight, age, health, accent, religion, money, relationships or anything private.
   - Nothing that replays a mistake that cost someone money, safety or face.
   - No "worst" or "least" awards.
   - Awards are similar in warmth across people, including the boss and the quiet ones.
   - Cheeky tone teases habits and choices only.
   Rewrite anything that fails, and list in Safety check anything that is fine only if the recipient is happy with it.
</task>

<constraints>
- Use only the facts given; do not invent embarrassing stories about real people.
- Keep it readable aloud: short sentences, no inside jokes the wider room will not get unless the fact says the room knows it.
- For children, everything is gentle whatever the tone setting.
- Keep the whole ceremony short enough to run in about one minute per award.
</constraints>

<output_format>
## Running order
Numbered list of award titles with the recipient.
## Awards
For each: `### <Award title>`, then `Recipient:`, `Presenter line:`, `Citation:`.
## Host script
Welcome, link lines, closing toast.
## Safety check
Bullets: anything to confirm with a recipient first, any person missing a fact, or "All clear".
</output_format>
