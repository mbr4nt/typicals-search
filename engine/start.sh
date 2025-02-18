#!/bin/sh

# Start MeiliSearch in the background
/meilisearch --no-analytics &

# Wait for MeiliSearch to become available
echo "Waiting for MeiliSearch to start..."
until curl -s -H "Authorization: Bearer $MEILI_MASTER_KEY" http://localhost:7701/health | grep "status"; do
  sleep 2
done

echo "MeiliSearch is running. Loading data..."

# Run the Node.js script to load data
export MEILI_MASTER_KEY  # Ensure the token is available to Node.js
node /app/data-load/index.js

echo "Data loading completed!"
wait # Keep the container running
