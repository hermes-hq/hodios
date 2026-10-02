---
schema: 1
id: repurpose-video-into-posts
kind: prompt
title: Repurpose a video into posts
description: Turns a long video or podcast transcript into timestamped clip picks and a platform-native post for each clip. Use when cutting a long recording into social content.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
stack: [linkedin, x-twitter, instagram, tiktok]
inputs: [transcript]
output: [post, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [repurposing, clips, long-form-to-short-form, short-form-video]
pairs_with:
  prompts: [write-show-notes, turn-article-into-thread, write-short-form-script]
  personas: [content-strategist]
args:
  - name: transcript
    description: The full transcript of the video or podcast, with timestamps and speaker names if available.
    type: text
    required: true
  - name: platforms
    description: Comma-separated platforms to write posts for (for example linkedin, x-twitter, instagram, tiktok, threads).
    type: string
    default: linkedin, x-twitter, instagram
output_contract:
  format: markdown
  sections: [Clip picks, Posts, Editing notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a clip producer. One long recording usually holds five to ten moments that can live on their own, and finding them is the hard part. A good clip makes sense to someone who never saw the original: it starts on a strong line (not "so, yeah, as I was saying"), makes one point or tells one story, and ends on a landing, a punchline or a clear takeaway. Each platform wants a different wrapper: a text post on LinkedIn that carries the insight even without playing the video, a short punchy post on X, a caption on Instagram or TikTok that adds context and works with burned-in captions.
</context>

<task>
Find clips in this transcript and write posts for: {{platforms}}.

<transcript>
{{transcript}}
</transcript>

1. Read the whole transcript, then pick five to eight clip candidates, ranked. For each: start and end timestamps (20 to 90 seconds), the opening line and the closing line quoted verbatim, the type (insight, story, contrarian take, how-to, emotional moment, funny moment), and why it stands alone.
2. If the transcript has no timestamps, use the verbatim first and last words of each clip as anchors instead, and say so once.
3. For each clip and each requested platform, write a native post:
   - linkedin: three to six short paragraphs that state the insight in text, so the post works even if the video is not played, and a question or takeaway to end.
   - x-twitter: one post under 280 characters with the sharpest line.
   - instagram or tiktok: a caption with a first line that adds context, one line of value, a call to action and three to five specific hashtags.
   - threads or other platforms: follow that platform's norms; ask if a platform is unfamiliar.
4. Add an on-screen hook text (at most 7 words) for each clip, for the first two seconds of the video.
5. Note where an edit is needed: a sentence to cut, context to add as a caption, or a reference to something earlier in the recording that a new viewer will not understand.
</task>

<constraints>
- Quotes and clip boundaries must come from the transcript, verbatim. Do not invent or improve what a speaker said inside quotation marks.
- Each clip must stand alone; drop candidates that depend on earlier context unless a one-line caption can fix it.
- Do not add claims, numbers or names that are not in the transcript.
- Write only for the platforms listed in {{platforms}}.
</constraints>

<output_format>
## Clip picks
A table: rank | start-end | type | opening line | closing line | why it stands alone.

## Posts
One sub-heading per clip, with the on-screen hook text, then one labelled post per platform.

## Editing notes
Bullets per clip, or "None".
</output_format>
