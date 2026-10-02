// Writes the JSON Schemas from the built package to the repo-level schema/ folder.
// Run with `npm run gen:schema`. A test fails when schema/ is out of date.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { schemaFiles } from '../dist/index.js';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'schema');
for (const [name, schema] of Object.entries(schemaFiles)) {
  writeFileSync(join(outDir, name), JSON.stringify(schema, null, 2) + '\n');
  console.log(`wrote schema/${name}`);
}
