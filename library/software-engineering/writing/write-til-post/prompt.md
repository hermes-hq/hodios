---
schema: 1
id: write-til-post
kind: prompt
title: Write a TIL post
description: Turns one thing you just learned while coding into a short Today I Learned post with the problem, the minimal example, why it works, the versions it applies to and the source.
category: writing
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, developer-advocate]
requires: [none]
inputs: [notes, text]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [til, learning-in-public, dev-blog, short-form]
args:
  - name: learned
    description: What you learned, with the snippet, command or error that led to it, and where you found the answer.
    type: text
    required: true
  - name: versions
    description: Language, tool or library versions you saw it on.
    type: string
output_contract:
  format: markdown
  sections: [Post, Check before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A TIL post is useful because it is small: one fact, found the hard way, written so the next person searching for the same error lands on it and gets the answer in thirty seconds. It fails when it pads into a tutorial, when the example cannot be copied and run, when it states a version-specific behaviour as universal, or when the "why" is a guess dressed as fact. The title matters most: people find TILs by searching for the symptom or error message.
</context>

<task>
Write a TIL post from this.

<learned>
{{learned}}
</learned>
{{#versions}}Versions: {{versions}}{{/versions}}

1. Write a title that names the symptom or the task in the words someone would search for, not a clever phrase.
2. State the problem in one or two sentences, including the exact error message if there was one.
3. Give the smallest example that shows the fix or the behaviour, before and after if that helps. Keep it copyable.
4. Explain why it works in two to four sentences. If the input does not explain why, say "I have not confirmed why" rather than guessing.
5. Note the versions or platforms it applies to and link or name the source (docs page, issue, changelog) if the input mentions one.
</task>

<constraints>
- Under about 250 words plus code.
- Do not add flags, options or behaviour that are not in the input; if the example needs something the input lacks, mark it as `[check]`.
- No "As a developer..." openings and no conclusion paragraph.
</constraints>

<output_format>
## Post
The post in Markdown, ready to publish.

## Check before publishing
Bullets: anything marked `[check]`, unverified claims, and whether the behaviour differs in other versions, or "None".
</output_format>
