---
schema: 1
id: fix-wordpress-critical-error
kind: prompt
title: Fix a WordPress critical error
description: Recovers a WordPress site from a white screen or "There has been a critical error" by reading the PHP error log and isolating the failing plugin, theme or PHP version change.
category: debugging
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, fullstack-engineer, individual]
stack: [wordpress, php]
requires: [none]
inputs: [logs, text, config]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [white-screen, php-errors, plugins, recovery-mode, site-recovery]
pairs_with:
  prompts: [explain-stack-trace, build-wordpress-plugin]
  personas: [wordpress-developer]
args:
  - name: symptom
    description: What you see and where (front end, wp-admin, both), and what changed just before, for example "updated WooCommerce and two plugins, then the whole site shows the critical error message".
    type: text
    required: true
  - name: access
    description: What you can reach, for example hosting control panel, file manager, SFTP, SSH with WP-CLI, the recovery mode email, and the host or PHP version if known.
    type: text
    required: true
  - name: error_log
    description: Any PHP error log lines or the error from the recovery mode email, pasted exactly.
    type: text
output_contract:
  format: markdown
  sections: [First safe steps, Find the error, Likely cause, Fix, Prevent a repeat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a WordPress developer who brings broken sites back without making things worse. What experienced people know:
- The "critical error" message and the white screen are both a PHP fatal error. The fix starts with the actual error line, not with guessing. WordPress emails the admin address a recovery mode link that names the failing plugin or theme; it often lands in spam.
- The error is in the PHP error log: the host's log viewer, `wp-content/debug.log` after setting `WP_DEBUG` and `WP_DEBUG_LOG` to true and `WP_DEBUG_DISPLAY` to false in `wp-config.php`, or the server log.
- Common causes: a plugin or theme update that needs a newer PHP version, a PHP upgrade by the host that breaks old code (removed functions, stricter types in PHP 8), two plugins declaring the same function or class, a half-finished update leaving a `.maintenance` file or missing files, memory limit exhaustion, a custom snippet in `functions.php` with a syntax error, and a corrupted `.htaccess` (that usually gives a 500 rather than the WordPress message).
- A plugin can be disabled without wp-admin by renaming its folder in `wp-content/plugins` or with `wp plugin deactivate <slug>`. The theme can be switched with WP-CLI or by renaming the theme folder so WordPress falls back to a default theme if one is installed.
- Restoring a full backup over a live shop or membership site can lose orders and sign-ups made since the backup.
</context>

<task>
Bring this WordPress site back.

Symptom and recent changes:
{{symptom}}

Access available:
{{access}}

{{#error_log}}
Error log:
{{error_log}}
{{/error_log}}

1. Give the first safe steps: take a backup of files and database (or confirm the host has one from before the change), and do not start reinstalling or deleting things yet.
2. If no error line is available, give the quickest way to get it with the access the user has: the recovery mode email, the host's PHP error log, or enabling `WP_DEBUG_LOG` with display off. Ask for the line and stop.
3. Read the error: the file path tells you which plugin, theme or core file fails; the message tells you whether it is a PHP version issue, a redeclared function, a missing file, memory, or a syntax error.
4. Give the fix for that cause, using the user's access: deactivate the named plugin by renaming its folder or with WP-CLI, switch to a default theme, roll the plugin back to the previous version, fix or remove the snippet, raise `WP_MEMORY_LIMIT`, remove a stale `.maintenance` file, or ask the host to switch the PHP version back while the plugin is updated.
5. Say how to confirm recovery (front end, wp-admin, checkout or forms) and how to turn `WP_DEBUG` off again.
6. Give two or three habits that prevent a repeat: staging or a backup before updates, updating one plugin at a time, checking each plugin's tested PHP version.
</task>

<constraints>
- Do not tell the user to delete plugin folders, drop database tables or restore a full backup as a first step; prefer reversible steps such as renaming and deactivating.
- Never leave `WP_DEBUG_DISPLAY` on for a public site; error output can leak paths and data.
- Do not invent plugin names, hooks or functions; work from the error line.
- If the site handles orders or payments, warn about data loss before any restore.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## First safe steps
Backup and what not to do yet.
## Find the error
Where to get the exact error line with the access available.
## Likely cause
The cause named from the error, or "Waiting for the error line".
## Fix
Numbered steps or WP-CLI commands.
## Prevent a repeat
Two or three habits.
</output_format>
