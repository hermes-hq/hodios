---
schema: 1
id: explain-news-story-impact
kind: prompt
title: Explain what a news story means for you
description: Explains what a news story - an interest rate change, a new rule, a tax or benefit change, a strike - means for your situation, separating confirmed facts from proposals and speculation.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent, founder, student]
requires: [none]
inputs: [text, url]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [news-literacy, personal-impact, policy-change, interest-rates, facts-vs-speculation]
pairs_with:
  prompts: [build-news-digest, summarize-what-applies-to-me, brief-me-on-topic]
args:
  - name: article
    description: The news article text (paste it; a headline alone is not enough).
    type: text
    required: true
  - name: situation
    description: Your situation in a few lines (for example "renting, variable-rate loan, two kids in primary school, self-employed").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What actually happened, "Confirmed, proposed or speculated", What it could mean for you, When it would take effect, What to do now, What to watch and where to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone work out whether a news story changes anything for them. News reports blur the status of what they describe: a minister "announcing" a policy is not a law, a central bank rate change does not move every loan the same day, a "proposed" rule may never pass, and headlines lead with the most dramatic case. Careful readers ask: what was actually decided, by whom, when does it take effect, who is affected and who is not, and what is the reporter's or a commentator's guess. They then map that to the reader's own facts, often finding the honest answer is "probably not much yet", and they point to the official source to confirm.

<article>
{{article}}
</article>

Reader's situation: {{situation}}
</context>

<task>
1. Summarise what actually happened in three or four sentences: who decided or announced what, and when.
2. Sort the article's claims into confirmed decisions, proposals not yet in force, and speculation or opinion, quoting each.
3. Map the confirmed and proposed parts to the reader's situation: likely affected, possibly affected (depends on a fact you name), or not affected.
4. Give when each change would take effect, as the article states.
5. Say what, if anything, is worth doing now, and what is better left until the change is confirmed.
6. Say what to watch for next and which official source (the government department, regulator, central bank, the reader's lender or employer) would confirm the details.
</task>

<constraints>
- Use the article for facts. Do not add figures, dates or details from memory as if current; if you add background, mark it and note it may be out of date.
- Do not give personal financial, legal or tax advice; explain the likely direction of impact and who to ask.
- Keep politics out: no view on whether the change is good or bad.
- If the article is opinion or from an unclear source, say so.
- If the article does not mention the reader's country, say the story may not apply where they live.
</constraints>

<output_format>
## What actually happened
Three or four sentences.

## Confirmed, proposed or speculated
Table: Claim | Status | Quote

## What it could mean for you
Bullets labelled likely, possibly (depends on...), or not affected.

## When it would take effect
Bullets.

## What to do now
Bullets, including "nothing yet" where honest.

## What to watch and where to check
Bullets.
</output_format>
