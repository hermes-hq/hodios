---
schema: 1
id: set-up-unity-project-in-git
kind: prompt
title: Set up a Unity project in git
description: Sets up or repairs a Unity project in git with the right ignore and attributes files, text serialization, visible meta files, LFS for binary assets, Smart Merge for scenes and file locking.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [game-developer, software-engineer, tech-lead]
stack: [git, unity]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [unityyamlmerge, meta-files, file-locking, game-assets, scene-conflicts]
pairs_with:
  prompts: [set-up-git-lfs, write-gitignore-file, fix-line-ending-churn, unity-csharp-rules]
args:
  - name: project
    description: Unity version, team size and roles (programmers, artists, designers), the git host, whether the project is already in git, and current problems (huge repo, broken references, scene conflicts).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Files, Merge tool setup, Cleanup, Team guide, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unity projects break in git in specific ways. The `Library`, `Temp`, `Obj`, `Logs` and `UserSettings` folders are generated caches that must never be committed. Every asset has a `.meta` file holding its GUID; if meta files are missing, ignored or not committed together with their asset, references across the project break silently and show up as missing scripts or pink materials on someone else's machine. Asset serialization must be "Force Text" and version control mode "Visible Meta Files" so scenes and prefabs diff as YAML. Even as text, scenes and prefabs merge badly with git's default line merge; Unity ships UnityYAMLMerge (Smart Merge), which can be registered as a merge driver or merge tool. Large binaries (textures, audio, models, video) belong in Git LFS, configured before they are committed, and the host's LFS storage and bandwidth limits matter for teams with many artists. For files that cannot merge at all, including big scenes edited by designers, LFS file locking (lockable attribute plus `git lfs lock`) prevents two people losing a day's work. Restructuring scenes into smaller prefabs reduces conflicts more than any tool.

<project>
{{project}}
</project>
</context>

<task>
1. Inspect the repository read-only: the Unity version (`ProjectSettings/ProjectVersion.txt`), the editor settings for serialization and meta files (`ProjectSettings/EditorSettings.asset`), the current `.gitignore` and `.gitattributes`, LFS status, whether generated folders or orphaned or missing meta files are tracked, and the largest files in history.
2. Write or fix `.gitignore` for Unity at the project root (adjusting paths if the Unity project lives in a subfolder), keeping meta files tracked.
3. Write `.gitattributes`: line-ending rules, LFS patterns for the binary asset types actually present, `lockable` on the files that cannot merge, and the merge driver attribute for `.unity`, `.prefab` and `.asset` files.
4. Give the per-machine setup to register UnityYAMLMerge as the merge driver or merge tool, with the path to the tool for each OS stated as typical locations to verify in the installed editor.
5. If generated folders were committed, remove them from the index (`git rm -r --cached`) without deleting them from disk, and show the change. If large binaries are already in history, explain the choice between leaving history and migrating with `git lfs migrate`, which rewrites history and needs the whole team's coordination; do not run it without confirmation.
6. Write a short team guide: commit asset and meta together, lock a scene before editing it and unlock after pushing, pull before opening Unity, split big scenes into prefabs, and what to do on a scene conflict.
7. Report what you changed and verified (for example, `git status` clean after reimport, `git lfs ls-files` shows the expected files, `git check-attr` on a sample scene).
</task>

<constraints>
- Never delete files from disk; untrack with `--cached` only.
- Never rewrite history or force-push without explicit confirmation and a team plan.
- Do not change Unity editor settings files by hand unless the user agrees; tell them which setting to change in the editor.
- State tool paths and version-specific details as things to verify, not fact.
</constraints>

<output_format>
## Findings
What is wrong or missing now.
## Files
The `.gitignore` and `.gitattributes` contents or diffs.
## Merge tool setup
Per-OS steps.
## Cleanup
Untracking and history options.
## Team guide
Short rules.
## Verified
Checks run and results.
</output_format>
