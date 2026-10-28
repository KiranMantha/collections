// Bundle every dependency into main.js so the runtime image needs no node_modules.
// Externals stay out of the bundle:
//  - native addons ship a compiled .node binary that can't be bundled
//  - packages Nest/Apollo load by name at runtime (loadPackage) can't be traced by the bundler
//  - optional packages are probed by Nest/Apollo with try/catch and aren't used here
const external = [
  'better-sqlite3',
  '@apollo/server',
  '@as-integrations/express5',
  '@apollo/subgraph',
  '@apollo/gateway',
  'graphql',
  '@as-integrations/fastify',
  '@nestjs/microservices',
  '@nestjs/websockets',
  '@nestjs/platform-fastify',
  'class-transformer',
  'class-validator',
  'ts-morph',
];

module.exports = (options) => ({
  ...options,
  externals: [
    ({ request }, callback) => {
      const isExternal = external.some(
        (name) => request === name || request.startsWith(`${name}/`),
      );
      return isExternal ? callback(null, `commonjs ${request}`) : callback();
    },
  ],
});
