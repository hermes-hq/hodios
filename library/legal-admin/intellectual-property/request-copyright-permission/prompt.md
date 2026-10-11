---
schema: 1
id: request-copyright-permission
kind: prompt
title: Request permission to use a work
description: Writes a permission or licence request to the owner of a photo, excerpt, artwork, lyric or clip, scoping exactly the rights you need, and a record of what was agreed.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, artist, researcher]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [permissions-request, rights-clearance, licence-scope, attribution, rights-holder]
pairs_with:
  prompts: [assess-use-of-copyrighted-material, write-licence-for-creative-work]
args:
  - name: material
    description: The work you want to use (title, creator, where you found it), how much of it, and who you think owns the rights (creator, publisher, estate, agency, label). Say if you do not know.
    type: text
    required: true
  - name: your_project
    description: Your project (book, documentary, course, ad, album cover), print run or audience size, territories, formats (print, ebook, online, broadcast), how long you need the rights, and any budget.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to ask, Rights to request, Request message, Record of permission, If there is no reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors, filmmakers, educators and creators ask for permission to use someone else's work. Permission requests fail or cause trouble later for predictable reasons: they go to the wrong person (the photographer may have licensed rights to an agency; a song has separate rights in the composition and the recording; a quoted book's rights may sit with the publisher), they ask vaguely ("can I use your photo?") so the answer does not cover ebook, translation or later editions, or the yes arrives in a chat message with no scope. A good request identifies the exact material, states the use precisely (format, territory, term, print run or audience, whether it will be edited), offers credit and a fee if there is budget, and asks for a written reply that confirms the rights holder actually controls those rights.
</context>

<task>
<material>
{{material}}
</material>

<project>
{{your_project}}
</project>

1. Who to ask: the likely rights holders for this kind of material, including split rights (composition and recording, text and illustrations, photo and the person or artwork in it), and how to find them (credits, the publisher's permissions department, collecting societies, picture agencies). Do not invent contact names or addresses.
2. Rights to request: a precise scope (material, use, formats, territories, term, print run or audience, editing allowed, exclusivity not needed) and what to avoid over- or under-asking for. Note when a collecting society or standard licence may be the route instead.
3. Request message: short, polite and specific, with the project, the exact material, the scope, the credit line offered, the fee or the question about fees, and a request to confirm they control the rights. A one-paragraph version for social or contact forms too.
4. Record of permission: what the written yes should contain, as a checklist, and a short confirmation reply the user can send back to fix the scope in writing.
5. If there is no reply: say that silence is not permission, and list the options (find another rights holder route, use something else, re-check whether an exception may apply with a lawyer).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest treating silence, an unanswered email or a "no reply in 14 days means yes" line as permission.
- Do not invent rights holders, fees or standard rates.
- Do not draft a full licence agreement here; list the terms and recommend legal review where significant money or a publisher's contract is involved.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who to ask
Bullets, including split rights.

## Rights to request
Table: term | what to ask for.

## Request message
Email version, then the short version.

## Record of permission
Checklist, then the confirmation reply.

## If there is no reply
Bullets.
</output_format>
