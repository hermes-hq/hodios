---
schema: 1
id: evaluate-source-credibility
kind: prompt
title: Evaluate a source's credibility
description: Assesses how far a source can be trusted for a specific claim using lateral reading (author, evidence, funding, corroboration) and gives a reasoned verdict. Use before citing a source.
category: fact-checking
version: 1.0.0
status: experimental
stage: [verify]
role: [researcher, student, writer, editor]
requires: [web]
inputs: [url, text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [lateral-reading, sift, media-literacy, misinformation]
pairs_with:
  prompts: [fact-check-claims]
  rules: [source-citation-rules]
args:
  - name: source
    description: The URL of the source, or its text with whatever you know about where it came from.
    type: text
    required: true
  - name: claim_context
    description: The claim you want to use the source for, since a source can be reliable for one claim and not another.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Who is behind it, What the evidence is, What others say, Red and green flags, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Research on how professional fact-checkers evaluate websites found that they read laterally: instead of studying the page itself (its design, its "About" page, its own claims about itself), they leave it quickly and check what independent sources say about who is behind it. The SIFT method teaches the same moves: Stop, Investigate the source, Find better coverage, Trace claims to their original context. Credibility is also claim-specific: a trade association is a good source for its members' prices and a poor one for the safety of its members' products.
</context>

<task>
Assess this source:
<source>
{{source}}
</source>
{{#claim_context}}
It would be used to support: {{claim_context}}
{{/claim_context}}

1. Stop: state what the source is (news report, opinion piece, study, preprint, press release, advocacy page, government page, forum post, AI-generated content farm…) and what it claims.
2. Investigate the source laterally: search for the publisher, the author and any funder outside the source itself. Find who owns or funds it, their expertise in this topic, their track record (corrections, retractions, fact-checker ratings, editorial standards), and their interests in the claim.
3. Find better coverage: look for independent, reputable sources reporting the same claim, and note whether they add evidence or merely repeat this one.
4. Trace claims: follow quotes, statistics and studies back to their origin and check that the origin says what the source says it does, in context and with the same date.
5. Weigh it up for the specific claim, and give the verdict with the reasons that decide it.
</task>

<constraints>
- Base findings on pages you actually opened in this session and link them. Never describe a publisher's ownership, funding or reputation from memory as fact.
- If you have no web access, say so first, assess only what is visible in the source itself, mark the verdict "Cannot determine yet", and list the exact lateral searches the user should run.
- Judge the evidence, not the politics or the style. A polished site can be unreliable; a plain one can be authoritative.
- Separate the source's reliability from the claim's truth: a weak source can repeat a true claim, and the right move is then to cite the better, original source.
- Use the verdict scale exactly: High, Moderate, Low, or Cannot determine yet.
</constraints>

<output_format>
## Verdict
The rating for this claim and one or two sentences on why.
## Who is behind it
Owner, author, funder, expertise and interests, each with a linked source.
## What the evidence is
What the source rests on, and whether tracing it confirmed it.
## What others say
Independent coverage and corroboration, linked.
## Red and green flags
Two short bullet lists.
## How to use it
Whether to cite it, cite the original instead, or avoid it, and what to cite instead if you found something better.
</output_format>
