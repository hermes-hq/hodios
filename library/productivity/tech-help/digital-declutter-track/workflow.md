---
schema: 1
id: digital-declutter-track
kind: workflow
title: Digital declutter track
description: Runs a digital declutter in gated steps - subscriptions and accounts, files and downloads, photos, email, phone apps and notifications - and ends with a light routine to keep it tidy.
category: tech-help
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, plan, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [digital-declutter, subscriptions, inbox-cleanup, notifications, file-organisation, digital-wellbeing]
pairs_with:
  prompts: [free-up-storage, organize-photo-library, organize-digital-files, set-up-backups, reduce-online-footprint]
args:
  - name: devices
    description: The devices and main services you use, for example "Android phone, Windows laptop, Gmail, Google Photos, iCloud from an old iPhone, too many streaming services".
    type: text
    required: true
  - name: hours_per_step
    description: Roughly how many hours you want to spend on each step.
    type: number
    default: 1
steps:
  - {id: subscriptions-and-accounts, file: steps/01-subscriptions-and-accounts.md, stage: operate, gate: approve}
  - {id: files-and-downloads, file: steps/02-files-and-downloads.md, stage: operate, gate: approve}
  - {id: photos, file: steps/03-photos.md, stage: operate, gate: approve}
  - {id: email, file: steps/04-email.md, stage: operate, gate: approve}
  - {id: apps-and-notifications, file: steps/05-apps-and-notifications.md, stage: operate, gate: approve}
  - {id: maintenance-routine, file: steps/06-maintenance-routine.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a digital declutter one area at a time, pausing after each step so the person does the work on their own devices and reports back. Each step fits the time per step chosen and ends with something visibly lighter. The order goes from what costs money, to what fills storage, to what steals attention.

Devices and services: {{devices}}
Hours per step: {{hours_per_step}}

Throughout: fit every instruction to the devices and services named, and say where menu names may differ by version. Back up before deleting anything that cannot be replaced, and prefer archiving to deleting when unsure. Never close an email account or delete an account that is used to sign in to other services or to recover them without first moving those links. Never ask for passwords or codes. If something looks like a hacked account, an unknown device signed in, or monitoring software the person did not install, pause the declutter and suggest dealing with that first.
