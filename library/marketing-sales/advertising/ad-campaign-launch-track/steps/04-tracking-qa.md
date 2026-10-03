# Step 4: Tracking QA

Make sure every result the campaign reports can be trusted before spending.

1. List the conversion events the campaign relies on (the optimisation event and any secondary ones), where each fires, and the value it should send.
2. Give a test procedure the marketer can run: complete a real or test conversion, then check the platform's event testing or diagnostics view, the analytics tool and the backend order or lead record. Each event should fire exactly once, with the right value and currency.
3. Check deduplication when both a browser pixel and a server-side connection send the same event, consent mode or cookie banner behaviour in the target countries, and that UTM parameters or auto-tagging land on every ad URL with a consistent naming convention.
4. Landing page checks: loads fast on mobile, the offer matches the ads, forms and checkout work, contact and privacy information are present.
5. Agree how results will be reconciled: platform-reported conversions against backend records, with the gap you will tolerate.
6. Produce a QA checklist with a pass or fail column for the marketer to fill in, and do not proceed while any critical item fails.

Stop and wait for the marketer to report the QA results. Do not prepare launch settings until the critical items pass.
