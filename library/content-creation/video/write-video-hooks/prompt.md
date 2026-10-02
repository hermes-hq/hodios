---
schema: 1
id: write-video-hooks
kind: prompt
title: Write video hooks
description: Generates opening hooks for the first five seconds of a video, each labelled by technique with on-screen text and visual notes. Use when a video's opening needs to stop the scroll.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
stack: [youtube, tiktok, instagram, linkedin]
inputs: [topic, notes]
output: [ideas, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hooks, scroll-stopping, first-frame, short-form-video]
pairs_with:
  prompts: [write-youtube-script, write-short-form-script, package-video-title-thumbnail]
args:
  - name: topic
    description: What the video is about and what the viewer gets from it. Include the payoff, result or surprising fact if you have one.
    type: text
    required: true
  - name: platform
    description: Where the video will be posted; this changes the pace, sound assumptions and framing.
    type: enum
    enum: [youtube, tiktok, instagram, linkedin]
    default: youtube
  - name: count
    description: How many hooks to write.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Payoff, Hooks, Top picks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the first five seconds of videos. In that window a viewer decides whether to keep watching, and three things decide it together: the first frame, the first spoken line and the on-screen text. Five seconds is about 12 to 15 spoken words. A hook works when it makes a specific viewer feel that the next minute is worth more than scrolling, and it keeps working only if the video then delivers. Platforms differ:
- youtube: the viewer already clicked a title and thumbnail, so the hook must confirm that promise at once and add a reason to stay.
- tiktok and instagram: many people watch with the sound off and swipe in under two seconds, so the first frame needs motion or a striking image and the text overlay must carry the hook on its own.
- linkedin: videos autoplay muted in a professional feed, so captions are mandatory and the hook names a work problem or a result, with less theatre.
</context>

<task>
Write {{count}} hooks for a {{platform}} video.

<topic>
{{topic}}
</topic>

1. State the payoff in one line: the specific thing the viewer gets by staying. If the topic gives no payoff, infer the most likely one and say it is an assumption.
2. Write the hooks, spreading them across different techniques. Use these labels: result first, bold claim, contrarian, problem question, mistake and cost, curiosity gap, story mid-action, demonstration, specific number, audience callout. Use each technique at most once until every technique has been used.
3. For each hook give: the spoken line, the on-screen text (at most 7 words, written for a muted viewer), the first frame (what the camera shows at 0:00 and any movement), and a one-line note on why it works for this viewer, or the risk if it might overpromise.
4. Pick the three strongest for {{platform}} and say in one line each why.
</task>

<constraints>
- Every hook must be true to the topic and paid off by the video. No claims, numbers or results the topic does not support; if a hook needs a number you do not have, write it as `[NUMBER]` and flag it.
- No warm-up phrases: no "hey guys", "welcome back", "in this video" or "before we start".
- Keep spoken lines to 15 words or fewer.
- Write for the viewer named or implied by the topic, in their words, not marketing language.
</constraints>

<output_format>
## Payoff
One line, marked "assumed" if inferred.

## Hooks
A numbered list. Each item:
**Technique** — spoken line
- On-screen text: …
- First frame: …
- Why / risk: …

## Top picks
Three numbered picks with one-line reasons.
</output_format>

<examples>
Topic: "I cut my grocery bill by planning meals around what's on sale." Platform: tiktok.

**Result first** — "This week's groceries for four: forty-one dollars. Here's the trick."
- On-screen text: 41 dollars, family of 4
- First frame: hand drops the receipt onto a full kitchen counter, total circled in red
- Why / risk: concrete result in the first second; only use it if the real receipt shows this number.
</examples>
