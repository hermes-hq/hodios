---
schema: 1
id: write-company-descriptions
kind: prompt
title: Write company descriptions in every length
description: Writes a consistent set of company descriptions at one line, 25, 50, 100 and 250 words, plus press boilerplate and profile versions for the platforms you name, from one fact sheet.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
requires: [none]
inputs: [text, notes]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [company-description, press-boilerplate, about-us, directory-listing, brand-consistency]
pairs_with:
  prompts: [write-about-page, write-press-release, write-value-proposition, write-elevator-pitch, write-trade-directory-profile]
  personas: [copywriter]
args:
  - name: company
    description: What the company does, for whom, where it is based and operates, founding year, size or scale facts you are happy to publish (customers, staff, locations), notable proof (awards, funding, certifications), and the website.
    type: text
    required: true
  - name: platforms
    description: Where the descriptions will be used and any character limits you know (for example "LinkedIn page, Google Business Profile, Crunchbase, event sponsor listing, grant application"). Optional.
    type: text
  - name: existing
    description: Current descriptions in use, so the new set can fix inconsistencies. Optional.
    type: text
  - name: tone
    description: Voice notes (for example "plain and warm, no jargon" or "formal for investors"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Core facts, Description set, Platform versions, Consistency notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the short descriptions a company reuses everywhere: the website footer, press releases, LinkedIn, directories, event programmes, partner pages, grant and tender forms. Companies usually end up with a dozen versions written by different people that contradict each other on what the company does, when it was founded and how big it is. Journalists, partners and search engines notice the mismatch.

The fix is a single fact sheet and a nested set of descriptions: each longer version expands the shorter one rather than saying something different. The one-liner says what you do and for whom in plain words. The 25-word version adds the main difference. The 50 and 100-word versions add proof and scale. The press boilerplate ("About [Company]") is third person and factual, with founding year, headquarters, what the company does, for whom, a scale fact and the website. Numbers in descriptions go stale, so each one needs a date to review.
</context>

<task>
<company>
{{company}}
</company>

{{#platforms}}<platforms>
{{platforms}}
</platforms>{{/platforms}}

{{#existing}}<existing>
{{existing}}
</existing>{{/existing}}

{{#tone}}Tone: {{tone}}{{/tone}}

1. If you cannot tell what the company does or for whom, ask up to three short questions and stop.
2. Build the core facts: legal or trading name, what it does, for whom, where, founded, scale facts, proof, website. Mark each fact that will go stale (numbers, "largest", funding) with a review note. If existing descriptions contradict each other, list the contradictions and ask which is correct, using the inputs' version meanwhile.
3. Write the nested set: one line (about 10 words), 25 words, 50 words, 100 words and 250 words. Each longer version keeps the shorter one's core claim and wording where possible.
4. Write the press boilerplate in third person, under about 100 words.
5. Write versions for each named platform in that platform's style and within any limits the user gave. Where a limit is not given, say to check the platform's current limit rather than stating one.
6. Write consistency notes: the exact phrasing to reuse, words to avoid, and the facts to review and when.
</task>

<constraints>
- Use only supplied facts. Never invent founding years, customer counts, awards or funding. Mark gaps as [CONFIRM: ...].
- Every version must say what the company does in plain words; no "innovative solutions provider" lines.
- No unprovable superlatives ("leading", "world-class", "number one") unless the inputs give a source; then name the source.
- Word counts must be close to the target (within about 10%).
- First person or "we" for website and profile versions only if the tone asks for it; press boilerplate is always third person.
</constraints>

<output_format>
## Core facts
A table: Fact | Value | Review by.

## Description set
Each length under its own label with its word count.

## Platform versions
Each platform under its own label, with the limit used or "check current limit".

## Consistency notes
Bullets: phrasing to reuse, words to avoid, contradictions found, facts to review.
</output_format>
