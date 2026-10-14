---
schema: 1
id: verify-expert-credentials
kind: prompt
title: Verify an expert's credentials and relevance
description: Checks whether a quoted or self-described expert holds the qualifications, affiliation and track record claimed, whether they fit the topic, and what conflicts of interest are disclosed.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [editor, writer, researcher, content-creator]
requires: [web]
inputs: [text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [expert-claims, conflicts-of-interest, credentials, lateral-reading]
pairs_with:
  prompts: [evaluate-source-credibility, check-journal-legitimacy, fact-check-claims]
  rules: [source-citation-rules]
args:
  - name: person
    description: The expert's name and how they are described, for example "Dr Jane Doe, leading immunologist at a major university".
    type: string
    required: true
  - name: claim_context
    description: What they are being quoted or cited on, so relevance can be judged.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Credential check, Relevance to the topic, Interests and affiliations, How to describe them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Expert" is the most abused word in sourcing. Common problems: a real doctorate in an unrelated field ("Dr" on a nutrition claim from a PhD in engineering), an honorary or purchased degree, a past affiliation presented as current, "researcher at" meaning a short visiting post, an institute that is a single-person website, publications only in predatory journals, a title from a professional body that anyone can join, and undisclosed funding from a party with a stake in the topic. A genuine expert can also speak outside their field. Credential checks rely on independent records: the institution's own staff pages, official registers for regulated professions, publication databases and dated archived pages, not the person's own bio.
</context>

<task>
Check this person: {{person}}
They are cited on:
<claim_context>
{{claim_context}}
</claim_context>

1. List each credential claimed or implied: degree and field, title, current and past affiliations, professional registration, publications, awards, roles.
2. For each, search for independent confirmation: the institution's own pages, official professional registers where the profession is regulated in that country, publication databases, and dated archives. Note what confirms, what contradicts and what you could not find.
3. Judge relevance: does their actual expertise match the specific claim, or are they speaking outside it? Is their view typical of the field or a minority position, as far as retrieved sources show?
4. Look for interests: employers, funders, products they sell, advocacy roles and declared conflicts in their own publications.
5. Write an accurate one-line description for use in an article or post.
</task>

<constraints>
- Cite only pages you opened in this session, with URL and date. Never cite from memory or construct a URL.
- If you have no web access, say so at the top, give no verdict, and list where each credential could be checked.
- "Could not confirm" is not "false". Report what you searched and leave the judgement proportionate.
- Do not dig into private life, home address, family or anything beyond the person's public professional role.
- Do not call someone a fraud. Describe the gap between claimed and confirmed credentials and let the evidence speak.
</constraints>

<output_format>
## Verdict
One rating in bold (Credentials confirmed and relevant, Confirmed but outside their field, Partly confirmed, Not confirmed, Contradicted), then two sentences.
## Credential check
Table: credential claimed | confirmed by (linked) | status.
## Relevance to the topic
Their real field against the claim, and whether their view is mainstream or minority per retrieved sources.
## Interests and affiliations
Funding, employers, products and declared conflicts relevant to the topic.
## How to describe them
One accurate line, plus any caveat a reader should see.
</output_format>
