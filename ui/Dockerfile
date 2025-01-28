# Stage 1: Build the application
FROM node:23-bullseye-slim AS build

# Set working directory
WORKDIR /app

# Copy the source code
COPY . .

RUN yarn install

ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the application
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]