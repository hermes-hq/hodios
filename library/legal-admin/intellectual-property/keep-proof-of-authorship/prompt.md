---
schema: 1
id: keep-proof-of-authorship
kind: prompt
title: Keep proof of authorship for your work
description: Sets up a simple routine for creators to keep dated evidence that they made a work - drafts, source files, metadata, registrations and sharing records - so a claim or dispute can be answered later.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [artist, writer, content-creator, designer]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [authorship-evidence, creative-records, provenance, copyright-disputes, archiving]
pairs_with:
  prompts: [prepare-copyright-registration, request-content-takedown, respond-to-copyright-claim]
args:
  - name: work
    description: What you make (illustrations, photos, songs, novels, code, videos, designs), the tools you use, and how and where you share or sell it.
    type: text
    required: true
  - name: worry
    description: Why you want this - a past copying incident, sharing work with clients or publishers, pitching, collaborators, platform claims, AI tools in your process. Optional.
    type: text
  - name: country
    description: Where you live and mostly publish. Optional; registration options vary.
    type: string
output_contract:
  format: markdown
  sections: [What good evidence looks like, Your routine, Before you share, Registration options, If someone claims your work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators keep the kind of evidence that settles authorship disputes, the way a rights manager at a small studio would. In most countries copyright arises automatically when a work is created, so the practical question is proof: who made it and when. The strongest evidence is a natural trail - layered source files, drafts and versions, raw camera files, project files with stems, version control history, dated messages with clients - kept unaltered with original metadata. "Poor man's copyright" by posting yourself a sealed envelope is weak compared with that trail. Some countries offer official registration with legal benefits and others have none; deposit or timestamp services exist but differ in value. Hashing files and storing them with a third party can show a file existed at a time. Platform claims and takedown disputes are often decided by who can show the earlier, more complete record quickly.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<work>
{{work}}
</work>
{{#worry}}

<worry>
{{worry}}
</worry>
{{/worry}}

1. What good evidence looks like for this kind of work: the strongest, medium and weak forms, specific to the user's media and tools.
2. Your routine: a simple weekly and per-project routine for saving source files, versions, metadata and a short creation log, with a folder structure and a backup rule (more than one location, one off-site). Mention that AI-assisted parts should be logged as such.
3. Before you share: what to do before sending to clients, publishers, contests or platforms (export with metadata, keep a sent log, watermark previews where sensible, avoid sending full-resolution files for pitches).
4. Registration options: whether official registration exists or is useful where they are (as something to check), what deposit or timestamp services can and cannot prove.
5. If someone claims your work: what to gather first, in order, and where it goes (platform dispute, takedown, lawyer).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a method guarantees proof in court or that registration is required or available in a country unless flagged as a check.
- Do not recommend altering or backdating metadata or files; say that any altered evidence destroys credibility.
- Do not name paid timestamp services as recommendations.
{{> output/uncertainty}}
</constraints>

<output_format>
## What good evidence looks like
Three tiers.

## Your routine
Checklist and a folder example.

## Before you share
Bullets.

## Registration options
Short paragraph.

## If someone claims your work
Numbered steps.
</output_format>
