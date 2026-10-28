// Writes the package.json for the packages an app still needs at runtime.
// Everything else is bundled into main.js (see rspack.config.js, whose `external` list this mirrors).
// Versions are the ones installed from pnpm-lock.yaml, so the image matches what was built and tested.
const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const app = process.argv[2];
const outFile = process.argv[3];

const shared = ['@apollo/server', '@as-integrations/express5', 'graphql'];
const perApp = {
  'graphql-gateway': ['@apollo/gateway'],
  products: ['better-sqlite3', '@apollo/subgraph'],
  orders: ['better-sqlite3', '@apollo/subgraph'],
  inventory: ['better-sqlite3', '@apollo/subgraph'],
};

if (!perApp[app]) {
  console.error(`Unknown app "${app}". Add it to docker/runtime-package.cjs`);
  process.exit(1);
}

const dependencies = {};
for (const name of [...shared, ...perApp[app]]) {
  const manifest = join(process.cwd(), 'node_modules', name, 'package.json');
  dependencies[name] = JSON.parse(readFileSync(manifest, 'utf8')).version;
}

writeFileSync(outFile, JSON.stringify({ private: true, dependencies }, null, 2));
