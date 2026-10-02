Builds the feature "[FEATURE]" in small, reviewable steps. Each step writes one artifact and stops for approval before the next one starts, so the human stays in control of scope and design while the agent does the legwork. Later steps read the earlier artifacts instead of re-asking.

## Steps

Work through these steps in order. Do not skip a gate.

1. questions (discover)
2. research (discover)
3. design (design)
4. structure (design)
5. plan (plan)
6. implement (build)

### Step 1: Questions

Read the request for "[FEATURE]" and the code it touches. Write the questions whose answers would change the design: users, edge cases, constraints, non-goals and how success is measured. Group them, keep each one answerable in a sentence, and mark the ones you can answer yourself from the code (with the answer).

Stop and wait for the answers.

Save this step's result to `.hermes/features/[FEATURE]/questions.md`.

**Gate:** stop here and wait for the user's approval before step 2 (research).

### Step 2: Research

Using the answered questions, map the current system: the files, modules, data and external services involved, and how a request flows through them today. Note existing patterns the feature should follow and anything that will make it harder. Cite file paths. Do not propose a design yet.

Stop and wait for approval.

Save this step's result to `.hermes/features/[FEATURE]/research.md`.

**Gate:** stop here and wait for the user's approval before step 3 (design).

### Step 3: Design

Propose the design for "[FEATURE]": the approach, the alternatives you rejected and why, data and API changes, failure modes, and how it will be tested. Keep it to what a reviewer needs to say yes or no.

Stop and wait for approval.

Save this step's result to `.hermes/features/[FEATURE]/design.md`.

**Gate:** stop here and wait for the user's approval before step 4 (structure).

### Step 4: Structure

List every file to add or change, with a one-line purpose each, plus new types, functions and their signatures. Flag anything that touches a shared or public interface.

Stop and wait for approval.

Save this step's result to `.hermes/features/[FEATURE]/structure.md`.

**Gate:** stop here and wait for the user's approval before step 5 (plan).

### Step 5: Plan

Turn the approved design and structure into an ordered list of small steps. Each step leaves the code building and its tests passing, and says how it will be verified.

Stop and wait for approval.

Save this step's result to `.hermes/features/[FEATURE]/plan.md`.

**Gate:** stop here and wait for the user's approval before step 6 (implement).

### Step 6: Implement

Carry out the plan one step at a time. After each step, run its verification and report the real result. If reality differs from the plan, stop and say how before continuing. Finish with what changed, what was verified, and anything left open.
