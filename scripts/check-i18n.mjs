import { readFileSync, readdirSync } from 'node:fs';

const langs = ['en', 'zh', 'el'];
const dir = 'src/messages';
const data = {};

for (const l of langs) {
  data[l] = JSON.parse(readFileSync(`${dir}/${l}.json`, 'utf8'));
}

const flatten = (obj) => {
  const out = [];
  const walk = (node, prefix) => {
    for (const key of Object.keys(node)) {
      const value = node[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) walk(value, path);
      else out.push(path);
    }
  };
  walk(obj, '');
  return out.sort();
};

let problems = 0;
const base = flatten(data.en);
for (const l of langs) {
  const keys = flatten(data[l]);
  const missing = base.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !base.includes(k));
  if (missing.length || extra.length) {
    problems++;
    console.log(`[${l}] MISMATCH missing=${missing.length} extra=${extra.length}`);
    if (missing.length) console.log('  missing:', missing.slice(0, 15));
    if (extra.length) console.log('  extra:', extra.slice(0, 15));
  } else {
    console.log(`[${l}] key parity OK (${keys.length} keys)`);
  }
}

// Array length parity for the list-driven sections
const listSections = ['facilities.items', 'history.events', 'legends.items', 'sources.items', 'toc.items', 'knowledge.sections'];
const get = (obj, path) => path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj);
for (const path of listSections) {
  const counts = langs.map((l) => (get(data[l], path) || []).length);
  const ok = counts.every((c) => c === counts[0]);
  if (!ok) problems++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${path} -> ${langs.map((l, i) => `${l}:${counts[i]}`).join(' ')}`);
}

// TOC anchors must resolve to a real section id in the components
const compDir = 'src/components';
const ids = new Set();
for (const file of readdirSync(compDir).filter((f) => f.endsWith('.tsx'))) {
  const src = readFileSync(`${compDir}/${file}`, 'utf8');
  for (const match of src.matchAll(/<section[^>]*\sid="([^"]+)"/g)) ids.add(match[1]);
}
console.log('section ids:', [...ids].sort().join(', '));
const tocIds = data.en.toc.items.map((i) => i.id);
const dangling = tocIds.filter((id) => !ids.has(id));
if (dangling.length) {
  problems++;
  console.log('FAIL dangling TOC anchors:', dangling);
} else {
  console.log(`OK   all ${tocIds.length} TOC anchors resolve`);
}

console.log(problems === 0 ? '\nALL CHECKS PASSED' : `\n${problems} PROBLEM(S) FOUND`);
