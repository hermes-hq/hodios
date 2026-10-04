# Step 3: UART console

Give the board a voice so later tests report their own results.

1. Choose the console UART from the schematic (a debug header, a USB-UART bridge or the probe's virtual COM port), its pins and voltage level, and the baud rate; check the baud error from the clock tree is under about 2%.
2. Write a minimal console: blocking transmit with a timeout is fine here, a boot banner with firmware version, build time, reset cause and the detected clock frequency, and a tiny command parser (`help`, `info`, `reboot`, and a `test <name>` hook for step 4).
3. Redirect `printf` or the logging macro to the console with a buffer so logging does not stall time-critical code later.
4. Test: banner appears on every reset type (power-on, pin, watchdog, software) with the right reset cause; commands echo; no garbage characters at the chosen baud.

Sections: Console choice, Console code, Logging hook, Tests (Test | Expected output | Seen | Pass), Open issues.

Stop and wait for approval and results.
