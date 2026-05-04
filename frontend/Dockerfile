FROM node:22-alpine AS base

WORKDIR /app

RUN mkdir -p /app/node_modules && chown -R node:node /app

USER node

COPY --chown=node:node package*.json ./

FROM base AS dependencies

RUN npm install

FROM base AS development

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]