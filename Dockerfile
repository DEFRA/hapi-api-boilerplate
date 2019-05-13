ARG NODE_ENV=production
ARG NODE_VERSION=10.15.3

# Production
FROM node:${NODE_VERSION}-alpine AS production

ARG NODE_ENV

ENV NODE_ENV $NODE_ENV

USER node
WORKDIR /home/node

EXPOSE 3001

COPY --chown=node:node package.json package-lock.json /home/node/
COPY --chown=node:node server /home/node/server/
COPY --chown=node:node index.js /home/node/index.js
RUN npm ci

CMD ["node", "index.js"]
