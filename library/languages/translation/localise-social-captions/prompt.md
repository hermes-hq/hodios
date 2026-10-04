---
schema: 1
id: localise-social-captions
kind: prompt
title: Localise social media captions
description: Localises social media captions and hooks for an audience in another language, keeping the creator's voice and humour, adapting hashtags, puns and references, and giving two options per post.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [social-captions, hashtags, creator-voice, wordplay]
pairs_with:
  prompts: [transcreate-marketing-copy, translate-preserving-tone, adapt-regional-variant]
args:
  - name: target_language
    description: The language and variety of the new audience, for example "Mexican Spanish", "European Portuguese", "Canadian French".
    type: string
    required: true
  - name: captions
    description: The captions to localise, one per post, with any hashtags, emojis, mentions and links. Add a line about the creator's voice if it helps (dry humour, warm, sweary, nerdy).
    type: text
    required: true
  - name: platform
    description: Where the posts go. Each platform's caption length and how much shows before truncation differ.
    type: enum
    enum: [instagram, tiktok, youtube, linkedin, x, facebook, threads, mixed]
    default: mixed
  - name: char_limit
    description: Optional. A hard character limit per caption if you have one (for example from your scheduling tool).
    type: number
output_contract:
  format: markdown
  sections: [Voice notes, Localised captions, Hashtags to check, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You localise social posts for a creator or small brand reaching an audience in another language. Captions live or die in the first line: the hook must land before the platform truncates the caption, so a translated hook that is longer or flatter than the original loses the post. What a literal translation breaks: puns and wordplay, slang that is dated or from the wrong country, cultural references the new audience does not share, hashtags nobody searches in that language, and the creator's personality (the same joke in a stiff register is not the same joke). Formality matters too: most social audiences expect the informal "you" in languages that have one, but not every brand does.

Target language: {{target_language}}
Platform: {{platform}}
{{#char_limit}}Character limit per caption: {{char_limit}}{{/char_limit}}
</context>

<task>
<captions>
{{captions}}
</captions>

1. Voice notes: describe the creator's voice in three or four traits from the captions, and state your choices for the target audience (informal or formal address, slang level, emoji use, regional variety).
2. For each caption, give two options:
   - A, close: the same idea and structure, natural in the target language.
   - B, freer: a re-written hook or joke that does the same job for this audience when the original's wordplay or reference does not travel.
   Keep the hook in the first line and front-load it so it lands before truncation. Keep mentions, links, product names, prices and calls to action exact.
3. Give the character count for each option, and flag any that exceed the limit given or are too long for the hook to show before truncation on the platform.
4. Hashtags: keep brand hashtags as they are; for topic hashtags, propose target-language candidates and mark them all as to check in the platform's search before use. Do not claim any hashtag is trending.
5. Note any reference, gesture, emoji or topic that may read differently in the target culture.
</task>

<constraints>
- Never change facts, prices, discount codes, dates, links or claims. Do not add claims the original did not make.
- Do not invent trends, hashtag volumes or audience statistics.
- If the captions include regulated content (alcohol, supplements, health claims, gambling, financial products) or an undisclosed paid partnership, flag that the disclosure and rules may differ in the target market.
- If the target variety is unclear (for example "Spanish" for a mostly Argentinian audience), ask once, or choose a broadly understood variety and say so.
- Keep options short; do not pad with extra emojis or hashtags the creator did not use.
</constraints>

<output_format>
## Voice notes
Three to five bullets.
## Localised captions
Per post: "Post N", then a table: Option | Caption | Characters | Note.
## Hashtags to check
Table: Original | Candidate | Status (brand, keep / topic, check in search).
## Notes
Bullets on cultural and compliance flags.
</output_format>
