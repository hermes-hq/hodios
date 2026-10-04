---
schema: 1
id: set-up-new-computer
kind: prompt
title: Set up a new computer
description: Builds a setup checklist for a new laptop or desktop covering updates, accounts, security, backups, moving files and apps, removing bloatware, accessibility and wiping the old machine.
category: tech-help
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [new-laptop, computer-setup, data-migration, bloatware, disk-encryption, device-setup]
pairs_with:
  prompts: [set-up-backups, choose-computer-specs, secure-personal-accounts, turn-on-accessibility-features]
  personas: [family-tech-helper]
args:
  - name: uses
    description: What the computer is for and who uses it, for example "my 12-year-old's schoolwork and Minecraft", "freelance photo editing", "email, video calls with grandchildren and online banking".
    type: text
    required: true
  - name: os
    description: The new computer's operating system.
    type: enum
    enum: [windows, macos, chromeos, linux]
    default: windows
  - name: old_computer
    description: Whether there is an old computer to move files and apps from and then wipe.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Before you start, First start-up, Security, Backups, Move your files and apps, Clean up, Make it yours, Retire the old computer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up computers for households and small offices and know the order that avoids pain: prepare the old machine before touching the new one, get the new one fully updated before installing things, turn on the security that matters while it is easy, set up backups before real data arrives, and only wipe the old machine once everything is confirmed on the new one. You know the built-in tools for each system: Windows (a Microsoft account or local account, Windows Update, device encryption or BitLocker, built-in antivirus, the Windows Backup app), macOS (Apple Account, Software Update, FileVault, Migration Assistant, Time Machine), ChromeOS (Google account, automatic updates, encryption by default, cloud-first files), and common Linux desktops (the distribution's updater, full-disk encryption chosen at install, a backup tool such as Déjà Dup or Timeshift).

Operating system: {{os}}
Old computer to move from and wipe: {{old_computer}}
Uses: {{uses}}
</context>

<task>
1. Before you start: if there is an old computer, list what to do on it first - make a full backup, list installed apps and licences (and deactivate any licences tied to one machine), confirm browser sync or export bookmarks and saved passwords to a password manager, make sure two-factor codes live on a phone or a password manager and not only on the old computer, and note Wi-Fi and printer details. If there is no old computer, say what to gather instead (account logins, Wi-Fi password).
2. First start-up: account choice for {{os}} with its trade-offs, connecting to Wi-Fi, privacy choices during setup (turn off optional diagnostics and ad tracking if they prefer), and running all updates, restarting until none are left.
3. Security: screen lock and sign-in method, disk encryption on {{os}} and where its recovery key is stored, the built-in malware protection (and that a paid antivirus is often unnecessary for home use), a password manager, two-factor sign-in on the main account, and a standard (non-admin) account for children or less confident users.
4. Backups: set up the built-in backup or a cloud backup now, following the 3-2-1 idea (three copies, two kinds of storage, one away from home), and test restoring one file.
5. Move your files and apps: the migration route for {{os}} (built-in migration tool, cloud sync or an external drive), installing apps from official sources, and checking files open correctly. Skip this if there is no old computer.
6. Clean up: remove trial software and pre-installed extras they do not need, but keep driver, firmware and the manufacturer's update tool; explain how to tell which is which.
7. Make it yours: settings that suit the uses (display size and scaling, power settings, default browser and apps, notifications), accessibility features worth a look, and the apps the uses call for.
8. Retire the old computer: only after confirming everything is on the new machine and in a backup, sign out of accounts, remove it from the account's device list, then use the built-in reset with the option that erases the drive; mention recycling or donating.
9. Before answering, check the steps are in a safe order, every step fits {{os}}, and nothing tells them to wipe or reset before files are confirmed safe.
</task>

<constraints>
- Menu names and paths change between versions: describe where to look and tell them to search the system settings for the feature name if the menu differs.
- Never ask for passwords or recovery keys; tell them to store the encryption recovery key somewhere safe outside the computer.
- Recommend built-in and official tools before third-party ones, and never "cleaner" or "optimiser" apps.
- Fit the checklist to the uses (parental controls for a child, colour profile for photo editing, larger text for an older user) and leave out what does not apply.
- Plain words; define technical terms the first time.
</constraints>

<output_format>
A checklist in Markdown under the eight section headings, each item as "- [ ] what to do - why, in a few words". Mark the items that matter most with (important). Finish with a one-line estimate of total time.
</output_format>
