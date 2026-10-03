# Hodios taxonomy (vocab 1.1.0)

How Hodios organises entries so the library can grow from dozens to millions without breaking a link, an install or a contributor's mental model. This file explains the rules. The data lives in [`vocab/`](vocab/), and the validator enforces it (rules PS050–PS059, §5.4).

Hodios is a general-purpose library. It covers software engineering, and it also covers studying, content creation, marketing, research, design, the arts, careers, money, legal paperwork, health, cooking, travel, family, productivity, games and anything else people use AI for.

## 0. The model on one screen

```
entry = kind  +  ONE place (domain → category [→ subcategory])  +  many facets
        │          │                                                │
        │          └ drives the folder path. Never in an id or URL. └ controlled vocabularies, used for
        └ the file name: prompt.md, persona.md, …                     filtering, ranking and "For you"
```

- **Kind** says what sort of thing the entry is: prompt, persona, workflow, rule or style (§1).
- **Domain → category** is the single primary axis: the field of activity, then the job inside it. It decides the folder: `library/<domain>/<category>/<id>/<kind>.md`. The entry declares only its `category`. The domain is computed from `vocab/category.yml`, so moving a category to another domain never touches an entry file (§2).
- **Facets** are everything else, each one a controlled vocabulary with synonyms: stage, role, stack, subject, works_in, inputs, output, risk, advice_risk, model tier, level, language and tags (§3).
- **The id** is a flat, never-reused slug. It contains no domain, category or kind, so the taxonomy can change under it freely (§4).
- **Packs** are curated, many-to-many install bundles. They are not part of the taxonomy.

The rule behind every choice: **put meaning that changes into data, and keep it out of identifiers.** Paths may move when the taxonomy changes, but ids and URLs never do.

## 1. Kinds

| kind | It is… | Decision test | Typical exports |
|---|---|---|---|
| `prompt` | A task you invoke to get **one deliverable now**, with typed inputs | "Would someone run this by name, give it material, and expect a finished thing back?" | Skill, slash command, `.prompt.md`, Gemini TOML, MCP prompt, paste |
| `persona` | **Who** the assistant is across many tasks: a stance, process and standards, with no task and no output format | "Could you hand it ten different tasks and it still makes sense?" | Subagent, `.agent.md`, output style, custom GPT / project instructions, Hermes role |
| `workflow` | **Two or more ordered steps** with a checkpoint between them; each step is prompt-like | "Does it need a human or a check to approve step N before step N+1?" | Skill with steps, Windsurf/Antigravity workflow, Hermes Track |
| `rule` | **Standing instructions** that apply to whatever the assistant does in a scope; never invoked to produce something | "Would you paste it into AGENTS.md, custom instructions or `.cursor/rules` and never call it by name?" | AGENTS.md / CLAUDE.md / GEMINI.md section, `.mdc`, `.instructions.md`, custom instructions |
| `style` | **How** output is shaped, independent of the task: length, tone, format, level. Exactly five levels | "Does it change *how* any answer looks and not *what* it does?" | Hermes style, output style, appended text |
| `partial` | A **fragment** that other entries include. Never shown or exported alone | "Is it useless on its own and shared by several entries?" | Never exported; inlined at compile time |

**Decision order:** test for partial, then rule, then style, then persona, then workflow. Anything left is a prompt. Most entries are prompts.

**Borderline cases, settled:**

- "Act as a senior security reviewer and review this diff" is two entries: the persona `security-auditor` and the prompt `review-pr-for-security`, linked with `pairs_with`. Personas never contain a task.
- A rule that the assistant should load only when relevant, like Cursor's "agent requested" mode, is still a `rule`, with `invocation: model` and a description that says when it applies.
- A checklist the user reads is a prompt whose `output` is `checklist`. A checklist the assistant must always follow is a rule.
- A template the user fills in, like an ADR, is a prompt with an `output_contract`. A shared fragment inside several prompts is a partial.
- A "skill", "agent", "chat mode", "command", "instruction" or "GPT" is an **export format**, not a kind. The mapping lives in `vocab/targets.yml`. This is deliberate: awesome-copilot renamed its top-level folders three times as vendors renamed formats (chatmodes became agents, prompts became skills, collections became plugins; see the commit history linked in §10). Our kinds are defined by behaviour, so a vendor rename changes one adapter and moves no files.

**No more kinds in v1.** Candidates that were considered and rejected:

- *knowledge/reference*: a rule with `invocation: model`, or `references/` inside an entry.
- *template*: a prompt with an output contract.
- *chain*: a workflow.
- *agent*: a persona plus `tools`.
- *pack*: an install unit, not an entry.

A new kind is a schema MAJOR change (§5.3), because every adapter and UI branches on kind.

## 2. Primary axis: domain → category

### 2.1 What it is

**Domain** is the field of human activity: `software-engineering`, `education`, `content-creation`, `finance`, … There are 23 in v1 (§7.1). **Category** is the job to be done inside that field: `debugging`, `exam-prep`, `video`, `budgeting`, … There are 137 live categories in vocab 1.1 (§7.1).

- Every entry has exactly one category. The domain follows from the category. An entry never declares a domain.
- Category ids are **globally unique across domains**, so `cat:testing` never needs a domain prefix.
- Domain ids and live category ids are disjoint, and a domain synonym may not equal a live category id (PS050). That keeps `testing`, `domain:education` and `cat:tutoring` unambiguous in free-text search.
- Path: `library/<domain>/<category>/<id>/<kind>.md`, or `library/<domain>/<category>/<subcategory>/<id>/<kind>.md` once a category is split (§2.4).
- URLs and ids **never** contain the domain or the category. Entry permalinks are `/prompts/<id>`. The domain and category appear only in browse URLs (`/prompts/d/<domain>`, `/prompts/c/<category>`), and those redirect when a value is retired.

### 2.2 Why this axis, and why it is stable

The primary axis should be the property that changes least over an entry's life and that people use first when browsing.

- **Jobs and fields outlive tools.** SWEBOK went from 15 to 18 knowledge areas between 2014 and 2024. It added Architecture, Operations and Security and removed nothing. Activities like "debugging", "budgeting", "exam preparation" and "writing a cover letter" predate every AI product and will outlast them. Tool names, by contrast, churned three times in one year in awesome-copilot.
- **Language, framework, tool and platform are bad primary axes.** Most entries are agnostic: a code review prompt works for any language, and a cover-letter prompt for any job. So a language folder forces either duplication or a junk "general" folder. These belong in the multi-valued `stack` and `subject` facets.
- **Role is many-to-many.** A "write a PRD" prompt serves product managers, founders and tech leads. SFIA and O*NET both model work as skills and tasks first and treat job titles as labels on top. So `role` is a facet (§3.3).
- **Kind is already the file name.** A kind folder (`prompts/`, `agents/`) would split a single job across folders. That is the awesome-copilot shape, and it does not scale past a few hundred entries per folder.
- **Two levels are needed because the scope is general-purpose.** One flat level of 130+ categories is unbrowsable, and folding everything into ~30 broad categories makes "testing" and "studying" siblings. The Hugging Face Hub solved the same problem the same way: about 57 tasks, each grouped under one of 7 modalities. The domain level is our modality.
- **The domain is computed, not authored.** Re-homing a category to another domain is a one-line vocab change plus a `git mv`. No entry file, id or URL changes.

