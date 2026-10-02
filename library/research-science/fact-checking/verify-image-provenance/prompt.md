---
schema: 1
id: verify-image-provenance
kind: prompt
title: Verify where an image or video came from
description: Guides a check of where an image or video came from through reverse search, metadata, visual clues, earlier versions and signs of AI generation or editing. For journalists and careful sharers.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher, individual]
requires: [none]
inputs: [image, text, url]
output: [plan, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [osint, reverse-image-search, geolocation, deepfakes, content-credentials, misinformation]
pairs_with:
  prompts: [fact-check-claims, evaluate-source-credibility, respond-to-misinformation]
args:
  - name: media_description
    description: The image or video (attach it if your assistant can see images), plus where you found it, who posted it, when, the caption, and any link.
    type: text
    required: true
  - name: claim
    description: What the post says the media shows, for example "flooding in Valencia yesterday" or "the minister at a protest in 2024".
    type: text
output_contract:
  format: markdown
  sections: [What is being claimed, What can be seen, Verification steps, Assessment so far, What would settle it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most misleading images are real pictures with a false story: an old photo recaptioned as new, a scene from one country presented as another, or a cropped frame that changes the meaning. Fully fabricated and AI-generated images are growing but are still the minority, and the signs people look for (odd hands, garbled text) are unreliable as models improve. Professional verification combines provenance (who first posted it, when, and where), content (what the image shows that can be checked: place, time, weather, signs, uniforms), and context (does it fit what is independently known about the event). No single clue proves an image authentic, and AI-detection tools give probabilities, not proof. Content credentials (C2PA) can show an editing history when present, but their absence proves nothing, because most platforms strip metadata.
</context>

<task>
Help verify this media.
<media>
{{media_description}}
</media>
{{#claim}}Claim being checked: {{claim}}{{/claim}}

1. **What is being claimed:** restate the claim as specific, checkable parts: what, where, when, who. Note which parts matter most.
2. **What can be seen:** if you can see the image or frames, describe observable details that can be checked: signs and text (language, script, names, phone codes), architecture, vegetation, landmarks, vehicles and number plates, uniforms, weather, shadows and light direction, clothing for the season. Separate what you observe from what you infer. If you cannot see the media, say so and work from the description.
3. **Verification steps:** a practical, ordered checklist the user can follow:
   - Preserve: save the file, screenshot the post with its URL, date and account, and archive the page before it is deleted.
   - Reverse search: run the image (or key frames from a video) through several engines, such as Google Lens, Bing Visual Search, Yandex and TinEye, because their indexes differ; crop to distinctive details and search again; sort results by date to find the earliest copy.
   - Video: extract key frames (for example with the InVID-WeVerify browser plugin) and reverse-search them; check whether audio matches the scene.
   - Metadata: inspect EXIF data on an original file if available, check for content credentials, and remember that social platforms usually strip both.
   - The source: who first posted it, their history and location, and whether they were plausibly there; contact them if appropriate.
   - Geolocation and time: compare details with satellite and street-level imagery, and check sun angle and weather records for the claimed date.
   - Context: search for independent reporting, official statements or other footage of the same event from other angles.
   - AI or editing: look for inconsistencies in reflections, text, edges and repeated textures; treat detection tools as one weak signal; check whether the scene is physically and logically possible.
4. **Assessment so far:** based only on what is known now, rate each part of the claim: consistent with evidence so far, not yet verified, likely miscaptioned, likely manipulated or generated, or false (for example an earlier copy exists from a different event). Explain the reasoning and the confidence.
5. **What would settle it:** the specific findings that would confirm or refute the claim.
</task>

<constraints>
- Never declare media authentic or fake on visual inspection alone. Say what the evidence supports and how confident that is.
- Do not claim to have run searches, opened links or read metadata you have not. If you have no browsing or search tools, give the steps for the user to run and ask them to report results back.
- Do not help identify, locate or expose private individuals shown in the media. Focus on verifying the event and the claim, not on who ordinary people in it are.
- If the media shows violence or distress, say so before describing it, and keep descriptions factual.
- Remain neutral about the politics of the claim; verify the claim, not the side.
</constraints>

<output_format>
Use the contract's section headings. What can be seen as two lists: observed and inferred. Verification steps as a numbered checklist with tick boxes. Assessment so far as a table: part of claim | rating | reasoning | confidence.
</output_format>
