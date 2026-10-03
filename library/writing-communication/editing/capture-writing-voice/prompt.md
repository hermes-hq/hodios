---
schema: 1
id: capture-writing-voice
kind: prompt
title: Capture a writing voice profile
description: Analyses samples of a person's writing into a reusable voice profile of sentence habits, vocabulary, tone, structure and dos and don'ts, then drafts a test paragraph in that voice.
category: editing
version: 1.1.0
status: incubating
stage: [discover]
role: [writer, content-creator, copywriter, founder]
requires: [none]
inputs: [text, document]
output: [report, prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [voice-profile, writing-voice, ghostwriting, style-analysis, personal-brand]
pairs_with:
  prompts: [build-email-templates, line-edit-prose, remove-ai-writing-tics]
args:
  - name: writing_samples
    description: Several pieces written by the same person, at least 400 words in total; 1,500 or more across three or more kinds of writing (emails, posts, articles) gives the most reliable profile. Label each sample with its type if you can.
    type: text
    required: true
  - name: test_topic
    description: A topic for the test paragraph, for example "announcing a price increase to customers". If empty, a topic close to the samples is chosen.
    type: string
output_contract:
  format: markdown
  sections: [Voice profile, Voice instructions, Test paragraph, Confidence]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Says exactly when to stop and ask for more samples and when to give a provisional, low-confidence profile, and how confidence is rated."}
  - {version: 1.0.0, note: "First version."}
---
<context>
"Write in my voice" fails when the voice is described with adjectives ("friendly, professional, witty") that fit everyone. A usable voice profile describes observable habits with evidence: how long the sentences are and how they vary, how paragraphs open, which words recur and which never appear, how the person handles certainty, humour, numbers and disagreement, and what formatting they use. It distinguishes stable traits (present across samples) from situation-specific ones (only in their tweets). A profile like this can be pasted into any assistant, given to a ghostwriter or editor, and checked: a test paragraph either sounds like the person or it does not.
</context>

<task>
Build a voice profile from these samples.

<writing_samples>
{{writing_samples}}
</writing_samples>
{{#test_topic}}
Test topic: {{test_topic}}
{{/test_topic}}

1. Check the samples before analysing them:
   - Under about 100 words in total, or no samples at all: say a profile cannot be built from so little, ask for three to five pieces of at least 150 words each from different situations, and stop.
   - About 100 to 400 words, or only one kind of writing: build the profile, mark it **provisional** at the top of Voice profile and under Confidence, and say which samples would sharpen it.
   - Signs of several authors (different sign-offs, clashing spelling or register): ask whether they are all by one person before treating differences as range, and profile only the samples that clearly share a writer.
2. Analyse and quote evidence for each dimension:
   - **Sentence habits:** typical length and range, variety, favourite openings, use of fragments, questions, lists, parentheses, dashes.
   - **Vocabulary:** register, signature words and phrases, jargon level, words or phrases they avoid (for example no corporate buzzwords), contractions, spelling variety.
   - **Tone and stance:** directness, warmth, humour (type and frequency), how they hedge or assert, how they handle disagreement or bad news, use of "I" and "you".
   - **Structure:** how pieces open and close, paragraph length, use of headings, examples, stories and numbers.
   - **Mechanics and formatting:** punctuation quirks, emoji, capitalisation, bold, line breaks.
   Mark each trait as **stable** (in most samples) or **situational** (name the situation).
3. Write a do and don't list of eight to twelve concrete rules ("Do open with the point, often a one-line sentence"; "Don't use exclamation marks except in thanks").
4. Write compact voice instructions (under about 200 words) that can be pasted into any assistant or handed to a writer: second person, concrete rules, two short quoted examples from the samples.
5. Draft a test paragraph of about 120 words on the test topic (or a topic close to the samples) in the voice. Do not reuse distinctive sentences from the samples verbatim; the test is whether the habits transfer.
6. Annotate the test paragraph briefly: which traits it demonstrates.
</task>

<constraints>
- Every trait must be backed by a quote or a count from the samples; no trait from general impressions.
- Describe the voice, do not judge it. Do not "improve" it in the profile.
- If the samples contain personal details about the writer or others, do not repeat them in the instructions or the test paragraph.
- Do not imitate a specific public figure's voice from your own knowledge; work only from the samples.
</constraints>

<output_format>
## Voice profile
Subsections for each dimension in step 2, with quoted evidence and stable or situational marks, then the do and don't list.
## Voice instructions
The pasteable block, in a quote or code block.
## Test paragraph
The paragraph, then two or three bullets on the traits it shows.
## Confidence
A rating (low under about 400 words or one genre; moderate for 400 to 1,500 words across two or more genres; high above that across three or more), the word count and genres covered, the traits that are uncertain, and what extra samples would sharpen the profile.
</output_format>
