---
schema: 1
id: sharpen-project-pitch
kind: prompt
title: Sharpen an open-source project's pitch
description: Finds an open-source project's real category, audience and differentiator, then writes the one-line pitch, repo description, topics and README opener. Use before a launch or when nobody gets it.
category: marketing-strategy
version: 1.1.0
status: incubating
stage: [plan]
role: [maintainer, founder, developer-advocate]
requires: [none]
inputs: [text, url]
output: [copy, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, project-pitch, one-line-pitch, repo-description, github-topics]
pairs_with:
  prompts: [audit-readme-conversion, write-positioning-statement, plan-open-source-launch]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What the project does, who uses it today, how it is installed and run, its license, and the current README opener or tagline. A repo URL is fine if the assistant can read it.
    type: text
    required: true
  - name: alternatives
    description: What people use instead today, including scripts, paid tools and doing nothing.
    type: text
  - name: audience
    description: Who you most want to reach first.
    type: string
    default: developers who would install it this week
output_contract:
  format: markdown
  sections: [What it is, Who it is for, Why this and not the alternative, Pitch options, Repo metadata, README opener, Claims to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Checks for name collisions and adds a disambiguation line."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A developer decides in seconds whether a repository is for them. They read the description under the repo name, the first lines of the README and the topics, and they look for three answers: what is it, is it for me, and why this instead of what I already use. Most open-source pitches fail in one of four ways: a slogan with no noun ("supercharge your workflow"), a list of technologies instead of a job ("built with Rust and React"), a category nobody searches for, or a claim nobody can check ("the fastest"). Search on GitHub, package registries and the web matches literal words, so the category noun people already type matters more than a clever name.
</context>

<task>
<project>
{{project}}
</project>
{{#alternatives}}
Alternatives people use today:
{{alternatives}}
{{/alternatives}}
First audience: {{audience}}.

If you cannot tell what the project does, who runs it, or how they install it, ask for those in one message and stop.

1. **Name the category.** List three to five nouns a user would type to find something like this (for example "terminal emulator", "prompt library", "feature flag service"). Pick the one with the clearest existing demand and say why. If the project creates a new category, pair the new term with an existing one. Check the project name too: if it collides with a well-known project or product in the same space, say so and write a one-line disambiguation for the README.
2. **Pin the first audience.** One specific group with a trigger moment ("when you run three coding agents at once and lose track of which one is waiting"). Name who it is not for yet.
3. **Find the differentiator.** Compare against each alternative on the two or three things this audience cares about. Keep only differences the user can verify in minutes (open license, runs offline, no account, works with X). Mark any claim that needs a benchmark or proof as [NEEDS PROOF].
4. **Write pitch options.** Five one-liners, each under 15 words, each built as category noun plus audience or job plus differentiator. Avoid "revolutionary", "supercharge", "blazing", "AI-powered" as the whole idea, and any superlative you cannot prove. Recommend one and explain the choice in two sentences.
5. **Write the repo metadata.** A GitHub description under 120 characters that starts with the category noun, up to 10 topics drawn from terms people search (lowercase, hyphenated, no brand stuffing), and a website field suggestion.
6. **Write the README opener.** A heading, the one-liner, two sentences of who it is for and what changes for them, and one line that tells the reader the fastest way to try it.
7. **Test it.** For the recommended pitch, write what a stranger would answer to "what is it, who is it for, why this one" after reading only the description. If any answer is vague, revise once and show the change.
</task>

<constraints>
- Use only facts from the input. Do not invent users, star counts, benchmarks or endorsements.
- Do not disparage alternatives; state differences, not insults.
- Keep the project's real license wording accurate: say "source-available" rather than "open source" when the license is not OSI-approved.
{{> output/uncertainty}}
</constraints>

<output_format>
## What it is
Category noun and why.
## Who it is for
First audience, trigger moment, not-for-now.
## Why this and not the alternative
| Alternative | What it does well | Where this project differs (verifiable) |
## Pitch options
Numbered, with the recommendation.
## Repo metadata
Description, topics, website.
## README opener
Ready to paste.
## Claims to verify
Every [NEEDS PROOF] item and how to prove it.
</output_format>
