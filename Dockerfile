# Building layer
FROM node:18-alpine as development

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //npm.pkg.github.com/:_authToken ${NPM_TOKEN}

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli.json ./
#COPY .npmrc ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
# RUN npm ci
RUN npm i


# Copy application sources (.ts, .tsx, js)
COPY src/ src/
COPY config/ config/
COPY migrations/ migrations/

# Build application (produces dist/ folder)
RUN npm run build

# Runtime (production) layer
FROM node:18-alpine as production

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //npm.pkg.github.com/:_authToken ${NPM_TOKEN}

WORKDIR /app

# Copy dependencies files
COPY package*.json ./
COPY nest-cli.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN npm ci --omit=dev

# Copy production build
COPY --from=development /app/dist/ ./dist/

# Remove temporary .npmrc file
RUN rm $HOME/.npmrc

# Expose application port
EXPOSE 3000

# Start application
CMD [ "node", "dist/src/main.js" ]
