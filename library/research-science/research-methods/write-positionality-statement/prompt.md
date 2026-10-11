---
schema: 1
id: write-positionality-statement
kind: prompt
title: Write a positionality statement
description: Helps a researcher write a positionality and reflexivity statement that names the identities and experiences relevant to the study and says concretely how they shaped access, data and analysis.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, review]
role: [researcher, student]
requires: [none]
inputs: [notes, text]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [positionality, reflexivity, qualitative-research, insider-research, research-ethics]
subject: [social-sciences]
pairs_with:
  prompts: [run-thematic-analysis, write-research-interview-protocol, plan-participatory-research, write-methods-section]
  personas: [research-methodologist]
args:
  - name: study
    description: The study in a few sentences, covering the question, the participants or community, the methods and where it will be published.
    type: text
    required: true
  - name: notes
    description: Your own notes on your background and relationship to the topic and participants. Share only what you are willing to publish or discuss with your supervisor.
    type: text
    required: true
  - name: length
    description: Target length in words.
    type: number
    default: 250
output_contract:
  format: markdown
  sections: [What to include, Draft statement, How it shaped the research, Questions to reflect on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A positionality statement tells readers who the researcher is in relation to the study, so they can judge how that position may have shaped the work. Reviewers increasingly expect one in qualitative, participatory and community-engaged research. The weak version is a list of identity labels ("I am a white, middle-class woman") that does nothing; the strong version picks the positions that matter for this study (insider or outsider status, shared or different experience, power relative to participants, disciplinary assumptions, funding or employment ties) and says concretely how they affected recruitment, rapport, what participants chose to say, interpretation, and the steps taken in response (reflexive journal, peer debriefing, member reflection, co-analysis). It also avoids two traps: confessional writing that centres the researcher, and disclosure the researcher may regret, since publication is permanent.
</context>

<task>
Help write a positionality statement for:
<study>
{{study}}
</study>
<notes>
{{notes}}
</notes>

1. From the notes, pick the positions relevant to this study and explain why each matters here. Say which items in the notes are not relevant and can be left out.
2. Draft a statement of about {{length}} words in first person, naming each relevant position and its specific effect on access, data generation or interpretation, and the reflexive practice used in response.
3. Add a short table linking each position to a plausible influence and to evidence or a practice the researcher can point to; mark plausible influences as for the researcher to confirm.
4. Ask four to six reflection questions that would make the statement more honest or specific.
</task>

<constraints>
- Use only what the researcher wrote about themselves. Do not infer or add identities, experiences or beliefs.
- Flag any disclosure that could carry personal or professional risk (health, immigration status, sexuality, past trauma, employer conflicts) and suggest a less specific wording; the choice to disclose is the researcher's.
- Avoid claims of neutrality or of having removed bias; positionality is acknowledged and worked with, not eliminated.
- Do not exaggerate influence on the findings either; keep claims tentative where the researcher has no evidence.
- If the study is quantitative and positionality adds little, say so briefly and suggest a short reflexivity or conflict-of-interest note instead.
</constraints>

<output_format>
## What to include
Bullets: position | why it matters here. Then items to leave out.
## Draft statement
The statement.
## How it shaped the research
A table: position | possible influence (to confirm) | practice or evidence.
## Questions to reflect on
Numbered questions.
</output_format>
