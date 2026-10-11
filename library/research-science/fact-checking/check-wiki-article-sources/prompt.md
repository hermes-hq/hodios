---
schema: 1
id: check-wiki-article-sources
kind: prompt
title: Check the sourcing of a Wikipedia article
description: Checks the claims you plan to rely on in a Wikipedia or other wiki article against the sources it cites, flagging unsupported lines, circular sourcing, dead links and recent edits.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [student, researcher, writer, editor]
requires: [web]
inputs: [url, text]
output: [report, table]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [wiki-sourcing, circular-sourcing, citation-checks, primary-sources]
pairs_with:
  prompts: [verify-citations, evaluate-source-credibility, check-paraphrase-faithfulness]
  rules: [source-citation-rules]
args:
  - name: article
    description: The article link, or the passages you want to rely on pasted with their footnotes.
    type: text
    required: true
  - name: claims_to_use
    description: The specific statements you plan to use. If left empty, the check covers the article's main factual claims.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Claim check, Sourcing problems, What to cite instead]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Wikipedia is a good starting point and a weak endpoint. Its own rules ask that claims be backed by reliable published sources, but a footnote does not guarantee support: a cited page may say something narrower, may not mention the claim, may be dead, or may itself have copied the line from Wikipedia (circular sourcing, sometimes called citogenesis). Recently added or contested statements, uncited lines, "citation needed" tags and edit wars on the talk page are warning signs. Serious users cite the underlying source after reading it, not the wiki page.
</context>

<task>
Check this article's sourcing:
<article>
{{article}}
</article>
{{#claims_to_use}}Claims I plan to use:
<claims_to_use>
{{claims_to_use}}
</claims_to_use>{{/claims_to_use}}

1. List the claims to check: the user's chosen statements, or otherwise the main factual claims (numbers, dates, causes, quotes, firsts).
2. For each, find the footnote it relies on. Mark uncited claims and "citation needed" tags.
3. Open each cited source and check whether it supports the claim as written, supports a narrower version, does not mention it, contradicts it, or cannot be reached (try an archived copy).
4. Look for circular sourcing: a source published after the claim appeared on the wiki that repeats its wording without its own evidence. Note when a claim was added or recently changed if the page history or talk page is available.
5. For each claim the user wants to use, name the source to cite directly instead of the wiki page.
</task>

<constraints>
- Cite only pages you opened in this session, with URL and date. Never cite from memory or construct a URL.
- If you have no web access, say so at the top, work only from what was pasted, and list the checks to run on each footnote.
- Report "source unavailable" honestly rather than guessing what a paywalled or dead source says.
- Do not edit the wiki or suggest edits as the deliverable; the job is to judge whether the user can rely on the claims.
</constraints>

<output_format>
## Verdict
Two or three sentences: which claims can be relied on via their sources and which cannot.
## Claim check
Table: claim | footnote | source (linked) | supports? (full, narrower, not mentioned, contradicts, unavailable).
## Sourcing problems
Bullets: uncited claims, circular sourcing, dead links, recent or contested edits.
## What to cite instead
For each claim the user will use: the underlying source to cite, or a note to drop the claim.
</output_format>
