# Use the official MeiliSearch image as the base
FROM getmeili/meilisearch:v1.12

# Set environment variables for MeiliSearch
ENV MEILI_MASTER_KEY=a0Mfp5S-WKAQ5_dtAARW3EopM6eij7u-OrrWo4JqTIk

# Install Node.js and npm using Alpine package manager (apk)
RUN apk add --no-cache nodejs npm curl

# Set working directory
WORKDIR /app

# Copy the data-load folder
COPY data-load /app/data-load

# Change to the data-load directory
WORKDIR /app/data-load

# Install dependencies
RUN npm install

# Go back to root working directory
WORKDIR /app

# Copy the startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose MeiliSearch port
EXPOSE 7700

# Run the script to start MeiliSearch and load data
CMD ["/app/start.sh"]
