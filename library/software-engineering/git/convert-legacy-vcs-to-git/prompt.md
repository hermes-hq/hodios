---
schema: 1
id: convert-legacy-vcs-to-git
kind: prompt
title: Convert an SVN, TFVC, Mercurial or Perforce repository to git
description: Plans and runs a conversion from SVN, TFVC, Mercurial or Perforce to git, keeping history, mapped authors, branches and tags, and moving large binaries to LFS.
category: git
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [devops-engineer, software-engineer, tech-lead]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [plan, script, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [subversion, mercurial, perforce, tfvc, history-conversion, authors-file]
pairs_with:
  prompts: [set-up-git-lfs, write-gitignore-file, speed-up-large-repo, move-repository-to-new-host]
args:
  - name: source
    description: The current system and version, repository layout (for SVN, whether it uses trunk/branches/tags), approximate size and age, number of contributors, and any large binary files.
    type: text
    required: true
  - name: goals
    description: How much history must come across (all, since a date, only trunk), whether the old system stays read-only, and the target host.
    type: text
output_contract:
  format: markdown
  sections: [Source assessment, Approach, Authors file, Trial conversion and verification, Cutover runbook, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Conversions fail in predictable ways. SVN has no real branches or tags, only copies in conventional folders, so a non-standard layout or a repository holding several projects needs explicit mapping, and tags that were later committed to become branches, not tags. Authors in SVN, TFVC and Perforce are bare user names, so without an authors file every commit gets an unusable identity, and that is permanent once people build on the new history. Large binaries committed years ago make the git repository huge; they must be moved to LFS during the conversion, not after, because rewriting later breaks every clone. Ignore rules (`svn:ignore`, `.hgignore`) and keyword expansion and EOL properties do not carry over by themselves. Tool choice matters: `git svn` is fine for small, standard repositories, while dedicated tools (for example svn2git variants or reposurgeon for SVN, hg-fast-export for Mercurial, git-p4 for Perforce, git-tfs for TFVC) handle larger or messier ones; check each tool's current documentation for its flags. Big conversions take hours, so the approach is: convert, verify, iterate, then do a final incremental pass during a short write freeze.

<source>
{{source}}
</source>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Inspect the source read-only: layout, branch and tag folders or equivalents, size, largest files, author list, and properties such as ignores and EOL settings. Give the exact read-only commands for the source system and run them only if the user has access set up.
2. Choose the tool and say why, given the system, size and layout. If the layout is non-standard, write the branch and tag mapping explicitly.
3. Build the authors file from the source's user list, mapping each user name to a name and email; list unknown users for the user to fill in, and stop until they confirm the mapping.
4. Decide what history to bring (all, since a date, trunk only) and which files go to LFS by path or extension, with the size threshold used.
5. Run a trial conversion into a scratch folder outside the working repository. Convert tag-branches to real annotated tags where they were never changed after creation, and report the ones that were.
6. Verify the trial: commit and revision counts per branch, file tree at several revisions compared with a checkout from the source, authors all mapped, repository size, and a sample of LFS files. Fix the mapping and repeat as needed.
7. Add a `.gitignore` translated from the source ignore rules and a `.gitattributes` for line endings and LFS.
8. Write the cutover runbook: write freeze on the source, final incremental conversion, push to the new host after confirmation, make the source read-only, and update build and developer instructions.
9. Report what you ran, what you verified and what remains.
</task>

<constraints>
- Never modify the source repository; all work happens in new folders.
- Do not guess author emails; unknown users stay as placeholders for the user to fill in.
- Do not push to any remote or make the source read-only without explicit confirmation.
- Do not quote tool flags you are not sure about; point to the tool's documentation instead.
</constraints>

<output_format>
## Source assessment
Layout, size, authors, large files.
## Approach
Tool, mapping, history scope, LFS rules.
## Authors file
Mapped and unknown users.
## Trial conversion and verification
Commands run and checks with results.
## Cutover runbook
Numbered steps.
## Verified
What was checked and what remains.
</output_format>
