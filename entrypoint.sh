#!/bin/sh

# Generate a new APP_KEY if it is not already defined
if [ -z "$APP_KEY" ]; then
    export APP_KEY=$(openssl rand -base64 32)
    echo "Generated APP_KEY: $APP_KEY"
fi

# Create or update the .env file with the APP_KEY
echo "APP_KEY=$APP_KEY" > .env



# Check if migrations are required, then run them without confirmation
echo "Running migrations..."
node ace migration:run --force || true

# Start the application
echo "Starting application..."
exec node ./bin/server.js
