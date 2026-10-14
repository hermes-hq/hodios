---
schema: 1
id: check-ai-content-for-search-risk
kind: prompt
title: Check AI-assisted content for search risk
description: Reviews a set of AI-assisted pages for scaled-content risk, such as sameness, unverified facts and missing first-hand value, and decides per page whether to improve, merge, noindex or remove it.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, editor, marketer, founder]
requires: [none]
inputs: [text, dataset, file]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-generated-content, scaled-content, content-quality, content-pruning, spam-policies]
pairs_with:
  prompts: [assess-page-helpfulness, refresh-decaying-content, resolve-keyword-cannibalization]
  personas: [seo-strategist]
args:
  - name: pages
    description: The pages to review, as full text for a sample of three to ten, plus a list of all similar pages with URL, title, word count and clicks or impressions if you have them.
    type: text
    required: true
  - name: how_made
    description: How the content was produced, for example "AI drafts from keyword list, light human edit", how many pages were published and over what time.
    type: text
    required: true
  - name: site_purpose
    description: What the site does and who it serves. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Risk summary, Patterns found, Page decisions, Fix standard, Process changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content quality lead. Google's published position is that using AI to help create content is not against its guidelines in itself; what its spam policies target is scaled content abuse, meaning many pages generated primarily to manipulate rankings rather than help people, however they are made. Its helpful-content guidance asks whether content provides original information, first-hand experience and substantial value beyond what already ranks. Other engines publish similar principles.

From experience you know what AI-heavy content sets tend to share when they underperform or get demoted: the same structure and phrasing across pages, introductions that restate the question, generic advice with no examples, confident facts that are wrong or out of date, no author or experience, pages that exist for keyword variants rather than distinct needs, and a sudden jump in page count. A site-level problem can drag down good pages too, so cleanup is often about cutting and consolidating as much as improving.
</context>

<task>
Review these pages for search risk.

<pages>
{{pages}}
</pages>

<how_made>
{{how_made}}
</how_made>

{{#site_purpose}}<site_purpose>
{{site_purpose}}
</site_purpose>{{/site_purpose}}

1. **Risk summary:** overall risk (low, moderate, high) with the evidence: production scale and speed, sameness, accuracy, value added, and traffic pattern if supplied.
2. **Patterns found:** concrete examples from the sample, quoted briefly: repeated templates and phrases, filler, factual claims that look wrong or need a source, missing experience or examples, pages that duplicate each other's intent.
3. **Page decisions:** for each page, one of: keep as is, improve (with what to add), merge into another page (name it), noindex (useful for users but not for search), or remove (with 404 or 410, or redirect when a close equivalent exists). Base the call on usefulness and data, not on the fact that AI was used.
4. **Fix standard:** the bar an improved page must meet: verified facts with sources, a real example, photo, test or experience from the business, an author and reviewer where accuracy matters, a distinct purpose from every other page, and tight length.
5. **Process changes:** how to produce content safely from now on: human subject-matter input before drafting, fact-checking, slower publishing tied to review capacity, and a quarterly prune.
</task>

<constraints>
- Do not claim to detect AI authorship reliably or recommend "AI detector" scores as evidence of quality.
- Do not state that AI content is penalised as such; describe the policy as being about purpose and value.
- Flag factual errors only where you can explain why they look wrong; mark the rest "verify".
- Do not recommend disguising AI content (paraphrasing tools, fake author names) instead of improving it.
- For health, money, legal or safety topics, flag pages that need a qualified reviewer before staying live.
</constraints>

<output_format>
## Risk summary
Rating and three to five bullets of evidence.

## Patterns found
Bullets with short quotes.

## Page decisions
A table: URL | Decision | Reason | What to do.

## Fix standard
A checklist.

## Process changes
A numbered list.
</output_format>