**Tie-break when an entry fits two categories:** choose the category whose **outcome the user will judge success by**. Then apply these in order:

1. Inside software-engineering: security > accessibility > performance > a specific activity > code-review > a generic one.
2. Across domains: the domain of the **material** wins over the domain of the **audience**. A prompt that summarises a research paper goes in `literature-review`, even when a student uses it. The student finds it through `role: student`.
3. Personas go in their discipline's category. Workflows go in the category of their end goal. Rules go in `conventions` or `assistant-setup`, unless they have a single subject (commit rules go in `git`).

`hodios new` prints this rule and the target category's `scope_note`.

### 2.3 Size limits

GitHub documents a cap of 3,000 entries per directory and truncates its web view at 1,000 files. A sparse checkout of one category must stay fast. Limits for `library/` in the core repo:

| Level | Soft limit (PS055 warning) | Hard limit (PS055 error) | What happens |
|---|---|---|---|
| Entries in one category folder (or one subcategory folder) | 600 | 1,000 | Split the category (§2.4) |
| Categories in one domain | 30 | 40 | Split the domain or retire weak categories |
| Domains | 30 | 50 | GOVERNANCE vote only |
| `other/unsorted` (holding area) | 40 | 50 | Graduate entries (§2.5) |

The core repo is capped at 20k entries overall (design §12.2). At 137 categories that is about 146 entries per category on average, so the 1,000 cap bites only on genuinely hot categories. The community registry has no folders, so these limits do not apply there. Category is only a facet there, and splits are still reflected through `subcategory`.

### 2.4 When a category outgrows its folder: split, sub-categorise, redirect

The usual answer is a **subcategory level**, not a new top-level category. Dewey's editors prefer "expansion" to "relocation" for the same reason: relocation breaks everyone's mental map.

1. **Prepare (any time, no moves).** `vocab/subcategory.yml` gains values with `parent: <category>`. Entries may set `subcategory:` immediately; while the parent is `layout: flat` it is only a filter. Hot categories get subcategories well before the limit, so the data is ready.
2. **Propose.** At the 600-entry warning, a vocab-owner opens a split RFC (§5.1). It is generated by `hodios vocab plan-split <category>` (planned), which shows each proposed subcategory with its entry count and lists the entries that have none.
3. **Flip the layout.** One PR sets `layout: nested` on the category and moves every entry under `library/<domain>/<category>/<subcategory>/<id>/` with `git mv`. The tool generates this PR, and it is merged when no open PR touches the folder. PS051 then requires a subcategory on every entry in that category.
4. **Nothing user-facing changes.** Ids and entry URLs are unchanged. `cat:testing` still matches everything under it, and `sub:testing-e2e` narrows. `/prompts/c/testing` becomes a hub page that links to `/prompts/c/testing/testing-e2e`.

**Promoting a subcategory to a category** (when it is really a different job) follows the merge/move procedure in §5.5. The old `sub:` value gets `deprecated_by` the new category and keeps resolving.

**Splitting a domain** works the same way, one level up. New domains are added, and categories are re-homed by editing their `domain:` field. Every entry stays where its category goes.

### 2.5 The holding area: `other/unsorted`

New fields of use will appear that no category fits. Hodios gives them a holding area that **cannot turn into a dumping ground**. fabric's experience shows the failure: its retrofitted tag file still carries `OTHER`, together with case and spelling drift (`VISUALIZE` next to `VISUALIZATION`, `SECURITY` next to `security`).

- Path: `library/other/unsorted/<id>/`. The category is `unsorted`.
- Every entry here **must** set `proposed_category: <slug>`, its best guess at a future category (PS054). If that slug is already a live category, the entry must move there (PS054 error).
- **Cap:** 50 entries in the core repo (warning at 40). A full holding area blocks new additions there until something graduates.
- **Graduation rule:** when 5 or more entries share a `proposed_category`, PS054 warns, and the vocab owners must, within the next vocab release, either open an RFC to add that category or re-home the entries into existing categories. Holding is temporary: the freshness workflow (planned) will flag any entry that has sat in `unsorted` for more than 180 days.
- Nothing in `unsorted` can be curated-tier, and it is excluded from default browse shelves. It is still searchable.

## 3. Facets

Every facet is a controlled vocabulary in `vocab/` (or a schema enum), listed in the registry [`vocab/facets.yml`](vocab/facets.yml) with its query key, cardinality, UI placement and whether it feeds relevance. Common rules:

- **Synonyms are normalised, never stored.** `hodios validate --fix` rewrites `k8s` → `kubernetes` in source. Search expands synonyms at query time. LCSH carries 362,646 references from unused terms to used headings, more references than headings, which shows how much a library depends on its "use for" lists.
- **Values are never deleted.** A retired value gets `deprecated_by: <successor>`. Queries and stored data using it resolve to the successor, and lint warns on it in source. This is schema.org's `supersededBy` plus attic idea.
- **Empty means "any".** An empty `stack`, `subject` or `role` means agnostic, never "unknown". Over-tagging is worse than under-tagging, because it pollutes relevance.
- "Closed" means only a vocab-change PR adds values (§5). "Open, curated" means anyone can propose a value with a lightweight PR. Values are never invented inline in entries.

| Facet (field) | Closed / open | Cardinality | Synonyms and aliases | Notes |
|---|---|---|---|---|
| kind (`kind`) | closed (schema) | exactly 1 | — | the file name |
| domain (computed) | closed | exactly 1 | `vocab/domain.yml` synonyms | from category |
| category (`category`) | closed | exactly 1 | synonyms + `deprecated_by` | the second path level |
| subcategory (`subcategory`) | closed, per parent | 0–1 | synonyms + `deprecated_by` | path level only when the parent is nested |
| stage (`stage`) | closed | 0–3 (workflows exempt) | synonyms (`draft` → build) | domain-neutral; maps onto Track phases |
| role (`role`) | closed, curated | 0–4 | synonyms (`developer`, `youtuber`, `lawyer`) | audience, not the persona the AI plays |
| stack (`stack`) | open, curated | 0–6 | synonyms + `implies` hierarchy | technology, platform or app |
| subject (`subject`) | open, curated | 0–4 | synonyms (ISO 639-1 codes for languages) + `implies` | non-technical subject matter |
| works_in (computed) | closed | 0–n | — | from `requires` + `vocab/targets.yml` |
| requires (`requires`) | closed + `mcp:<server>` | 0–6 | — | capabilities the entry needs |
| inputs (`inputs`) | closed, curated | 0–4 | synonyms | shape of what the user supplies |
| output (`output`) | closed, curated | 0–4 | synonyms | shape of what comes back |
| risk (`risk`) | closed (schema) | 0–1 | — | what the agent may do |
| advice_risk (`advice_risk`) | closed | 0–4 | synonyms | professional-advice areas (§3.9) |
| model_tier / reasoning | closed (schema) | 0–1 each | — | never model names |
| level (`level`) | closed (schema) | 0–1 | `advanced` → expert | expertise the user needs to judge the output |
| effort / interaction / invocation | closed (schema) | 0–1 each | — | |
| lang (`lang`) | open (BCP 47) | 0–1, default `en` | — | language of the entry's text |
| tags (`tags`) | open, normalised | 0–8 | `vocab/tags.yml` synonyms | folksonomy; promoted when used on 25+ entries |
| proposed_category | free slug | required only in `unsorted` | — | §2.5 |

