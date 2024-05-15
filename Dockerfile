FROM node:18.16.0-alpine AS dependencies
WORKDIR /app
COPY . .
RUN npm ci && \
    npm run prisma:generate && \
    npm run build && \
    rm -rf src

FROM node:18.16.0-alpine AS runtime
USER node
COPY --chown=node:node --from=dependencies /app/ /home/node/app/
WORKDIR /home/node/app/
CMD ["npm", "run", "start"]