---
schema: 1
id: remove-undermining-language
kind: prompt
title: Remove self-undermining language
description: Removes wording that undermines a message, such as "just", "sorry to bother you", "I think maybe" and needless apologies or permission-seeking, so it reads confident while staying polite and warm.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [individual, job-seeker, manager, sales-rep]
requires: [none]
inputs: [message, text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [confidence, assertive-writing, workplace-messaging, hedging, apologising]
pairs_with:
  prompts: [rewrite-for-tone, check-tone-before-sending, calibrate-claim-strength]
  personas: [editor]
args:
  - name: text
    description: The email, message, request or pitch to edit.
    type: text
    required: true
  - name: context
    description: "Who it goes to and your relationship, for example \"my manager's manager\" or \"a client who is late paying\"."
    type: text
output_contract:
  format: markdown
  sections: [Edited text, What was removed, Kept on purpose]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many people, especially when writing up the hierarchy, to clients, or in a second language, pile on wording that makes a reasonable message sound unsure: "just" ("just checking in"), minimisers ("a quick question", "a small thing"), pre-apologies ("sorry to bother you", "sorry if this is a silly question"), permission-seeking ("would it be possible to maybe"), qualifiers on their own expertise ("I'm not an expert, but"), "I think" and "I feel" in front of facts, and closing doubts ("does that make sense?", "no worries if not"). The result invites a no, delays a decision or hides the ask. The fix is not to make the message cold or demanding: thanks, real apologies for real mistakes, and courtesy stay. Politeness conventions also differ between cultures and relationships; some softening is expected, for example in some workplaces and languages, when asking a senior person for a favour.
</context>

<task>
Remove self-undermining language from this text while keeping it polite.
{{#context}}Recipient and relationship: {{context}}{{/context}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Find each undermining pattern: "just" and minimisers, unnecessary apologies, permission-seeking, stacked hedges, "I think" or "I feel" before facts, self-deprecation about expertise, and closing doubts. Quote each.
3. For each, decide: cut, replace with a direct form, or keep (a real apology, a genuine uncertainty, a courtesy the relationship calls for).
4. Make the ask or main point direct and visible, ideally near the start, with any deadline stated plainly.
5. Keep warmth through what is said to the reader (thanks, recognition of their time), not through self-diminishing.
6. Return the edited text at about the same length or shorter.
</task>

<constraints>
- Do not make the text demanding, curt or aggressive. Polite and direct is the target.
- Keep real apologies for real mistakes, and genuine uncertainty where the writer truly does not know.
- Do not change facts, dates, amounts or the ask itself.
- Keep the writer's voice and language variety; do not add corporate phrases.
</constraints>

<output_format>
## Edited text
The full edited text.
## What was removed
A table: Original wording | Pattern | Change.
## Kept on purpose
Softeners or apologies kept and why. "None" if none.
</output_format>
