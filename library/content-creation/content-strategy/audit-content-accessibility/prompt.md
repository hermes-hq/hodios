---
schema: 1
id: audit-content-accessibility
kind: prompt
title: Audit content accessibility
description: Audits recent posts, videos and emails for access - captions, transcripts, alt text, contrast, text on images, hashtags, emoji, plain language and flashing - with quick fixes and habits by channel.
category: content-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, marketer, editor]
subject: [nonprofit, public-sector]
requires: [none]
inputs: [text, image]
output: [report, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [captions, alt-text, plain-language, colour-contrast, screen-readers, inclusive-content]
pairs_with:
  prompts: [write-alt-text, make-presentation-accessible, write-editorial-guidelines]
args:
  - name: content_samples
    description: Paste or describe 5 to 15 recent pieces - post text with hashtags and emoji, image descriptions or the images themselves, whether videos have captions, email text, colours used for text and backgrounds.
    type: text
    required: true
  - name: channels
    description: The channels the content runs on, for example "Instagram, TikTok, email newsletter, website".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Findings, Quick fixes, Habits by channel, What I could not check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit a creator's or organisation's recent content for accessibility and turn the findings into habits. Disabled people are a large part of every audience, and many access barriers in social content are cheap to fix: videos without accurate captions (auto-captions often mangle names and jargon), images of text with no alt text, hashtags in lower case that screen readers read as one word, strings of emoji read aloud one by one, low-contrast text on photos, key information only in an image or only spoken, and fast flashing in videos. Audits that list every guideline overwhelm small teams; useful ones rank what affects the most people for the least effort and build fixes into the routine.

Channels: {{channels}}
</context>

<task>
<content_samples>
{{content_samples}}
</content_samples>

Check each sample against:
1. Video and audio: accurate captions (edited, speaker labels where needed), a transcript for audio and longer video, audio description or describing key visuals aloud when meaning depends on them, no flashing more than three times a second.
2. Images: alt text present and meaningful (purpose, not "image of"), text in images also in the caption or alt text, decorative images marked as such where the platform allows.
3. Text: plain language (short sentences, common words, acronyms explained), camel-case hashtags (#AccessibleContent), hashtags and emoji at the end and few in number, no emoji as bullet points or replacing words, no fancy Unicode fonts (screen readers cannot read them).
4. Visual design: contrast of text against background (aim for at least 4.5:1 for normal text and 3:1 for large text, the WCAG 2 AA thresholds), not using colour alone to carry meaning, readable size on a phone, text not over busy photos.
5. Links and calls to action: descriptive link text in emails and websites, no "click here", clear instructions not dependent on seeing an image.
6. Email: real text rather than one big image, heading structure, a readable layout on mobile.
Then rate each finding by impact (who is blocked) and effort, and write habits per channel.
</task>

<constraints>
- Judge only what was provided; if you cannot see an image, video or colour values, list the check under What I could not check instead of guessing.
- Do not claim the content is legally compliant; accessibility laws vary by country and sector, so say which standard you used (WCAG 2.2 AA as the reference) and suggest checking local obligations, especially for public sector bodies.
- Be specific: quote the sample and give the rewritten version for text fixes.
- Non-judgemental tone; most issues are habits, not carelessness.
- If no samples are provided, ask for 5 to 15 recent pieces and stop.
</constraints>

<output_format>
## Summary
Three lines: overall state, the biggest barrier, the easiest win.

## Findings
Table: sample | issue | who it affects | impact (high, medium, low) | fix.

## Quick fixes
Numbered list of fixes to apply this week, with rewritten text where relevant.

## Habits by channel
A short checklist per channel in {{channels}}.

## What I could not check
Bullets.
</output_format>
