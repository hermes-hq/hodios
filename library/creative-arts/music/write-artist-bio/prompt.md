---
schema: 1
id: write-artist-bio
kind: prompt
title: Write an artist bio
description: Writes a one-liner plus short, medium and long artist bios for streaming profiles, press kits, booking and websites, built only from the facts provided. Use for musicians, bands and producers.
category: music
version: 1.0.0
status: incubating
stage: [ship]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [artist-bio, electronic-press-kit, music-marketing, booking]
pairs_with:
  prompts: [plan-music-release, write-music-prompt]
args:
  - name: artist_info
    description: Facts about the artist, such as name, where you are from, members and instruments, how it started, influences, how you describe your sound, releases, notable shows, press quotes with sources, achievements, and what's next. Paste an old bio if you have one.
    type: text
    required: true
  - name: genre
    description: Genre or scene, e.g. "dream pop", "UK garage", "bluegrass", "progressive metal". Leave blank to infer from the info.
    type: string
    default: auto
output_contract:
  format: markdown
  sections: [Angle, One-liner, Short bio, Medium bio, Long bio, Missing facts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An artist bio is read by fans on a streaming profile, by journalists deciding whether to cover a release, and by promoters deciding whether to book a show. Each reader wants the same three things fast: what you sound like, why you are interesting, and what is happening now. Most bios bury that under a childhood origin story, describe the sound with empty phrases ("a unique blend of genres", "a sound all their own"), list every gig ever played, or inflate achievements in ways a journalist will check.
</context>

<task>
Write bios for this artist.

<artist>
{{artist_info}}
</artist>

Genre or scene: {{genre}}

1. **Angle:** in two or three lines, the genre or scene (if it is auto, infer it from the info and say so; describe it the way the scene itself would, not with a broad label like "alternative"), the most distinctive fact or story about this artist (the hook), how you will describe the sound, and the current news to lead or close with. If the info lacks the artist name, any description of the sound, or anything current (a release, a tour, a project), ask for it (at most three questions) and stop.
2. **One-liner** (15 to 25 words): name, sound, and the hook, for social bios, playlists and festival listings.
3. **Short bio** (50 to 80 words): for streaming profiles and booking forms. Lead with the hook and the sound, end with the latest release or news.
4. **Medium bio** (130 to 180 words): for press kits and press releases. Add context: origin in a line, key influences translated into what they bring to the sound, one or two notable achievements, and what is next.
5. **Long bio** (300 to 400 words): for the website and media requests. Tell the artist's arc in a few short paragraphs (where they came from, the turn that defined them, the current record or chapter), using concrete detail (a place, an instrument, a recording story) and at most one or two real press quotes if provided, with the source.
6. **Missing facts:** a list of facts that would strengthen the bio (for example a press quote, a notable support slot, streaming milestones) and any placeholders you used.
</task>

<constraints>
- Third person, present tense for the current news, except where the info asks for first person.
- Describe the sound concretely: instruments, textures, tempo and feel, vocal style, and influences framed as "for fans of" or "drawing on", not as claims of equal stature.
- Use only facts provided. Do not invent shows, collaborations, awards, press quotes, streaming numbers, radio play or label interest. Keep numbers exactly as given.
- Avoid clichés: "unique blend", "defies genre", "a sound all their own", "burst onto the scene", "passion for music since a young age".
- The versions must not be the same text trimmed; each opens in a way suited to its reader.
</constraints>

<output_format>
## Angle
## One-liner
## Short bio
## Medium bio
## Long bio
## Missing facts
Give the word count after each bio in brackets.
</output_format>
