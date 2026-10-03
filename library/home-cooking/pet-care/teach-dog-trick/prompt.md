---
schema: 1
id: teach-dog-trick
kind: prompt
title: Teach a dog a trick
description: Teaches a dog a specific trick or cue with reward-based steps, short sessions, a plan for adding the cue and fixes for common sticking points. Use when you want to teach your dog something new.
category: pet-care
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dog-tricks, clicker-training, positive-reinforcement, dog-training, shaping]
pairs_with:
  prompts: [train-dog-behavior, plan-pet-enrichment]
  personas: [pet-care-advisor]
args:
  - name: trick
    description: The trick or cue to teach, for example "spin", "paw", "settle on a mat", "touch my hand", "put toys away", "play dead".
    type: string
    required: true
  - name: dog_details
    description: Age, breed or size, health or joint issues, what the dog already knows, what it loves most as a reward (food, toys, play), and whether you use a clicker. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Method, Steps, Adding the cue, Proofing, Sticking points, Session plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach tricks the way a certified positive-reinforcement trainer would. The tools: a marker (a clicker or a short word like "yes") that tells the dog exactly which moment earned the reward; luring (guiding with a treat, faded within a few repetitions so the hand signal replaces it); shaping (rewarding small steps toward the final behaviour); and capturing (rewarding a behaviour the dog offers naturally, such as a stretch for "bow"). The verbal cue is added only once the dog does the behaviour reliably, so the word means the finished trick. Sessions are short (3 to 5 minutes), with a high rate of rewards and the dog succeeding about 80 percent of the time. Difficulty rises one "D" at a time: duration, distance, distraction.

Trick: {{trick}}
{{#dog_details}}Dog: {{dog_details}}{{/dog_details}}
</context>

<task>
1. Before you start: check the trick is physically safe for this dog. Jumping, standing on hind legs, rolling and weaving tricks need care for puppies under about 12 to 18 months (growing joints), seniors, long-backed and heavy breeds, and dogs with joint or back problems; if unsafe, suggest a safe variation. List prerequisites (for example a reliable "down" before "roll over") and what you need (small soft treats, a quiet room).
2. Method: choose luring, shaping or capturing for this trick and this dog, and explain why in one or two sentences.
3. Steps: 4 to 8 numbered steps from the first tiny version to the full trick. For each: what you do, what the dog does, when to mark and reward, and the criterion to move on (for example 8 out of 10 correct in a session).
4. Adding the cue: when and how to add the word or hand signal, and how to fade the lure.
5. Proofing: building reliability in new places and with distractions, one D at a time.
6. Sticking points: the three to five most common problems for this trick and how to fix each.
7. Session plan: a short plan for the first week.
</task>

<constraints>
- Reward-based only. Never push, pull, or physically place the dog into position (for example pushing it down or rolling it over). If the user suggests force, say in one sentence why it slows learning and damages trust, and give the lure or shaping version.
- If the dog stops engaging, end the session on an easy win; frustration means the step was too big.
- Keep it concise: this is a training card, not an essay.
</constraints>

<output_format>
## Before you start
## Method
## Steps
Numbered, each ending with "Move on when: ...".
## Adding the cue
## Proofing
## Sticking points
A table: Problem | Why it happens | Fix.
## Session plan
A table: Day | Focus | Minutes.
</output_format>

<examples>
Example of one step, for "spin":
2. Hold a treat at the dog's nose and draw a small circle to the left at nose height, so the dog follows it halfway round. Mark the moment the dog's head and shoulders turn, then reward. Move on when: the dog follows the half circle smoothly 8 times out of 10.
</examples>
