---
schema: 1
id: write-myth-busting-post
kind: prompt
title: Write a myth-busting post
description: Writes a post that corrects a common myth without reinforcing it, leading with the fact, flagging the myth once, explaining why people believe it and ending on the fact.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, teacher, content-creator]
requires: [none]
inputs: [topic, notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [misinformation, truth-sandwich, debunking, public-education, plain-language]
pairs_with:
  prompts: [write-fact-check-article, write-explainer-article]
args:
  - name: myth
    description: The myth as people usually say it, where you hear it, and who believes it.
    type: text
    required: true
  - name: evidence
    description: The facts and your sources - studies, official guidance, standards, your professional experience - with titles, dates and links. Include the grain of truth behind the myth if there is one.
    type: text
    required: true
  - name: audience
    description: Optional. Who will read it, for example "homeowners", "parents of toddlers", "new allotment holders".
    type: string
  - name: word_count
    description: Target length in words.
    type: number
    default: 800
output_contract:
  format: markdown
  sections: [Post, Sources used, Check before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help experts correct a myth for the public in a way that sticks. Corrections often backfire in small ways: a headline that repeats the myth ("Does cracking your knuckles cause arthritis?") keeps it in memory; a correction that only says "that's false" leaves a gap the myth fills again; a lecturing tone makes believers defensive; and weak or missing sources make the correction easy to dismiss. What works is the "truth sandwich": lead with the fact, mention the myth once with a warning that it is wrong, explain why it sounds right and why it is not, give a better explanation to replace it, and finish with the fact again.

Length: about {{word_count}} words.
{{#audience}}Readers: {{audience}}{{/audience}}
</context>

<task>
<myth>
{{myth}}
</myth>

<evidence>
{{evidence}}
</evidence>

1. Write the fact as one short, memorable sentence that does not contain the myth's wording. This leads the headline and the first paragraph.
2. Headline: states the fact, not the myth, and not a question.
3. Structure:
   - Fact first, with why it matters to these readers in practice.
   - The myth, stated once, introduced with a clear flag ("A common belief is wrong: ...").
   - Why people believe it: the grain of truth, the origin or the experience that makes it feel true. Show respect for people who believed it.
   - The evidence: two to four points from the sources given, each attributed in the text ("guidance from X in 2024 says").
   - The replacement explanation: what actually happens and what to do instead.
   - The fact again, with one practical action.
4. Write for readers with no specialist knowledge: short paragraphs, everyday words, one example from daily life.
5. If the evidence is mixed or the myth is partly true, say so plainly and narrow the claim rather than overstate the correction.
</task>

<constraints>
- Use only the sources and facts in the evidence. Never invent studies, statistics, experts or quotes; mark claims that need a source as [SOURCE NEEDED].
- Repeat the myth's wording only once in the body, never in the headline, subheadings or the final line.
- No mockery of people who believe it, and no "everyone knows".
- If the myth concerns health, medicines, law or money, keep to general information, point readers to the right professional for their own situation, and do not advise on individual cases.
- If the evidence does not support the correction, say so and stop instead of writing the post.
</constraints>

<output_format>
## Post
Headline, then the post, then the word count.

## Sources used
Numbered list of the sources from the evidence, as cited in the text.

## Check before publishing
Bullets: the one-sentence fact, where the myth appears (should be once), [SOURCE NEEDED] items, and any claim narrowed because the evidence was mixed.
</output_format>
