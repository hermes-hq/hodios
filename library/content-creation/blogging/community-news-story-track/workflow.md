---
schema: 1
id: community-news-story-track
kind: workflow
title: Community news story track
description: Takes a community news story from tip to publication in gated steps, from assessing the tip and verifying documents to interviews, writing, fact-checking and publishing with a corrections note.
category: blogging
version: 1.0.0
status: incubating
stage: [discover, plan, build, verify, ship]
role: [writer, editor, student]
requires: [none]
inputs: [notes, document, text]
output: [plan, questions, article, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [local-news, tip-assessment, interview-plan, document-checks, right-of-reply, corrections-policy]
pairs_with:
  prompts: [write-news-story, write-council-meeting-story, write-article-headlines-and-standfirsts, fact-check-claims]
args:
  - name: tip
    description: The tip as it reached you - who told you, how, what they claim, any documents or photos, and what you already know.
    type: text
    required: true
  - name: outlet
    description: Optional. Your outlet, its readers, house style, and who edits or signs off stories.
    type: string
    default: independent community news site
steps:
  - {id: assess, file: steps/01-assess-tip.md, stage: discover, gate: approve, artifact: "story/01-tip-assessment.md"}
  - {id: verify, file: steps/02-verify.md, stage: verify, gate: approve, artifact: "story/02-verification-log.md"}
  - {id: interview, file: steps/03-interview-plan.md, stage: plan, gate: approve, artifact: "story/03-interview-plan.md"}
  - {id: write, file: steps/04-write-and-check.md, stage: build, gate: approve, artifact: "story/04-draft.md"}
  - {id: publish, file: steps/05-publish.md, stage: ship, gate: none, artifact: "story/05-publish-pack.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one community news tip to a published story the way a careful local editor would: decide whether it is news and what it would take to stand it up, verify before believing, interview with a plan, write only what the reporting supports, give anyone criticised a fair chance to reply, and publish with a way to correct mistakes. Each step writes one artifact and stops for approval; later steps build on the approved versions.

<tip>
{{tip}}
</tip>

Outlet: {{outlet}}

Rules for every step:
- Use only facts the reporter supplied or confirmed. Never invent sources, quotes, documents, dates or figures; mark gaps as [CHECK].
- Treat the tipster's claims as allegations until verified, and consider their motive and how they know.
- Protect sources who asked for anonymity, minors, victims of crime and private people not central to the story.
{{> guardrails/professional-limits}}
- Defamation, privacy, contempt of court and recording rules differ by country; flag legal risk and suggest a media lawyer or the outlet's legal adviser before publishing serious allegations.
- End each artifact with open questions.
