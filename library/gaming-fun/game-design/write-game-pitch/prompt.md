---
schema: 1
id: write-game-pitch
kind: prompt
title: Write a video game pitch
description: Writes a pitch for a video game to a publisher, fund or platform - hook, pillars, comparable games, audience, scope, team, budget ask and a slide outline - with the gaps a publisher will probe.
category: game-design
version: 1.0.0
status: incubating
stage: [ship]
role: [game-developer, founder, designer]
requires: [none]
inputs: [text, notes, document]
output: [outline, copy, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [publisher-pitch, pitch-deck, indie-games, funding]
pairs_with:
  prompts: [write-game-design-document, scope-indie-game]
args:
  - name: game
    description: The game - genre, core loop, what makes it different, platforms, state of the build (concept, prototype, vertical slice), and any trailer, demo or wishlist numbers.
    type: text
    required: true
  - name: ask
    description: Who you are pitching and what you want - publisher funding, a grant, a platform deal - plus the amount and timeline if known, and the team.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Hook, Pitch outline, One-page summary, Questions they will ask, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small studios pitch games. Publishers and funds see many pitches and decide fast: they look for a clear hook, proof the team can ship (a playable build matters more than slides), a credible scope and budget, a defined audience with comparable games that sold, and why this team. Comparable titles should be recent and similar in scope, not famous outliers. A short deck with gameplay footage beats a long design document. Every claim about sales, wishlists or market size must be the studio's own number or a cited, checkable source.

Game: {{game}}
Pitch target and ask: {{ask}}
</context>

<task>
1. Write the hook: one sentence ("It's X where you Y, set in Z") and a one-line player fantasy. Offer two alternatives.
2. Draft three pillars: the experiences the game promises, each in one line.
3. Build a slide outline of about 10 to 12 slides: hook, gameplay (what footage to show), pillars, audience and comparable titles, unique selling points, platforms and business model, scope and roadmap, team and track record, budget and the ask, what the partner gets, contact. Give each slide its key message and what to show.
4. For comparable titles, explain how to pick them (recent, similar scope and price, relevant audience) and leave placeholders for the studio to fill with checked data rather than naming sales figures.
5. Write a one-page summary that can go in an email.
6. List the hard questions the partner will likely ask (scope versus budget, team gaps, how they will reach players, what happens if it slips) with notes on how to answer.
7. List the gaps that weaken the pitch now, such as no playable build, no budget breakdown or unclear audience, and the cheapest way to close each.
</task>

<constraints>
- Do not invent sales, wishlist, market-size or revenue numbers; use placeholders like [X wishlists] and say where to source them.
- Do not name a specific publisher's terms or claim what a named publisher wants.
- Keep claims honest about the build's state; never describe a concept as a playable game.
- Plain language, no hype words.
</constraints>

<output_format>
## Hook
The main hook and two alternatives.
## Pitch outline
Table: Slide | Key message | What to show.
## One-page summary
## Questions they will ask
Numbered with answer notes.
## Gaps to fill
Table: Gap | Why it matters | Cheapest fix.
</output_format>
