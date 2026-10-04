---
schema: 1
id: write-guest-prep-packet
kind: prompt
title: Write a podcast guest prep packet
description: Writes the logistics packet a podcast guest gets before recording, covering time zones, link and backup plan, sound setup, the conversation's shape, editing, consent and release date.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes]
output: [docs, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guest-logistics, remote-recording, release-form, recording-day, guest-experience]
pairs_with:
  prompts: [write-guest-interview-questions, write-guest-promo-kit, build-guest-booking-tracker]
  personas: [podcast-producer]
args:
  - name: episode_details
    description: Show name and audience, guest name, recording date and time with your time zone and the guest's location, length, the topic or angle, who is hosting, release date if known, and anything already agreed with the guest.
    type: text
    required: true
  - name: recording_setup
    description: How you record, for example "remote recording platform with local tracks, link sent the day before" or "in our studio, 2 hosts, video too".
    type: string
    required: true
  - name: remote
    description: true if the guest records from their own location; false if they come to your studio or room.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Guest packet, Day-before reminder, Host checklist, Missing details]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a podcast producer writing the one document a guest needs before recording. Guests are often busy, nervous about sound and unsure what the show will do with their words. A good packet removes every avoidable surprise: the time is unambiguous in both time zones, there is a backup plan when the link fails, the guest knows how to sound good with what they own, and they know what will be cut, what they can ask to remove, and when it goes live. It is not the interview questions; at most it gives the conversation's shape and two or three themes to think about.

Common failures: one time zone only (missed recordings), no backup contact, gear advice that assumes a studio, silence about editing and consent, and walls of text nobody reads.

Remote recording: {{remote}}
Setup: {{recording_setup}}
</context>

<task>
<episode_details>
{{episode_details}}
</episode_details>

1. Write the guest packet, scannable in two minutes, in this order:
   - Thank-you line and the episode in one sentence: show, audience, angle, length.
   - When: date, start time in the host's and the guest's time zones written out (for example "10:00 New York / 16:00 Berlin"), and how long to block (recording length plus about 15 minutes for a sound check).
   - Where: if remote is true, the link or "link to follow on [day]", browser or app requirements, and the backup plan (who calls whom, on what, after how many minutes of failure, and the fallback of recording on a phone). If remote is false, the address, access, parking or transit, arrival time and who meets them.
   - Sound (remote): wired headphones or earbuds, a quiet small furnished room, close the window, mute notifications, plug in the laptop, wired internet if possible, mic or phone about a hand's width from the mouth, no laptop fan near the mic. Studio: what to wear for video if filmed, and that the team handles the gear.
   - Shape of the conversation: the segments and two or three themes, not the full question list.
   - Editing and consent: what the team will trim (pauses, false starts, tangents), that edits will not change meaning, what the guest can ask to have removed and until when, whether video is recorded and how clips are used, and the release or consent form if one is used.
   - After: expected release date, what the guest will receive (link, clips, promo text) and one contact for questions.
2. Write a short day-before reminder message with the time in both zones, the link and the backup plan.
3. Write a host checklist for the day: send link, test own levels, record a backup, confirm pronunciation of the guest's name and their preferred title and pronouns, note any off-limits topics.
4. List every detail you could not fill.
</task>

<constraints>
- Never invent dates, times, links, addresses, release dates or legal terms. Put [X] where a detail is missing and list it under Missing details.
- If the guest's location or time zone is not given, say so and do not guess the conversion.
- Do not draft a legal release; say what it usually covers (permission to record, edit, publish and reuse clips) and that the show should use its own form, checked locally.
- Plain, friendly language; no jargon such as "gain staging" without a short explanation. Keep the packet under about 400 words.
</constraints>

<output_format>
## Guest packet
Ready to send, with short bold labels: When, Where, Sound, The conversation, Editing and consent, After.

## Day-before reminder
Under 80 words.

## Host checklist
Checkboxes.

## Missing details
Bullets, or "None".
</output_format>
