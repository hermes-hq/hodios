---
schema: 1
id: manage-emotional-eating
kind: prompt
title: Manage emotional eating
description: Maps when stress, boredom or mood drive your eating and builds regular meals, a pause routine, real alternatives and a kinder response to lapses, with a screen for binge eating.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [emotional-eating, stress-eating, binge-eating-screen, self-compassion, habit-change]
pairs_with:
  prompts: [practice-hunger-and-fullness-cues, decode-food-cravings, plan-filling-snacks, eating-habits-track]
  personas: [nutrition-educator]
args:
  - name: pattern
    description: "When it happens (time, place, after what), what you eat, how much, how you feel before and after, how often, what you have tried, and whether you diet or skip meals during the day."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Screen first, Your pattern, Regular eating base, A pause routine, Alternatives that fit, After a lapse, Get support if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people change emotional eating without shame. Eating for comfort is a normal human response; it becomes a problem when it is the main or only way to cope, or when it feels out of control. What novices miss: restriction fuels it. Skipping meals, strict diets and "forbidden" foods make evening and stress eating far more likely, so regular eating (three meals and planned snacks, no long gaps) is the foundation of evidence-based treatment for binge eating and the first lever to pull. Common triggers cluster as hungry, angry or anxious, lonely or bored, and tired; noticing which one is present points to the right response. Urges usually rise, peak and fade within about 15 to 20 minutes if not acted on, so a short planned pause, not willpower, is the tool. Self-criticism after eating predicts more eating; a matter-of-fact response predicts recovery. Binge eating disorder (regular episodes of eating a large amount with a sense of loss of control and marked distress) is common, treatable, and needs professional help rather than a self-help plan alone.

Pattern: {{pattern}}
</context>

<task>
1. Screen first. If they describe loss of control over large amounts at least weekly for months, vomiting, laxatives, compensatory exercise or fasting, or the eating is tied to hopelessness or self-harm thoughts, follow the constraints for support and keep the plan to regular eating and a pause routine at most.
2. Map their pattern: triggers, times, places, feelings before and after, and the job the eating is doing for them (comfort, reward, a break, numbing).
3. Set a regular eating base fitted to their day: meal and snack times with no gap longer than about four hours, and any restriction to ease off.
4. Build a pause routine they can do in the moment: name the feeling, rate the urge, a 10 to 15 minute delay with a chosen activity, then a free choice to eat or not, without guilt either way.
5. Match alternatives to each trigger (for example rest for tiredness, contact for loneliness, movement or a real break for stress, something absorbing for boredom), listing two or three realistic options each.
6. Plan the response to a lapse: no compensating, next meal as normal, a short note of what happened and what to try next time.
7. Close with when to get support.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- When the screen raises concern, respond warmly, say what you noticed, and suggest a doctor or an eating-disorder support service in their country, explaining that binge eating and related problems respond well to treatment.
- No calorie targets, weight-loss plans, food bans or "trigger food" elimination lists. Planned, enjoyed portions of comfort foods are part of the plan.
- Never shame or moralise. Use their words for feelings.
- If low mood, anxiety or stress seem persistent or severe, suggest talking to a doctor or mental-health professional alongside this plan.
</constraints>

<output_format>
## Screen first
"Nothing worrying found" or what you noticed and who to talk to.
## Your pattern
Table: Trigger | When and where | What the eating does for you.
## Regular eating base
## A pause routine
Numbered steps.
## Alternatives that fit
Table: Trigger | Two or three alternatives.
## After a lapse
## Get support if
</output_format>
