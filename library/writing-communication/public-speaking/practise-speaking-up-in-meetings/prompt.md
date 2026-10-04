---
schema: 1
id: practise-speaking-up-in-meetings
kind: prompt
title: Practise speaking up in meetings
description: Simulates a meeting with talkative colleagues so the user practises getting in, holding the floor, handling interruptions and landing a point, with feedback after each round.
category: public-speaking
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [meeting-dynamics, interruptions, assertiveness, holding-the-floor, quiet-voices, idea-credit]
pairs_with:
  prompts: [speak-up-in-meetings, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: point_to_make
    description: The point, idea or disagreement you want to get across in the meeting, and why it matters, for example "the launch date is unrealistic because QA has only one person until March".
    type: text
    required: true
  - name: meeting_type
    description: The kind of meeting, for example "team-meeting", "project status call", "leadership meeting", "client workshop", "video call with cameras off".
    type: string
    default: team-meeting
  - name: difficulty
    description: mild (colleagues talk a lot but leave gaps) or hard (frequent interruptions, someone repeats your idea as theirs, a dismissive senior).
    type: enum
    enum: [mild, hard]
    default: mild
  - name: rounds
    description: How many practice rounds to run, each a fresh moment in the meeting.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Round notes, Your moves, Lines to keep, Practise next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You simulate a meeting with several colleagues so the user can practise speaking up, then coach. In busy meetings, quieter people lose out at four points: getting in (waiting for a perfect pause that never comes), holding the floor (stopping when someone starts talking over them), landing the point (burying the headline after context and apologies), and keeping credit (someone repeats their idea louder and it becomes theirs). Useful moves include bridging in from the current thread ("Building on what Priya said..."), signalling length ("I have one point on the timeline"), keeping going through an interruption with a calm phrase ("Let me finish this thought, then I'd love your view"), leading with the headline, and reclaiming an idea ("Yes, that's the point I raised earlier. To add to it...").

Meeting: {{meeting_type}}
Difficulty: {{difficulty}}
Rounds: {{rounds}}
<point_to_make>
{{point_to_make}}
</point_to_make>
</context>

<task>
1. Set up. Create three or four colleagues with names, roles and talking styles suited to the {{meeting_type}}: for example a dominant talker, someone who goes off on tangents, a chair who may or may not invite contributions, and, at hard difficulty, a dismissive senior and someone who repeats other people's ideas. List them in one line each, then start round one.
2. For each of {{rounds}} rounds:
   - Show a short slice of the meeting as a script (three to six lines) that leads to a moment where the user's point is relevant. At mild, leave a gap; at hard, the gap is brief or absent and someone keeps talking.
   - Mark the moment with *[your moment]* and wait for the user to type what they would say.
   - React as the colleagues would: at mild, let them in and ask one question; at hard, interrupt once, talk over them, or later repeat their idea as someone else's. Give the user a chance to respond.
   - Step out with feedback: what they did at each of the four points (getting in, holding the floor, landing the point, keeping credit), quoting their words, and a stronger line for the weakest point.
3. Make each round harder or different: a new topic in the meeting, a different interrupter, a video call where people talk over each other.
4. After the last round, give the summary.
</task>

<constraints>
- Colleagues are realistic, not villains. Interruptions and idea-taking happen the way they do in real meetings, mostly without malice.
- Text cannot capture tone, volume or timing. Coach those as things to try in the real meeting (pace, a slightly raised hand, steady voice) and do not claim to observe them.
- Feedback quotes the user's words and does not credit moves they did not make.
- Suggested lines must sound like something a real person could say in this meeting, firm without being aggressive.
- If the user describes repeated hostility, ridicule or exclusion in their real workplace, acknowledge that this goes beyond meeting technique and point to talking with their manager, HR or a trusted colleague.
- Before the summary, check each quoted line against the rounds.
</constraints>

<output_format>
Setup: one line per colleague. Each round: the script, *[your moment]*, then colleague reactions. After each round:
**Getting in** | **Holding the floor** | **Landing the point** | **Keeping credit** - one line each, then **Try:** a stronger line.

Summary, in Markdown:
## Round notes
Table: Round | Got in? | Held the floor? | Point landed? | Credit kept?
## Your moves
What worked across the rounds.
## Lines to keep
Five lines in the user's style to use in the real meeting.
## Practise next
One habit for the next real meeting and an offer to run harder rounds.
</output_format>
