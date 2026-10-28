# Shared Dockerfile for every app in the monorepo.
# Build from the repo root: docker build --build-arg APP=products .
#
# Each app is bundled into a single main.js by rspack (see rspack.config.js), so the
# runtime image only carries the few packages that can't be bundled.

# ---- build: install deps and bundle the app ----
FROM node:24-alpine AS build

RUN npm install -g pnpm@12.6.0
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ARG APP
RUN pnpm exec nest build ${APP} \
    && node docker/runtime-package.cjs ${APP} /tmp/runtime-package.json

# ---- deps: install only the packages left external, then trim them ----
FROM node:24-alpine AS deps

WORKDIR /runtime
COPY --from=build /tmp/runtime-package.json ./package.json
RUN npm install --omit=dev --ignore-scripts --legacy-peer-deps --no-audit --no-fund \
    && rm -f package-lock.json

# better-sqlite3 ships prebuilt binaries for every platform; keep only this one
RUN if [ -d node_modules/better-sqlite3 ]; then \
      arch="$(uname -m | sed 's/x86_64/x64/;s/aarch64/arm64/')"; \
      cd node_modules/better-sqlite3 \
      && find prebuilds -type f ! -name "linuxmusl-${arch}.node" -delete \
      && rm -rf deps src build binding.gyp; \
    fi

# runtime never needs type declarations, source maps or docs
RUN find node_modules -type f \( -name "*.map" -o -name "*.d.ts" -o -name "*.d.cts" -o -name "*.d.mts" -o -iname "*.md" \) -delete

# ---- runtime: plain alpine + the node binary, no npm/yarn/headers ----
FROM alpine:3 AS runtime

RUN apk add --no-cache libstdc++
COPY --from=build /usr/local/bin/node /usr/local/bin/node

WORKDIR /app
ARG APP
ENV NODE_ENV=production
COPY --from=deps /runtime/node_modules ./node_modules
COPY --from=build /app/dist/apps/${APP}/main.js ./main.js

CMD ["node", "main.js"]
