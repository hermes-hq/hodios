---
schema: 1
id: play-spot-the-misinformation
kind: prompt
title: Play spot the misinformation
description: Plays a media literacy game with invented posts, some trustworthy and some misleading, where the player spots the trick, such as false context or a cropped chart, with an explanation each round.
category: fact-checking
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
requires: [none]
inputs: [topic, preferences]
output: [conversation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [media-literacy, misinformation, game, lateral-reading]
pairs_with:
  prompts: [label-fact-vs-opinion, plan-media-literacy-lesson, respond-to-misinformation]
args:
  - name: rounds
    description: How many posts to play.
    type: number
    default: 8
  - name: level
    description: kids (about 8-12) get simple tricks and friendly topics; teens get the full range of tricks; adults get subtler cases and mixed signals.
    type: enum
    enum: [kids, teens, adults]
    default: teens
  - name: topic
    description: A theme for the invented posts, for example "sport", "science", "local news", "shopping", or mixed.
    type: string
    default: mixed
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People get better at spotting misleading content by practising on examples and learning the names of the tricks. This game shows invented social posts and headlines, one per round. Some are trustworthy and some use a known trick, so the player has to judge each one rather than assume everything is fake. Every example is fictional: invented people, places, accounts and outlets, so nothing in the game can spread as real misinformation.

Rounds: {{rounds}}
Level: {{level}}
Topic: {{topic}}
</context>

<task>
1. Explain the game in three lines: each round shows an invented post; the player says "trustworthy" or "misleading" and, if misleading, what the trick is. Then show round 1.
2. Plan the rounds silently so that about a quarter are trustworthy and the rest each use a different trick, matched to the level:
   - **False context:** a real-looking photo described with the wrong place, date or event.
   - **Misleading chart:** a truncated axis, cherry-picked time window or missing scale, described in words.
   - **Fake or irrelevant expert:** credentials that do not fit the claim, or an unnamed "doctors say".
   - **Impostor account:** a handle or outlet name one letter off a familiar-sounding invented one.
   - **Cherry-picked or relative statistic:** "risk doubles" with no base rate.
   - **Satire taken seriously:** a joke site's story shared as news.
   - **Old story recirculated:** a real-sounding event from years ago presented as today.
   - **Emotional urgency:** "share before they delete this!"
   - **Fabricated quote:** words attributed to an invented public figure with no source.
   - **AI-generated image tells:** described oddities such as garbled text in signs or mismatched details.
   Kids get the simplest tricks (urgency, fake expert, satire, impostor account) and gentle topics; adults get subtler mixes.
3. Present each post as a text mock: account name, handle, date, the post text, a described image or chart in [square brackets], and share count. Put "[Invented example]" on its first line. Ask the player for their verdict and wait.
4. After the answer, reveal: trustworthy or misleading; the trick by name; the clues in the post; and one checking move that would have exposed it (search for the original source, check the account's history, look up the claim on a fact-checking site, read the chart's axis, run a reverse image search).
5. Keep score. After the last round, give the score, tricks spotted and missed, and a five-step checklist the player can use on real posts.
</task>

<constraints>
- Every person, account, outlet, place and product in a post is invented. Never use real public figures, real brands, real news outlets or real events as subjects of misleading posts.
- Never write misleading content on real-world health emergencies, real elections or real conflicts, even invented, in a form that could be screenshotted and believed. Keep such themes out entirely for kids and teens; for adults, use clearly fictional settings.
- Trustworthy posts must be genuinely trustworthy by the clues given, so the game teaches judgement, not suspicion of everything.
- Age-appropriate content for {{level}}: nothing frightening or graphic for kids.
- Before posting each round, check that the trick is detectable from the clues shown and that the post carries the invented-example label.
</constraints>

<output_format>
**How to play:** three lines.

**Each round:**
**Round N of {{rounds}}**
> [Invented example]
> **Account name** @handle - date
> Post text
> [Described image or chart]
> Shares: N

Trustworthy or misleading? If misleading, what is the trick? Wait.

**Reveal:** verdict; trick name; clues; the checking move.

**End:** score; tricks spotted and missed; five-step checklist.
</output_format>
