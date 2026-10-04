---
schema: 1
id: embedded-c-rules
kind: rule
title: Embedded C rules
description: Standing rules for embedded C an assistant writes, covering fixed-width types, no heap after init, volatile registers, short interrupt handlers, checked errors and MISRA-style restraint.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [embedded-engineer]
stack: [c]
requires: [none]
risk: read-only
tags: [firmware, misra, isr, volatile, static-allocation, microcontrollers]
pairs_with:
  personas: [embedded-engineer]
  prompts: [implement-interrupt-safe-buffer, write-sensor-driver]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change C code for firmware in this project:

**Types and arithmetic**
- Use `<stdint.h>` fixed-width types (`uint8_t`, `int32_t`) for data, registers and protocol fields; use `size_t` for sizes and `bool` from `<stdbool.h>`. Never assume the width of `int`.
- Make every narrowing or sign-changing conversion an explicit cast, and only after checking the range.
- Use unsigned types for bit manipulation and shifts; never shift by the type's width or more, and never left-shift a negative value.
- Write constants with the right suffix (`1UL << 31`, `0xFFu`) so the expression does not overflow `int`.
- Compare tick counters with unsigned subtraction (`(uint32_t)(now - start) >= timeout`) so wrap-around is handled.
- No floating point in interrupt handlers, and none at all on cores without an FPU unless the project already accepts the cost.

**Memory**
- No `malloc`/`free` after initialisation. Use static allocation, fixed-size pools or the RTOS's static creation APIs.
- No recursion and no variable-length arrays. Keep large buffers off the stack and note any function with a stack frame over a few hundred bytes.
- Bounds-check every index and length that comes from outside the function (a peripheral, a packet, a register, a caller); use `sizeof` on the array, never a repeated literal.
- Use `memcpy` for type punning and packed protocol data; do not cast byte pointers to wider types (unaligned access faults on many cores).

**Hardware access**
- Access memory-mapped registers through `volatile` pointers or the vendor's register definitions; never cache a register value across a wait.
- Do read-modify-write on shared registers inside a critical section, or use the hardware's set/clear/toggle registers.
- Do not use `volatile` as a synchronisation primitive. Data shared between an interrupt and other code uses atomics, a critical section, or a single-producer single-consumer structure with proper barriers.
- Every wait on hardware has a timeout and returns an error when it expires.

**Interrupts and concurrency**
- Keep interrupt handlers short: acknowledge, capture, hand off (flag, queue or task notification), return. No blocking calls, `printf`, heap use or long loops in them.
- Use the RTOS's ISR-safe API variants (for example the `FromISR` functions) inside handlers.
- Keep critical sections as short as possible and never call blocking functions inside them.

**Errors**
- Check the return value of every function that can fail, including HAL and RTOS calls; do not discard it silently. Cast to `(void)` only with a comment saying why the result does not matter.
- Return error codes from a project-wide enum; do not mix negative errno values, booleans and custom codes in one module.
- Use `assert` or a project fault macro for programming errors, and handle runtime conditions (bus errors, timeouts, bad input) with error returns.

**Style and structure**
- Follow the project's existing standard (MISRA C, CERT C or an in-house guide). Where none exists, apply MISRA-style restraint: single exit points are optional, but no `goto` except forward to a cleanup label, no implicit fallthrough without a comment, every `switch` has a `default`, every `if`/`else if` chain ends with `else`.
- Give file-local functions and data `static` linkage; keep globals few, named with a module prefix.
- Mark hardware-specific code and magic addresses with a reference to the datasheet or reference manual section.
- Build with warnings as errors (`-Wall -Wextra -Werror` or the project's equivalent) and keep static analysis clean; do not add warning suppressions without a comment.
- Do not change clock trees, option bytes, fuses, linker scripts or bootloader settings unless asked, and say plainly when a change needs a hardware test.
