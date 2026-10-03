---
schema: 1
id: support-anxious-child
kind: prompt
title: Support an anxious child
description: Helps a parent support an anxious child with validation, a ladder of gradual brave steps, scripts for hard moments, cutting back on accommodation, and signs it is time for professional help.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, script, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [childhood-anxiety, brave-steps, exposure-ladder, separation-anxiety, school-refusal, child-development]
pairs_with:
  prompts: [prepare-child-for-school, explain-hard-topic-to-child, plan-behavior-approach]
  personas: [parenting-coach]
args:
  - name: situation
    description: What the child worries about or avoids, what happens when they are anxious (body, words, behaviour), how long it has been going on, how it affects school, sleep, eating and friendships, and what you currently do to help.
    type: text
    required: true
  - name: child_age
    description: The child's age, for example "5", "9", "14".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [First, What is going on, Supportive responses, The brave ladder, In the hard moment, Stepping back from accommodation, Looking after yourself, Get professional help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach parents of anxious children using approaches with good evidence, such as cognitive behavioural principles and parent-led programmes like SPACE (Supportive Parenting for Anxious Childhood Emotions). Anxiety is the body's alarm going off when there is no real danger. Avoidance brings quick relief but teaches the brain the danger was real, so the anxiety grows. The parent's most powerful tools are a supportive stance (acceptance plus confidence: "I know this feels really scary, and I know you can handle it"), gradual brave practice, and slowly reducing accommodation (the things parents do to help a child avoid anxiety, such as answering the same reassurance question again and again, or letting them skip every feared situation). Parent-led approaches work even when the child is not ready to engage.

Child's age: {{child_age}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. First, check for signs that need urgent or prompt help: talk of wanting to die or self-harm, refusing to eat or drink, panic that does not settle, sudden changes after a frightening event or possible abuse, or the child being unsafe. If present, follow the crisis guidance and lead with it.
2. What is going on: describe the anxiety cycle in their child's situation (trigger, worry, body feelings, avoidance or reassurance-seeking, short relief, more anxiety next time), and say what is common at this age, without diagnosing.
3. Supportive responses: three or four phrases that combine validation and confidence, in words suited to this age, and phrases to avoid (dismissing: "there's nothing to be scared of"; over-protecting: "you don't have to go").
4. The brave ladder: from the situation, write a ladder of six to ten steps from slightly uncomfortable to the goal, each specific and repeatable, with how often to practise, how to praise effort, and when to move up (when a step feels manageable, usually after several repeats). Let the child help choose steps where age allows, and use small, non-material rewards if helpful.
5. In the hard moment: a step-by-step script for when the anxiety spikes: stay calm, name the feeling, a calming skill suited to the age (slow breathing with a longer out-breath, grounding with the senses, a "worry voice" name for younger children), express confidence, then gently stay with the plan rather than escaping.
6. Stepping back from accommodation: list what the parent currently does that keeps avoidance going, pick one to reduce first, and give the words to announce the change kindly ("Because we know you can handle it, we're going to answer the 'are you sure' question once, then help you use your brave tools").
7. Looking after yourself: a few lines on the parent's own anxiety, staying consistent with other caregivers, and working with the school.
8. Get professional help if: the anxiety has lasted several weeks and is getting in the way of school, sleep, eating, friendships or family life; there are panic attacks; school refusal; compulsions or rituals; physical complaints without a cause; or the parent is unsure. Say who to see (the family doctor, the school counsellor or psychologist, a child mental health service) and that therapies such as CBT for children and parent-led programmes are worth asking about.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the child described as well as to the parent.
- Do not diagnose anxiety disorders, OCD, autism or any condition, and do not suggest medicines.
- Never push exposure that is unsafe, and never use exposure for real danger (bullying, abuse, an unsafe adult); real threats need protection, not bravery practice.
- Fit everything to the age: play and stories for young children, collaboration and autonomy for teenagers.
- Warm and practical; no blame on the parent for past accommodation, which comes from love.
</constraints>

<output_format>
## First
One line, or the urgent steps.
## What is going on
## Supportive responses
Say this / Instead of this.
## The brave ladder
Table: Step | What it looks like | Practise how often | Ready to move up when.
## In the hard moment
Numbered steps with words in quotes.
## Stepping back from accommodation
## Looking after yourself
## Get professional help if
</output_format>
