---
schema: 1
id: attribute-creative-commons-work
kind: prompt
title: Use and credit Creative Commons work correctly
description: Checks whether a Creative Commons or other open licence allows your use - commercial, adapted, shared alike - and writes the exact attribution line and any notices needed for each work.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [build, review]
role: [content-creator, teacher, writer, designer]
subject: [law]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [creative-commons, open-licences, attribution-line, share-alike, open-content]
pairs_with:
  prompts: [assess-use-of-copyrighted-material, check-stock-asset-licence, add-sources-to-slides]
args:
  - name: works
    description: Each work you want to use - title, creator, where you found it, the licence shown (for example CC BY 4.0, CC BY-NC-SA, CC0, public domain mark) and the link text or licence name exactly as shown.
    type: text
    required: true
  - name: use
    description: Your project (blog, course, book, video, slides, app, merchandise), whether it earns money or is for a company, whether you will crop, edit, translate or combine the works, and the licence you want for your own project.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Use by work, Attribution lines, Combining and your own licence, Records to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check open-licensed material the way a librarian or open-education specialist does. Creative Commons licences are built from elements: BY (credit the creator), NC (non-commercial only), ND (no adaptations shared), SA (share adaptations under the same licence). CC0 waives rights as far as the law allows; a public domain mark labels work as already free of known copyright. Common mistakes: treating "NC" as fine because a project is small, though monetised channels, company blogs and paid courses are often commercial; cropping or editing an ND work and publishing it; combining SA material into a project under an incompatible licence; a bare "photo: Flickr" credit instead of title, author, source and licence with links (a common shorthand is TASL); and using a work uploaded by someone who did not own it. The licence covers copyright only, not trademarks, privacy or the rights of people shown. Licence versions differ in details, so the exact version matters.
</context>

<task>
<works>
{{works}}
</works>

<use>
{{use}}
</use>

1. Use by work: for each work, the licence elements, whether this use is allowed, adaptations allowed, conditions triggered, and any red flag (unclear source, NC with a commercial project, ND with edits, people or logos shown).
2. Attribution lines: the exact credit for each work in the format title, author, source and licence, noting changes ("cropped", "translated") where made, in a version for print and one for web with link text.
3. Combining and your own licence: whether the works can be combined in the project and what licence the project or the adapted parts may need, especially with SA works.
4. Records to keep: a saved copy of the work's page and licence at the time, date accessed and the version.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not decide borderline non-commercial questions as fact; say why it is borderline and suggest asking the creator.
- Do not invent creators, titles or licence versions; use [BRACKETS] where details are missing.
- If the licence is unclear or the uploader may not be the owner, say so and suggest another work.
{{> output/uncertainty}}
</constraints>

<output_format>
## Use by work
Table: work | licence | use allowed? | adaptations | conditions | flags.

## Attribution lines
Per work: print line, then web line.

## Combining and your own licence
Short paragraph.

## Records to keep
Checklist.
</output_format>
