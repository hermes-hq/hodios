---
schema: 1
id: write-brand-story
kind: prompt
title: Write a brand story
description: Writes the narrative a company retells everywhere, from the shift in the customer's world and the old way it breaks to the belief and proof, with spoken and audience cuts. Use to align pitches.
category: branding
version: 1.0.0
status: incubating
stage: [build, design]
role: [founder, marketer, copywriter, executive]
requires: [none]
inputs: [text, notes]
output: [copy, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-narrative, strategic-narrative, founder-story, storytelling, message-consistency]
pairs_with:
  prompts: [build-brand-platform, write-positioning-statement, write-brand-voice-guide, write-about-page, write-pitch-deck-outline]
  personas: [brand-strategist]
args:
  - name: company
    description: What the company does, for whom, what it does differently, the change it sees in its customers' world if any, and proof you can stand behind (customers, results, numbers, reviews).
    type: text
    required: true
  - name: founder_story
    description: How and why the company started, in the founder's own words - the moment, the frustration, the first customers. Optional; without it the story rests on the customer and the company's belief.
    type: text
  - name: audiences
    description: The audiences who need their own cut of the story.
    type: text
    default: "customers, prospective employees, investors and partners"
output_contract:
  format: markdown
  sections: [Story spine, Spine check, One-liner, Spoken version, Narrative, Audience versions, Proof, Usage notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A brand story is not an About page. It is the source narrative that founders pitch with, salespeople open calls with, recruiters use to explain why the work matters, and every web page and deck draws from. In most companies it does not exist, so each person tells a different version, usually a company biography ("Founded in 2019 by two friends with a passion for innovation...") that makes the company the hero and could belong to anyone.

A story that travels has a fixed spine: a real change in the customer's world, the old way of coping that this change breaks, a belief about what should replace it, the better state the customer can reach, how the company gets them there, and proof. The founder's origin is supporting evidence of why this company can tell it, not the plot. Every version, spoken or written, keeps the same spine and the same facts.
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

Audiences to write cuts for: {{audiences}}

1. **Check the input first.** If it does not say who the customer is, what problem they have, or what the company does differently, ask up to three questions and stop.
2. **Story spine.** One or two lines per part, using only facts given:
   - **The shift:** a change in the customer's world that is already happening and that the customer would recognise (a cost rising, a rule changing, a habit spreading, a tool becoming normal). If the input names none, propose up to two candidates, each marked "(hypothesis - confirm)".
   - **The old way and why it now fails:** how customers cope today, and what the shift does to them if they keep coping that way. Describe the old way, not a named competitor.
   - **The belief:** the company's point of view on how things should be, phrased so a reasonable competitor might disagree.
   - **The better state:** what the customer's work or life looks like once the problem is handled, described without mentioning the product.
   - **How we get them there:** two or three concrete things the company does differently, each tied to one obstacle from the old way.
   - **Proof:** the evidence for each of those, from the input.
   - **Origin (if a founder story was given):** the single moment that shows why this company understands the problem, told as a turning point, not a biography.
3. **Spine check.** Test the spine and fix it before writing versions: the customer, not the company, is the hero; the shift is true and checkable; the belief is one somebody could disagree with; each "how" answers an obstacle; and a direct competitor could not tell this story unchanged. Report each test as pass or fixed, with a one-line reason.
4. **One-liner.** One sentence under 25 words that names the shift or the belief, not just the product category.
5. **Spoken version.** About 75 words (30 seconds aloud) for a founder or salesperson opening a conversation: short sentences, no lists, no figures the speaker could not remember.
6. **Narrative.** The canonical written story in 250 to 350 words, following the spine in order, with concrete details (a real moment, a real number) where the input supplies them. This is the source text that pages, decks and scripts draw from.
7. **Audience versions.** For each audience listed, 60 to 100 words that keep the spine and change only the emphasis: customers care about the better state and proof; prospective employees about the belief and the work it takes; investors and partners about the size of the shift and why this company is placed to win. No fact may differ between versions.
8. **Proof.** List every claim the story makes and its proof. Any claim without proof in the input is marked [proof needed] in every version and listed here with what would substantiate it.
9. **Usage notes.** The two or three lines that should be repeated word for word everywhere, where each version belongs (pitch, sales call, careers page, press, About page), what to stop saying, and the events that should trigger a rewrite (a new market, a pivot, proof that contradicts the story).
</task>

<constraints>
- Do not invent facts: no made-up founding dates, customers, numbers, awards, quotes or anecdotes. Use [placeholders] for missing details. If asked to make up an origin story or testimonials to be presented as true, decline and offer an honest alternative (a story led by the customer and the shift, or a clearly fictional brand character).
- Do not name or disparage competitors unless the user supplied a factual comparison; the antagonist is the old way, not a company.
- Avoid clichés unless the input proves them with a behaviour: "passion", "innovative", "world-class", "on a mission to revolutionise", "we're like a family", "started in a garage".
- Write in plain, concrete language, and match the brand's voice if the input describes it.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings.
- Story spine: a labelled list, one entry per part.
- Spine check: a table | Test | Result | Note |.
- One-liner, Spoken version and Narrative: prose, each followed by its word count in brackets.
- Audience versions: one `###` per audience.
- Proof: a table | Claim | Proof given | Proof needed |.
- Usage notes: a short list.
</output_format>
