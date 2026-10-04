---
schema: 1
id: build-wordpress-plugin
kind: prompt
title: Build a WordPress plugin
description: Builds a small WordPress plugin for a stated feature with hooks, an optional settings page, sanitising and escaping, nonces, capability checks and clean uninstall.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer]
stack: [wordpress]
requires: [repo-read, file-write, shell]
inputs: [repo, spec, text]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plugin-development, settings-api, nonces, output-escaping, uninstall-cleanup]
pairs_with:
  personas: [wordpress-developer]
  prompts: [review-pr-for-security, harden-web-app-config]
args:
  - name: feature
    description: What the plugin should do and for whom, for example "add a reading-time estimate above posts, with the words-per-minute rate editable by admins".
    type: text
    required: true
  - name: wp_context
    description: The site's theme, relevant plugins, WordPress and PHP versions, multisite or not, and any coding standard to follow. Leave empty to detect what you can from the repo.
    type: text
  - name: admin_ui
    description: Whether the plugin gets a settings page in wp-admin. When false, configuration is through filters or constants only.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Design, Files, Security review, Verification, Install and use]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small WordPress plugins usually fail in the same ways: form handlers with no nonce or capability check, request data saved without sanitising and printed without escaping, custom SQL without `prepare`, REST routes with no `permission_callback`, unprefixed function names that collide with another plugin, scripts loaded on every page of the site, heavy work in the activation hook, large options autoloaded on every request, and an uninstall that leaves tables, options and scheduled events behind. A good plugin does one job, stays out of other code's way and cleans up after itself.
</context>

<task>
Build a WordPress plugin for this feature:

<feature>
{{feature}}
</feature>

{{#wp_context}}
Site context: {{wp_context}}
{{/wp_context}}
Settings page in wp-admin: {{admin_ui}}

1. Inspect the repo: is there an existing plugin folder to extend, the minimum WordPress and PHP versions, a PHPCS or coding-standards configuration, and a local WordPress environment or test suite (wp-env, the WordPress PHPUnit test library, WP-CLI against a local site). If the feature leaves open who may use it, where data is stored or where output appears, ask and stop before writing code.
2. Design before coding: the hooks you will use, where data lives (options for settings, post meta or a custom post type for content, and a custom table only when queries truly need it, created with `dbDelta` and a stored schema version), the capability required for each action, and where any output appears.
3. Scaffold the plugin: a main file with a complete plugin header (name, description, version, minimum WordPress and PHP versions, text domain, licence), `defined( 'ABSPATH' ) || exit;` at the top of every PHP file, one unique prefix or PHP namespace for every function, class, option, hook, handle and meta key, light activation and deactivation hooks (deactivation unschedules cron events), and an `uninstall.php` guarded by `WP_UNINSTALL_PLUGIN` that removes only this plugin's options, meta, tables, transients and scheduled events, per site on multisite.
4. If the settings page is enabled, build it with the Settings API: `register_setting` with a `sanitize_callback`, sections and fields, a page under Settings protected by `manage_options` (or a narrower capability the feature calls for), escaped field output, and helpful defaults. If it is disabled, expose configuration through documented filters and constants, and add no admin pages.
5. Apply the security checklist to every entry point (form handlers, AJAX, REST routes, shortcodes, blocks and cron):
   - sanitise and validate every input with the function that fits its type;
   - escape every output as late as possible for its context (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post` or an explicit allow-list);
   - verify a nonce on every state-changing request and check `current_user_can`;
   - use `$wpdb->prepare` for any custom SQL;
   - give each REST route a real `permission_callback` and argument validation;
   - redirect with `wp_safe_redirect`;
   - never include files or call functions chosen by request data.
6. Keep it light: enqueue scripts and styles only on the screens or pages that use them, with version strings; store large options with autoload off; cache expensive results in transients; and run scheduled work with WP-Cron, unscheduled on deactivation.
7. Make strings translatable with the plugin's text domain.
8. Verify: run `php -l` on every file, PHPCS with the WordPress standard if it is installed, and the tests you wrote if a WordPress test environment exists. Tests should cover the sanitise callback, refusal for a user without the capability, refusal for a bad nonce, and uninstall cleanup. If no environment exists, say so and give step-by-step manual checks instead.
</task>

<constraints>
- Never modify WordPress core, the theme or other plugins. If the feature seems to need that, explain why and propose a hook-based alternative.
- No calls to external services, tracking or telemetry unless the feature explicitly asks for them; if it does, document what is sent.
- Ask before adding Composer or npm dependencies. Do not bundle minified third-party code without its source and licence.
- Use a GPL-compatible licence header.
- Run commands only against a local or development site, never production.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Hooks, data storage, capabilities and where output appears, in a few bullets.
## Files
One line per file and what it does.
## Security review
Table: entry point, input sanitising, output escaping, nonce, capability. No blank cells; write "n/a" with a reason.
## Verification
Each command or test run and its real result, or the manual checks if no environment was available.
## Install and use
Numbered steps for the site owner in plain language, including how to remove the plugin cleanly.
</output_format>
