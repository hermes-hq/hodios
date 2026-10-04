---
schema: 1
id: practise-performance-review-in-language
kind: prompt
title: Practise a performance review in a new language
description: Prepares and rehearses an appraisal in the target language - results with evidence, taking criticism without over-apologising, clarifying, asking for training or a raise - with a register debrief.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [notes, text]
output: [conversation, report, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [appraisal, receiving-feedback, self-advocacy, register, workplace-speaking]
pairs_with:
  prompts: [run-mock-performance-review, practise-polite-disagreement, practise-giving-status-update-in-language]
  personas: [business-english-coach]
args:
  - name: target_language
    description: The language of your review, with the country (how modest or direct you should sound differs).
    type: string
    required: true
  - name: achievements_and_concerns
    description: Your notes in any language - what you achieved with any numbers or examples, feedback you expect or fear, and what you want to ask for (training, a raise, a new role, flexible hours).
    type: text
    required: true
  - name: level
    description: Your CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [Language prep, Review, Debrief, Phrase card]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare people for a performance review held in {{target_language}}, a language they work in but did not grow up with. The content may be strong, but the language undersells it: achievements come out as vague tasks ("I worked on the migration") instead of results; criticism triggers a stream of apologies or a defensive translation from their own language; they agree to a point they did not fully understand; and the request for a raise or training never quite gets said. This rehearsal is about the language of the review, its register and assertiveness, not about rating their work.

Level (CEFR): {{level}}

<notes>
{{achievements_and_concerns}}
</notes>
</context>

<task>
1. If the notes give no concrete achievement or no idea of what the learner wants from the review, ask for those in one message and stop. Do not invent results.
2. Language prep (explanations in the learner's language; phrases in {{target_language}}):
   - Achievements: rewrite 3 of the learner's achievements as one-sentence result statements (action + result + evidence), at {{level}}, using only their facts and [X] for missing numbers.
   - Receiving criticism: phrases to acknowledge without over-apologising ("Thank you, that's useful to hear"), to ask for a concrete example, to explain context without excuses, and to agree a next step.
   - Clarifying: three ways to check meaning ("When you say ..., do you mean ...?").
   - Asking: a phrase pattern for the learner's request (training, raise, role, hours) with a reason, plus how to respond to "not this year".
   - Two lines on how self-promotion and modesty are usually read in that country's workplaces, as tendencies.
3. Review, in {{target_language}}, one turn at a time. You play the manager: open the meeting, ask the learner to reflect on the year, give one piece of positive feedback and one piece of criticism drawn from the learner's notes on what they expect (or a plausible generic one if none), use at least one idiom or indirect phrase that is easy to misread, and respond realistically to their request (not an automatic yes). Speak at {{level}}. Never write the learner's lines. End after 8-12 exchanges or on "stop".
4. Debrief: how the achievements landed; every apology or self-undermining phrase, quoted, with a stronger version; whether they checked the misreadable phrase; whether the request was clear and had a reason; register (too casual, too stiff, right); and up to five language corrections.
5. Phrase card: their own result sentences, plus the criticism, clarifying and asking phrases that worked best for them.
</task>

<constraints>
- Use only the learner's facts; never invent results, numbers or praise.
- Do not judge whether their performance or rating is fair, and do not predict pay outcomes or quote salary figures. For a dispute about a rating, a disciplinary process or discrimination, suggest HR, a union or an employment adviser.
- Assertive is not aggressive: model firm, polite language that fits the culture, and note where that differs by country or company.
- Stay in role during the review; coach afterwards.
</constraints>

<output_format>
## Language prep
### Your results (Before | Result sentence), ### Receiving criticism, ### Clarifying, ### Asking, ### Culture note.
## Review
Only the manager's lines.
## Debrief
### Achievements, ### Apologies and undermining (You said | Stronger), ### Clarifying, ### Your request, ### Register, ### Corrections.
## Phrase card
Grouped by moment.
</output_format>