### 3.1 Stage (activity / lifecycle)

`discover · plan · design · build · verify · review · ship · operate · maintain · learn`. The set is closed because each value is a Hermes Track phase. The wording is domain-neutral: "build" means write the code, draft the essay or cook the meal, and "ship" means deploy, publish or send. Synonyms carry the domain words (`draft`, `publish`, `practise`, `fact-check`). Use at most 3 values per entry (workflows may list every phase they span); most prompts need 1.

### 3.2 Inputs and output

These are shapes, not topics: `diff`, `dataset`, `transcript`, `resume`, `image` in; `report`, `plan`, `script`, `post`, `quiz`, `prompt`, `rewrite` out. Both are closed so filters stay meaningful at a million entries. `output` also selects UI treatments, such as rendering a `diff` or exporting a `table`.

### 3.3 Role (audience persona)

There are 54 roles in 7 picker groups: engineering, data and research, product and design, content and marketing, business, learning, and everyday life. Each role carries an optional O*NET-SOC code (`onet`) for crosswalks. The set is closed, because roles are what people pick on Hermes onboarding, so the list must stay short and familiar. Use up to 4 per entry and leave it empty if anyone could use the entry. **Role ≠ persona:** `role: [student]` means "for students", while `kind: persona` with id `socratic-tutor` means "the AI acts as a tutor". SFIA's lesson applies: model the skills (our categories) and the level (`level`) separately, and treat titles as hints.

### 3.4 Stack (technology, platform, app): open, normalised, hierarchical

There are 116 values in v1, typed `language | framework | library | runtime | platform | database | cloud | tool | app`. That covers code (`react`, `django`) and the apps people work in (`excel`, `figma`, `notion`, `youtube`, `midjourney`).

- **Synonyms** absorb spelling: `k8s`, `golang`, `c#`, `nodejs`, `twitter`.
- **`implies`** builds a hierarchy: `nextjs` → `react` → `javascript`. A query for `stack:javascript` also matches entries tagged `nextjs`. Entries list only the most specific value, and PS058 warns about redundant parents.
- **`detect`** lists on-device detection hints (manifest files and `ecosystem:package` dependencies) that Hermes uses to recognise a project's stack (§8).
- Open: §5.2 describes the lightweight process for adding values. The registry tier normalises unknown values through the synonym table. A value that is still unknown is stored as a tag until a vocab PR adds it, as Stack Overflow's synonym system does for tags.

### 3.5 Subject (non-technical subject matter)

`mathematics`, `biology`, `history`, `economics`, `law`, `healthcare`, `ecommerce`, and human languages (`spanish` with synonym `es`). It is the non-technical twin of `stack`, with the same rules: open, curated, synonyms and `implies` (`calculus` → `mathematics`), 0–4 per entry. Subject is what makes a language-learning or tutoring prompt findable and personalisable without creating a category per subject.

### 3.6 Target tools / compatibility (`works_in`, `requires`)

Compatibility is **computed, never authored**. `requires` (`none · repo-read · file-write · shell · web · git · mcp:<server>`) is crossed with the per-target capability table in `vocab/targets.yml` to produce `works_in` (claude-code, codex, copilot, cursor, gemini-cli, opencode, windsurf, antigravity, continue, plus `chat` for paste-into-any-assistant). A vendor change edits one row in `targets.yml` and recomputes `works_in` for the whole catalog, with no entry edits.

### 3.7 Model tier, reasoning, level, effort, interaction

These are closed schema enums; `vocab/facets.yml` holds their labels. **Model names never appear in entries.** `model_tier: small | mid | frontier` is mapped to concrete models in `evals/models.yml`, so a new model release changes one file. `level` is difficulty, meaning the expertise the user needs to judge the output (`beginner | intermediate | expert`). It applies to every kind, not only learning entries.

### 3.8 Risk (what the agent may do)

`read-only < edits-files < runs-commands < network < external`. `external` is new in vocab 1.0.0: effects outside the machine that are hard to undo, such as pushing, deploying, sending, posting or spending. The ordering is enforced against `requires` (PS056): `file-write` needs at least `edits-files`, `shell` at least `runs-commands`, and `web` at least `network`. CODEOWNERS adds the security team as a reviewer for anything above `read-only`.

### 3.9 Advice risk and sensitive domains

`advice_risk: medical | mental-health | legal | financial` records what a wrong answer could do **to a person**, which is a different axis from `risk`.

- Categories in the `finance`, `legal-admin` and `health-wellbeing` domains carry `advice_risk` in the vocab. Every entry in them **must** declare those values (PS052). Entries elsewhere declare them when they apply, for example a `resumes` prompt that touches salary negotiation does not, while a `career-growth` prompt about pension choices does.
- Any entry that declares a value **must include the matching guardrail partials** in its body (PS053):
  - every value → `{{> guardrails/professional-limits}}`: states its limits, never replaces a professional, and points to one when the stakes or specifics call for it.
  - `mental-health` → also `{{> guardrails/crisis-safety}}`: stop and point to emergency or crisis help on any sign of danger.
- These entries are never `invocation: model`, so a model never auto-loads health or legal guidance. Promotion to the curated tier needs a reviewer from the domain's CODEOWNERS group.

### 3.10 Language of the entry (`lang`)

The language of the entry's own text is a BCP 47 tag (`en`, `pt-BR`, `ja`) and defaults to `en`. It is separate from `subject: spanish`, which means the entry is *about* Spanish. Translations are separate entries with their own ids, linked by `translation_of: <id>` (planned for schema 1.x).

### 3.11 Tags (folksonomy, kept on a leash)

Tags are free kebab-case slugs: at most 8 per entry, at most 32 characters each, normalised through `vocab/tags.yml`. They catch long-tail meaning (`flaky-tests`, `owasp`, `star-method`).

- A tag that equals a value or synonym of a real facet (a category, stack, subject, role or stage) draws a PS057 warning: use the facet. This keeps facets authoritative and stops the fabric problem, where one tag field mixes activities (`EXTRACT`) with domains (`SECURITY`).
- A tag used on 25 or more entries is proposed for promotion into a facet value or a subcategory.
- npm keywords and GitHub topics show the ceiling of free tags without normalisation: discovery with no synonyms (npm) or with 20 lowercase topics and a separate curated layer (GitHub explore). Tags here are only ever the third signal, after category and facets.

## 4. IDs: never break

### 4.1 Grammar (frozen in schema v1)

`^(@[a-z0-9](-?[a-z0-9]){0,38}/)?[a-z0-9]+(-[a-z0-9]+)*$`: a name of at most 64 characters, with an optional `@owner/` scope that follows GitHub login rules.

