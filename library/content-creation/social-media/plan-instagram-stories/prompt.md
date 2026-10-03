---
schema: 1
id: plan-instagram-stories
kind: prompt
title: Plan an Instagram story sequence
description: Plans a sequence of Instagram stories frame by frame with visuals, text overlays, interactive stickers and one call to action. Use for a launch, event, tutorial or behind-the-scenes day.
category: social-media
version: 1.0.1
status: incubating
stage: [plan, build]
role: [content-creator, marketer, founder]
stack: [instagram]
inputs: [topic, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [instagram-stories, interactive-stickers, story-sequence, link-sticker]
pairs_with:
  prompts: [write-instagram-caption, plan-carousel-post, write-short-form-script]
  personas: [social-media-manager]
args:
  - name: goal
    description: The one thing the sequence should achieve, such as link clicks, replies, sign-ups, event attendance, product interest or just connection.
    type: text
    required: true
  - name: topic
    description: What the stories are about, with any details, links, dates, offers or footage you have.
    type: text
    required: true
  - name: frames
    description: Number of story frames in the sequence.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Arc, Frame-by-frame plan, Production notes, After posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Plans frames around people who have not agreed to appear and flags workplace filming and confidential details."}
---
<context>
You plan Instagram story sequences. Stories are watched by people who already follow the account, tapping fast: each frame gets a second or two, and every frame that does not earn its place causes exits. A sequence works like a tiny story: a first frame that gives a reason to keep tapping, a few frames that build (context, value, proof, behind the scenes), an interactive moment, and one clear call to action near the end. Interactive stickers (poll, quiz, question box, emoji slider, countdown, "add yours", link, mention, location) increase taps and replies, and replies start direct conversations, which tell the platform people care. Stories are vertical (9:16); the top and bottom of the frame are covered by the interface, so text and stickers belong in the middle. Many people watch with the sound off, so spoken content needs captions or text.
</context>

<task>
Plan a {{frames}}-frame story sequence.

<goal>
{{goal}}
</goal>

<topic>
{{topic}}
</topic>

1. **Arc.** In one or two sentences, describe the sequence's mini-story and how it leads to the goal. If the goal is vague, choose the most measurable version and say so.
2. **Frame by frame**, for each of the {{frames}} frames give:
   - the visual (photo, video clip, screen recording, plain background), and whether the creator appears on camera;
   - the text overlay, at most about 10 words, readable in two seconds;
   - the sticker, if any, and its exact wording or options (use one interactive sticker every two or three frames, not on every frame);
   - spoken lines if it is a talking clip, kept under about 15 seconds;
   - the purpose of the frame (hook, context, value, proof, interaction, call to action).
3. Place the call to action where it fits the goal: the link sticker for clicks, a question box or "reply with…" for conversations, a countdown for an event, a poll or quiz for engagement. Make the action specific ("Tap the link to see the three colours").
4. **Production notes:** safe zones, captions, music mood, whether to save the sequence as a Highlight and its name, and anything to prepare or film.
5. **After posting:** how to use the responses (share poll results or answered questions in a follow-up story, reply to every DM), and which numbers to check (exits and forward taps per frame, replies, sticker taps, link clicks).
</task>

<constraints>
- Keep to {{frames}} frames; if the topic needs more, say how to split it across days.
- Do not invent prices, dates, offers or results; use `[FILL: …]` for details to confirm.
- Never more than one call to action in the sequence.
- Paid partnerships and gifted products need the paid-partnership label or a clear disclosure; add it to the relevant frame if the topic involves a brand.
- Write overlays in the account's voice if the topic shows it; otherwise friendly and direct.
- People in frame: plan frames so that anyone who has not agreed to appear (customers, students, patients, children, colleagues) is out of shot or unidentifiable, and say where consent is needed. If the topic is a workplace (a hospital, school, client site or office), flag that filming may need the employer's permission and must not show confidential information such as screens, records or patient details.
</constraints>

<output_format>
## Arc
## Frame-by-frame plan
A table: frame | purpose | visual | text overlay | sticker | spoken line.

## Production notes
## After posting
</output_format>
