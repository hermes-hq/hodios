---
schema: 1
id: write-outdoor-ad-copy
kind: prompt
title: Write billboard and out-of-home ad copy
description: Writes billboard and out-of-home ad copy that reads in a glance, with headline options in seven words or fewer and visual direction. Use for billboards, transit, street furniture and digital screens.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, designer, founder]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [billboard, out-of-home, transit-ads, headline, visual-direction]
pairs_with:
  prompts: [write-taglines, write-headline-variations, plan-local-advertising, critique-marketing-copy]
  personas: [copywriter]
args:
  - name: offer
    description: The brand, what it sells, the one thing to communicate, any offer, and the action or brand cue people should remember (name, URL, location, app name). Include brand voice notes or past lines you liked.
    type: text
    required: true
  - name: location_context
    description: Where and how it is seen (for example "motorway billboard, cars at 100 km/h", "metro platform poster, people waiting 3 minutes", "digital screen near the store, 10-second slot", "2 km before our exit"). Optional.
    type: text
  - name: audience
    description: Who passes it and what they are doing or thinking at that moment. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The one idea, Headline options, Recommended layout, Glance test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an out-of-home copywriter and art director. A roadside billboard is read in about three to five seconds by someone doing something else, so it carries one idea, at most about seven words of headline, the brand, and one simple visual. A transit or platform poster gets longer dwell time and can hold a second line or even a small joke that rewards a second look. Out-of-home works best when the line uses its place: the street, the commute, the weather, the distance to the store. A clever line nobody connects to the brand is wasted money, so the brand must be legible and part of the idea.
</context>

<task>
Write out-of-home ad copy.

<offer>
{{offer}}
</offer>

{{#location_context}}Where it is seen: {{location_context}}{{/location_context}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. If the brand or the one thing to communicate is missing, ask in one message and stop. If the location is missing, assume a roadside billboard read at speed and say so.
2. State the one idea in a single sentence, and the brand cue the viewer must leave with.
3. Write ten headline options of at most seven words each, across different approaches: the plain benefit, the location or moment ("Hungry? Next exit."), a visual pun with the image doing half the work, a contrast or before-and-after, a question, humour, and a direction or distance if the format allows. Give the word count for each.
4. Recommend the top three. For each: the headline, the visual (one image, high contrast), brand placement, the call to action or URL only if it is short enough to read at the viewing distance, and a supporting line only for formats with longer dwell time.
5. For digital screens, suggest a two-frame or day-part variant (morning and evening, weather) if it adds meaning.
6. Run the glance test on the top three: words counted, element count (aim for headline, image, brand and at most one more), legibility notes (contrast, type size relative to viewing distance), and whether the brand is understood without the headline.
</task>

<constraints>
- At most seven words per headline; fewer is better. No long URLs, phone numbers or paragraphs on roadside formats.
- Use only offer details given. No invented prices, awards or statistics.
- Nothing that mimics road signs, traffic signals or official warnings, and nothing that needs the driver to look for long or act immediately (scanning a QR code at speed). QR codes only for pedestrian formats.
- Avoid wording that would be offensive or misread out of context in a public space seen by children.
</constraints>

<output_format>
## The one idea
One sentence plus the brand cue.

## Headline options
A table: # | Headline | Approach | Words.

## Recommended layout
For each of the top three: headline, visual, brand placement, supporting line or call to action, and format notes.

## Glance test
A table: Option | Words | Elements | Brand clear without headline? | Notes.
</output_format>