- Unscoped ids (`review-pull-request`) belong to the core repo (curated and verified tiers). This keeps the namespace small and reviewed, so squatting cannot happen.
- Scoped ids (`@acme/review-terraform-plan`) belong to the community registry. The owner is the GitHub account or org that published the entry.
- Hermes user items are `user/<id>`: local only, never published.
- An id must not contain its domain, category, kind, status, author, `claude` or `anthropic`, because any of those can change and the id cannot.
- Naming grammar:
  - prompt = verb-object (`write-cover-letter`)
  - persona = role noun (`socratic-tutor`)
  - workflow = goal + `-track`
  - rule = subject + `-rules`
  - style = adjective (`concise`)
- Full reference: `[@scope/]id[@major]`, for example `review-pull-request@1`.

### 4.2 `ids.lock`

`ids.lock` is a sorted, append-only text file of every released unscoped id:

```
<id> <kind> <first-calver>
```

Sorting means parallel PRs insert in different places instead of all conflicting at the end of the file. CI fails on any removed or edited line, on any id reuse, and on any id that leaves `library/` without an alias successor (PS003, PS004). Scoped ids get the same guarantees from a `UNIQUE` constraint on the registry's D1 table. Retired ids stay in both forever.

### 4.3 Lifecycle operations

| Operation | What the author does | What resolves afterwards |
|---|---|---|
| **Rename** | New folder and id; old id added to `aliases:` | Old id → new id everywhere (301 on the site) |
| **Merge** A into B | Delete A's folder; add `A` to B's `aliases` | A → B |
| **Split** A into A + C | A keeps its id and the closer meaning; C is new | A → A (no alias to two targets, ever) |
| **Deprecate** | `status: deprecated`, `replaced_by: <id>`, `sunset: <calver>` | Still installable and resolvable; banner; hidden from browse after `sunset` |
| **Retire** with no successor | `status: deprecated`, no `replaced_by`; after `sunset` the folder may go only if the id has an alias successor, so in practice a deprecated stub remains | 410 page with the last description; CLI and MCP say "retired" |
| **Move category / domain** | Change `category:` and `git mv` | Nothing to resolve: ids and URLs contain neither |
| **Promote** `@owner/x` to core | New unscoped id; the registry records `@owner/x` as an alias | `@owner/x` → new id |
| **Owner renames on GitHub** | Nothing: the registry keys owners by numeric GitHub id, and the old login becomes a scope alias | `@old/x` → `@new/x` |

Aliases are globally unique across ids and other aliases (PS008), and they live in the entry's frontmatter. One generator turns them into the site `_redirects` and a Worker map, the CLI/MCP alias table (shipped in the catalog row `aliases[]`), the Hermes `library.db` alias index, and the Claude marketplace `renames` map.

### 4.4 Redirects per surface

- **Site:** `/prompts/<old>` returns 301 to `/prompts/<new>`, and retired ids return 410 with a pointer. `/prompts/c/<retired-category>` returns 301 to the `deprecated_by` target, and the same applies to `/prompts/d/<domain>`.
- **CLI:** `hodios get|install <old>` resolves, prints `renamed: <old> → <new>` on stderr, writes the new id to the project lockfile, and `hodios doctor` rewrites installed exports.
- **Hermes:** on sync, favourites, installs, Track definitions and pinned items that point at an alias are rewritten to the canonical id. One toast lists the renames.
- **MCP:** `get_prompt` accepts any alias and returns `resolved_from` so agents can update their references. Retired vocab values in query filters resolve the same way.

## 5. Governance of the vocabulary

### 5.1 Proposing a change

| Change | Who can propose | Approval | Version bump |
|---|---|---|---|
| Fix a label, description, scope note or example; add a synonym | anyone, PR | 1 vocab owner | PATCH |
| Add a value to an **open** facet (`stack`, `subject`, `tags`) | anyone, PR | 1 vocab owner; must cite 3+ existing or proposed entries | MINOR |
| Add a value to a **closed** facet (`stage`, `role`, `inputs`, `output`, `advice-risk`), add a subcategory, or graduate a holding-area category | RFC issue (template `vocab-change`) → PR | 2 maintainers after a 7-day comment window | MINOR |
| Add, rename, merge, split or move a **category** | RFC → PR | 2 maintainers after 7 days; the category CODEOWNERS group must not object | MINOR |
| Add or rename a **domain**, add a facet, change a facet's cardinality or meaning | RFC → GOVERNANCE vote | GOVERNANCE.md vote | MINOR when additive, MAJOR when narrowing |

Every vocab PR must:

1. pass PS050 (vocab integrity);
2. add a line to `changelog` in `vocab/facets.yml`;
3. bump `version` in the same file;
4. leave every existing entry valid, or ship the mechanical migration (`--fix` rewrites or `git mv`) in the same PR.

CODEOWNERS routes `vocab/**` to the vocab-owners team.

### 5.2 What makes a good new value

A new value needs evidence and a clean boundary:

- **Evidence:** at least 3 entries that would use it now, or 25 entries using it as a tag.
- **A boundary:** a scope note that says what is *not* in it.
- **No overlap:** no existing value or synonym covers it (`hodios vocab resolve <word>` shows what an existing word maps to).

The Hugging Face Hub states the norm for its task list: "you should rarely have to create a new task". Fine distinctions belong in tags and subcategories.

### 5.3 Versioning

`vocab/facets.yml` carries one `version` for the whole vocabulary (semver), and catalog manifests record which vocab version they were built with.

- **PATCH:** text-only changes and synonyms. Nothing can stop resolving.
- **MINOR:** values added, or retired with `deprecated_by`; categories moved between domains; layouts flipped. Old data still validates, with warnings.
- **MAJOR:** a facet removed, its meaning narrowed, or its cardinality reduced. This is expected to be extremely rare and requires a migration tool plus a release that accepts both.

