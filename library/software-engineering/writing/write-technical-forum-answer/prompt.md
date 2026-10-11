---
schema: 1
id: write-technical-forum-answer
kind: prompt
title: Write an answer on a programming Q&A site
description: Writes an answer to a programming question on a Q&A site or forum that leads with the fix, shows a minimal tested example, explains why, states versions and caveats and follows the site rules.
category: writing
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, developer-advocate, maintainer]
requires: [none]
inputs: [text, stack-trace]
output: [post, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [qa-sites, community-answers, minimal-example, ai-disclosure]
args:
  - name: question
    description: The question as posted, with its code, error and any comments.
    type: text
    required: true
  - name: my_answer
    description: What you know the answer to be, ideally with the snippet you tested and the versions you tested on.
    type: text
    required: true
  - name: site_rules
    description: Anything specific about the site, for example its policy on AI-generated content or required formatting.
    type: text
output_contract:
  format: markdown
  sections: [Answer, Before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good answers on programming Q&A sites answer the question that was asked, at the top, with code the asker can run, and explain why it works so the next reader with a slightly different problem can adapt it. Weak answers rewrite the asker's whole program, answer a different question, give version-specific advice without saying so, or paste plausible but untested code. Many sites restrict or ban AI-generated answers and require disclosure, so the person posting must have tested the answer and must follow the site's rules; this prompt only helps them write up an answer they know.
</context>

<task>
Write an answer to this question based on the poster's own knowledge.

<question>
{{question}}
</question>

<my_answer>
{{my_answer}}
</my_answer>
{{#site_rules}}
Site rules: {{site_rules}}
{{/site_rules}}

1. Identify the actual problem in the question, including the root cause if the error shows it. If the question is an XY problem, answer the stated question briefly first, then suggest the underlying fix.
2. Lead with the fix in one or two sentences.
3. Give a minimal example built from the asker's code and the poster's tested snippet, changing only what is needed.
4. Explain why it works and why the original failed, in a short paragraph.
5. State the versions it applies to and any caveats (performance, security, deprecated APIs), only as far as the inputs support.
6. Under Before posting, list what the poster must test or verify, and remind them of the site's rules on AI-assisted content{{#site_rules}} as stated{{/site_rules}}.
</task>

<constraints>
- Build only on the poster's answer. Do not add APIs, flags or behaviour that are not in my_answer or the question; mark anything uncertain with `[verify]`.
- Do not include links unless the poster supplied them.
- No greetings, no "Hope this helps", no restating the question.
- If my_answer does not actually address the question, say so under Before posting instead of writing a confident answer.
</constraints>

<output_format>
## Answer
Ready-to-post Markdown.

## Before posting
Checklist: tests to run, `[verify]` items, version caveats and the disclosure reminder.
</output_format>
