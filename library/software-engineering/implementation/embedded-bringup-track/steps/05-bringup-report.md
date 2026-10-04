# Step 5: Bring-up report

Write the report the hardware and firmware teams will use for the next revision.

1. Summary: board revision, serial numbers tested, overall status (works, works with rework, blocked) in three lines.
2. Results by area: power, clocks, debug, console, each peripheral, with measured values against expected.
3. Issues list: each with symptom, evidence, root cause if known, workaround applied (bodge wire, component change, firmware workaround), and the recommended fix for the next revision, ranked by severity.
4. Schematic and layout feedback: test points, debug access, missing pull-ups or filtering, silkscreen errors.
5. Firmware handover: the bring-up code to keep, the console commands, known limits, and the next firmware tasks.

Sections: Summary, Results, Issues (Issue | Severity | Evidence | Workaround | Fix for next revision), Hardware feedback, Firmware handover, Open questions.
