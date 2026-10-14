---
schema: 1
id: clean-up-hacked-wordpress-site
kind: prompt
title: Clean up a hacked WordPress site
description: Cleans a compromised WordPress site step by step, finding injected code, rogue admins and backdoors, restoring from trusted sources, rotating secrets and closing the way in.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [security-engineer, fullstack-engineer, devops-engineer]
requires: [none]
inputs: [text, logs, file]
output: [checklist, plan, explanation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hacked-site, malware-cleanup, backdoor, wp-cli, blocklist-removal]
stack: [wordpress, php]
pairs_with:
  prompts: [harden-wordpress-site, hunt-for-web-shells, analyze-web-attack-logs, respond-to-leaked-secret]
args:
  - name: symptoms
    description: What you see - spam redirects, Japanese keyword pages, a browser or search engine warning, unknown admin users, a host suspension notice - and since when.
    type: text
    required: true
  - name: hosting
    description: Hosting type (shared, VPS, managed WordPress), what access you have (SSH, WP-CLI, SFTP, database), backups available and how old.
    type: text
    required: true
  - name: findings
    description: Optional output already gathered, such as WP-CLI checksum results, a file list, suspicious code snippets or access log lines.
    type: text
output_contract:
  format: markdown
  sections: [Triage, Preserve first, Find what changed, Clean, Rotate everything, Find the way in, Recover reputation, Prevent a repeat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hacked WordPress sites are usually reinfected within days because the cleanup removes the visible symptom and leaves the backdoor, the rogue administrator or the vulnerable plugin. Infections hide in predictable places: PHP files under `wp-content/uploads` (where none should exist), `wp-content/mu-plugins`, modified core files, nulled or abandoned plugins and themes, extra code at the top of `wp-config.php` or `index.php`, `.htaccess` redirect rules that only trigger for search engine visitors, injected `<script>` in `wp_posts` or `wp_options` (`siteurl`, `home`, widget text), rogue users or capabilities in `wp_users` and `wp_usermeta`, and scheduled events in WP-Cron or the server crontab. WP-CLI's `wp core verify-checksums` and `wp plugin verify-checksums --all` find modified core and repository plugins quickly; premium plugins must be reinstalled from the vendor. On shared hosting, other sites in the same account are often infected too. A clean that skips rotating database passwords, salts and every admin password leaves the attacker able to walk back in.
</context>

<task>
Guide the cleanup of this site, one phase at a time, adapting to what the user reports.

<symptoms>
{{symptoms}}
</symptoms>

<hosting>
{{hosting}}
</hosting>
{{#findings}}

<findings>
{{findings}}
</findings>
{{/findings}}

1. Triage: confirm it is a compromise rather than a plugin bug or expired domain, judge whether customer or payment data could be involved (WooCommerce, forms, user accounts), and say who must be told if so.
2. Preserve first: a full copy of files and a database dump of the hacked state, kept off the server, plus access and error logs before they rotate. Put the site in maintenance mode if it is serving malware or redirects.
3. Find what changed: give read-only commands (WP-CLI checksum checks, `wp user list --role=administrator`, `wp cron event list`, `find` for PHP in uploads and recently modified files, searches for `eval(`, `base64_decode(`, `gzinflate(`, `str_rot13(`, `assert(` and long obfuscated lines, `.htaccess` review, database searches for `<script` and unknown domains in posts and options). Explain how to read results and which hits are normal.
4. Clean: replace core, plugins and themes with fresh copies from official sources rather than editing infected files; delete nulled and unused plugins and themes; remove rogue users after reassigning content; remove injected database content; remove unknown cron entries. If the infection is widespread and a clean backup from before the compromise exists, compare restoring that backup and then patching against cleaning in place.
5. Rotate everything: all WordPress user passwords (force for admins), database password and `wp-config.php` salts, hosting panel, SFTP and SSH credentials, API keys stored in options or plugins, and email accounts on the same host.
6. Find the way in: outdated plugin with a known flaw, reused admin password, stolen hosting credentials, or another site on the account; use access logs (POSTs to plugin endpoints, `xmlrpc.php`, `wp-login.php`, requests to the first malicious file) to support it.
7. Recover reputation: request reviews in search engine webmaster consoles and with any blocklist that flagged the site, once it is clean.
8. Prevent a repeat: updates, fewer plugins, admin MFA, file editing disabled, backups off-site, and point to the WordPress hardening entry.
</task>

<constraints>
- Read-only commands until the user has a backup of the hacked state. Mark every deleting or overwriting command and ask the user to confirm it.
- Never tell the user to download plugins or themes from anywhere but the official directory or the vendor.
- Do not claim the site is clean until the checks are rerun and the entry point is found or the site rebuilt.
- If personal or payment data may have been exposed, say that notification duties may apply depending on the country and that legal advice is needed.
{{> output/uncertainty}}
</constraints>

<output_format>
Use the eight sections in order. Under each, give numbered steps and fenced `bash` or `sql` blocks for commands. Mark state-changing commands with "(changes the site, confirm first)". End with a short list of what the user should send back next.
</output_format>
