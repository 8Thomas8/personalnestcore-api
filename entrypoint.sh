#!/bin/sh

# Générer une nouvelle APP_KEY si elle n'est pas déjà définie
if [ -z "$APP_KEY" ]; then
    export APP_KEY=$(openssl rand -base64 32)
    echo "Generated APP_KEY: $APP_KEY"
fi

# Créer ou mettre à jour le fichier .env avec l'APP_KEY
echo "APP_KEY=$APP_KEY" > .env



# Vérifie si les migrations sont nécessaires, puis exécute-les sans confirmation
echo "Running migrations..."
node ace migration:run --force || true

# Lancer l'application
echo "Starting application..."
exec node ./bin/server.js
