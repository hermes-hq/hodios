---
schema: 1
id: choose-podcast-setup
kind: prompt
title: Choose a podcast recording setup
description: Recommends podcast recording gear and software for the format, room, budget and remote guests, with a signal chain, room fixes and recording settings. Use before buying equipment or upgrading.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [podcast-gear, microphones, remote-recording, room-acoustics, audio-quality]
pairs_with:
  prompts: [launch-podcast, plan-podcast-episode]
  personas: [podcast-producer]
args:
  - name: format
    description: How the show is recorded, such as solo, two hosts in one room, remote interviews, a panel, field recording, and whether you also record video.
    type: text
    required: true
  - name: budget
    description: Total budget with currency, and what you already own (laptop, phone, headphones, any microphone).
    type: string
    required: true
  - name: room
    description: Where you record, such as size, hard or soft surfaces, outside noise, and whether you can add furnishings or treatment. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation in brief, Signal chain, Gear list, Room, Remote guests, Recording settings, Upgrade path]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise podcasters on recording setups. The room and microphone technique matter more than the price of the gear: a modest dynamic microphone close to the mouth in a furnished room beats an expensive condenser in an echoey kitchen. Key trade-offs:
- **Dynamic vs condenser.** Dynamic microphones pick up less room sound and background noise, which suits untreated rooms and several people in one room. Condensers capture more detail and more of the room; they suit quiet, treated spaces.
- **USB vs XLR.** USB microphones plug straight into a computer and suit one person on a budget. XLR microphones need an audio interface or recorder, cost more to start, and scale to several microphones, separate tracks and upgrades. Some microphones offer both.
- **Separate tracks.** Recording each person on their own track makes editing far easier. For remote guests, the best quality comes from each person being recorded locally (a remote recording service that records each side locally and uploads it, or a "double-ender" where each person records themselves) rather than recording a video call.
- **Monitoring.** Closed-back headphones stop bleed into microphones.
Common delivery targets are about -16 LUFS integrated loudness for stereo and about -19 LUFS for mono, with peaks below -1 dBTP.
</context>

<task>
<format>
{{format}}
</format>

Budget: {{budget}}

<room>
{{room}}
</room>

1. Give the recommendation in brief: the setup to buy, the total within the budget, and the one thing that will make the biggest difference to sound in this situation.
2. Draw the signal chain as a simple text diagram (for example: microphone > interface > computer > recording software), with one line per person if there are several.
3. List the gear by type with the specification that matters (polar pattern, connection, inputs needed), the quantity, the rough price range in the user's currency, and why it fits. Use what the user already owns where it is good enough. Include the often-forgotten items: microphone arms or stands, cables, pop filters or foam windscreens, headphones for every person, and a backup recording.
4. Fix the room: free or cheap steps first (record in the most furnished room, face into soft surfaces, use blankets or a clothes closet, turn off fridges and fans), then treatment if the budget allows.
5. Plan remote guests: the recording approach, what the guest needs at minimum (wired headphones, a quiet room, a phone or laptop microphone held close if they have nothing better), and a short pre-call checklist to send them.
6. Give recording settings: sample rate and bit depth, gain staging (peaks around -12 to -6 dBFS while speaking), microphone distance, and the export loudness targets.
7. Show an upgrade path: what to buy next and in what order if the show grows.
8. If video is recorded, add the minimum camera, lighting and framing additions and how they change the budget.
</task>

<constraints>
- Stay within the budget, including cables and accessories; if the budget cannot buy a sensible setup for the format, say what is achievable and what to postpone.
- Recommend by type and specification. Name an example model only if you are confident it exists and is widely sold, and label prices as rough ranges to check, because prices and models change.
- Do not recommend a condenser microphone for an untreated, noisy room without saying why that is a risk.
- If the room is unknown, ask one question about it at the end and assume an ordinary furnished room.
- Keep it practical for a beginner: explain any term (LUFS, gain, polar pattern) in a few words the first time.
</constraints>

<output_format>
## Recommendation in brief
Three or four sentences.

## Signal chain
A text diagram in a code block.

## Gear list
A table: item | type and key spec | quantity | rough price | why. Then the total against the budget.

## Room
Free fixes, then paid fixes.

## Remote guests
The approach and the guest checklist.

## Recording settings
A short list.

## Upgrade path
Numbered, in buying order.
</output_format>
