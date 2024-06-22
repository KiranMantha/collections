# BEGIN:::Stage 1: Base Stage ::: Generate node_modules
FROM node:22-alpine as base
ENV NODE_ENV=production
WORKDIR /base

COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile --ignore-scripts --production \ && yarn cache clean
RUN ( wget -q -O /dev/stdout https://gobinaries.com/tj/node-prune | sh ) \
    && node-prune
# END:::Stage 1: Base Stage

# BEGIN:::Stage 2: Build Stage ::: Generate dist folder
FROM node:22-alpine AS build
ENV NODE_ENV=development
ARG APP
WORKDIR /build
COPY --from=base /base/node_modules ./node_modules
COPY . .
RUN yarn build
# END:::Stage 2: Build Stage

# BEGIN:::Stage 3: Deploy Stage ::: Run static node server
FROM nginx:1.21-alpine as deploy

# Copy the build output to the Nginx document root
COPY --from=build /build/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid
# Create a non-root user
# Here's what each part of the command does:
## chown -R nginx:nginx: This changes the ownership of the specified directories and files to the nginx user and group. The -R flag tells the chown command to perform the operation recursively.
## /var/run/nginx.pid: This is the file that contains the process ID (PID) of the Nginx process. By changing its ownership to the nginx user and group, we allow the Nginx process to create and access this file.
## /usr/share/nginx/html: This is the directory that contains the static files served by Nginx. By changing its ownership to the nginx user and group, we allow the Nginx process to read and serve these files.
## /var/cache/nginx: This is the directory that contains cached files used by Nginx. By changing its ownership to the nginx user and group, we allow the Nginx process to create and access these files.
## /var/log/nginx: This is the directory that contains the Nginx log files. By changing its ownership to the nginx user and group, we allow the Nginx process to create and write to these files.
## /etc/nginx/conf.d: This is the directory that contains the Nginx configuration files. By changing its ownership to the nginx user and group, we allow the Nginx process to read these files.
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Switch to the non-root user
USER nginx

# run nginx
CMD ["nginx", "-g", "daemon off;"]
# END:::Stage 3: Deploy Stage