# PersonalNestCore API

## Installation Guide

### 1. Initial Setup
To set up the PersonalNestCore API, follow these steps:

1. Pull the latest image:
```docker pull 8thomas8/personalnestcore-api```

2. Start the services:
```docker-compose up -d --build```
This will build the containers and start them in detached mode.
___

### 2. Update Instructions
When you need to update the application, follow these steps:

1. Backup the database (just in case something goes wrong during the update):
   - Ensure your data is backed up from the persistent volume or database file.
2. Pull the latest image:
```docker pull 8thomas8/personalnestcore-api```
3. Rebuild and restart the services:
```docker-compose up -d --build```
This will pull the latest updates, rebuild the containers, and restart them.
___

### 3. Deletion Steps
To remove the application and clean up your setup:

1. Stop and remove containers:
```docker-compose down```
2. Remove all associated volumes (use carefully, as this will delete persistent data):
```docker-compose down -v```
3. Optional: You may also want to remove the images and stop any running containers manually:
```
docker ps -a
docker stop <container_id>
docker rm <container_id>
docker rmi <image_name>
```
___


## Troubleshooting
If you encounter any issues with your setup or container, try the following:

1. Check container logs:
```docker logs <container_id>```
2. Check the status of the running containers:
```docker ps```
3. If there's an issue with the database connection or migration, make sure the database is correctly initialized, and the migrations have been applied.

___

