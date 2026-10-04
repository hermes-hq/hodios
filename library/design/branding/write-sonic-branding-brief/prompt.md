---
schema: 1
id: write-sonic-branding-brief
kind: prompt
title: Write a sonic branding brief
description: Writes a sonic branding brief for an audio logo, hold music or product sounds, with brand attributes translated into sound, use cases, references described in words and evaluation criteria.
category: branding
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, designer, founder]
requires: [none]
inputs: [text, spec]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sonic-branding, audio-logo, sound-design, ui-sounds, hold-music, creative-brief]
pairs_with:
  prompts: [build-brand-platform, write-brand-voice-guide, write-design-brief, build-brand-guidelines]
  personas: [brand-strategist]
args:
  - name: brand
    description: The brand - what it does, its positioning, personality or values, audience, markets, and visual identity in brief. A brand platform or guidelines excerpt works.
    type: text
    required: true
  - name: uses
    description: Where sound will be heard, for example "audio logo at the end of video ads and podcasts, phone hold music, app notification and success sounds, in-store".
    type: text
    required: true
  - name: budget
    description: Budget range or level and timeline, for example "small studio, 8 weeks" or "agency pitch". Optional; it shapes scope and deliverables.
    type: string
output_contract:
  format: markdown
  sections: [Background and objective, Brand in sound, Use cases and specs, References in words, Deliverables, Constraints and mandatories, Evaluation criteria, Process and timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sonic branding (an audio logo, a brand theme, product and interface sounds, hold music, voice) is commissioned less often than visual identity, so briefs tend to be vague ("make it catchy and modern") or reduced to "sounds like this famous jingle", which invites imitation and legal trouble. A strong brief translates brand attributes into musical and acoustic terms (tempo, rhythm, harmony, timbre, instrumentation, register, dynamics), lists every place the sound must work and its technical limits (a phone line's narrow band, a phone speaker, two seconds at the end of an ad, a notification that must not annoy on the hundredth play), describes references in words rather than by naming tracks to copy, and sets how the options will be judged, including testing with listeners.
</context>

<task>
Write a sonic branding brief.

<brand>
{{brand}}
</brand>

<uses>
{{uses}}
</uses>

{{#budget}}Budget and timeline: {{budget}}.
{{/budget}}
1. **Background and objective:** the brand in two or three sentences, why sound now, and what success looks like (recognition, consistency across touchpoints, product usability, emotional tone).
2. **Brand in sound:** translate three to five brand attributes into sonic direction. For each attribute, describe what it sounds like and what it must not sound like, in terms of tempo, rhythm, melodic contour (rising, resolving), harmony (major, modal, open intervals), timbre and instrumentation (acoustic, synthetic, organic textures), register, dynamics and production style. For example, "warm and trustworthy: mid-register, rounded timbres, resolved cadence; not bright, plucky or overly cheerful".
3. **Use cases and specs:** a table of every use in {{uses}} with duration, playback context and device (phone speaker, earbuds, phone line, TV, store PA), loudness and frequency limits (phone lines carry a narrow band, so the motif must survive it), whether it loops, how often a user hears it, and whether it carries meaning (success, error, alert). Note accessibility: sounds that carry information need a visual or haptic equivalent, and product sounds must respect system mute and volume settings.
4. **References in words:** describe the qualities wanted using categories and described characteristics (for example "a short, four-note motif that resolves upward, played on a warm mallet instrument, with a soft attack"), not specific copyrighted works to imitate. If the brand input names tracks to copy, explain why the brief describes qualities instead.
5. **Deliverables:** the audio logo in lengths and variations (full, short, sting), a brand theme or bed if needed, product or UI sound set, hold music arrangement, stems and file formats, loudness-normalised masters, and a usage guide. Scale to the budget.
6. **Constraints and mandatories:** originality and a declaration that the work is not derived from existing music, cleared samples only, ownership and licensing of the final work, cultural checks for each market (meanings of certain intervals, instruments or motifs), and existing brand assets to respect.
7. **Evaluation criteria:** how to judge options: fit with each attribute, distinctiveness from competitors, memorability after one or two plays, how well the motif survives a phone line and a laptop speaker, flexibility across uses, and annoyance over repetition. Include a simple listener test plan (association with brand attributes, recall after a delay, repetition tolerance for product sounds).
8. **Process and timeline:** phases (discovery, exploration routes, refinement, production, guidelines) with review points and who signs off.
9. Before answering, check that every use in {{uses}} appears in the specs table and that each attribute has both a "sounds like" and a "does not sound like".
10. If the brand description is too thin to derive attributes (no positioning, audience or personality), ask for those and stop.
</task>

<constraints>
- Never ask the composer to imitate a specific copyrighted work, artist or existing jingle.
- Do not claim universal meanings for musical features; describe common associations and recommend testing with the audience.
- Write for a composer or sound designer as the reader: specific, musical, and free of marketing filler.
</constraints>

<output_format>
Markdown with the contract's sections in order. Brand in sound as a table (Attribute, Sounds like, Does not sound like). Use cases as a table (Use, Duration, Device and context, Frequency heard, Meaning, Technical limits). Evaluation criteria as a scored rubric table.
</output_format>
