---
schema: 1
id: plan-comment-reply-clips
kind: prompt
title: Plan reply videos from comments
description: Picks comments worth answering with a short video reply and plans each with the on-screen comment, a hook, a script under 45 seconds and care with hostile ones, grouping repeats into a series.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, marketer, founder]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [short-form-video, comment-replies, video-hooks, content-series]
pairs_with:
  prompts: [reply-to-comments, repurpose-video-into-posts]
args:
  - name: comments
    description: Comments from your videos or posts, pasted as they are, with like counts or which video they came from if you have them.
    type: text
    required: true
  - name: niche
    description: What your account is about and who watches (for example "home baking for beginners", "a bike repair shop explaining fixes").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Picks, Reply plans, Series ideas, Skipped and why]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A short-form video creator or small business wants to reply to comments with videos (the "reply with video" feature on most short-video apps). A reply video works when the comment is a question many viewers share, a strong but fair objection, or a request that shows off what the creator knows. It fails when it answers something only one person cares about, rambles before the answer, or puts a hostile commenter in front of a big audience and invites a pile-on.

Niche: {{niche}}
</context>

<task>
<comments>
{{comments}}
</comments>

1. Sort the comments: questions, objections or myths, requests, praise, hostile or bad-faith, and off-topic.
2. Pick up to five worth a video, ranked by how many viewers share the question (repeats, likes), how well the answer suits the niche, and whether it can be answered in under 45 seconds. Say why each was picked.
3. For each pick, plan: the comment as it will appear on screen (shortened if needed, typos left alone, handle hidden if the comment is critical); the hook in the first two seconds, which states the answer or the surprise, not "so someone asked"; the script, under 45 seconds spoken (about 110 words), in beats: hook, answer, one proof or demo, one-line close or question back; shots or b-roll; on-screen text; and a caption under 25 words.
4. For a critical or hostile comment you still answer: respond to the idea, not the person; hide the handle; show a fair version of the point; stay calm and specific; skip it entirely if the comment is abusive, targets someone's identity, or is from a minor.
5. Group repeated questions into a named series (for example "Fix it Friday") with three to five future episodes taken from the comments.
6. List the comments not picked with a one-line reason.
</task>

<constraints>
- Use only facts the creator gives or that are common knowledge in the niche; mark claims that need checking with [check]. Never invent product details, prices or results.
- Do not mock, stitch for ridicule, or reveal a commenter's identity; get permission before featuring a comment from a private message.
- Keep scripts in the creator's plain speaking voice: short sentences, no filler intros.
- If no comments are given, ask for them and stop.
</constraints>

<output_format>
## Picks
Table: # | comment (short) | type | why it is worth a video.

## Reply plans
One block per pick: On screen | Hook | Script (beats with timings) | Shots | On-screen text | Caption.

## Series ideas
Series name, the promise, and three to five episode titles.

## Skipped and why
Bullets.
</output_format>
