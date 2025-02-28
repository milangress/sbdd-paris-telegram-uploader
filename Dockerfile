FROM oven/bun:1.0 AS base

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN bun install

# Copy the rest of the application
COPY . .

# Create temp directory for file downloads
RUN mkdir -p /app/temp

# Create a directory for Kirby content
RUN mkdir -p /app/kirby/content

# Set environment variables
ENV NODE_ENV=production
ENV KIRBY_COLLECTION_DIR=/app/kirby/content

# Run the application
CMD ["bun", "start"]