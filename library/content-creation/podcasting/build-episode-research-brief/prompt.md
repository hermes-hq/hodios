---
schema: 1
id: build-episode-research-brief
kind: prompt
title: Build an episode research brief
description: Builds a host's research brief for one episode from supplied sources, with the core story, sourced key facts, open questions, counterpoints, pronunciations and claims not to repeat unchecked.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, researcher]
inputs: [document, notes, url]
output: [summary, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [episode-research, source-notes, host-prep, pronunciation-guide, counterpoints]
pairs_with:
  prompts: [write-guest-interview-questions, fact-check-episode-claims, plan-podcast-episode]
  personas: [audio-story-editor]
args:
  - name: sources
    description: The material to work from - pasted articles, notes, a guest's bio, study abstracts, previous interviews - each marked with its title, author or outlet, and date where you have them.
    type: text
    required: true
  - name: episode_topic
    description: The episode's topic or question and the guest if there is one, for example "why city bike lanes get ripped out, with a transport planner".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Core story, Key facts, Counterpoints, Open questions, Names and pronunciations, Do not repeat unchecked, Source list]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare a host for one episode: {{episode_topic}}. A host reads the brief an hour before recording and needs to sound informed without reading notes aloud. Research briefs go wrong when they are long summaries of each source in turn, when they blend what a source says with what the writer assumes, when a striking number from one opinion piece becomes "a fact", and when they give only one side so the host cannot ask a sharp question. Names mispronounced on air also cost credibility with guests and listeners.

Work only from the sources supplied. Anything else you add is labelled as background knowledge to check.
</context>

<task>
<sources>
{{sources}}
</sources>

1. Number the sources [S1], [S2] and so on, with type (news report, opinion, study, official data, guest's own material) and date. Note where a source is old, partisan, or the guest's own promotional material.
2. Core story: five lines a host could say from memory: what happened or what the question is, why it matters now, the main tension, and what this episode adds.
3. Key facts: eight to fifteen facts the host may use, each with the source tag and a status: stated in source, agreed across sources, disputed between sources, or single-source claim.
4. Counterpoints: the strongest opposing views or complications found in the sources, fairly stated, and gaps where no counterpoint was supplied but one obviously exists (labelled as such, not invented as fact).
5. Open questions: what the sources do not answer, worded as questions the host could ask the guest or check before recording.
6. Names and pronunciations: people, places, organisations and technical terms, with a plain respelling for pronunciation if you are confident (for example "Nguyen: roughly 'win'"), otherwise "confirm with the guest".
7. Do not repeat unchecked: statistics, quotes and claims that look shaky, viral or unsourced, with why and what would confirm them.
</task>

<constraints>
- Keep source claims and your own inference separate; never present inference as a sourced fact.
- Do not invent sources, quotes, figures or URLs. If a claim has no source, it goes in Do not repeat unchecked.
- Quotes must be verbatim from the sources, with the source tag.
- If the sources are missing or too thin to brief from, say what to gather (ideally three to five sources of different types) and stop.
- Keep the brief under about 700 words so it can be read in five minutes.
</constraints>

<output_format>
## Core story
Five lines.
## Key facts
Table: # | Fact | Source | Status.
## Counterpoints
Bullets with sources, gaps labelled.
## Open questions
Numbered.
## Names and pronunciations
Table: Name or term | Pronunciation | Note.
## Do not repeat unchecked
Bullets with the reason and what would confirm.
## Source list
[S1] etc. with type, date and any caution.
</output_format>
