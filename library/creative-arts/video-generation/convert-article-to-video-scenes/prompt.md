---
schema: 1
id: convert-article-to-video-scenes
kind: prompt
title: Convert an article into video scenes
description: Repurposes a blog post or article into a short video with a voice-over script and a matching scene prompt per section, keeping every claim as the article states it.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
requires: [none]
inputs: [document, text]
output: [script, prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [repurposing, article-to-video, voice-over, claim-fidelity]
pairs_with:
  prompts: [write-short-form-script, write-b-roll-prompts, write-tts-voiceover-script]
args:
  - name: article
    description: The full article text. Paste it rather than a link so nothing is guessed.
    type: text
    required: true
  - name: seconds
    description: Target video length in seconds.
    type: number
    default: 90
  - name: aspect_ratio
    description: "Frame shape: 16:9 (widescreen), 9:16 (vertical shorts and reels), 1:1 (square feeds)."
    type: enum
    enum: ["16:9", "9:16", "1:1"]
    default: "9:16"
output_contract:
  format: markdown
  sections: [Core message, Script and scenes, Scene prompts, On-screen text and sources, Fidelity check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Turning an article into a short video means cutting most of it. The danger is in the compression: hedged findings become certainties ("may reduce" becomes "cuts"), numbers lose their context, quotes get paraphrased into things nobody said, and the visuals add claims of their own. A good adaptation chooses one core message, keeps each surviving claim exactly as strong as the article makes it, puts sources on screen where a number appears, and gives each spoken section one picture that supports it without overstating it.
</context>

<task>
Adapt this article into a {{seconds}}-second video at {{aspect_ratio}}.

<article>
{{article}}
</article>

1. If only a link or a summary is given, ask for the full text and stop. If the article is far too long to cover (more than about ten times the word budget), say which section you will focus on and why.
2. **Core message.** The one idea the video must leave, and the 3 to 5 article points that support it, each quoted or closely paraphrased with its paragraph number.
3. **Word budget.** At about 2.5 words per second, the voice-over has roughly {{seconds}} × 2.5 words. Allocate it: a hook in the first 3 seconds (for 9:16 especially) taken from the article's most surprising supported point, the points, and a close with one action (read the full article, try the tip).
4. **Script and scenes.** Write the voice-over in short spoken sentences. Break it into scenes of one idea each, with time ranges that add up to {{seconds}} seconds, and note which article paragraph each scene comes from.
5. **Scene prompts.** For each scene, a generation prompt with a shared look block (palette, style, lighting, {{aspect_ratio}}) pasted verbatim, one subject and action, simple camera, duration. Pictures illustrate the point; they do not show results, people or events the article does not describe. For a statistic, prefer an abstract visual and show the number as text in the edit.
6. **On-screen text and sources.** List every number, quote and name to be shown as text, with the source as given in the article. Quotes appear word for word and attributed.
7. **Fidelity check.** Before answering, compare each sentence of the script with the article and report: claims kept at the same strength (list any hedges you preserved), nothing added that the article does not say, quotes unchanged, numbers unchanged with their units and context.
</task>

<constraints>
- Never strengthen, generalise or add a claim. If the article is wrong or unclear on something, flag it for the author instead of fixing it silently.
- No real, identifiable people generated in scenes; if the article features a real person, recommend real photos or footage with permission.
- No readable text in generated frames; text goes in the edit.
- No tool, model or version names.
</constraints>

<output_format>
## Core message
## Script and scenes
Table: # | Time | Voice-over | Source paragraph | Visual idea.
## Scene prompts
Look block in a code block, then one code block per scene.
## On-screen text and sources
## Fidelity check
</output_format>
