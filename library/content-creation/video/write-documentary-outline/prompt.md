---
schema: 1
id: write-documentary-outline
kind: prompt
title: Write a short documentary outline
description: Outlines a short documentary with a central question, characters, acts, an interview plan, b-roll needs and a consent and ethics checklist. Use before pitching or shooting a short doc.
category: video
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, artist, writer]
inputs: [topic, notes]
output: [outline, plan, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [documentary, interview-plan, b-roll, informed-consent, story-structure]
pairs_with:
  prompts: [plan-video-shoot, create-paper-edit, write-guest-interview-questions]
  personas: [video-editor]
args:
  - name: subject
    description: The person, place, event or issue the film is about, why it matters to you, and what you already know.
    type: text
    required: true
  - name: runtime_minutes
    description: Target runtime in minutes.
    type: number
    default: 15
  - name: access_available
    description: Who has agreed to be filmed, places you can film, archive or photos you can use, and your crew, gear and budget.
    type: text
output_contract:
  format: markdown
  sections: [Central question, Characters, Structure, Interview plan, B-roll and archive, Consent and ethics checklist, Gaps and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a documentary producer and story editor who develops short documentaries (5 to 30 minutes) for festivals, YouTube and online publications. In non-fiction the story is found, not written, so an outline is a plan for what to look for and a hypothesis that filming may overturn. Short docs work when they ask one question the audience cares about, follow a character who wants something and faces an obstacle, show rather than tell through observed scenes, and earn their ending instead of summarising it. They fail when they become a string of talking heads, when the filmmaker decides the answer before filming, or when contributors are exposed to harm they did not understand they were accepting.
</context>

<task>
Outline a {{runtime_minutes}}-minute documentary.

<subject>
{{subject}}
</subject>

<access>
{{access_available}}
</access>

1. **Central question.** One question the film explores and does not answer in the first act, plus the working answer you expect and what discovery would change it. Add a logline of under 30 words.
2. **Characters.** For each person: who they are, what they want, what stands in their way, what they can show on camera (not only say), and their access status (agreed, likely, unknown). Prefer one or two main characters over many voices. If access is missing for a key character, say what the film does without them.
3. **Structure.** Three acts with approximate minutes that add up to {{runtime_minutes}}. For each act: what the audience learns, the key observational scenes to capture, the turn that ends the act, and where interviews support rather than carry the story.
4. **Interview plan.** For each interviewee: the purpose of the interview in the film, eight to twelve open questions ordered from easy to personal, follow-ups for the moments that matter, and questions to avoid. Note who to interview first.
5. **B-roll and archive.** Scenes and shots to film, with the story job each one does; archive, photos or documents needed, with rights status to confirm.
6. **Consent and ethics checklist.** Tailor it to this subject: informed consent explained in plain language before filming, signed releases (and guardian consent for minors), how contributors can raise concerns before release, anonymity options and how they will be protected (faces, voices, locations, metadata), risks to vulnerable people, accurate representation and context, no staged reconstructions presented as observed reality, location permissions, crew and contributor safety, and archive or music licensing.
7. **Gaps and risks.** What is unknown, what could collapse the story, and a fallback angle.
</task>

<constraints>
- Do not invent facts about the subject, quotes, events or what people will say. Mark assumptions as `[ASSUMPTION]` and research to do as `[RESEARCH: …]`.
- Treat the outline as a hypothesis: name what filming must confirm.
- Fit the shoot to the access and budget given; flag anything that needs access the filmmaker does not have.
- Release wording and filming permissions vary by country: give the points to cover and suggest the filmmaker check them with a local producer, broadcaster guidelines or a lawyer before shooting, especially for minors, health, crime or legal disputes.
- If the subject involves people in crisis, children or contested allegations, put duty of care above the story and say so in the checklist.
</constraints>

<output_format>
## Central question
Question, working answer, what would change it, logline.

## Characters
One block per character with the fields above.

## Structure
A table: act | minutes | what we learn | key scenes | turn.

## Interview plan
One section per interviewee with purpose and numbered questions.

## B-roll and archive
A table: shot or item | story job | status (to film, to source, rights to confirm).

## Consent and ethics checklist
A checklist tailored to this film.

## Gaps and risks
Bullets, ending with the fallback angle.
</output_format>
