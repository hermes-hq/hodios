---
schema: 1
id: give-rough-cut-notes
kind: prompt
title: Give rough cut notes
description: Turns reactions to a rough cut into clear, timecoded edit notes grouped by story, pacing, clarity, sound and polish, ranked by priority and describing problems rather than prescribing fixes.
category: video
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, editor, marketer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [rough-cut, edit-notes, timecodes, review-notes, client-review]
pairs_with:
  prompts: [analyze-video-retention, create-paper-edit]
  personas: [video-editor]
args:
  - name: reactions
    description: Everyone's reactions to the cut, as they came - viewing notes, emails, chat messages, voice-note transcripts - with timecodes where people gave them and who said what.
    type: text
    required: true
  - name: video_purpose
    description: What the video is for and who it is for, for example "2-minute recruitment film for nursing graduates" or "YouTube tutorial for beginner potters".
    type: string
    required: true
  - name: cut_length
    description: Optional. Current length and target length, for example "4:20, needs to be 3:00".
    type: string
  - name: stage
    description: Which cut this is. Polish notes are held back on early cuts.
    type: enum
    enum: [rough, fine, final]
    default: rough
output_contract:
  format: markdown
  sections: [Overall read, Keep, Notes, Conflicts to resolve, Held for later, Questions for the editor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn messy review feedback into notes an editor can act on in one pass. Editors lose days to notes that are vague ("make it pop"), contradictory (two reviewers asking for opposite things), prescriptive in the wrong place ("cut to the drone shot here" when the real problem is that the viewer is lost), or mixed with colour and font nitpicks on a cut whose story is not working yet. Good notes say where, what the viewer felt or misunderstood, how much it matters, and who raised it, and they also say what is working so it is not cut by accident.

Video purpose: {{video_purpose}}. Cut: {{stage}}.
{{#cut_length}}Length: {{cut_length}}{{/cut_length}}
</context>

<task>
<reactions>
{{reactions}}
</reactions>

1. Overall read: in three sentences, does the cut do its job for this audience, and what is the single biggest problem?
2. Keep: moments people responded well to, with timecodes, so they survive the next cut.
3. Convert every reaction into a note:
   - timecode (MM:SS or a range); if none was given, describe the moment and mark [timecode?];
   - area: story, pacing, clarity, sound, polish;
   - the problem as the viewer experienced it ("lost track of who Sam is", "felt slow after the second interview"), not a prescribed fix; keep a reviewer's suggested fix as an option, labelled as such;
   - priority: must (blocks the purpose), should (noticeably better), could (taste);
   - source: who said it, and how many people raised it.
4. Merge duplicates. Order notes by priority, then by timecode.
5. Conflicts: where reviewers disagree, show both views and the question to decide, tied to the video purpose, and name who has the final say if known.
6. On a rough cut, move polish notes (colour, fonts, graphics finish, mix levels) to Held for later unless they block understanding. On a fine or final cut, include them.
7. If there is a length target, note which "must" and "should" notes help reach it.
</task>

<constraints>
- Use only the reactions given. Do not invent timecodes, opinions or reviewers; do not add your own notes unless clearly labelled "editor-suggested question".
- Translate vague notes into a specific viewer problem only when the reaction supports it; otherwise list it under Questions for the editor as "ask the reviewer what they meant".
- Keep the tone respectful of the editor's work; no sarcasm passed through from reviewers.
- If reactions are missing, ask for them and stop.
</constraints>

<output_format>
## Overall read
Three sentences.

## Keep
Bullets with timecodes.

## Notes
Table: # | timecode | area | priority | problem (viewer experience) | suggested option | source.

## Conflicts to resolve
Bullets: the two views, the deciding question, the decider.

## Held for later
Bullets of polish notes for the next stage.

## Questions for the editor
Vague notes to clarify and anything that needs the reviewer.
</output_format>
