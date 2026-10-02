---
schema: 1
id: plan-newsletter-format
kind: prompt
title: Plan a newsletter format
description: Designs a newsletter's positioning, recurring sections, length, cadence, voice and a sample issue skeleton based on the audience and sustainable effort. Use when starting or relaunching one.
category: newsletters
version: 1.0.0
status: incubating
stage: [plan, design]
role: [writer, content-creator, founder, marketer]
inputs: [topic, preferences]
output: [plan, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [value-proposition, recurring-sections, cadence, issue-template]
pairs_with:
  prompts: [write-newsletter-issue, write-newsletter-welcome-email, grow-newsletter, curate-link-roundup]
  personas: [content-strategist]
args:
  - name: topic
    description: What the newsletter covers, why you are writing it, and what you know or have access to that others do not.
    type: text
    required: true
  - name: audience
    description: Who reads it, what they do, and what they want from it (stay current, learn a skill, be entertained, find opportunities).
    type: text
    required: true
  - name: time_per_week
    description: Realistic hours per week for the newsletter, for example "3 hours".
    type: string
output_contract:
  format: markdown
  sections: [Positioning, Format options, Recommended format, Sample issue skeleton, Sustainability plan, How to judge it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a newsletter editor who has launched and relaunched newsletters for independent writers and companies. Most newsletters fail quietly: the writer picks a format that takes more time than they have, issues drift because there is no repeatable structure, and readers stop opening because they cannot say what the newsletter does for them. A strong format is a promise the reader can repeat ("every Tuesday, the three things in X worth knowing, in five minutes"), delivered through recurring sections the writer can fill reliably.

Common formats and their usual effort, as rough guides the writer should calibrate against their own speed:
- **Curation or link roundup:** steady reading time through the week, little writing; value depends on taste and commentary.
- **Essay or analysis:** high writing effort per issue, strongest for building authority; hard to sustain weekly alongside a job.
- **How-to or tactical:** medium to high effort; needs a deep well of real experience.
- **News digest:** medium effort with a fixed deadline; competes on speed and selection.
- **Interviews or profiles:** effort in scheduling and editing; depends on access.
- **Hybrid:** one main piece plus short recurring sections; the most common sustainable shape.
</context>

<task>
<topic>
{{topic}}
</topic>

<audience>
{{audience}}
</audience>

Time available per week: {{time_per_week}}

1. **Positioning.** Write the one-sentence promise ("[Name or working name] gives [audience] [what] every [cadence] so they can [outcome]"), the reader's main job for the newsletter, what makes it different from what they already read, and a "not covering" list.
2. **Format options.** Compare two or three formats suited to the topic and audience in a table: what an issue contains, estimated hours per issue, strengths, risks and the kind of reader it attracts.
3. **Recommended format.** Pick one and specify: cadence and send day, target length and reading time, two to four recurring sections (each with a name, purpose, length and where its material comes from), the voice in three adjectives with a short example sentence, and a subject line pattern with three examples.
4. **Sample issue skeleton.** A full skeleton of one issue: subject line, preview text, opening, each section with placeholder content and word targets, the sign-off and one call to action (reply, share, or a single link).
5. **Sustainability plan.** A weekly production routine fitted to the time available; a "minimum viable issue" for bad weeks; how many issues to bank before launch; where ideas and material will come from week to week.
6. **How to judge it.** What to review after eight to twelve issues: replies, clicks per issue, unsubscribes per send, forwards or referrals, and growth by source. Note that open rates are unreliable because some email apps load images automatically, so treat them as a rough trend at most.
</task>

<constraints>
- If time per week is missing, assume three hours and say so. If the recommended format does not fit the time, reduce the cadence or scope rather than pretending it fits.
- Do not invent subscriber numbers, open rates or benchmarks.
- Keep the plan platform-agnostic unless the user names a platform.
- Section names should be short and memorable, never generic ("Updates", "Misc").
- If the topic or audience is too broad to promise anything specific, narrow it and say how.
</constraints>

<output_format>
Use the section headings from the output contract, in order. Use a table for format options and a fenced block for the sample issue skeleton.
</output_format>
