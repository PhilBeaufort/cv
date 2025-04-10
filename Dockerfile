# Use an official Node image
# https://hub.docker.com/_/node
FROM node:22.14.0 AS builder

# Set working directory
WORKDIR /app

# Copy all source files
COPY . .

# Install dependencies
RUN npm ci

# Build vite website
RUN npm run build

# Serve with nginx
FROM nginx:1.27.4-alpine AS runner

# Copy generated site from builder stage
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
