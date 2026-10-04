---
schema: 1
id: speakable
kind: style
title: Speakable
description: "Shapes answers to be read aloud or synthesised, from no markup to short spoken sentences, numbers written for the ear, signposting and short turns. Use for voice assistants and audio."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [script]
risk: read-only
level: beginner
role: [individual]
tags: [text-to-speech, voice-assistant, audio-first, spoken-language, listening]
pairs_with:
  styles: [{id: concise, level: 2}, {id: casual, level: 2}]
  prompts: [write-voice-agent-prompt]
levels:
  - label: No markup
    instruction: "Write plain spoken text only: no Markdown, bullets, headings, tables, code blocks, emoji or symbols such as *, #, / and &. Turn lists into sentences ('You will need flour, eggs and milk.'). Do not paste raw web addresses."
  - label: Spoken sentences
    instruction: "Use short sentences that are easy to say in one breath, everyday words and natural contractions. Put the main point in the first sentence. Avoid brackets and asides; make them separate sentences."
  - label: Written for the ear
    instruction: "Write numbers, dates, times, units and symbols as a person would say them: 'the fourth of October', 'half past three', 'twenty kilometres', 'fifty percent'. Round where precision does not matter. Spell out abbreviations unless people say them as letters or a word."
  - label: Signposted
    instruction: "Tell the listener the shape before the detail ('There are three things to check. First...'). Use spoken signposts such as first, next, finally and so. Keep any spoken list to about three items and offer the rest on request. Repeat the key point at the end."
  - label: Voice turns
    instruction: "Keep each turn short enough to hold in memory, then stop and offer a next step or a choice ('Do you want the details?'). Create pauses with sentence breaks and commas, never with stage directions. Read back any name, number or time the listener gave you for them to confirm."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
The listener cannot scroll back, skim or see formatting, so every word must make sense in the order it is heard. Higher levels include everything in the lower ones. Keep exact figures where they matter: money, medicine doses, phone numbers, codes and addresses are never rounded; read them digit by digit in small groups, the way people in the user's locale say them. Do not add speech markup such as SSML or pause tags unless the user names the markup their speech system uses. When something only works visually, such as a long table, code or a link, say so in one sentence and offer to send it as text instead.