Clients ignore unknown facets and values (the design's "ignore unknown fields" rule). An old Hermes on vocab 1.2 reading a 1.5 catalog shows new values by their raw slug until it updates.

### 5.4 Lint rules added by this taxonomy

| Rule | Severity | Checks |
|---|---|---|
| PS050 | error | Vocab integrity: duplicate values, synonym collisions (with a value or another synonym in the same vocab), `deprecated_by`/`parent`/`implies`/`domain` targets exist and are live, domain ids ∩ live category ids = ∅, domain synonyms ≠ live category ids. A unit test keeps `vocab/facets.yml` in sync with the schema enums and limits |
| PS051 | error / warning | Path = `library/<domain>/<category>/[<subcategory>/]<id>/`; the domain matches the category's domain; the subcategory's parent matches; nested categories require a subcategory. A legacy `library/<category>/<id>/` path is a **warning** during the 1.x migration window |
| PS052 | error | An entry in a category with `advice_risk` declares those values |
| PS053 | error | An entry with `advice_risk` includes the required guardrail partials; it is not `invocation: model` or `both` |
| PS054 | error / warning | Holding area: `proposed_category` is required there and only there, it is not a live category, there is a cap of 50 (warning at 40), and a graduation warning fires at 5 entries per proposed category |
| PS055 | error / warning | Folder sizes: more than 1,000 entries per category or subcategory folder is an error (warning at 600); more than 40 categories per domain is an error (warning at 30) |
| PS056 | error | `risk` is at least the floor implied by `requires` |
| PS057 | warning | A tag duplicates a value or synonym of a real facet (`category`, `stack`, `subject`, `role`, `stage`) |
| PS058 | warning | `stack` or `subject` lists a value together with something it implies |
| PS059 | warning | Cardinality above the `vocab/facets.yml` limit for `stage` (workflows exempt), `stack`, `requires`, `inputs`, `output`. New facets (`role`, `subject`, `advice_risk`) enforce their limits in the schema |

PS006 continues to check every faceted value against its vocab, including the new `role`, `subject`, `subcategory` and `advice-risk` vocabs. It warns on deprecated values and names the successor.

### 5.5 Splitting, merging, moving a category without breaking anyone

- **Split:** see §2.4. Subcategories are added first, the layout flips in one generated PR, and ids and URLs are unchanged.
- **Merge** A into B: B absorbs A's description; A gets `deprecated_by: B` and its synonyms move to B; entries move with `--fix` plus `git mv` in the same PR. `cat:A` keeps resolving and `/prompts/c/A` returns 301.
- **Rename** A to A′: this is a merge into a new value.
- **Move** a category to another domain: edit its `domain:` and `git mv` the folder. No entry edits.
- **Open PRs:** a moving PR waits until no open PR touches the folder (`gh pr list` plus a path check in the tool), or the bot rebases the open PRs. During the migration window, PS051 accepts the old path with a warning, so a PR written against the old layout still passes.

## 6. Search and browse

One query language and engine in `hodios-core` serves the CLI, the site, Hermes and MCP. These surfaces are still being built; the query keys below are fixed now so they never change. Values within one facet are OR'd, different facets are AND'd, and synonyms and `implies` are expanded.

```
flaky kind:prompt cat:testing stack:react works:codex stage:verify
cover letter domain:career-hr role:job-seeker level:beginner
practice conversation subject:es mode:interactive
```

| Facet | Query key | CLI | hermes-ide.com/prompts | Hermes app | MCP `search_prompts` |
|---|---|---|---|---|---|
| domain | `domain:` | `--domain` | top nav; `/prompts/d/<domain>` | sidebar root; "For you" shelf weight | `domain` |
| category | `cat:` | `--cat`, `hodios browse` tree | domain page sections; `/prompts/c/<cat>` | sidebar tree | `category` |
| subcategory | `sub:` | `--sub` | `/prompts/c/<cat>/<sub>` | tree leaf | `subcategory` |
| kind | `kind:` | `--kind` | chip row | segmented control | `kind` |
| stage | `stage:` | `--stage` | filter | Track phase boost | `stage` |
| role | `role:` | `--role` | "I am a…" filter | profile; relevance | `role` |
| stack | `stack:` | `--stack`, auto from cwd with `--here` | filter with typeahead | detected from project; relevance | `stack` |
| subject | `subject:` | `--subject` | filter | profile interests; relevance | `subject` |
| works_in | `works:` | `--works`, default = detected agents | "Works in" filter | detected agents; relevance | `works_in` |
| inputs / output | `in:` / `out:` | `--in` / `--out` | More filters | More filters; situational boost | `inputs` / `output` |
| risk / advice_risk | `risk:` / `advice:` | `--risk` / `--advice` | More filters, plus badges on cards | badges; confirm dialog for `external` | `risk` / `advice_risk` |
| model_tier, reasoning, level, effort, interaction | `model:` `reasoning:` `level:` `effort:` `mode:` | same flags | More filters | More filters | same names |
| lang | `lang:` | `--lang`, default from locale | filter; defaults to browser language plus `en` | app language | `lang` |
| tags | `tag:` | `--tag` | tag chips on entry pages | chips | `tags` |
| tier | `tier:` | `--tier` | curated + verified by default; community is a labelled group | same | `tier` |

**UI rule:** show 6 primary facets (domain, category, kind, works_in, stack or subject, role) and put the rest under "More filters". Facet counts come from the FTS index (facets compile to hidden FTS tokens), so they stay cheap at a million rows. `hodios vocab list <facet>` and MCP `list_facets` return the vocab with live counts, and `hodios vocab resolve <word>` explains a synonym.

## 7. The v1 vocabulary

The YAML files in `vocab/` are authoritative; this section is the readable index.

### 7.1 Domains (23)

| Domain | Categories |
|---|---|
| `software-engineering` | planning, product, architecture, implementation, code-review, debugging, testing, refactoring, migration, performance, security, accessibility, data, ai-ml, devops, incident, git, docs, writing, learning, conventions, localization, meta |
| `education` | studying, tutoring, exam-prep, teaching, course-design |
| `languages` | language-learning, conversation-practice, translation |
| `content-creation` | video, podcasting, social-media, newsletters, blogging, content-strategy |
| `marketing-sales` | copywriting, seo, advertising, email-marketing, sales, marketing-strategy |
| `product-management` | product-discovery, product-strategy, roadmapping, product-metrics, user-feedback, product-launch |
| `business` | business-strategy, entrepreneurship, operations, customer-support, fundraising |
| `data-analysis` | spreadsheets, data-exploration, statistics, data-visualization, reporting |
| `research-science` | literature-review, research-methods, scientific-writing, fact-checking, peer-review |
| `design` | ux-research, ui-design, design-systems, graphic-design, branding |
| `creative-arts` | fiction, poetry, screenwriting, music, image-generation, worldbuilding, visual-art, photography, life-writing |
| `writing-communication` | business-writing, editing, email, presentations, public-speaking, interpersonal-communication |
| `career-hr` | job-search, resumes, interview-prep, career-growth, hiring, people-management |
| `finance` ⚠ | budgeting, investing, taxes, accounting, financial-planning |
| `legal-admin` ⚠ | contracts, legal-correspondence, compliance, policies, paperwork, legal-practice |
| `health-wellbeing` ⚠ | fitness, nutrition, mental-health, medical-prep, clinical-practice |
| `home-cooking` | cooking, meal-planning, home-improvement, gardening, pet-care, vehicles |
| `travel` | trip-planning, travel-logistics, local-culture |
| `parenting-family` | parenting, kids-activities, relationships, family-logistics |
| `productivity` | task-management, note-taking, meetings, summarization, decision-making, brainstorming, habits, tech-help, digital-safety |
| `gaming-fun` | tabletop-rpg, video-games, trivia, puzzles, humor |
| `prompting` | prompt-engineering, assistant-setup, output-styles |
| `other` | unsorted (holding area, §2.5) |

⚠ = sensitive domain (§3.9). Each category's description, scope note, examples and synonyms are in [`vocab/category.yml`](vocab/category.yml). Retired category values `design`, `business` and `legal` resolve to `ui-design`, `business-strategy` and `contracts`.

### 7.2 Software-engineering categories (the 18 in use keep their ids)

Every category that content PRs already use (code-review, debugging, testing, refactoring, architecture, planning, product, migration, performance, security, devops, incident, data, git, docs, writing, learning, meta) keeps its id. These are new: `implementation` (writing new code had no home), `localization`, plus the earlier `accessibility`, `ai-ml` and `conventions`. `product`, `writing`, `learning` and `meta` are now scoped to software work (see their scope notes). Their general-purpose counterparts are `product-management`, `writing-communication`, `education` and `prompting`.

### 7.3 Facet values

- **stage (10):** discover, plan, design, build, verify, review, ship, operate, maintain, learn
- **role (54):** see `vocab/role.yml`. The groups are engineering (software-engineer … maintainer), data and research (data-analyst, data-scientist, business-analyst, financial-analyst, researcher), product and design (product-manager, project-manager, designer, ux-researcher, graphic-designer), content and marketing (content-creator, writer, editor, marketer, copywriter, artist), business (founder, executive, manager, sales-rep, support-agent, operations-manager, recruiter, consultant, legal-professional), learning (student, teacher, language-learner) and everyday (job-seeker, parent, home-cook, traveler, gamer, individual)
- **stack (116):** languages, runtimes, frameworks, databases, cloud, AI platforms, and apps and platforms (excel, google-sheets, figma, notion, youtube, linkedin, midjourney, anki, dnd-5e, …)
- **subject (43):** academic subjects, fields, and 16 human languages
- **inputs (22):** diff, file, repo, stack-trace, logs, config, schema, ticket, spec, dataset, document, notes, transcript, message, resume, job-posting, image, audio, url, topic, preferences, text
- **output (26):** diff, code, tests, config, commit-message, adr, diagram, report, checklist, plan, summary, table, questions, explanation, docs, article, outline, script, post, message, copy, quiz, ideas, prompt, rewrite, conversation
- **requires:** none, repo-read, file-write, shell, web, git, `mcp:<server>`
- **risk:** read-only, edits-files, runs-commands, network, external
- **advice_risk:** medical, mental-health, legal, financial
- **model_tier:** small, mid, frontier · **reasoning:** off, optional, recommended · **level:** beginner, intermediate, expert
- **effort:** quick, standard, deep · **interaction:** one-shot, interactive, autonomous · **invocation:** user, model, both
- **lang:** BCP 47, default `en`

## 8. Relevance signals (Hermes "For you")

Hermes does not show every entry at once. Search always covers the whole catalog. What changes per person is the **default view and the order**: a "For you" shelf, per-domain shelves and boosted ranking. All of it is computed **on the device** from signals that never leave it.

| Signal | How Hermes gets it (locally) | Facets it matches | Weight |
|---|---|---|---|
| **Project languages and frameworks** | Scans the open workspace's manifests and file names (depth ≤ 3, ignoring `node_modules`, `.git` and build dirs) against `detect` in `vocab/stack.yml` | `stack` (with `implies`) | high |
| **Installed agents** | Agent CLIs on `PATH` and config dirs Hermes already checks (`.claude/`, `.cursor/`, `.github/copilot-instructions.md`, `.gemini/`, `AGENTS.md`, …) | `works_in` | high; entries that run in none of them sink, but are never hidden |
| **Chosen role** | Onboarding "I am a…" picker (multi-select from `vocab/role.yml` groups), editable in Settings | `role`, and the role's typical domains | high |
| **Chosen interests** | Onboarding chips: domains, categories, subjects (`spanish`, `biology`) and stack | `domain`, `category`, `subject`, `stack` | medium |
| **Recent usage** | Local counts of runs, installs and favourites per facet value, with exponential decay (half-life 14 days) | `category`, `domain`, `stack`, `subject`, `kind` | medium, capped so one binge does not take over |
| **Current Track phase** | The active Feature Track step | `stage` | medium while a Track is active |
| **Situation** (opt-in) | Workspace state Hermes already sees: merge conflict, failing test output, an uncommitted diff | `inputs`, `category` (e.g. conflict → `git`, stack trace → `debugging`) | low, shown as a hint chip |
| **Level and language** | Profile level; app locale | `level`, `lang` | low boost; a language mismatch sinks unless `lang` is unset |
| *Global quality* | From the catalog row, not personal | tier, `q`, `u` | the static rank every score starts from |

**Scoring:** `score = static_rank + Σ weightᶠ · matchᶠ`, applied to the 300 static-rank candidates the query plan already produces (design §5.5). The cost is constant at any catalog size. Every boosted card can say why ("Because your project uses React · you picked Backend engineer").

**Privacy rules:**

1. Profile, detected stack, installed agents and usage counts live in the local Hermes DB (`library_profile`, `library_affinity`) and are **never sent anywhere**, including telemetry.
2. Catalog sync is the same for everyone: shards are chosen by hash prefix, never by interest, so downloads reveal nothing.
3. Remote search for the community tier sends only the typed query and explicit filters. Personal boosts are applied after the response arrives.
4. Bodies are fetched only when an entry is opened, never prefetched by interest.
5. Settings has "Reset personalisation", "Pause personalisation" and "Show everything", which turns the shelves into plain popularity.
6. With no profile, Hermes falls back to the curated tier by quality, plus a three-tap interests picker.

## 9. Example tree (65 entries, 20 domains)

```
library/
├── software-engineering/
│   ├── architecture/      software-architect/persona.md          write-adr/prompt.md
│   ├── implementation/    implement-feature-from-spec/prompt.md   write-shell-script/prompt.md
│   ├── code-review/       review-pull-request/prompt.md           code-reviewer/persona.md
│   ├── debugging/         find-root-cause/prompt.md               explain-stack-trace/prompt.md
│   ├── testing/           fix-flaky-test/prompt.md                write-unit-tests/prompt.md
│   ├── security/          security-auditor/persona.md             secure-coding-rules/rule.md
│   ├── devops/            write-github-actions-workflow/prompt.md
│   ├── git/               write-commit-message/prompt.md          conventional-commits-rules/rule.md
│   ├── planning/          feature-track/workflow.md (+ steps/01…06)
│   ├── conventions/       typescript-strict-rules/rule.md
│   └── meta/              write-agent-handoff/prompt.md
├── education/
│   ├── studying/          make-flashcards/prompt.md
│   ├── tutoring/          socratic-tutor/persona.md               check-my-reasoning/prompt.md
│   ├── exam-prep/         generate-practice-exam/prompt.md
│   └── teaching/          write-lesson-plan/prompt.md
├── languages/
│   ├── language-learning/ correct-my-sentences/prompt.md
│   ├── conversation-practice/ language-exchange-partner/persona.md
│   └── translation/       translate-preserving-tone/prompt.md
├── content-creation/
│   ├── video/             write-youtube-script/prompt.md          video-production-track/workflow.md
│   ├── podcasting/        write-show-notes/prompt.md
│   ├── social-media/      turn-article-into-thread/prompt.md
│   └── newsletters/       write-newsletter-issue/prompt.md
├── marketing-sales/
│   ├── copywriting/       write-landing-page-copy/prompt.md       copywriter/persona.md
│   ├── seo/               write-seo-content-brief/prompt.md
│   └── sales/             write-cold-outreach/prompt.md
├── product-management/
│   ├── product-discovery/ synthesize-customer-interviews/prompt.md
│   └── product-metrics/   design-ab-test/prompt.md
├── business/
│   ├── entrepreneurship/  validate-business-idea/prompt.md
│   └── customer-support/  write-support-reply/prompt.md           support-tone-rules/rule.md
├── data-analysis/
│   ├── spreadsheets/      write-spreadsheet-formula/prompt.md
│   └── statistics/        choose-statistical-test/prompt.md
├── research-science/
│   ├── literature-review/ summarize-paper/prompt.md
│   └── fact-checking/     fact-check-claims/prompt.md
├── design/
│   └── ui-design/         critique-ui-screen/prompt.md
├── creative-arts/
│   ├── fiction/           develop-character/prompt.md
│   └── image-generation/  write-image-prompt/prompt.md
├── writing-communication/
│   ├── editing/           tighten-prose/prompt.md                 editor/persona.md
│   └── interpersonal-communication/ prepare-difficult-conversation/prompt.md
├── career-hr/
│   ├── resumes/           rewrite-resume-bullets/prompt.md
│   ├── interview-prep/    interview-coach/persona.md
│   └── people-management/ write-performance-review/prompt.md
├── finance/               ⚠ financial
│   └── budgeting/         build-monthly-budget/prompt.md
├── legal-admin/           ⚠ legal
│   └── contracts/         summarize-contract/prompt.md
├── health-wellbeing/      ⚠ medical / mental-health
│   ├── fitness/           build-training-plan/prompt.md
│   ├── mental-health/     guided-journaling/prompt.md
│   └── medical-prep/      prepare-doctor-questions/prompt.md
├── home-cooking/
│   └── cooking/           recipe-from-ingredients/prompt.md
├── travel/
│   └── trip-planning/     plan-itinerary/prompt.md
├── productivity/
│   ├── meetings/          summarize-meeting-transcript/prompt.md
│   └── decision-making/   run-pre-mortem/prompt.md
└── prompting/
    ├── prompt-engineering/ improve-prompt/prompt.md
    └── output-styles/     concise/style.md                        beginner-friendly/style.md
```

Facets for a representative slice (the full set uses the same patterns):

| id | kind | category (domain) | stage | role | stack / subject | in → out | risk / advice | other |
|---|---|---|---|---|---|---|---|---|
| review-pull-request | prompt | code-review (SE) | review | software-engineer, tech-lead | — | diff → report | read-only | requires repo-read, git; tier mid |
| fix-flaky-test | prompt | testing (SE) | verify | software-engineer, qa-engineer | — | logs, file → diff | edits-files | tag flaky-tests |
| write-github-actions-workflow | prompt | devops (SE) | ship | devops-engineer | github-actions | spec → config | edits-files | |
| typescript-strict-rules | rule | conventions (SE) | build | — | typescript | — | read-only | applies_to globs `**/*.ts` |
| security-auditor | persona | security (SE) | review | security-engineer | — | — | read-only | tools read, search |
| feature-track | workflow | planning (SE) | discover…build | software-engineer | — | ticket → plan, code | edits-files | 6 gated steps |
| socratic-tutor | persona | tutoring (education) | learn | student, teacher | — | — → conversation | read-only | interaction interactive |
| generate-practice-exam | prompt | exam-prep (education) | verify | student | biology (any subject) | document → quiz | read-only | level any |
| correct-my-sentences | prompt | language-learning (languages) | learn | language-learner | — (subject set by arg) | text → rewrite, explanation | read-only | lang en |
| language-exchange-partner | persona | conversation-practice (languages) | learn | language-learner | spanish | — → conversation | read-only | a `lang: es` translation would be its own entry |
| write-youtube-script | prompt | video (content-creation) | build | content-creator | youtube | topic, notes → script | read-only | |
| video-production-track | workflow | video (content-creation) | plan…ship | content-creator | youtube | topic → script, outline | read-only | steps: idea, hook, script, title, description |
| turn-article-into-thread | prompt | social-media (content-creation) | build | content-creator, marketer | x-twitter, linkedin | document → post | read-only | |
| write-landing-page-copy | prompt | copywriting (marketing-sales) | build | marketer, founder | — | spec → copy | read-only | |
| write-cold-outreach | prompt | sales (marketing-sales) | build | sales-rep, founder | linkedin | topic → message | read-only | |
| synthesize-customer-interviews | prompt | product-discovery (PM) | discover | product-manager, ux-researcher | — | transcript → report | read-only | |
| design-ab-test | prompt | product-metrics (PM) | design | product-manager, data-analyst | — | spec → plan | read-only | |
| write-support-reply | prompt | customer-support (business) | operate | support-agent | — | message → message | read-only | |
| support-tone-rules | rule | customer-support (business) | operate | support-agent | — | — | read-only | applies_to always |
| write-spreadsheet-formula | prompt | spreadsheets (data-analysis) | build | data-analyst, individual | excel, google-sheets | text → code | read-only | level beginner |
| choose-statistical-test | prompt | statistics (data-analysis) | design | data-analyst, researcher | statistics | dataset → explanation | read-only | |
| summarize-paper | prompt | literature-review (research) | discover | researcher, student | — | document → summary | read-only | |
| fact-check-claims | prompt | fact-checking (research) | verify | writer, researcher | — | text, url → report | network | requires web |
| critique-ui-screen | prompt | ui-design (design) | review | designer | figma | image → report | read-only | |
| write-image-prompt | prompt | image-generation (creative-arts) | build | artist, content-creator | midjourney, stable-diffusion | topic → prompt | read-only | |
| tighten-prose | prompt | editing (writing-comm.) | review | writer, editor, individual | — | text → rewrite | read-only | |
| prepare-difficult-conversation | prompt | interpersonal-communication | plan | manager, individual | — | text → outline | read-only | |
| rewrite-resume-bullets | prompt | resumes (career-hr) | build | job-seeker | — | resume, job-posting → rewrite | read-only | |
| interview-coach | persona | interview-prep (career-hr) | learn | job-seeker | — | — → conversation | read-only | |
| build-monthly-budget | prompt | budgeting (finance) | plan | individual, parent | google-sheets | preferences → table, plan | read-only / **financial** | includes `professional-limits` |
| summarize-contract | prompt | contracts (legal-admin) | discover | founder, consultant, individual | — | document → summary, checklist | read-only / **legal** | includes `professional-limits` |
| build-training-plan | prompt | fitness (health) | plan | individual | — | preferences → plan | read-only / **medical** | includes `professional-limits` |
| guided-journaling | prompt | mental-health (health) | learn | individual | — | text → conversation | read-only / **mental-health** | includes `professional-limits` + `crisis-safety`; never `invocation: model` |
| recipe-from-ingredients | prompt | cooking (home-cooking) | build | home-cook | — | preferences → plan | read-only | |
| plan-itinerary | prompt | trip-planning (travel) | plan | traveler | — | preferences → plan | network | requires web (optional) |
| summarize-meeting-transcript | prompt | meetings (productivity) | operate | manager, product-manager, individual | — | transcript → summary, checklist | read-only | |
| run-pre-mortem | prompt | decision-making (productivity) | plan | anyone | — | spec → report | read-only | |
| improve-prompt | prompt | prompt-engineering (prompting) | review | anyone | — | text → prompt | read-only | |
| concise | style | output-styles (prompting) | — | anyone | — | — | read-only | 5 levels |

## 10. Why it looks like this: lessons from large catalogs

| Catalog | What it does | What Hodios takes from it |
|---|---|---|
| **ACM CCS 2012** ([acm.org/publications/class-2012](https://www.acm.org/publications/class-2012), [intro](https://www.acm.org/publications/class-2012-intro)) | Replaced the strict single-parent 1998 tree (top levels A–K) with a poly-hierarchical SKOS ontology | A strict tree for *location* (one path), with poly-hierarchy expressed through facets and `implies`, not through multiple paths. Publish the vocab as data so others can map to it |
| **Stack Overflow tags and synonyms** ([blog: tag folksonomy and synonyms](https://stackoverflow.blog/2010/08/01/tag-folksonomy-and-tag-synonyms/), [privileges](https://stackoverflow.com/help/privileges/suggest-tag-synonyms)) | Free tags, plus community-voted synonyms that "automatically and silently" remap variants such as `[js]` → `[javascript]`; the tags themselves are capped per question | Synonyms remap at write time (`--fix`) and query time; open facets with a reviewed path for new values; a cap on tags per entry |
| **npm keywords** ([package.json docs](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)) | "an array of strings" for `npm search`, with no normalisation | Unnormalised keywords become noise at millions. Tags are normalised and never the primary signal |
| **VS Code Marketplace categories** ([extension manifest](https://code.visualstudio.com/api/references/extension-manifest)) | 17 closed categories that mix types (Themes, Snippets) with domains (Data Science); keywords capped at 30 | A closed primary list works, but mixing axes in one list does not. Kind and category are separate fields |
| **Hugging Face tasks** ([docs](https://huggingface.co/docs/hub/models-tasks), [pipelines.ts](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/pipelines.ts)) | One `pipeline_tag` per model drives UI and API; ~57 tasks grouped by 7 modalities; "you should rarely have to create a new task" | One primary value per entry, grouped one level up (domain); a high bar for new primary values; fine detail in tags |
| **schema.org** ([how it evolves](https://schema.org/docs/extension.html), [attic](https://schema.org/docs/attic.home.html), [supersededBy](https://google.schema.org/supersededBy)) | Pending area for new terms; `supersededBy`; retired terms kept in an attic "to satisfy previous links"; numbered releases | `deprecated_by` instead of deletion; one vocab version; the holding area as our "pending" |
| **Dewey** ([DDC new features](https://www.oclc.org/content/dam/oclc/dewey/versions/ddc22print/new_features.pdf)) | Relocations and discontinued numbers are recorded in notes, and editors prefer expansion over relocation | Split by adding a subcategory level (expansion) rather than relocating entries to new categories |
| **LCSH → FAST** ([FAST paper](https://yorkspace.library.yorku.ca/items/0f82fea5-e0a6-4084-959a-e2ebc6432954), [LCSH overview](https://www.librarianshipstudies.com/2017/12/library-of-congress-subject-headings.html)) | Pre-coordinated headings ("Topic—Place—Form") were too hard to apply; FAST split them into 8 post-coordinated facets; scope notes and huge "use for" lists | Post-coordinated facets instead of compound categories (no `react-testing` category; `cat:testing stack:react`); a `scope_note` on every category |
| **SFIA** ([levels of responsibility](https://sfia-online.org/en/sfia-9/responsibilities), [full framework](https://sfia-online.org/en/sfia-9/sfia-views/full-framework-view)) | ~100+ skills in 6 categories × 7 levels; roles are composed from skills, not enumerated | Categories model skills; `level` is separate; role is a light audience facet |
| **O*NET-SOC** ([taxonomy](https://www.onetcenter.org/taxonomy.html), [2019 update](https://www.onetcenter.org/reports/Taxonomy2019.html)) | 1,016 titles in 23 major groups; versioned taxonomy with published crosswalks between versions | `onet` codes on roles for crosswalks; vocab versions with explicit migrations |
| **GitHub topics** ([docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics), [repository limits](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits)) | ≤ 20 lowercase topics of ≤ 50 characters; curated "featured topics" with aliases maintained separately (github/explore); 3,000 entries per directory | Tag shape rules; a curated layer over free tags; folder size limits |
| **awesome-copilot** ([repo](https://github.com/github/awesome-copilot), commits ["Chat Modes -> Agents"](https://github.com/github/awesome-copilot/commits/main/chatmodes), ["Migrate … from prompt to skill"](https://github.com/github/awesome-copilot/commits/main/prompts), ["Remove collections folder … plugins"](https://github.com/github/awesome-copilot/commits/main/collections)) | Top-level folders by vendor format (agents 222, instructions 194, skills 426 entries flat), renamed three times | Never organise by vendor format; kind is behavioural and in the file name; folders are jobs |
| **fabric** ([repo](https://github.com/danielmiessler/fabric), [pattern_descriptions.json](https://github.com/danielmiessler/fabric/blob/main/scripts/pattern_descriptions/pattern_descriptions.json)) | 261 flat `verb_object` pattern folders; tags retrofitted later in a side file, with drift (`VISUALIZE`/`VISUALIZATION`, `SECURITY`/`security`, `OTHER`) and mixed axes | Verb-object naming works, and we keep it. Tags must be controlled from day one, axes kept apart, and "other" capped |
| **SWEBOK** ([V4 topics](https://computer.org/education/bodies-of-knowledge/software-engineering/topics)) | 15 → 18 knowledge areas in ten years, none removed | Evidence that activity-based categories are stable |

## 11. Migration from the scaffold vocabulary (vocab 0.x → 1.0.0)

- **Paths.** The canonical path gains the domain level: `library/software-engineering/<category>/<id>/`. Entries already at `library/<category>/<id>/` stay valid. PS051 reports them as a **warning** for the 1.x migration window, so content written in parallel against the old layout keeps passing. **Follow-up:** once the parallel content work has landed, one mechanical commit runs `git mv library/<cat> library/software-engineering/<cat>` for each software category, and PS051 then turns the legacy form into an error. No id or URL changes.
- **Categories.** The other 21 scaffold categories keep their ids, including all 18 that content work uses. `design`, `business` and `legal` are retired with `deprecated_by` (`ui-design`, `business-strategy`, `contracts`); no entries used them.
- **Facets.** Every scaffold value in `stage`, `stack`, `inputs`, `output`, `requires` and `tags` is still valid. New vocabs: `domain`, `subcategory`, `role`, `subject`, `advice-risk` and the registry `facets.yml`. New optional fields: `role`, `subject`, `subcategory`, `advice_risk`, `lang`, `proposed_category`. New risk value: `external`.
- **Tags that duplicate facets** (for example `planning`, `review`, `performance`, `sql`) now warn under PS057. They are not errors, so nothing breaks, and `--fix` will move them into the facet in a later pass.
