---
schema: 1
id: write-community-tab-posts
kind: prompt
title: Write YouTube community posts
description: Writes YouTube community posts, polls, quizzes and updates for the gaps between uploads that keep subscribers engaged and preview upcoming videos. Use to plan two to four weeks of posts.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
stack: [youtube]
inputs: [topic, notes]
output: [post, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [community-posts, polls, audience-engagement, upload-teasers]
pairs_with:
  prompts: [plan-video-series, package-video-title-thumbnail, reply-to-comments]
  personas: [youtube-strategist]
args:
  - name: channel
    description: What the channel covers, who watches, the tone, and how often you upload.
    type: text
    required: true
  - name: upcoming_videos
    description: Videos planned for the next few weeks with working titles and rough dates, plus any decisions you would like the audience to help with. Leave empty if nothing is scheduled.
    type: text
output_contract:
  format: markdown
  sections: [Posting plan, Posts, Image notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write YouTube community posts (the Posts tab, also shown in subscribers' home feeds). They keep a channel present between uploads and tell the channel what the audience wants. Post types are text, image, poll, quiz, and video or GIF. Polls and quizzes get the most taps because answering takes one tap; images stop the scroll in the feed; plain text works for a personal update. Good posts are about the viewer, not the channel: a question they have an opinion on, a choice they get to make, a behind-the-scenes moment, or a useful tip in miniature. Weak posts are "new video out, go watch" with nothing else. A poll whose result the creator will actually use (which video next, which thumbnail) builds goodwill when the result is acted on and shown later.
</context>

<task>
<channel>
{{channel}}
</channel>

<upcoming_videos>
{{upcoming_videos}}
</upcoming_videos>

1. Propose a posting rhythm that fits the upload cadence: usually two or three posts a week, timed so one post previews each upload, one post follows up on it, and one post is pure audience engagement. Show it as a calendar for the next two to four weeks.
2. Write each post. Mix the types across the plan:
   - **Preview posts** for each upcoming video: a teaser question, a behind-the-scenes image idea, or a thumbnail or title poll.
   - **Decision polls** with two to four clear options the creator will act on, and a line saying the result will shape the video.
   - **Quizzes** that test something the audience will learn in an upcoming or past video, with the correct answer and a short explanation.
   - **Follow-up posts** after an upload: the answer to a question from the comments, a correction, or a "you asked, here is the bit we cut".
   - **Engagement posts**: an opinion question, a "this or that", or a share-your-setup prompt specific to the niche.
3. For any image post, describe the image to make or photograph.
4. Mark which posts reuse comments or poll results and remind the creator to report back on poll results.
</task>

<constraints>
- Match the channel's tone; if it is not described, write in a friendly, direct voice and say so.
- Keep text posts under about 80 words; the first line must work on its own, because the feed truncates it.
- Poll options: two to four, short, mutually exclusive, and the creator must be willing to act on any of them.
- Do not invent release dates, collaborations or announcements; use `[FILL: …]` for details the creator must confirm.
- If upcoming videos are empty, build the plan around engagement and audience research posts, and include one poll that asks what to make next.
- No engagement bait that misleads (fake giveaways, "only 1% get this right").
</constraints>

<output_format>
## Posting plan
A table: date or day | post type | purpose | linked video.

## Posts
Each post numbered, with its type, the post text, poll or quiz options, and the correct answer for quizzes.

## Image notes
For each image post, what to show and any text on the image.
</output_format>
