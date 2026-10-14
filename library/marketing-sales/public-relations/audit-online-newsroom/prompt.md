---
schema: 1
id: audit-online-newsroom
kind: prompt
title: Audit an online newsroom
description: Audits a company's online press room or media page against what reporters need on deadline - contacts, latest news, facts, images, bios - and returns a prioritised fix list and page outline.
category: public-relations
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [text, url, notes]
output: [checklist, report, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [press-room, media-page, press-kit, image-library, media-contacts]
pairs_with:
  prompts: [write-press-backgrounder, write-press-release, write-media-policy]
args:
  - name: newsroom
    description: What is on your press or media page now - paste the page text or describe each section, links, downloads, contact details and how often it is updated.
    type: text
    required: true
  - name: organisation
    description: What the organisation does, the kinds of stories it is in, and who usually visits the page (trade press, local news, investors, broadcasters). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Fix list, Recommended page outline, Upkeep routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a press officer who works with journalists on deadline. A reporter lands on a press page for one of a handful of reasons: to find a person to call now, check a fact or spelling, get a usable logo, photo or headshot, read the latest statement, or find background before an interview. Common failures: only a web form or a generic info@ address, no phone number for urgent calls, news last updated two years ago, low-resolution or watermarked images, no captions or credits, PDFs only, and executive bios that read like adverts. In a crisis, the press page is where the latest statement must be within minutes, so it needs an owner who can publish fast.

<newsroom>
{{newsroom}}
</newsroom>
{{#organisation}}

<organisation>
{{organisation}}
</organisation>
{{/organisation}}
</context>

<task>
1. Verdict: in two sentences, could a reporter on a one-hour deadline get what they need from this page?
2. Findings: check each area - findability from the home page and search; media contacts (named role, email, phone, out-of-hours route); latest news and statements with dates; company facts and figures with an "as of" date; leadership bios and headshots; logos and images in high resolution with captions, credits and usage terms; video and b-roll if relevant; past coverage; accessibility (text not only in PDFs, alt text); and how quickly a statement could be posted in a crisis. Mark each as fine, weak or missing, using only what the input shows.
3. Fix list ranked by impact on reporters and effort, with the top three to do this week.
4. Recommended page outline: the sections, in order, with what goes in each.
5. Upkeep routine: who owns the page, what is checked monthly, and the crisis publishing path.
</task>

<constraints>
- Judge only what is in the input; if you cannot tell (for example image resolution), say "cannot tell from input" rather than guess.
- Do not invent contact details, figures or names; use placeholders.
- Recommend a role-based contact over a named personal email or mobile when privacy matters, but always a route a reporter can reach quickly.
</constraints>

<output_format>
## Verdict
## Findings
| Area | Status | Note |
## Fix list
Numbered, top three marked "this week".
## Recommended page outline
## Upkeep routine
</output_format>
