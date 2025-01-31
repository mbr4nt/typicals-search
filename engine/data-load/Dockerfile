# Stage 1: Use Node.js image to install dependencies and run the script
FROM node:18 AS node-builder

# Set working directory
WORKDIR /app

# Copy the data-load folder
COPY ./ /app

# Change to the data-load directory
WORKDIR /app

# Install dependencies and run the script
RUN npm install && node index.js