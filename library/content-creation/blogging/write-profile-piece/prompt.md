---
schema: 1
id: write-profile-piece
kind: prompt
title: Write a profile piece
description: Writes a profile of a person or organisation from interviews and research, built on one central idea, observed scenes, other voices and fair characterisation. Use for profile features.
category: blogging
version: 1.0.0
status: incubating
stage: [design, build]
role: [writer, editor, marketer]
inputs: [transcript, notes, document]
output: [article, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [journalism, profile-writing, interview-based, characterisation, long-form]
pairs_with:
  prompts: [write-feature-article, write-guest-interview-questions, write-article-headlines-and-standfirsts]
args:
  - name: interview_notes
    description: Your interview transcripts or notes with the subject, interviews with people who know them (names and relationship), scenes you observed, and background research with sources. Say whether the subject will review the piece before publication.
    type: text
    required: true
  - name: subject_name
    description: Who or what is being profiled, with their role (for example "Amara Osei, founder of a community bike workshop").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Central idea, Profile, Fairness check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a profile writer and editor. A profile is not a biography or a CV in prose; it is an argument about who someone is, built around one central idea (a tension, an obsession, a contradiction, a turning point) and proved through scenes, the subject's own words, what others say about them, and telling details. Readers should finish feeling they have met the person. The strongest profiles show the subject doing something rather than only talking, include at least one voice beyond the subject, and allow complexity: a profile that is all praise reads as PR and is less believable. Profiles of organisations work the same way, through the people inside them and a defining moment or choice.
</context>

<task>
Write a profile of {{subject_name}} of about 1,200 to 1,800 words, unless the notes ask for a different length.

<interview_notes>
{{interview_notes}}
</interview_notes>

1. **Central idea.** Propose two or three possible central ideas the material supports, each in one sentence with the scene or quote that proves it. Choose one. If the material only supports a CV-style piece, say so and list what to gather (an observed scene, another voice, a moment of difficulty).
2. **Write the profile:**
   - Open with a scene, a telling detail or a revealing quote that points at the central idea. No birth-to-present chronology in the first paragraphs.
   - State or strongly imply the central idea within the first four or five paragraphs.
   - Weave in background only where it explains the present.
   - Use the subject's words for voice, conviction and self-understanding; use others' words for how the subject is seen, including any respectful disagreement or criticism the notes contain.
   - Include physical or environmental detail from observed scenes, avoiding comment on appearance unless it is relevant to the story.
   - End with a scene, line or image that crystallises the central idea, not a summary of achievements.
3. **Fairness check.** List every statement that could hurt the subject or a third party, how it is sourced, and whether they have had a chance to respond. Flag private details (health, family, finances, addresses) and whether the notes show consent to publish them.
</task>

<constraints>
- Use only the material. Do not invent scenes, quotes, biographical facts, thoughts or feelings. Gaps become `[REPORT: …]`.
- Quotes exactly as recorded; no splicing of separate answers into one quote.
- Do not present the subject's own claims about achievements as fact without a source; attribute them ("she says").
- Respect off-the-record and background material if the notes mark it: leave it out.
- If the notes say the subject will review the piece, still write it independently; note any factual-check items for them, not tone changes.
</constraints>

<output_format>
## Central idea
The options, the choice, and why.

## Profile
Headline, standfirst, and the profile, then the word count.

## Fairness check
Sensitive statements and their sourcing, right-of-reply status, private details and consent, and `[REPORT]` gaps.
</output_format>
