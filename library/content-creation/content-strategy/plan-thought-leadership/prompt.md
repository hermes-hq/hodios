---
schema: 1
id: plan-thought-leadership
kind: prompt
title: Plan a thought leadership programme
description: Plans a thought leadership programme for an executive or expert, with a defensible point of view, themes, formats, channels and a ghostwriting workflow. Use before building an expert's profile.
category: content-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, executive, founder, consultant]
inputs: [preferences, notes, transcript]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [thought-leadership, executive-visibility, point-of-view, ghostwriting-workflow, b2b-content]
pairs_with:
  prompts: [write-op-ed, pitch-freelance-article, write-linkedin-post]
  personas: [ghostwriter, content-strategist]
args:
  - name: leader
    description: Who the leader is (role, company, career, what they have done that few others have), what they believe that their peers might disagree with, their current visibility, how much time they will give each month, and any interview notes or past talks and posts.
    type: text
    required: true
  - name: goals
    description: What the programme should achieve and for whom (for example trust with enterprise buyers, recruiting senior engineers, influencing a policy debate, speaking invitations), plus any constraints such as legal review or regulated-industry rules.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Point of view, Themes, Formats and channels, Workflow, First 90 days, Signals, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategist who has run thought leadership for founders, executives and specialists. Real thought leadership is not volume; it is a distinctive, defensible point of view, grounded in experience the leader actually has, expressed consistently enough that a specific audience starts to associate the leader with it. Most programmes fail in one of three ways: generic content ("AI is changing everything") that any executive could sign; a ghostwritten voice the leader does not recognise, so they stop approving drafts; or an ambitious plan that needs more of the leader's time than they will give. Good programmes start from the leader's real opinions and stories, collected through interviews, pick a few themes, choose the formats and channels where the target audience pays attention, and build a workflow in which the leader spends a small, fixed amount of time and the team does the rest.
</context>

<task>
Plan a thought leadership programme.

<leader>
{{leader}}
</leader>

<goals>
{{goals}}
</goals>

1. **Point of view.** Draft a one-sentence point of view and two alternatives, each grounded in the leader's experience and something their peers might disagree with. For each, note the evidence or stories that support it and the risk (for example too safe, too contrarian for the company's position, outside their expertise). Recommend one. If the material contains no genuine opinion or distinctive experience, say so and go to step 8 first.
2. **Audience.** Name the specific people the programme must reach, where they pay attention, and what they need to believe or know.
3. **Themes.** Three or four themes that ladder up to the point of view, each with three example piece ideas tied to the leader's stories.
4. **Formats and channels.** Choose the mix (for example a monthly long-form essay, weekly short posts, op-eds, podcast guest spots, conference talks, a newsletter) based on the audience and the leader's strengths (writer or talker) and time. For each: cadence, owner, and the leader's time cost.
5. **Workflow.** A ghostwriting process that keeps the leader's voice: a monthly 30 to 60 minute interview, a voice guide built from transcripts of their speech, drafts that use their words and stories, one review round with a deadline, legal or compliance review where the goals require it, and a rule that nothing is published under the leader's name without their approval.
6. **First 90 days.** Month-by-month plan: foundational pieces first (a signature essay stating the point of view), then the cadence, then outreach for bylines or talks.
7. **Signals.** Leading and lagging indicators tied to the goals (for example inbound from target accounts, invitations, candidate mentions in interviews, replies from peers), reviewed quarterly.
8. **Open questions.** Five to eight interview questions to draw out the leader's stories and opinions where the material is thin.
</task>

<constraints>
- Ground everything in the leader's material. Do not invent experiences, results, opinions, credentials or stories; mark gaps as interview questions.
- Fit the leader's stated time; show the monthly hours the plan asks of them.
- Respect disclosure and compliance constraints in the goals. Note that ghostwritten work published under the leader's name must reflect their actual views and be approved by them.
- Avoid generic trend themes unless the leader has a distinctive angle on them.
- Do not promise follower counts, media placements or leads.
</constraints>

<output_format>
## Point of view
Three options with evidence and risk, and the recommendation.

## Themes
The audience, then each theme with example pieces.

## Formats and channels
A table: format | channel | cadence | owner | leader time per month.

## Workflow
The ghostwriting and approval process as numbered steps.

## First 90 days
Month-by-month plan.

## Signals
Indicators and the review rhythm.

## Open questions
Numbered interview questions.
</output_format>
