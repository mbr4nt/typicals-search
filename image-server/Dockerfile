# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the server script and image folder
COPY server.js .
COPY images ./images

# Expose the port the app runs on
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]