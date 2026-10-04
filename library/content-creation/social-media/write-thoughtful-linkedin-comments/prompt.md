---
schema: 1
id: write-thoughtful-linkedin-comments
kind: prompt
title: Write thoughtful LinkedIn comments
description: Drafts comments on other people's LinkedIn posts that add a specific experience, question, counterpoint or resource in your own voice, under 80 words, and checks they are not disguised self-promotion.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, individual, consultant]
stack: [linkedin]
requires: [none]
inputs: [text]
output: [message, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [professional-networking, comments, engagement, personal-voice]
pairs_with:
  prompts: [write-linkedin-post, plan-linkedin-personal-brand]
args:
  - name: post_text
    description: The post you want to comment on, pasted in full, with the author's role if you know it and any comments already there that you do not want to repeat.
    type: text
    required: true
  - name: my_background
    description: Who you are and what you genuinely know about the topic (for example "nurse of 8 years, moving into health tech; I've run two EHR rollouts on a ward").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Options, Self-promotion check, Skip if]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A professional, job seeker or freelancer wants to comment on other people's posts to build relationships and visibility. Generic comments ("Great post!", "So true!", "Thanks for sharing") are invisible, and comments that pivot to "I help companies do X, DM me" damage the commenter's reputation. Comments that get noticed by the author and the readers add one specific thing: a concrete experience, a sharp question, a respectful counterpoint, or a resource. They read like a person talking, not like AI copy, so they use the commenter's own plain voice.

Commenter background: {{my_background}}
</context>

<task>
<post>
{{post_text}}
</post>

1. Find the post's actual claim or question and the part where the commenter's background gives them something real to add. If the background has no real connection, say so.
2. Draft three different options, each under 80 words:
   - Experience: one specific moment or number from the commenter's background that supports, complicates or extends the point. Use only what the background states; put details they must supply in [brackets].
   - Question: one question the author would enjoy answering, that moves the conversation forward (not "What do you think?").
   - Counterpoint or addition: respectful disagreement or a nuance, starting from what is right in the post.
3. Each option responds to the post's content in its first sentence, uses at most one sentence of context about the commenter, has no hashtags, at most one emoji, no links unless the commenter supplied one, and no flattery opener.
4. Run a self-promotion check on each: does it mention the commenter's services, ask for a DM or connection, or steer to their own content? Flag and rewrite if so.
5. Say when not to comment (the post is grief, a layoff announcement, a health story, or a heated debate where a comment adds risk without value) and suggest a short, human reply or a private message instead.
</task>

<constraints>
- Never invent experiences, results, numbers, employers or credentials. Mark anything you assume with [confirm].
- Write in plain, natural sentences; avoid "This!", "Couldn't agree more", "game-changer", "Great insights".
- Keep a respectful tone toward the author even when disagreeing.
- If the post text is missing, ask for it and stop.
</constraints>

<output_format>
## Options
Three labelled options (Experience, Question, Counterpoint or addition), each ready to paste, with the word count.

## Self-promotion check
One line per option: pass or what was changed.

## Skip if
One or two lines on whether this post is one to comment on, and an alternative if not.
</output_format>
