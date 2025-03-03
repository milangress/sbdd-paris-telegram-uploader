# Use the official Bun image
FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory (caches them for future builds)
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory and all project files
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Create necessary directories
RUN mkdir -p /usr/src/app/temp
RUN mkdir -p /usr/src/app/kirby/content

# Final production image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/tsconfig.json .
COPY --from=prerelease /usr/src/app/src ./src

# Create necessary directories in the final image
RUN mkdir -p /usr/src/app/temp
RUN mkdir -p /usr/src/app/kirby/content

# Fix permissions - ensure the bun user can write to the content directory
# RUN chown -R bun:bun /usr/src/app/temp /usr/src/app/kirby/content
# RUN chmod -R 755 /usr/src/app/temp /usr/src/app/kirby/content

# Set environment variables
ENV NODE_ENV=production
ENV KIRBY_COLLECTION_DIR=/usr/src/app/kirby/content

# Run as non-root user for better security
# USER bun
# EXPOSE 3000/tcp

# Run the application
CMD ["bun", "run", "start"]