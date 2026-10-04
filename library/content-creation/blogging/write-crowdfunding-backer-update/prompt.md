---
schema: 1
id: write-crowdfunding-backer-update
kind: prompt
title: Write a crowdfunding backer update
description: Writes a post-campaign update for crowdfunding backers with progress and evidence, honest delays with new dates and reasons, what backers must do and what comes next, to keep trust when things slip.
category: blogging
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, content-creator, artist]
requires: [none]
inputs: [notes, text]
output: [post, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [crowdfunding, backer-update, delay-communication, fulfilment, supporter-trust]
pairs_with:
  prompts: [write-crowdfunding-campaign, write-how-we-spent-it-post]
args:
  - name: progress_notes
    description: What has happened since the last update - progress with any photos or proof you can share, problems, supplier or manufacturing news, new dates and how confident you are, what backers need to do (surveys, address changes), and anything backers have been asking.
    type: text
    required: true
  - name: status
    description: Overall status - on track, delayed, or a serious problem (cost overrun, supplier failure, a change to what backers get).
    type: enum
    enum: [on-track, delayed, problem]
    default: on-track
  - name: platform
    description: Optional. The platform or where backers get updates (for example a crowdfunding site, a pledge manager or email), so the length and format fit.
    type: string
output_contract:
  format: markdown
  sections: [Title, Update, Backer actions, Replies to likely questions, Check before posting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators keep backers' trust after a campaign. Backers forgive delays far more readily than silence, vagueness or surprises. Updates fail when the status is buried under good news, when a slipped date is mentioned in passing, when new dates are as optimistic as the old ones, when "we're working hard" replaces evidence, and when backers miss a survey or address deadline because it was in paragraph six. A good update says the status in the first two lines, shows real evidence, explains any delay with the cause, the new date and what it depends on, and makes backer actions impossible to miss.

Status: {{status}}.
{{#platform}}Platform: {{platform}}{{/platform}}
</context>

<task>
<progress_notes>
{{progress_notes}}
</progress_notes>

1. First two lines: the status in plain words and the current delivery estimate. For a delay or problem, state it here, not later.
2. Progress: what is done since the last update, with the evidence to attach (photos of samples, factory or printer proofs, test results), as specific as the notes allow.
3. Delays or problems: what happened, why, what you are doing about it, the new estimate given as a range or month, what it depends on (sample approval, shipping slot), and the buffer included. Take responsibility; do not blame backers or vaguely blame "supply chains".
4. For a problem that changes what backers get, cost or timing materially, set out the options honestly (wait, switch, refund) as far as the notes give them, and say how backers choose and by when. Note that refund rules depend on the platform's terms and the creator's own promises.
5. Backer actions: a separate, short block with each action, the deadline and how to do it.
6. What comes next and when the next update will be (a regular cadence, monthly at least, even with little news).
7. Replies to likely questions: three to five short answers to the questions backers will ask in comments.
</task>

<constraints>
- Use only facts in the notes. Never invent dates, quantities, supplier names, test results or photos; mark gaps as [X].
- New dates must be no more optimistic than the notes support; if the creator gives a single hopeful date with no basis, suggest a range and say why.
- Keep good news and bad news in proportion; no hype words ("amazing", "huge news") when the status is delayed or problem.
- Do not give legal advice on refunds or consumer rights; suggest checking the platform's terms and, for large sums, a professional.
- If the notes do not state the current status or estimated delivery, ask and stop.
</constraints>

<output_format>
## Title
One factual title that includes the status.

## Update
The update text, 250-600 words, short paragraphs.

## Backer actions
Bullets: action, deadline, how. "None this time" if none.

## Replies to likely questions
Three to five question and answer pairs.

## Check before posting
Bullets: dates and figures to confirm, evidence to attach, and anything that could read as a promise.
</output_format>
