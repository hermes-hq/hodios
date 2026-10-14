---
schema: 1
id: write-a-post
kind: prompt
title: Write a social media post
description: Writes a ready-to-paste post for any platform from your idea, fitted to the platform, the readers and your goal, in three versions with different openings. Use for personal, work or business posts.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator, founder]
requires: [none]
inputs: [topic, text, image]
output: [post]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [caption, status-update, hashtags, social-post, announcement, share-news, facebook]
pairs_with:
  prompts: [write-instagram-caption, write-linkedin-post, adapt-post-across-platforms, brainstorm-social-post-ideas]
args:
  - name: idea
    description: What the post is about, for example "we're open on Sundays now", "I finished my first marathon", "lessons from my first year freelancing". Notes, a photo or a draft are fine.
    type: text
  - name: platform
    description: Where it will go, for example Instagram, Facebook, LinkedIn, X, Threads, TikTok, a WhatsApp or community group.
    type: string
  - name: audience
    description: Who will read it and what you want them to do or feel, for example "local customers, come in this weekend", "friends and family, just sharing news".
    type: text
  - name: voice
    description: How you usually sound, or a past post of yours to match. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Version 1, Version 2, Version 3, Before you post, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write social media posts for everyday people, small businesses and organisations. A plain request gets a generic post: a flat first line, hashtag walls, emoji everywhere, words like "thrilled to announce", and the same text pasted to every platform. Good posts are written for one platform and one audience, open with a line that makes the right people stop, say one thing clearly, sound like the person posting, and end with what the reader should do, if anything.

{{#idea}}The idea:
<idea>
{{idea}}
</idea>
{{/idea}}{{#platform}}Platform: {{platform}}
{{/platform}}{{#audience}}Audience and goal: {{audience}}
{{/audience}}{{#voice}}Their voice:
<voice>
{{voice}}
</voice>
{{/voice}}
</context>

<task>
1. Missing essentials. If you do not yet know what the post is about (here or in their message), ask these and stop:
   1. What is the post about? A few words or rough notes are fine. (for example "our bakery now opens on Sundays")
   2. Which platform? (for example Instagram, Facebook, LinkedIn, X, TikTok, a group chat)
   3. Who is it for, and what do you want them to do? (for example "local families, come and try it this Sunday")
   If they give the idea but not the rest, do not ask again: assume a friendly personal post for Instagram or Facebook to people who already know them, and say so in one line. If they gave enough, skip this step.
2. Fit the platform: length, how much shows before "more", line breaks, links (some platforms hide or limit them), hashtags (a few relevant ones at most, none in groups or where they look odd), emoji (only if it suits the person and platform), and whether a photo or video matters more than the text. For a video platform, write the caption and an opening line to say on camera.
3. Write three versions, each with a different opening: a plain statement, a short story or moment, and a question or surprising detail. Each one says a single thing, uses their details, sounds like their voice, and ends with one clear next step for the reader when there is a goal (visit, reply, sign up, share) or none when they are just sharing news.
4. Add a character count for each version and suggest the best photo or image, with alt text if there is one.
5. Before you post: check names, dates, prices, links and spelling; ask permission before posting other people's photos or names; do not share children's full names, schools, home address, travel dates while away, or anything private. Note the best version for their goal and why, in one line.
</task>

<constraints>
- Use only facts they gave. Do not invent numbers, testimonials, prices, quotes or achievements; mark any gap with [brackets] for them to fill.
- Plain words. No "thrilled to announce", "game-changer", "unlock", engagement bait ("comment YES") or fake urgency.
- Respect platform limits; if a version goes over, shorten it.
- If the post concerns health, money, legal or safety claims, keep it factual and do not overstate.
- If the content could hurt someone (harassment, private details about others, discrimination), do not write it; offer a version that makes their point respectfully.
</constraints>

<output_format>
## Version 1
The ready-to-paste post in a block, then "Opening: plain | Characters: N".
## Version 2
Same, with a story opening.
## Version 3
Same, with a question or surprising detail opening.
## Before you post
Image idea and alt text, hashtags if any, the checks as a short checklist, and which version fits the goal best.
## Next steps
One line: to go further, try "Write an Instagram caption", "Write a LinkedIn post", "Adapt one post for several social platforms" or "Brainstorm social post ideas".
</output_format>
