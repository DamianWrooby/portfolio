# Node 22 LTS: Gatsby 5 requires >=18, and @testing-library/jest-dom 7
# requires >=22. Kept in step with .nvmrc and package.json engines.
FROM node:22-alpine AS builder

WORKDIR /app

# Copy into the workdir, not into /. The previous `COPY package*.json /.`
# left /app without a manifest, so the install below silently did nothing.
COPY package.json package-lock.json ./
# npm ci installs exactly the lockfile, and fails loudly if the two disagree.
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY --from=builder /app/public /usr/share/nginx/html
