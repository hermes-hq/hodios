---
schema: 1
id: set-up-content-creator-assistant
kind: prompt
title: Set up an AI assistant for a content creator
description: Sets up an assistant for a creator with audience, content pillars, voice samples, banned phrases and disclosure rules, plus saved prompts for scripts, captions and repurposing.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, writer, founder]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [creator-voice, content-pillars, banned-phrases, ad-disclosure, repurposing]
pairs_with:
  prompts: [build-project-instructions, write-social-bio, repurpose-video-into-posts]
  personas: [social-media-manager]
args:
  - name: creator
    description: What you make, on which platforms, for which audience, your content pillars or recurring topics, and what has worked well.
    type: text
    required: true
  - name: voice_samples
    description: Three to five pieces you wrote or scripts you spoke (captions, intros, posts), so the assistant matches your voice.
    type: text
    required: true
  - name: banned
    description: "Optional: phrases, topics or styles you never want, and brand partnership rules you have."
    type: text
output_contract:
  format: markdown
  sections: [Creator profile, Voice guide, Assistant instructions, Saved prompts, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Creators who use assistants often end up with content that sounds like everyone else's: "In today's fast-paced world", "Let's dive in", "game-changer", three emoji per line and the same hook formulas. Audiences notice and engagement drops. What helps is a voice guide built from the creator's best work (sentence length, humour, how they open and close, words they use and never use), a list of banned phrases, the content pillars that define the channel, and an instruction to use the creator's real stories and opinions instead of inventing them. Sponsored content needs clear disclosure under platform rules and advertising law in most countries, and fake stories or results damage trust and can breach those rules.

<creator>
{{creator}}
</creator>
<voice_samples>
{{voice_samples}}
</voice_samples>
{{#banned}}
<banned>
{{banned}}
</banned>
{{/banned}}
</context>

<task>
1. Write a creator profile: format and platforms, audience (who, what they want), three to five pillars, what has worked. Mark gaps [CONFIRM].
2. Write a voice guide from the samples: five to eight concrete traits (openers, sentence length, humour, formality, typical words, how they address the audience, emoji use), plus a banned list combining the user's items with common AI tells.
3. Write assistant instructions, ready to paste, that:
   - match the voice guide and avoid every banned phrase;
   - never invent personal stories, results, numbers or opinions for the creator; leave [YOUR STORY: ...] gaps instead;
   - fit each piece to its platform's format and length;
   - offer two or three hook options per piece and say which pillar it serves;
   - add a clear disclosure line for any sponsored, gifted or affiliate content and never hide it;
   - flag claims that need checking, especially health, money and product claims.
4. Write saved prompts for: video script, caption, turning one piece into posts for other platforms, and idea generation from a pillar. For each: what to paste and a quick check.
5. Give four tests, including a request for a "personal story" with no details given and a sponsored post.
</task>

<constraints>
- Base the voice guide only on the samples; quote short phrases from them as evidence.
- Do not state advertising law for a country; say disclosure is required by platform rules and many advertising regulators, and to check local rules.
- Keep instructions under about 2,000 characters.
</constraints>

<output_format>
## Creator profile
Bullets with [CONFIRM] gaps.
## Voice guide
Traits with quoted evidence, then the banned list.
## Assistant instructions
One fenced block, ready to paste.
## Saved prompts
One short subsection per prompt.
## Tests
Four bullets: prompt and pass condition.
</output_format>
