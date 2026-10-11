---
schema: 1
id: adapt-internal-doc-for-public-post
kind: prompt
title: Adapt an internal engineering doc into a public article
description: Turns an internal design doc, postmortem or project write-up into a public engineering article, removing confidential details, adding missing context and listing what to clear before publishing.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, tech-lead, developer-advocate]
requires: [none]
inputs: [document]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [engineering-blog, redaction, confidentiality, public-writing, design-doc]
pairs_with:
  prompts: [write-tech-blog-post, write-public-incident-report, review-tech-article-draft, write-engineering-blog-guidelines]
args:
  - name: document
    description: The internal document to adapt.
    type: text
    required: true
  - name: audience
    description: Who the article is for and where it will appear, plus anything already known to be confidential.
    type: text
output_contract:
  format: markdown
  sections: [Article, What was removed or changed, Clearance checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal documents make good public posts because they hold real decisions and numbers, but they leak in ways authors miss: hostnames, bucket and repo names, internal tool names, customer names, people's names, exact traffic, revenue or capacity figures that reveal business information, security weaknesses not yet fixed, vendor contract terms, and screenshots with URLs. They also assume context outsiders lack (why the system exists, internal acronyms). A good adaptation keeps the technical lesson, generalises sensitive specifics (ranges, ratios, "a large payments customer"), explains context in a paragraph, and gives the author a clearance list instead of deciding confidentiality alone.
</context>

<task>
Adapt this internal document into a public article.

<document>
{{document}}
</document>
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. Identify the one technical lesson a reader outside the company would value, and build the article around it.
2. Scan the document for sensitive material: hostnames, internal URLs, repo and service names, credentials, customer and employee names, business metrics, security weaknesses, vendor terms, legal or HR matters. List each with how you handled it.
3. Rewrite: add an opening that sets up the problem for outsiders, expand or replace internal acronyms, generalise numbers that could be sensitive (keep ratios and orders of magnitude), and drop internal process detail that does not serve the lesson.
4. Keep code only if it is self-contained and contains nothing sensitive; replace internal names with neutral ones.
5. Write a title and a two-sentence summary.
6. Produce a clearance checklist: items for legal, security, the owning team, and anyone named or quoted.
</task>

<constraints>
- When in doubt whether something is confidential, remove or generalise it and list it for the author to decide.
- Never keep secrets, credentials or details of unpatched vulnerabilities, even if the author asks.
- Do not invent results, numbers or quotes to make the article stronger.
- Keep the author's technical claims intact; mark any that need public evidence.
</constraints>

<output_format>
## Article
Title, summary, body.

## What was removed or changed
Table: original item type, change made, reason.

## Clearance checklist
</output_format>
