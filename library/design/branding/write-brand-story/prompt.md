---
schema: 1
id: write-brand-story
kind: prompt
title: Write a brand story
description: Writes a brand story built around the customer's problem, why the company exists, what it believes and the change it promises, in one-line, short and long versions. Use for About pages and pitches.
category: branding
version: 1.0.0
status: incubating
stage: [build, design]
role: [founder, marketer, copywriter, writer]
requires: [none]
inputs: [text, notes]
output: [copy, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [brand-narrative, about-page, founder-story, storytelling]
pairs_with:
  prompts: [build-brand-platform, write-brand-voice-guide, write-positioning-statement]
  personas: [brand-strategist]
args:
  - name: company
    description: What the company does, for whom, what makes it different, proof points (customers, results, numbers you can stand behind) and where the story will be used.
    type: text
    required: true
  - name: founder_story
    description: How and why the company started, in the founder's own words - the moment, the frustration, the first customers. Optional; without it the story centres on the customer and the company's beliefs.
    type: text
output_contract:
  format: markdown
  sections: [Story spine, One-liner, Short version, Long version, Proof needed, Usage notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most brand stories are company-centred biographies ("Founded in 2019 by two friends with a passion for innovation...") that make the company the hero and could belong to anyone. Stories that work cast the customer as the hero facing a real problem, show the company as the guide that understands it, state a belief worth disagreeing with, and promise a specific change. They are true, short enough to repeat, and backed by proof.
</context>

<task>
Write the brand story.

<company>
{{company}}
</company>
{{#founder_story}}
<founder_story>
{{founder_story}}
</founder_story>
{{/founder_story}}

1. **Story spine.** Outline the story's parts in one or two lines each, using only the facts given:
   - the customer and their world as it is (the problem, the frustration, the cost of living with it);
   - what is wrong with the usual answers (the category's status quo);
   - the company's belief: a point of view about how things should be, one that a competitor might disagree with;
   - why the company exists and, if a founder story was given, the moment that started it, told as a turning point rather than a biography;
   - what the company does differently, as concrete actions, not adjectives;
   - the change it promises for the customer, and the proof that it delivers.
   If the company description lacks a customer, a problem or a difference, ask up to three questions and stop.
2. **One-liner.** One sentence under 25 words a founder could say at a dinner party.
3. **Short version.** 60 to 90 words for a homepage section, a social bio or an investor email.
4. **Long version.** 250 to 400 words for an About page, written as a story with the customer at the centre, the founder story as supporting context, concrete details (a real moment, a real number) and an ending that invites the reader in.
5. **Proof needed.** List every claim in the story and its proof. Any claim without proof in the input is marked [proof needed] in the text and listed here with what would substantiate it.
6. **Usage notes.** Where each version fits, what to update as the company grows, and lines that should stay consistent across the website, pitch deck and recruiting.
</task>

<constraints>
- Do not invent facts: no made-up founding dates, customers, numbers, awards, quotes or anecdotes. Use [placeholders] for missing details. If asked to make up an origin story or testimonials to be presented as true, decline and offer an honest alternative (a customer-led story, or a clearly fictional brand character).
- Avoid clichés unless the input proves them: "passion", "innovative", "world-class", "on a mission to revolutionise", "we're like a family", "started in a garage".
- Write in plain, concrete language and match the brand's voice if the input describes it.
- The founder is a supporting character; the customer's problem leads.
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings. The spine as a short list; the three versions as prose; proof needed as a table: | Claim | Proof given | Proof needed |
</output_format>
