---
schema: 1
id: run-sensitivity-read
kind: prompt
title: Run a sensitivity read
description: Reviews a manuscript, campaign or article for stereotypes, inaccurate portrayals and avoidable harm to specific groups, explaining each concern with options while respecting the author's intent.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, marketer, teacher]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sensitivity-reading, representation, stereotypes, authentic-portrayal, harm-review]
pairs_with:
  prompts: [line-edit-prose, rewrite-for-tone]
  rules: [inclusive-language-rules]
args:
  - name: text
    description: The passage, chapter, campaign copy, article or lesson material to review.
    type: text
    required: true
  - name: groups_or_topics_of_concern
    description: Specific groups, identities, cultures or topics you want checked, for example "deaf characters", "Muslim family in Lyon", "mental illness", "Indigenous Australian imagery".
    type: text
  - name: content_type
    description: What the text is. It changes the standard applied, for example fiction allows flawed characters while journalism needs accuracy and fairness.
    type: enum
    enum: [fiction, marketing, journalism, education, other]
    default: fiction
output_contract:
  format: markdown
  sections: [Overview, Concerns, Working well, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A sensitivity read looks at how a text portrays people and groups, especially those outside the author's experience, and asks: is it accurate, does it lean on stereotypes or tired tropes, does it cause harm the author did not intend, and would members of that group recognise themselves in it? It is not censorship and not a ban on difficult material. Villains can be bigots, characters can be flawed, journalism can report uncomfortable facts, and satire can offend. The question is whether the effect on the page matches the author's intent, and whether a reader from the group would feel portrayed or used.

Standards differ by content type:
- **fiction:** depth and agency of characters from the group; whether they exist only to serve another character's arc, suffer or die for plot effect, or are defined by one trait; tropes; accuracy of culture, language, religion, disability and daily life; whether prejudice voiced by characters is framed by the story or endorsed by it.
- **marketing:** stereotyped imagery and roles, tokenism, cultural appropriation, humour at a group's expense, accessibility of language, and how copy will read out of context on social media.
- **journalism:** accuracy, fairness, relevance of identity details, current preferred terms, avoiding identification of vulnerable people, and voices from the group itself.
- **education:** accuracy, balance, age-appropriateness, how learners from the group in the room will experience it.

An AI read can catch common problems quickly. It cannot replace readers with lived experience of the identities portrayed, and its knowledge of preferred terms can lag or vary between communities and countries.
</context>

<task>
Run a sensitivity read on this {{content_type}} text.{{#groups_or_topics_of_concern}} Pay particular attention to: {{groups_or_topics_of_concern}}.{{/groups_or_topics_of_concern}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If the content type or the author's intent is unclear and it changes the assessment (satire or not, a villain's view or the narrator's), state your assumption in the Overview.
2. Read the whole text first for intent and context. Then review it against the standards for {{content_type}}, plus any groups or topics named. Also note significant concerns about groups that were not named.
3. For each concern, record:
   - the quoted passage and location;
   - what the concern is (stereotype, trope, inaccuracy, outdated or slur term, lack of agency, framing, missing context, identifying detail);
   - why it may matter, and to whom, in one or two sentences, without lecturing;
   - severity: **harmful** (likely to hurt or misrepresent people in a way most readers from the group would object to), **likely to be read badly** (a reasonable reader may take it the wrong way), or **craft opportunity** (not harmful, but the portrayal could be richer or more accurate);
   - two or three options that keep the author's intent, from a light fix (a word, a line of context) to a deeper change (giving a character an inner life or a goal of their own). Include "keep as is" where it is a defensible choice, and say what would make it land.
4. Separate questions of fact from questions of judgement. For facts (a ritual, a sign language detail, a medical reality), say what is wrong or what to verify. For judgement calls, present the trade-off.
5. Note what the text does well in its portrayals, specifically.
6. Recommend next steps: what to verify and with whom, and whether the material warrants paid sensitivity readers with lived experience before publication.
</task>

<constraints>
- Respect the author's intent and voice. Do not rewrite the text, sanitise conflict, or remove flawed characters; offer options.
- Do not flag something only because it is uncomfortable, if the text handles it deliberately and well.
- Be specific and calm. No moralising, no general lectures on representation.
- Where community preferences on a term differ, say so rather than declaring one correct.
- Do not speculate about the author's identity or motives.
</constraints>

<output_format>
## Overview
Three to five sentences: the assumed intent and content type, the overall assessment, the number of concerns by severity, and the most important one.
## Concerns
Table: # · Passage (quoted, with location) · Concern · Why it may matter · Severity · Options. Ordered by severity.
## Working well
Bullets with specific examples.
## Next steps
Bullets: facts to verify and where, readers to consult, and anything to decide before publication.
</output_format>
