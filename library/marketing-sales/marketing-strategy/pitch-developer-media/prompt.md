---
schema: 1
id: pitch-developer-media
kind: prompt
title: Pitch developer newsletters and podcasts
description: Finds developer newsletters, podcasts and channels that cover projects like yours, checks how each takes submissions, and writes a short personal pitch per outlet. Use after a launch.
category: marketing-strategy
version: 1.1.0
status: incubating
stage: [ship]
role: [maintainer, developer-advocate, founder]
requires: [web]
inputs: [text, url]
output: [table, message]
risk: network
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, newsletter-pitch, podcast-pitch, earned-media, developer-marketing]
pairs_with:
  prompts: [write-podcast-guest-pitch, pitch-journalist, plan-directory-submissions]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it is, who it is for, license, links, what is newsworthy now (a release, a number, a story), and any press or posts already published.
    type: text
    required: true
  - name: maker_story
    description: Your background and the angle you could talk about for 30 minutes on a podcast.
    type: text
  - name: max_outlets
    description: The most outlets to pitch.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Newsworthy angle, Outlets, Pitches, Follow-up rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Drafts are explicitly for the maintainer to rewrite."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Developer newsletters and podcasts mostly pick from what is already visible: Hacker News, Reddit, GitHub, their readers' tips and their own reading. Some have public submission forms or repositories (for example a "submit a link" form, or a weekly issue drafted in the open where projects add themselves by pull request); some review tools against published criteria; many accept only paid sponsorship for guaranteed placement, and a paid spot must be labelled as such. Editors and hosts receive many templated and AI-written pitches and ignore them. What works is a short, specific, personal note that shows you know the outlet, gives them something their audience will value (a lesson, a number, a story, not just "we launched"), and makes it easy to say no.
</context>

<task>
<project>
{{project}}
</project>
{{#maker_story}}
Maker story:
{{maker_story}}
{{/maker_story}}

If nothing about the project is newsworthy yet (no release, story or result), say what would make it pitchable and stop after that advice.

1. **Newsworthy angle.** Two or three angles an editor would find useful to their audience: a release with a concrete change, a technical lesson, a surprising number from the input, a contrarian design choice. Pick one per outlet type.
2. **Outlets.** Search for up to {{max_outlets}} outlets that covered similar projects in the last six months: newsletters for the language, ecosystem or domain, general developer newsletters, podcasts that interview maintainers, and YouTube or streaming channels that review tools. For each, record the URL, a recent issue or episode that shows fit, and how it accepts submissions (form, repository, email, editorial only, paid only), quoted from the outlet's own page. Mark anything you could not confirm as UNVERIFIED. Exclude outlets that only sell placement unless the user asks about paid options.
3. **Pitches.** For each outlet with a free path, write a pitch in its preferred channel: under 120 words for newsletters (one line on what it is, why their readers care, the link), under 180 words for podcasts (the episode idea, three talking points, why you, a link to something you have written or said). Reference the recent issue or episode honestly; never fake familiarity.
4. **Follow-up rules.** One polite follow-up after a stated period (or the outlet's stated time), then stop. Track replies in the table.
</task>

<constraints>
- No mass or templated sends, no fake familiarity, no pretending to be a reader tipping the outlet about your own project.
- Paid placements must be disclosed as sponsored; do not suggest disguising them.
- Use only facts from the input; never invent coverage, users or numbers.
- Do not send anything; produce the list and drafts for the maintainer, who personalises and rewrites each one in their own words before sending.
</constraints>

<output_format>
## Newsworthy angle
## Outlets
| Outlet | Type | Recent fit (link) | How it accepts submissions | Verified? |
## Pitches
One block per outlet: channel, subject line if email, body.
## Follow-up rules
</output_format>
