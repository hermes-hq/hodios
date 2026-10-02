import { CALVER_PATTERN, ID_PATTERN, KINDS, type Kind } from '@hermes-hq/hodios-schema';

/**
 * ids.lock: append-only list of every released unscoped id, one per line:
 *   <id> <kind> <first-calver>
 * Lines starting with # are comments. The release workflow appends; humans never edit it.
 */
export interface IdsLockEntry {
  id: string;
  kind: Kind;
  firstCalver: string;
  line: number;
}

export interface IdsLock {
  entries: Map<string, IdsLockEntry>;
  problems: { line: number; message: string }[];
}

const idRe = new RegExp(ID_PATTERN);
const calverRe = new RegExp(CALVER_PATTERN);

export function parseIdsLock(text: string): IdsLock {
  const entries = new Map<string, IdsLockEntry>();
  const problems: IdsLock['problems'] = [];
  let previous = '';
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = i + 1;
    const trimmed = raw.trim();
    if (trimmed === '' || trimmed.startsWith('#')) return;
    const parts = trimmed.split(/\s+/);
    const [id, kind, calver] = parts;
    if (parts.length !== 3 || !id || !kind || !calver) {
      problems.push({ line, message: 'expected "<id> <kind> <first-calver>"' });
      return;
    }
    if (!idRe.test(id) || id.startsWith('@')) {
      problems.push({ line, message: `invalid unscoped id "${id}"` });
      return;
    }
    if (!(KINDS as readonly string[]).includes(kind)) {
      problems.push({ line, message: `invalid kind "${kind}"` });
      return;
    }
    if (!calverRe.test(calver)) {
      problems.push({ line, message: `invalid calver "${calver}"` });
      return;
    }
    if (entries.has(id)) {
      problems.push({ line, message: `duplicate id "${id}"` });
      return;
    }
    if (previous && id < previous) {
      problems.push({ line, message: `not sorted: "${id}" comes after "${previous}"` });
    }
    previous = id;
    entries.set(id, { id, kind: kind as Kind, firstCalver: calver, line });
  });
  return { entries, problems };
}
